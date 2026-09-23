import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  MysteryType, 
  RosaryStep, 
  MysteryDetail 
} from './types/rosary';
import { 
  buildRosarySequence, 
  getDefaultMysteryForDate, 
  MYSTERY_GROUPS 
} from './data/rosaryData';
import { RosaryBeadsVisualizer } from './components/RosaryBeadsVisualizer';
import { DecadeTracker } from './components/DecadeTracker';
import { PrayerCard } from './components/PrayerCard';
import { RosaryControls } from './components/RosaryControls';
import { AndroidAppBar } from './components/AndroidAppBar';
import { SettingsModal } from './components/SettingsModal';
import { PrayerBookModal } from './components/PrayerBookModal';
import { CompletionModal } from './components/CompletionModal';
import { AndroidInstallModal } from './components/AndroidInstallModal';
import { usePWAInstall } from './hooks/usePWAInstall';
import { 
  playSacredChime, 
  triggerHaptic, 
  speakPrayerText, 
  stopSpeaking 
} from './utils/soundAndVibe';

export default function App() {
  // PWA Install detection
  const { isInstallable, install } = usePWAInstall();

  // 1. Core Rosary state
  const [currentMystery, setCurrentMystery] = useState<MysteryType>(() => getDefaultMysteryForDate());
  const [steps, setSteps] = useState<RosaryStep[]>(() => buildRosarySequence(getDefaultMysteryForDate()));
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // 2. Preferences and Settings
  const [prayerIntention, setPrayerIntention] = useState<string>('Pelas nossas famílias, saúde e paz no mundo');
  const [autoSeconds, setAutoSeconds] = useState<number>(15);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [hapticEnabled, setHapticEnabled] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [compactView, setCompactView] = useState<boolean>(false);

  // 3. Auto-advance state
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(15);
  const [countdownProgress, setCountdownProgress] = useState<number>(0);

  // 4. Voice & Speech Synthesis
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // 5. Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isPrayerBookOpen, setIsPrayerBookOpen] = useState<boolean>(false);
  const [isCompletedOpen, setIsCompletedOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

  // References for timers
  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const stepStartTimeRef = useRef<number>(Date.now());

  // Re-generate steps if mystery type changes
  const handleSelectMystery = useCallback((newMystery: MysteryType) => {
    setCurrentMystery(newMystery);
    const newSteps = buildRosarySequence(newMystery);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsAutoPlay(false);
    stopSpeaking();
    setIsSpeaking(false);
  }, []);

  const currentStep = steps[currentStepIndex] || steps[0];
  const isLastStep = currentStepIndex >= steps.length - 1;

  // Find active mystery detail if inside a decade
  const currentMysteryDetail: MysteryDetail | undefined = 
    currentStep.decadeIndex 
      ? MYSTERY_GROUPS[currentMystery].mysteries[currentStep.decadeIndex - 1]
      : undefined;

  // Sound and Haptic feedback helper
  const triggerFeedback = useCallback((step: RosaryStep) => {
    if (soundEnabled) {
      let tone: 'ave' | 'padre' | 'glory' | 'crucifix' | 'complete' = 'ave';
      if (step.beadType === 'our_father') tone = 'padre';
      else if (step.beadType === 'glory' || step.beadType === 'fatima') tone = 'glory';
      else if (step.beadType === 'crucifix' || step.beadType === 'sign_of_cross') tone = 'crucifix';
      else if (step.beadType === 'salve_regina') tone = 'complete';

      playSacredChime(tone);
    }

    if (hapticEnabled) {
      triggerHaptic(step.beadType === 'our_father' ? 'medium' : 'subtle');
    }
  }, [soundEnabled, hapticEnabled]);

  // Navigate to step
  const handleSelectStep = useCallback((index: number) => {
    if (index < 0 || index >= steps.length) return;
    
    stopSpeaking();
    setIsSpeaking(false);
    setCurrentStepIndex(index);
    stepStartTimeRef.current = Date.now();
    setRemainingSeconds(autoSeconds);
    setCountdownProgress(0);

    triggerFeedback(steps[index]);

    if (index === steps.length - 1) {
      setIsAutoPlay(false);
      setIsCompletedOpen(true);
    }
  }, [steps, autoSeconds, triggerFeedback]);

  // Next step
  const handleNext = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      handleSelectStep(currentStepIndex + 1);
    } else {
      setIsAutoPlay(false);
      setIsCompletedOpen(true);
    }
  }, [currentStepIndex, steps.length, handleSelectStep]);

  // Previous step
  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      handleSelectStep(currentStepIndex - 1);
    }
  }, [currentStepIndex, handleSelectStep]);

  // Reset to beginning
  const handleReset = useCallback(() => {
    stopSpeaking();
    setIsSpeaking(false);
    setIsAutoPlay(false);
    setIsCompletedOpen(false);
    handleSelectStep(0);
  }, [handleSelectStep]);

  // Toggle Auto Play
  const handleToggleAutoPlay = useCallback(() => {
    setIsAutoPlay((prev) => {
      const nextVal = !prev;
      if (nextVal) {
        stepStartTimeRef.current = Date.now();
        setRemainingSeconds(autoSeconds);
        setCountdownProgress(0);
      }
      return nextVal;
    });
  }, [autoSeconds]);

  // Toggle Speech
  const handleToggleSpeech = useCallback(() => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      const success = speakPrayerText(
        currentStep.prayerText,
        () => {
          setIsSpeaking(false);
          // If in auto mode, advance after speech finishes
          if (isAutoPlay) {
            handleNext();
          }
        }
      );
      setIsSpeaking(success);
    }
  }, [isSpeaking, currentStep.prayerText, isAutoPlay, handleNext]);

  // Auto-play timer effect
  useEffect(() => {
    if (!isAutoPlay) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setCountdownProgress(0);
      return;
    }

    const durationMs = autoSeconds * 1000;
    stepStartTimeRef.current = Date.now();

    // High frequency interval for smooth progress bar and second counter
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - stepStartTimeRef.current;
      const progress = Math.min(1, elapsed / durationMs);
      const remaining = Math.max(0, Math.ceil((durationMs - elapsed) / 1000));

      setCountdownProgress(progress);
      setRemainingSeconds(remaining);

      if (elapsed >= durationMs) {
        // Time to advance!
        handleNext();
      }
    }, 100);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isAutoPlay, currentStepIndex, autoSeconds, handleNext]);

  // Keyboard navigation support (Space / ArrowRight / ArrowLeft)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in text input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center sm:p-4 text-slate-100 font-sans selection:bg-amber-500/30">
      {/* Mobile Device Frame Container (compact layout for Android phone experience) */}
      <main className="w-full sm:max-w-[430px] min-h-screen sm:min-h-[840px] sm:max-h-[920px] bg-slate-950 sm:border sm:border-amber-500/30 sm:rounded-[36px] flex flex-col shadow-2xl overflow-hidden relative sm:ring-1 sm:ring-white/10">
        {/* Top Android App Bar */}
        <AndroidAppBar
          currentMystery={currentMystery}
          currentStepIndex={currentStepIndex}
          totalSteps={steps.length}
          compactView={compactView}
          onToggleCompactView={() => setCompactView(!compactView)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenPrayerBook={() => setIsPrayerBookOpen(true)}
          onOpenAndroidGuide={() => setIsInstallModalOpen(true)}
          isInstallable={isInstallable}
          prayerIntention={prayerIntention}
        />

        {/* Scrollable Center Body */}
        <div className="flex-1 overflow-y-auto px-3.5 py-3 flex flex-col gap-3 relative">
          {/* Visual Rosary (Loop with glowing beads) */}
          {!compactView ? (
            <div className="w-full flex justify-center py-1">
              <RosaryBeadsVisualizer
                currentStepIndex={currentStepIndex}
                steps={steps}
                mysteryType={currentMystery}
                onSelectStep={handleSelectStep}
                compactView={compactView}
              />
            </div>
          ) : (
            <div className="w-full flex justify-center py-0.5">
              <RosaryBeadsVisualizer
                currentStepIndex={currentStepIndex}
                steps={steps}
                mysteryType={currentMystery}
                onSelectStep={handleSelectStep}
                compactView={true}
              />
            </div>
          )}

          {/* Active Decade / Prayer Tracker (10 glowing Ave Maria beads) */}
          <DecadeTracker
            currentStep={currentStep}
            steps={steps}
            onSelectStep={handleSelectStep}
          />

          {/* Prayer Card (Text reader with audio and typography controls) */}
          <PrayerCard
            currentStep={currentStep}
            currentMystery={currentMysteryDetail}
            isSpeaking={isSpeaking}
            onToggleSpeech={handleToggleSpeech}
            fontSize={fontSize}
            onChangeFontSize={setFontSize}
          />
        </div>

        {/* Bottom Ergonomic Touch Controls Bar */}
        <RosaryControls
          isAutoPlay={isAutoPlay}
          onToggleAutoPlay={handleToggleAutoPlay}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onReset={handleReset}
          autoSeconds={autoSeconds}
          onChangeAutoSeconds={setAutoSeconds}
          countdownProgress={countdownProgress}
          remainingSeconds={remainingSeconds}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          isCompleted={isLastStep}
          onOpenSettings={() => setIsSettingsOpen(true)}
          isFirstStep={currentStepIndex === 0}
        />
      </main>

      {/* Settings Modal (Mystery switch, speed, sound, vibration) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentMystery={currentMystery}
        onSelectMystery={handleSelectMystery}
        prayerIntention={prayerIntention}
        onUpdateIntention={setPrayerIntention}
        autoSeconds={autoSeconds}
        onChangeAutoSeconds={setAutoSeconds}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        hapticEnabled={hapticEnabled}
        onToggleHaptic={() => setHapticEnabled(!hapticEnabled)}
        compactView={compactView}
        onToggleCompactView={() => setCompactView(!compactView)}
        onOpenPrayerBook={() => {
          setIsSettingsOpen(false);
          setIsPrayerBookOpen(true);
        }}
        onOpenAndroidGuide={() => {
          setIsSettingsOpen(false);
          setIsInstallModalOpen(true);
        }}
      />

      {/* Devotional Prayer Book Modal */}
      <PrayerBookModal
        isOpen={isPrayerBookOpen}
        onClose={() => setIsPrayerBookOpen(false)}
      />

      {/* Rosary Completion Celebration Modal */}
      <CompletionModal
        isOpen={isCompletedOpen}
        onRestart={handleReset}
        mysteryGroup={MYSTERY_GROUPS[currentMystery]}
        prayerIntention={prayerIntention}
      />

      {/* Android Usage & Installation Modal */}
      <AndroidInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        isInstallable={isInstallable}
        onInstall={install}
      />
    </div>
  );
}

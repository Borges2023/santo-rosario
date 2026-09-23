import React, { useState } from 'react';
import { RosaryStep, MysteryDetail } from '../types/rosary';
import { Volume2, VolumeX, BookOpen, Sparkles, BookMarked, Quote } from 'lucide-react';

interface PrayerCardProps {
  currentStep: RosaryStep;
  currentMystery?: MysteryDetail;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  fontSize: 'sm' | 'md' | 'lg';
  onChangeFontSize: (size: 'sm' | 'md' | 'lg') => void;
}

export const PrayerCard: React.FC<PrayerCardProps> = ({
  currentStep,
  currentMystery,
  isSpeaking,
  onToggleSpeech,
  fontSize,
  onChangeFontSize,
}) => {
  const [showMeditation, setShowMeditation] = useState(false);

  // Font size map
  const textSizeClasses = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed md:text-xl',
  };

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-amber-500/25 shadow-xl relative overflow-hidden flex flex-col">
      {/* Background Sacred Ambience */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top Meta Bar */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-serif">
              {currentStep.subtitle}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-amber-100 tracking-tight leading-snug">
            {currentStep.prayerTitle}
          </h2>
        </div>

        {/* Action icons: Audio speech & font size toggle */}
        <div className="flex items-center gap-1.5 shrink-0 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          {/* TTS Button */}
          <button
            onClick={onToggleSpeech}
            title={isSpeaking ? 'Parar leitura por voz' : 'Ouvir oração em voz alta (PT-BR)'}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                : 'text-slate-300 hover:text-amber-300 hover:bg-slate-700/70'
            }`}
          >
            {isSpeaking ? (
              <div className="flex items-center gap-1">
                <Volume2 className="w-4 h-4 animate-bounce" />
                <span className="text-[10px] font-bold pr-0.5">Voz</span>
              </div>
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Font Size Selector */}
          <div className="flex items-center border-l border-slate-700/70 pl-1 text-[11px] font-mono text-slate-400">
            <button
              onClick={() => onChangeFontSize('sm')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === 'sm' ? 'text-amber-300 font-bold bg-slate-700' : 'hover:text-slate-200'}`}
              title="Texto pequeno"
            >
              A-
            </button>
            <button
              onClick={() => onChangeFontSize('md')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === 'md' ? 'text-amber-300 font-bold bg-slate-700' : 'hover:text-slate-200'}`}
              title="Texto médio"
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('lg')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === 'lg' ? 'text-amber-300 font-bold bg-slate-700' : 'hover:text-slate-200'}`}
              title="Texto grande"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Mystery Context or Fruit of the Mystery Banner */}
      {currentStep.fruitOrIntention && (
        <div className="mb-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold text-amber-300">Meditação: </span>
            <span>{currentStep.fruitOrIntention}</span>
          </div>
        </div>
      )}

      {/* Toggle Mystery Biblical Meditation if available in this decade */}
      {currentMystery && currentStep.decadeIndex && (
        <div className="mb-2">
          <button
            onClick={() => setShowMeditation(!showMeditation)}
            className="flex items-center gap-1.5 text-xs text-amber-400/90 hover:text-amber-300 font-medium py-1 cursor-pointer transition-colors"
          >
            <Quote className="w-3 h-3" />
            <span>{showMeditation ? 'Ocultar reflexão bíblica' : 'Ler reflexão e passagem bíblica'}</span>
          </button>

          {showMeditation && (
            <div className="mt-1.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1.5 animate-fadeIn">
              <div className="font-semibold text-amber-300 flex items-center justify-between">
                <span>{currentMystery.title}</span>
                <span className="font-mono text-[11px] text-amber-400">{currentMystery.biblicalReference}</span>
              </div>
              <p className="italic text-slate-300/90">{currentMystery.meditation}</p>
              <div className="text-[11px] text-amber-400/80 pt-1 border-t border-slate-800/80">
                Fruto do Mistério: <span className="font-semibold">{currentMystery.fruitOfTheMystery}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Prayer Text Box */}
      <div className="my-auto py-1">
        <div className={`text-slate-100 ${textSizeClasses[fontSize]} whitespace-pre-line tracking-normal font-sans select-text`}>
          {currentStep.prayerText}
        </div>
      </div>
    </div>
  );
};

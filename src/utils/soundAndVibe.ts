/**
 * Audio synthesis, speech synthesis, and haptic feedback utilities for the Rosary app.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a serene sacred bell chime using Web Audio harmonic synthesis
 */
export function playSacredChime(toneType: 'ave' | 'padre' | 'glory' | 'crucifix' | 'complete' = 'ave') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Choose frequencies based on bead type
    let baseFreq = 523.25; // C5 - gentle bright bell
    let decay = 1.4;

    if (toneType === 'padre') {
      baseFreq = 392.00; // G4 - deeper church bell
      decay = 2.2;
    } else if (toneType === 'glory') {
      baseFreq = 659.25; // E5 - uplifting
      decay = 1.8;
    } else if (toneType === 'crucifix') {
      baseFreq = 329.63; // E4 - solemn, sacred
      decay = 2.5;
    } else if (toneType === 'complete') {
      baseFreq = 440.00; // A4 - cathedral fullness
      decay = 3.2;
    }

    // Master gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.32, now + 0.02);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);
    masterGain.connect(ctx.destination);

    // Fundamental + harmonic partials for bell-like timbre
    const harmonics = [1, 2.02, 2.98, 4.05];
    const harmonicGains = [1, 0.45, 0.25, 0.12];

    harmonics.forEach((h, idx) => {
      const osc = ctx.createOscillator();
      const hGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * h, now);

      hGain.gain.setValueAtTime(harmonicGains[idx], now);
      hGain.gain.exponentialRampToValueAtTime(0.0001, now + (decay / (idx + 1)));

      osc.connect(hGain);
      hGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch {
    // Audio context may fail if strictly blocked before gesture
  }
}

/**
 * Haptic feedback on mobile devices
 */
export function triggerHaptic(type: 'subtle' | 'medium' | 'strong' = 'subtle') {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (type === 'subtle') {
        navigator.vibrate(20);
      } else if (type === 'medium') {
        navigator.vibrate([30, 40, 25]);
      } else {
        navigator.vibrate([60, 50, 60, 50, 80]);
      }
    } catch {
      // Haptic may fail silently if device restricts
    }
  }
}

let activeUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Text-to-speech reader for prayers in Portuguese (pt-BR)
 */
export function speakPrayerText(text: string, onEnd?: () => void, rate = 0.95): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel();

    // Clean text of bracket notes for speech
    const cleanText = text
      .replace(/\[.*?\]/g, '')
      .replace(/[•]/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Pick best pt-BR voice if available
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.startsWith('pt-BR')) || voices.find(v => v.lang.startsWith('pt'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onend = () => {
      activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      activeUtterance = null;
    };

    activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
}

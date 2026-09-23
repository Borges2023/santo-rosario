import React, { useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Settings, 
  Timer, 
  Zap,
  Hand
} from 'lucide-react';

interface RosaryControlsProps {
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  autoSeconds: number;
  onChangeAutoSeconds: (sec: number) => void;
  countdownProgress: number; // 0 to 1
  remainingSeconds: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isCompleted: boolean;
  onOpenSettings: () => void;
  isFirstStep: boolean;
}

export const RosaryControls: React.FC<RosaryControlsProps> = ({
  isAutoPlay,
  onToggleAutoPlay,
  onNext,
  onPrevious,
  onReset,
  autoSeconds,
  onChangeAutoSeconds,
  countdownProgress,
  remainingSeconds,
  soundEnabled,
  onToggleSound,
  isCompleted,
  onOpenSettings,
  isFirstStep,
}) => {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const speeds = [10, 15, 20, 25, 30];

  return (
    <div className="w-full bg-slate-900/95 backdrop-blur-lg border-t border-amber-500/20 pt-3 pb-4 px-4 shadow-2xl flex flex-col gap-2 rounded-b-3xl">
      {/* Top mini-bar: Auto toggle + Sound + Settings */}
      <div className="flex items-center justify-between text-xs px-1">
        {/* Auto vs Manual Mode Pill */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleAutoPlay}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              isAutoPlay
                ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-pulse'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            {isAutoPlay ? (
              <>
                <Timer className="w-3.5 h-3.5 animate-spin" />
                <span>Automático ({remainingSeconds}s)</span>
              </>
            ) : (
              <>
                <Hand className="w-3.5 h-3.5 text-amber-400" />
                <span>Modo Manual</span>
              </>
            )}
          </button>

          {/* Quick Speed Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="text-[11px] font-mono px-2 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-amber-300 cursor-pointer flex items-center gap-1"
              title="Ajustar tempo do avanço automático"
            >
              <span>{autoSeconds}s</span>
            </button>

            {showSpeedMenu && (
              <div className="absolute bottom-full mb-2 left-0 bg-slate-800 border border-slate-700 rounded-xl p-1.5 shadow-xl flex gap-1 z-30 animate-fadeIn">
                {speeds.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      onChangeAutoSeconds(s);
                      setShowSpeedMenu(false);
                    }}
                    className={`px-2 py-1 text-xs rounded-lg font-mono cursor-pointer transition-colors ${
                      autoSeconds === s
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {s}s
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sound toggle & Settings */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Sons do sino ativados' : 'Sons do sino desativados'}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'bg-slate-800/60 text-slate-500 border border-slate-800'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenSettings}
            title="Preferências do Terço e Mistérios"
            className="p-2 rounded-xl bg-slate-800/60 text-slate-300 hover:text-amber-300 border border-slate-700/60 cursor-pointer transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Auto Progress countdown bar when autoPlay is active */}
      {isAutoPlay && (
        <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden my-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-200 ease-linear shadow-[0_0_8px_#f59e0b]"
            style={{ width: `${Math.min(100, Math.max(0, countdownProgress * 100))}%` }}
          />
        </div>
      )}

      {/* Main Touch Controls Bar (Ergonomic Thumb Reach) */}
      <div className="flex items-center justify-between gap-3 mt-1">
        {/* Reset / Beginning */}
        <button
          onClick={onReset}
          disabled={isFirstStep}
          title="Reiniciar Terço do início"
          className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-slate-400 hover:text-amber-300 hover:border-amber-500/40 flex items-center justify-center transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer active:scale-95 shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Previous Bead Button */}
        <button
          onClick={onPrevious}
          disabled={isFirstStep}
          className="flex-1 h-12 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-white flex items-center justify-center gap-1.5 font-medium text-sm transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer active:scale-98 shadow-md"
        >
          <ChevronLeft className="w-4 h-4 text-amber-400" />
          <span>Voltar</span>
        </button>

        {/* Play/Pause Auto or Big Next Bead Button */}
        <button
          onClick={onNext}
          className="flex-[1.5] h-13 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-bold text-base flex items-center justify-center gap-2 transition-all hover:brightness-105 active:scale-98 shadow-[0_0_20px_rgba(245,158,11,0.5)] cursor-pointer"
        >
          <span>{isCompleted ? 'Concluído!' : 'Avançar'}</span>
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

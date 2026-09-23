import React from 'react';
import { RosaryStep, MysteryType } from '../types/rosary';
import { Sparkles, BookOpen, Settings, Maximize2, Minimize2, Heart, Smartphone, Download } from 'lucide-react';
import { MYSTERY_GROUPS } from '../data/rosaryData';

interface AndroidAppBarProps {
  currentMystery: MysteryType;
  currentStepIndex: number;
  totalSteps: number;
  compactView: boolean;
  onToggleCompactView: () => void;
  onOpenSettings: () => void;
  onOpenPrayerBook: () => void;
  onOpenAndroidGuide: () => void;
  isInstallable: boolean;
  prayerIntention: string;
}

export const AndroidAppBar: React.FC<AndroidAppBarProps> = ({
  currentMystery,
  currentStepIndex,
  totalSteps,
  compactView,
  onToggleCompactView,
  onOpenSettings,
  onOpenPrayerBook,
  onOpenAndroidGuide,
  isInstallable,
  prayerIntention,
}) => {
  const mysteryGroup = MYSTERY_GROUPS[currentMystery];
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <header className="w-full bg-slate-900/95 border-b border-amber-500/20 px-4 pt-3 pb-2.5 flex flex-col gap-2 rounded-t-3xl select-none">
      {/* Top row: App Brand Title & Actions */}
      <div className="flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-serif font-black text-sm shadow-[0_0_12px_rgba(245,158,11,0.5)]">
            ✝
          </div>
          <div>
            <h1 className="font-serif font-bold text-sm sm:text-base text-amber-100 tracking-wide leading-tight">
              Santo Terço Luminoso
            </h1>
            <button 
              onClick={onOpenSettings}
              className="text-[11px] text-amber-400/90 font-medium flex items-center gap-1 hover:text-amber-300 cursor-pointer"
            >
              <span>{mysteryGroup.name}</span>
              <span className="text-slate-500">▾</span>
            </button>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-1.5">
          {/* Android installation/usage guide button */}
          <button
            onClick={onOpenAndroidGuide}
            title="Como usar e instalar no Celular Android"
            className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-sm"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px]">No Celular</span>
          </button>

          {/* Toggle compact / full layout */}
          <button
            onClick={onToggleCompactView}
            title={compactView ? 'Visualizar Terço Expandido' : 'Modo Compacto de Leitura'}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-amber-300 border border-slate-700 cursor-pointer transition-colors"
          >
            {compactView ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>

          {/* Prayer book */}
          <button
            onClick={onOpenPrayerBook}
            title="Devocionário e Orações"
            className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-amber-300 border border-slate-700 cursor-pointer transition-colors"
          >
            <BookOpen className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Intention pill if set */}
      {prayerIntention && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 truncate">
          <Heart className="w-3 h-3 text-amber-400 shrink-0 fill-amber-400/40" />
          <span className="truncate">Intenção: {prayerIntention}</span>
        </div>
      )}

      {/* Overall Rosary Progress Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Progresso do Terço</span>
          <span className="text-amber-300 font-bold tabular-nums">
            {currentStepIndex + 1} / {totalSteps} ({progressPercent}%)
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 transition-all duration-300 shadow-[0_0_6px_#f59e0b]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
};


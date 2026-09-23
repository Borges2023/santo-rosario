import React from 'react';
import { MysteryType, MYSTERY_GROUPS, getDefaultMysteryForDate } from '../data/rosaryData';
import { X, Calendar, Heart, Volume2, Sparkles, Smartphone, Check, BookOpen } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMystery: MysteryType;
  onSelectMystery: (m: MysteryType) => void;
  prayerIntention: string;
  onUpdateIntention: (val: string) => void;
  autoSeconds: number;
  onChangeAutoSeconds: (sec: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  hapticEnabled: boolean;
  onToggleHaptic: () => void;
  compactView: boolean;
  onToggleCompactView: () => void;
  onOpenPrayerBook: () => void;
  onOpenAndroidGuide: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentMystery,
  onSelectMystery,
  prayerIntention,
  onUpdateIntention,
  autoSeconds,
  onChangeAutoSeconds,
  soundEnabled,
  onToggleSound,
  hapticEnabled,
  onToggleHaptic,
  compactView,
  onToggleCompactView,
  onOpenPrayerBook,
  onOpenAndroidGuide,
}) => {
  if (!isOpen) return null;

  const todayDefault = getDefaultMysteryForDate();
  const mysteryKeys: MysteryType[] = ['gozosos', 'dolorosos', 'gloriosos', 'luminosos'];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-slideUp"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif font-bold text-base text-amber-200">
              Opções do Santo Terço
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {/* Mystery of the Day Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-serif">
                Escolha dos Mistérios
              </label>
              <span className="text-[11px] text-slate-400">Hoje: {MYSTERY_GROUPS[todayDefault].name}</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {mysteryKeys.map((key) => {
                const group = MYSTERY_GROUPS[key];
                const isSelected = currentMystery === key;
                const isToday = todayDefault === key;

                return (
                  <button
                    key={key}
                    onClick={() => onSelectMystery(key)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                        : 'bg-slate-800/60 border-slate-700/70 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold">{group.name}</span>
                        {isToday && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Mistério de Hoje
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{group.daysOfWeek}</div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-slate-950">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intention for the Rosary */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 font-serif mb-1.5">
              Intenção Particular do Terço
            </label>
            <input
              type="text"
              value={prayerIntention}
              onChange={(e) => onUpdateIntention(e.target.value)}
              placeholder="Ex: Pela minha família, conversão dos pecadores..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Auto Advance Speed */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 font-serif mb-2">
              Tempo do Avanço Automático (segundos por conta)
            </label>
            <div className="flex items-center gap-2">
              {[8, 12, 16, 20, 25, 30].map((s) => (
                <button
                  key={s}
                  onClick={() => onChangeAutoSeconds(s)}
                  className={`flex-1 py-2 rounded-xl font-mono text-xs font-medium cursor-pointer transition-all ${
                    autoSeconds === s
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_10px_#f59e0b]'
                      : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {s}s
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            {/* Sound chime */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-slate-200">Sino Sagrado a cada conta</span>
                <p className="text-xs text-slate-400">Toca toque suave de sino de igreja ao acender a bolinha</p>
              </div>
              <button
                onClick={onToggleSound}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  soundEnabled ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                    soundEnabled ? 'translate-x-6.5' : 'translate-x-0.5'
                  } top-0.5 absolute`}
                />
              </button>
            </div>

            {/* Haptic vibration */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-slate-200">Vibração háptica no celular</span>
                <p className="text-xs text-slate-400">Vibra discretamente ao avançar cada oração</p>
              </div>
              <button
                onClick={onToggleHaptic}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  hapticEnabled ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                    hapticEnabled ? 'translate-x-6.5' : 'translate-x-0.5'
                  } top-0.5 absolute`}
                />
              </button>
            </div>

            {/* Compact layout */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-slate-200">Layout Compacto</span>
                <p className="text-xs text-slate-400">Prioriza o leitor da oração e encolhe o terço</p>
              </div>
              <button
                onClick={onToggleCompactView}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  compactView ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                    compactView ? 'translate-x-6.5' : 'translate-x-0.5'
                  } top-0.5 absolute`}
                />
              </button>
            </div>
          </div>

          {/* Android Guide Button */}
          <button
            onClick={() => {
              onClose();
              onOpenAndroidGuide();
            }}
            className="w-full py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Como Usar e Instalar no Celular Android</span>
          </button>

          {/* Full Prayer Book Link */}
          <button
            onClick={() => {
              onClose();
              onOpenPrayerBook();
            }}
            className="w-full py-3 px-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Consultar Orações Completas na Íntegra</span>
          </button>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm cursor-pointer hover:bg-amber-400 transition-colors shadow-lg"
          >
            Confirmar e Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { RosaryStep } from '../types/rosary';
import { Check, Sparkles, Cross, Heart, Shield, Award } from 'lucide-react';

interface DecadeTrackerProps {
  currentStep: RosaryStep;
  steps: RosaryStep[];
  onSelectStep: (stepIndex: number) => void;
}

export const DecadeTracker: React.FC<DecadeTrackerProps> = ({
  currentStep,
  steps,
  onSelectStep,
}) => {
  // If we are in an intro phase (Crucifix or 3 Ave Marias)
  const isIntro = currentStep.index < 7;
  const isOutro = currentStep.index >= steps.length - 3;

  if (isIntro) {
    const introSteps = steps.slice(0, 7);
    return (
      <div className="w-full bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 border border-amber-500/20 shadow-lg">
        <div className="flex items-center justify-between text-xs text-amber-300 font-medium mb-2.5 px-1">
          <span className="font-serif tracking-wide uppercase">Orações Introdutórias</span>
          <span className="text-slate-400 font-mono">{currentStep.index + 1}/7</span>
        </div>

        <div className="flex items-center justify-between gap-1.5 px-1">
          {introSteps.map((s, idx) => {
            const isActive = s.index === currentStep.index;
            const isCompleted = s.index < currentStep.index;

            return (
              <button
                key={s.id}
                onClick={() => onSelectStep(s.index)}
                title={s.title}
                className="relative flex flex-col items-center flex-1 py-1 group cursor-pointer focus:outline-none"
              >
                {/* Bead Orb */}
                <div
                  className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-9 h-9 bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_18px_rgba(245,158,11,0.85)] scale-110 ring-2 ring-white z-10'
                      : isCompleted
                      ? 'w-7 h-7 bg-amber-600/80 text-amber-100 shadow-[0_0_8px_rgba(217,119,6,0.5)]'
                      : 'w-7 h-7 bg-slate-800 border border-slate-700 text-slate-400 group-hover:border-amber-400/50'
                  }`}
                >
                  {/* Subtle pulsing background glow if active */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-40" />
                  )}

                  {idx === 0 || idx === 1 || idx === 2 ? (
                    <Cross className={`w-3.5 h-3.5 ${isActive ? 'text-amber-950 stroke-[2.5]' : 'text-slate-300'}`} />
                  ) : idx === 3 ? (
                    <span className={`text-[10px] font-bold ${isActive ? 'text-amber-950' : 'text-slate-300'}`}>PN</span>
                  ) : (
                    <span className={`text-[10px] font-bold ${isActive ? 'text-amber-950' : 'text-slate-300'}`}>
                      {idx - 3}
                    </span>
                  )}
                </div>

                {/* Subtitle tag */}
                <span className={`text-[9px] mt-1 font-medium truncate max-w-[42px] ${isActive ? 'text-amber-300 font-bold' : 'text-slate-500'}`}>
                  {idx === 0 ? 'Sinal' : idx === 1 ? 'Oferta' : idx === 2 ? 'Creio' : idx === 3 ? 'Pai Nosso' : idx === 4 ? 'Fé' : idx === 5 ? 'Esperança' : 'Caridade'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (isOutro) {
    const outroSteps = steps.slice(steps.length - 3);
    return (
      <div className="w-full bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 border border-amber-500/20 shadow-lg">
        <div className="flex items-center justify-between text-xs text-amber-300 font-medium mb-2 px-1">
          <span className="font-serif tracking-wide uppercase">Orações Finais</span>
          <span className="text-slate-400 font-mono">Conclusão</span>
        </div>
        <div className="flex items-center justify-around gap-2">
          {outroSteps.map((s) => {
            const isActive = s.index === currentStep.index;
            const isCompleted = s.index < currentStep.index;
            return (
              <button
                key={s.id}
                onClick={() => onSelectStep(s.index)}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_14px_rgba(245,158,11,0.5)]'
                    : isCompleted
                    ? 'bg-slate-800/80 border-slate-700 text-amber-300/80'
                    : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    isActive ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : isCompleted ? 'bg-amber-600' : 'bg-slate-600'
                  }`}
                />
                <span className="text-xs font-medium truncate">{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Decade (1 to 5)
  const decade = currentStep.decadeIndex || 1;
  const decadeOurFather = steps.find(s => s.id === `decade_${decade}_our_father`);
  const decadeHms = steps.filter(s => s.decadeIndex === decade && s.beadType === 'hail_mary');
  const decadeGlory = steps.find(s => s.id === `decade_${decade}_glory`);
  const decadeFatima = steps.find(s => s.id === `decade_${decade}_fatima`);

  const currentHmIndex = currentStep.beadType === 'hail_mary' ? currentStep.subIndex || 1 : null;

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 border border-amber-500/20 shadow-lg">
      {/* Header with Decade Title and Progress */}
      <div className="flex items-center justify-between text-xs mb-2.5 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-serif font-semibold text-amber-300 uppercase tracking-wide">
            {decade}ª Dezena
          </span>
        </div>
        <div className="text-slate-400 font-mono text-[11px]">
          {currentHmIndex ? `${currentHmIndex} de 10 Ave Marias` : currentStep.beadType === 'our_father' ? 'Pai Nosso' : 'Glória / Jaculatória'}
        </div>
      </div>

      {/* Decade Pai Nosso Bead Trigger */}
      {decadeOurFather && (
        <div className="mb-2.5 flex items-center justify-between gap-2 p-1.5 rounded-xl bg-slate-800/50 border border-slate-800">
          <button
            onClick={() => onSelectStep(decadeOurFather.index)}
            className={`flex items-center gap-2 text-xs py-1 px-2 rounded-lg transition-all cursor-pointer ${
              currentStep.index === decadeOurFather.index
                ? 'bg-amber-500/25 border border-amber-400/60 text-amber-200 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                : decadeOurFather.index < currentStep.index
                ? 'text-amber-400/80 hover:bg-slate-800'
                : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                currentStep.index === decadeOurFather.index
                  ? 'bg-amber-400 text-amber-950 shadow-[0_0_10px_#f59e0b]'
                  : decadeOurFather.index < currentStep.index
                  ? 'bg-amber-700/80 text-amber-100'
                  : 'bg-slate-700 text-slate-300'
              }`}
            >
              PN
            </div>
            <span>Pai Nosso da Dezena</span>
          </button>

          {/* Glory & Fatima mini buttons */}
          <div className="flex items-center gap-1">
            {decadeGlory && (
              <button
                onClick={() => onSelectStep(decadeGlory.index)}
                className={`text-[10px] px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  currentStep.index === decadeGlory.index
                    ? 'bg-amber-500/30 text-amber-200 font-bold border border-amber-400/50'
                    : decadeGlory.index < currentStep.index
                    ? 'text-amber-400/70 hover:bg-slate-800'
                    : 'text-slate-500 hover:bg-slate-800'
                }`}
              >
                Glória
              </button>
            )}
            {decadeFatima && (
              <button
                onClick={() => onSelectStep(decadeFatima.index)}
                className={`text-[10px] px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  currentStep.index === decadeFatima.index
                    ? 'bg-amber-500/30 text-amber-200 font-bold border border-amber-400/50'
                    : decadeFatima.index < currentStep.index
                    ? 'text-amber-400/70 hover:bg-slate-800'
                    : 'text-slate-500 hover:bg-slate-800'
                }`}
              >
                Fátima
              </button>
            )}
          </div>
        </div>
      )}

      {/* 10 Glowing Hail Mary Beads */}
      <div className="grid grid-cols-10 gap-1.5 items-center justify-items-center pt-1 pb-1">
        {decadeHms.map((step) => {
          const hmNum = step.subIndex || 1;
          const isActive = step.index === currentStep.index;
          const isCompleted = step.index < currentStep.index;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.index)}
              title={`${hmNum}ª Ave Maria`}
              className="relative flex flex-col items-center group cursor-pointer focus:outline-none min-w-[28px] min-h-[44px] justify-center"
            >
              {/* Glowing Bead */}
              <div
                className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-8 h-8 bg-gradient-to-tr from-amber-500 via-amber-300 to-white shadow-[0_0_16px_rgba(245,158,11,0.95)] ring-2 ring-white scale-125 z-20'
                    : isCompleted
                    ? 'w-6 h-6 bg-gradient-to-tr from-amber-600 to-amber-400 text-amber-950 shadow-[0_0_6px_rgba(217,119,6,0.6)]'
                    : 'w-6 h-6 bg-slate-800 border border-slate-700 text-slate-400 group-hover:border-amber-400/60'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-40 pointer-events-none" />
                )}

                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[3] text-amber-950" />
                ) : (
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-amber-950' : 'text-slate-300'}`}>
                    {hmNum}
                  </span>
                )}
              </div>

              {/* Dot indicator below bead */}
              <span
                className={`w-1 h-1 rounded-full mt-1.5 transition-colors ${
                  isActive ? 'bg-amber-400 shadow-[0_0_4px_#f59e0b]' : isCompleted ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

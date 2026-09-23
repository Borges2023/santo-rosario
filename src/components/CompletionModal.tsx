import React from 'react';
import { Sparkles, RotateCcw, Award, CheckCircle2, Heart } from 'lucide-react';
import { MysteryGroup } from '../types/rosary';

interface CompletionModalProps {
  isOpen: boolean;
  onRestart: () => void;
  mysteryGroup: MysteryGroup;
  prayerIntention: string;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onRestart,
  mysteryGroup,
  prayerIntention,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm bg-slate-900 border border-amber-400/40 rounded-3xl p-6 text-center space-y-4 shadow-[0_0_40px_rgba(245,158,11,0.3)] animate-scaleUp">
        {/* Sacred radiant icon */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
          <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-[0_0_25px_#f59e0b]">
            <CheckCircle2 className="w-10 h-10 text-slate-950 stroke-[2.5]" />
          </div>
        </div>

        {/* Titles */}
        <div>
          <span className="text-xs font-serif uppercase tracking-widest text-amber-400 font-bold">
            Graças a Deus
          </span>
          <h2 className="text-xl font-serif font-bold text-amber-100 mt-1">
            Santo Terço Concluído!
          </h2>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            Você completou a meditação dos <strong className="text-amber-300">{mysteryGroup.name}</strong>. Que a Virgem Maria interceda por suas intenções e conceda paz e bênçãos à sua vida.
          </p>
        </div>

        {/* Intention note */}
        {prayerIntention && (
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 text-left flex items-start gap-2">
            <Heart className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 fill-amber-400/30" />
            <div>
              <span className="font-semibold text-amber-300">Oferecido por:</span>
              <p className="italic text-slate-200 mt-0.5">{prayerIntention}</p>
            </div>
          </div>
        )}

        {/* Sacred Quote */}
        <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800 text-[11px] text-slate-300 italic">
          "Pelo Rosário podemos alcançar tudo. Se desejais a paz nos vossos corações, nas vossas famílias e na vossa pátria, rezai o Terço todos os dias."
          <div className="text-[10px] text-amber-400 font-normal mt-1 not-italic font-mono">
            — São Pio de Pietrelcina
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onRestart}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:brightness-105 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Rezar Novamente</span>
        </button>
      </div>
    </div>
  );
};

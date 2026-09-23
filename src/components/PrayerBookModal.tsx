import React, { useState } from 'react';
import { PRAYERS, MYSTERY_GROUPS } from '../data/rosaryData';
import { X, BookOpen, ChevronDown, ChevronUp, Sparkles, ScrollText } from 'lucide-react';

interface PrayerBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerBookModal: React.FC<PrayerBookModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'oracoes' | 'misterios'>('oracoes');
  const [expandedMystery, setExpandedMystery] = useState<string | null>('gozosos');

  if (!isOpen) return null;

  const prayerList = [
    { title: PRAYERS.signOfCross.title, text: PRAYERS.signOfCross.text },
    { title: PRAYERS.offering.title, text: PRAYERS.offering.text },
    { title: PRAYERS.creed.title, text: PRAYERS.creed.text },
    { title: PRAYERS.ourFather.title, text: PRAYERS.ourFather.text },
    { title: PRAYERS.hailMary.title, text: PRAYERS.hailMary.text },
    { title: PRAYERS.glory.title, text: PRAYERS.glory.text },
    { title: PRAYERS.fatimaPrayer.title, text: PRAYERS.fatimaPrayer.text },
    { title: PRAYERS.salveRegina.title, text: PRAYERS.salveRegina.text },
    { title: PRAYERS.thanksgiving.title, text: PRAYERS.thanksgiving.text },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-amber-200">
              Devocionário do Santo Terço
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 px-5 pt-2">
          <button
            onClick={() => setActiveTab('oracoes')}
            className={`pb-3 px-4 font-serif text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'oracoes'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Todas as Orações
          </button>
          <button
            onClick={() => setActiveTab('misterios')}
            className={`pb-3 px-4 font-serif text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'misterios'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Os 20 Mistérios
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm flex-1">
          {activeTab === 'oracoes' ? (
            <div className="space-y-4">
              {prayerList.map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-800/60 border border-slate-800 space-y-1.5"
                >
                  <h4 className="font-serif font-bold text-amber-300 text-base">
                    {p.title}
                  </h4>
                  <p className="text-slate-200 whitespace-pre-line leading-relaxed text-sm">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(MYSTERY_GROUPS).map(([key, group]) => {
                const isExpanded = expandedMystery === key;
                return (
                  <div
                    key={key}
                    className="rounded-2xl border border-slate-800 bg-slate-800/40 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedMystery(isExpanded ? null : key)}
                      className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-800/70 transition-colors"
                    >
                      <div>
                        <div className="font-serif font-bold text-amber-300 text-base">
                          {group.name}
                        </div>
                        <div className="text-xs text-slate-400">{group.daysOfWeek}</div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-amber-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-4 pt-1 space-y-3 border-t border-slate-800/80 bg-slate-900/50">
                        {group.mysteries.map((m) => (
                          <div
                            key={m.number}
                            className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between font-semibold text-amber-200">
                              <span>{m.number}º Mistério: {m.title}</span>
                              <span className="text-amber-400 font-mono text-[11px]">{m.biblicalReference}</span>
                            </div>
                            <p className="text-slate-300 italic">{m.meditation}</p>
                            <div className="text-amber-300/80 text-[11px]">
                              Fruto: <span className="font-medium">{m.fruitOfTheMystery}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm cursor-pointer hover:bg-amber-400"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

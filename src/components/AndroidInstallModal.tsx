import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  Check, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  Share2, 
  MoreVertical, 
  PlusSquare,
  QrCode
} from 'lucide-react';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  onInstall: () => void;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  onInstall,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Santo Terço Luminoso',
          text: 'Reze o Santo Terço com contas luminosas interativas e avanço automático!',
          url: currentUrl,
        });
      } catch {
        // Share cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-base text-amber-200">
              Como Usar no Celular Android
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm flex-1">
          {/* Quick Install CTA if supported by current browser */}
          {isInstallable && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/40 text-center space-y-2.5">
              <span className="text-xs font-serif uppercase tracking-wider text-amber-300 font-bold">
                Instalação Direta Pronta
              </span>
              <p className="text-xs text-slate-200">
                Seu navegador detectou o app! Clique abaixo para instalá-lo com 1 toque na tela inicial:
              </p>
              <button
                onClick={() => {
                  onInstall();
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-colors"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Instalar Santo Terço no Android</span>
              </button>
            </div>
          )}

          {/* Step by Step Guide for Android Chrome */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-serif">
              Passo a Passo no Google Chrome (Android)
            </h4>

            <div className="space-y-2.5">
              {/* Step 1 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="font-semibold text-slate-100 text-xs">
                    Abra este link no celular
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Acesse o endereço deste aplicativo através do <strong>Google Chrome</strong> ou navegador padrão do seu Android.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="font-semibold text-slate-100 text-xs flex items-center gap-1.5">
                    <span>Toque nos 3 pontinhos</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-700 text-amber-300 text-[11px] font-mono">⋮</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    No canto superior direito da tela do Chrome, clique no menu de opções do navegador.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="font-semibold text-slate-100 text-xs">
                    Selecione "Instalar aplicativo" ou "Adicionar à tela inicial"
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    O Android criará um ícone oficial na sua tela inicial e na lista de apps, como qualquer app baixado da Play Store.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <div className="font-semibold text-slate-100 text-xs">
                    Pronto! Abra em tela cheia
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Ao abrir pelo ícone, ele executa em tela inteira sem barras de navegação, com vibração ao rezar e funcionamento offline!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy Link / Share options */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Link para abrir no celular:</span>
              <span className="text-[10px] text-amber-400 font-mono">Compartilhar</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono truncate focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            <button
              onClick={handleShare}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Enviar Link para o WhatsApp / Celular</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs cursor-pointer transition-colors"
          >
            Entendido, fechar
          </button>
        </div>
      </div>
    </div>
  );
};

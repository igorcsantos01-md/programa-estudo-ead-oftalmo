import React, { useState } from 'react';
import { CheckCircle2, Code2, Copy, Terminal } from 'lucide-react';
import { GITHUB_MASTER_PROMPT } from '../data/certificate04Data';

export const GitHubPromptSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(GITHUB_MASTER_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="comando-github"
      className="no-print py-14 bg-[#F1F5F9] border-b border-slate-200 scroll-mt-16"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#0A1D56] font-semibold">
                <Terminal className="w-4 h-4 text-[#064E3B]" />
                <span>Documentação Técnica & Prompt Mestre · Repositório GitHub / Vercel</span>
              </div>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-slate-900 mt-1.5">
                Comando Estruturado para Repositório GitHub (Certificado Nº 04)
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Abaixo está o comando completo e estruturado com todos os
                metadados, matriz de 36 horas, chaves criptográficas e
                especificações técnicas do Certificado Nº 04 pronto para copiar.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleCopyPrompt}
                className="px-4 py-2.5 bg-[#064E3B] hover:bg-[#04392B] text-white font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Comando Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Comando Completo</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsExpanded((v) => !v)}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Code2 className="w-4 h-4" />
                <span>{isExpanded ? 'Recolher Texto' : 'Expandir Comando'}</span>
              </button>
            </div>
          </div>

          <div
            className={`mt-4 bg-slate-950 text-slate-200 rounded-lg p-4 font-mono-tabular text-xs leading-relaxed overflow-x-auto transition-all ${
              isExpanded ? 'max-h-[640px]' : 'max-h-[180px]'
            } overflow-y-auto`}
          >
            <pre className="whitespace-pre-wrap">{GITHUB_MASTER_PROMPT}</pre>
          </div>
        </div>
      </div>
    </section>
  );
};

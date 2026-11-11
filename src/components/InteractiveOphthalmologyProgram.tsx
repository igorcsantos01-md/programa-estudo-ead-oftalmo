import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  FileCheck,
  GraduationCap,
  HelpCircle,
  Microscope,
  RotateCcw,
  Stethoscope,
  XCircle,
} from 'lucide-react';
import {
  CERTIFICATE_04_DATA,
  CLINICAL_QUIZ_QUESTIONS,
  EBOOK_CHAPTERS,
  RED_EYE_DIFFERENTIAL_DATA,
  RedEyeCondition,
} from '../data/certificate04Data';

export const InteractiveOphthalmologyProgram: React.FC = () => {
  const [selectedConditionId, setSelectedConditionId] = useState<string>(
    RED_EYE_DIFFERENTIAL_DATA[0].id
  );
  const [fluorescein, setFluoresceinFilter] =
    useState<boolean>(false);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  const activeCondition: RedEyeCondition =
    RED_EYE_DIFFERENTIAL_DATA.find((c) => c.id === selectedConditionId) ||
    RED_EYE_DIFFERENTIAL_DATA[0];

  const activeChapter = EBOOK_CHAPTERS[selectedChapterIdx];

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = CLINICAL_QUIZ_QUESTIONS.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  return (
    <div className="no-print">
      {/* =====================================================================
          SECTION 1: MATRIZ PROGRAMÁTICA E EXPLICAÇÃO DO PROGRAMA EAD (36H)
      ===================================================================== */}
      <section
        id="programa-ead"
        className="py-16 bg-[#F8FAFC] border-b border-slate-200 scroll-mt-16"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200">
            <div className="max-w-3xl">
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#064E3B] font-semibold">
                Item 09 do Edital · Matriz Curricular de 36 Horas · Modalidade EAD
              </div>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-slate-900 mt-2 tracking-tight">
                Arquitetura Pedagógica e Eixos do Estudo Dirigido em Oftalmologia
              </h2>
              <p className="text-slate-600 text-base mt-3 leading-relaxed">
                Desenvolvido pela <strong>Editora Mente e Saúde</strong> com
                apoio pedagógico do{' '}
                <strong>
                  Centro Profissionalizante Maria Dalva de Araújo
                </strong>
                , o programa capacita o médico generalista na tomada de decisão
                clínica diante das queixas oftalmológicas prevalentes na Atenção
                Primária à Saúde (APS) e nas salas de emergência geral.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shrink-0 flex items-center gap-6">
              <div>
                <div className="text-xs text-slate-500">Carga Horária Total</div>
                <div className="font-mono-tabular text-2xl font-bold text-[#064E3B]">
                  36h 00min
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <div className="text-xs text-slate-500">Aproveitamento Final</div>
                <div className="font-mono-tabular text-2xl font-bold text-[#0A1D56]">
                  Nota 9,8
                </div>
              </div>
            </div>
          </div>

          {/* 4 Axes Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {CERTIFICATE_04_DATA.axes.map((axis, idx) => (
              <div
                key={axis.id}
                className="bg-white rounded-xl p-6 border border-slate-200 flex flex-col justify-between hover:border-[#064E3B]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-slate-500 pb-3 border-b border-slate-100">
                    <span className="font-bold text-[#064E3B]">
                      0{idx + 1}. {axis.id.toUpperCase()}
                    </span>
                    <span>
                      Carga Horária Parcial: <strong>{axis.hours}</strong>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0A1D56] mt-4 leading-snug">
                    {axis.titleLine1.replace(/^Eixo [I|V]+ — /, '')}{' '}
                    {axis.titleLine2 || ''}
                  </h3>

                  <div className="text-xs font-semibold text-[#0D9488] mt-1.5">
                    {axis.subtitleLine1}
                  </div>

                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {axis.descLine1} {axis.descLine2}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Metodologia: E-Book Institucional + Casos Clínicos</span>
                  <span className="font-mono-tabular text-emerald-700 font-semibold">
                    100% Concluído
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: SIMULADOR INTERATIVO DE SEMIOLOGIA E OLHO VERMELHO
          (Two-Zone Educational Sandbox Layout per Domain Reference)
      ===================================================================== */}
      <section
        id="simulador-clinico"
        className="py-16 bg-white border-b border-slate-200 scroll-mt-16"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#0A1D56] font-semibold">
              <Stethoscope className="w-4 h-4 text-[#064E3B]" />
              <span>Laboratório Clínico Interativo · Eixo II (09 Horas)</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-slate-900 mt-2 tracking-tight">
              Simulador de Diagnóstico Diferencial da Síndrome do Olho Vermelho
            </h2>
            <p className="text-slate-600 text-base mt-2 leading-relaxed">
              Selecione uma apresentação clínica abaixo para inspecionar o
              padrão biomicroscópico do segmento anterior, o reflexo pupilar, o
              teste da fluoresceína com filtro azul de cobalto e a conduta
              preconizada para o médico generalista.
            </p>
          </div>

          {/* Condition Selector Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            {RED_EYE_DIFFERENTIAL_DATA.map((cond) => {
              const isSelected = cond.id === selectedConditionId;
              return (
                <button
                  key={cond.id}
                  onClick={() => setSelectedConditionId(cond.id)}
                  className={`flex-1 min-w-[210px] text-left px-4 py-3 rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0A1D56] text-white shadow-sm'
                      : 'bg-transparent text-slate-700 hover:bg-white/70'
                  }`}
                >
                  <div className="text-xs font-mono-tabular opacity-80">
                    {cond.category}
                  </div>
                  <div className="font-bold text-sm mt-0.5 truncate">
                    {cond.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Two-Zone Sandbox: Left Visual Stage (5 cols) + Right Clinical Parameters (7 cols) */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Zone: Interactive Anterior Segment & Fluorescein Stage */}
            <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono-tabular text-emerald-400 uppercase tracking-wider">
                    Inspeção Ocular Simulada
                  </span>
                  <button
                    onClick={() => setFluoresceinFilter((f) => !f)}
                    className={`px-3 py-1 rounded text-xs font-mono-tabular transition-colors cursor-pointer ${
                      fluorescein
                        ? 'bg-sky-500 text-white font-semibold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {fluorescein
                      ? 'Filtro Azul Cobalto: ATIVO'
                      : 'Ativar Fluoresceína (Azul Cobalto)'}
                  </button>
                </div>

                {/* Interactive SVG Ocular Anterior Segment Diagram */}
                <div className="my-6 flex flex-col items-center justify-center">
                  <div
                    className={`w-64 h-64 rounded-2xl flex items-center justify-center transition-colors duration-200 border ${
                      fluorescein
                        ? 'bg-[#06183D] border-sky-500/40'
                        : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <svg
                      viewBox="0 0 220 160"
                      className="w-56 h-44"
                      aria-label={`Diagrama ocular de ${activeCondition.name}`}
                    >
                      {/* Eye Sclera Contour */}
                      <path
                        d="M 15 80 Q 110 10 205 80 Q 110 150 15 80 Z"
                        fill={
                          fluorescein
                            ? '#1E3A8A'
                            : activeCondition.id === 'glaucoma-agudo'
                            ? '#FEE2E2'
                            : '#FFF5F5'
                        }
                        stroke="#334155"
                        strokeWidth="2.5"
                      />

                      {/* Conjunctival / Ciliary Vessels */}
                      {activeCondition.id === 'conjuntivite-viral' && (
                        <g stroke="#EF4444" strokeWidth="1.4" opacity="0.75">
                          <path d="M 28 80 Q 50 65 68 72" fill="none" />
                          <path d="M 32 90 Q 55 98 70 88" fill="none" />
                          <path d="M 192 80 Q 168 65 150 72" fill="none" />
                          <path d="M 185 92 Q 165 98 148 86" fill="none" />
                        </g>
                      )}

                      {(activeCondition.id === 'ceratite-infecciosa' ||
                        activeCondition.id === 'uveite-anterior' ||
                        activeCondition.id === 'glaucoma-agudo') && (
                        <circle
                          cx="110"
                          cy="80"
                          r="43"
                          fill="none"
                          stroke="#DC2626"
                          strokeWidth={
                            activeCondition.id === 'glaucoma-agudo' ? '6' : '4'
                          }
                          opacity="0.65"
                        />
                      )}

                      {/* Iris */}
                      <circle
                        cx="110"
                        cy="80"
                        r="38"
                        fill={
                          fluorescein
                            ? '#1D4ED8'
                            : activeCondition.id === 'glaucoma-agudo'
                            ? '#64748B'
                            : '#0F766E'
                        }
                        stroke="#0F172A"
                        strokeWidth="2"
                      />

                      {/* Corneal Edema Haze for Acute Glaucoma */}
                      {activeCondition.id === 'glaucoma-agudo' && (
                        <circle
                          cx="110"
                          cy="80"
                          r="38"
                          fill="#CBD5E1"
                          opacity="0.45"
                        />
                      )}

                      {/* Pupil (Dynamic diameter based on pathology) */}
                      <circle
                        cx="110"
                        cy="80"
                        r={
                          activeCondition.id === 'uveite-anterior'
                            ? 9
                            : activeCondition.id === 'glaucoma-agudo'
                            ? 22
                            : 14
                        }
                        fill="#020617"
                      />

                      {/* Corneal Ulcer / Fluorescein Staining in Infectious Keratitis */}
                      {activeCondition.id === 'ceratite-infecciosa' && (
                        <g>
                          <ellipse
                            cx="124"
                            cy="74"
                            rx="9"
                            ry="7"
                            fill={fluorescein ? '#4ADE80' : '#F8FAFC'}
                            opacity="0.92"
                          />
                          {/* Hypopyon level at bottom of anterior chamber */}
                          <path
                            d="M 85 106 Q 110 116 135 106 Q 110 118 85 106 Z"
                            fill="#FEF08A"
                          />
                        </g>
                      )}

                      {/* Specular Light Reflex */}
                      <circle
                        cx="98"
                        cy="68"
                        r="4"
                        fill="#FFFFFF"
                        opacity="0.9"
                      />
                    </svg>
                  </div>

                  <div className="mt-3 text-center">
                    <div className="text-sm font-bold text-white">
                      {activeCondition.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {fluorescein
                        ? activeCondition.id === 'ceratite-infecciosa'
                          ? 'Fluoresceína POSITIVA: impregnação verde brilhante no defeito epitelial corneano'
                          : 'Fluoresceína NEGATIVA: ausência de úlcera epitelial corneana'
                        : 'Iluminação difusa branca — clique no botão superior para testar fluoresceína'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Red Flags Box inside Left Stage */}
              <div className="bg-slate-900/90 rounded-lg p-4 border border-slate-800">
                <div className="text-xs font-mono-tabular uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Sinais de Alarme Semiológicos (Red Flags)</span>
                </div>
                <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300">
                  {activeCondition.redFlags.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">·</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Zone: Semiological Comparison Table & Conduct */}
            <div className="lg:col-span-7 bg-[#F8FAFC] rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-mono-tabular text-slate-500 uppercase">
                      Classificação de Risco Clínico
                    </span>
                    <h3 className="text-xl font-bold text-[#0A1D56]">
                      {activeCondition.name}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-mono-tabular font-bold px-3 py-1.5 rounded border ${
                      activeCondition.category.includes('Emergência')
                        ? 'bg-red-50 text-red-800 border-red-200'
                        : activeCondition.category.includes('Urgência')
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {activeCondition.category}
                  </span>
                </div>

                {/* Semiological Parameters Grid */}
                <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                    <dt className="text-xs font-semibold text-slate-500 uppercase">
                      Acuidade Visual (Snellen)
                    </dt>
                    <dd className="text-sm font-medium text-slate-900 mt-1">
                      {activeCondition.acuity}
                    </dd>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                    <dt className="text-xs font-semibold text-slate-500 uppercase">
                      Dor Ocular e Fotofobia
                    </dt>
                    <dd className="text-sm font-medium text-slate-900 mt-1">
                      {activeCondition.pain}
                    </dd>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                    <dt className="text-xs font-semibold text-slate-500 uppercase">
                      Padrão de Hiperemia
                    </dt>
                    <dd className="text-sm font-medium text-slate-900 mt-1">
                      {activeCondition.hyperemia}
                    </dd>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                    <dt className="text-xs font-semibold text-slate-500 uppercase">
                      Pupila e Reflexo Fotomotor
                    </dt>
                    <dd className="text-sm font-medium text-slate-900 mt-1">
                      {activeCondition.pupil}
                    </dd>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                    <dt className="text-xs font-semibold text-slate-500 uppercase">
                      Teste da Fluoresceína
                    </dt>
                    <dd className="text-sm font-medium text-slate-900 mt-1">
                      {activeCondition.fluorescein}
                    </dd>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                    <dt className="text-xs font-semibold text-slate-500 uppercase">
                      Pressão Intraocular (PIO)
                    </dt>
                    <dd className="text-sm font-medium text-slate-900 mt-1">
                      {activeCondition.iop}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Recommended General Practitioner Conduct */}
              <div className="mt-6 bg-white p-5 rounded-lg border border-[#064E3B]/30">
                <div className="text-xs font-mono-tabular uppercase tracking-wider font-bold text-[#064E3B]">
                  Conduta Preconizada para o Médico Generalista
                </div>
                <p className="text-sm text-slate-800 mt-1.5 leading-relaxed">
                  {activeCondition.clinicalConduct}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: REPOSITÓRIO DO E-BOOK HOMÔNIMO E ESTUDO DIRIGIDO
      ===================================================================== */}
      <section
        id="ebook-estudo-dirigido"
        className="py-16 bg-[#F8FAFC] border-b border-slate-200 scroll-mt-16"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#064E3B] font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>Literatura Base Oficial · Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-slate-900 mt-2 tracking-tight">
              E-Book Base: "Princípios Teóricos da Oftalmologia para o Médico Generalista"
            </h2>
            <p className="text-slate-600 text-base mt-2 leading-relaxed">
              Navegue pelos capítulos estruturantes da obra utilizada no ciclo
              de estudo dirigido EAD e revise as sínteses fisiopatológicas e
              pérolas clínicas exigidas na avaliação certificadora.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Chapter Navigation List (4 Cols) */}
            <div className="lg:col-span-4 space-y-2.5">
              {EBOOK_CHAPTERS.map((chap, idx) => {
                const active = idx === selectedChapterIdx;
                return (
                  <button
                    key={chap.number}
                    onClick={() => setSelectedChapterIdx(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      active
                        ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-sm'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tabular opacity-80">
                      <span>{chap.number}</span>
                      <span>
                        {chap.axis} · {chap.pages}
                      </span>
                    </div>
                    <div className="font-bold text-sm mt-1 leading-snug">
                      {chap.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Chapter Content Reader (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-xl p-6 sm:p-8 border border-slate-200">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-slate-500 pb-4 border-b border-slate-100">
                <span className="font-bold text-[#064E3B]">
                  {activeChapter.number}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeChapter.axis}</span>
                <span aria-hidden="true">·</span>
                <span>Paginação no E-Book: {activeChapter.pages}</span>
                <span aria-hidden="true">·</span>
                <span>{activeChapter.readingTime}</span>
              </div>

              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#0A1D56] mt-4">
                {activeChapter.title}
              </h3>

              <p className="text-slate-700 text-base mt-3 leading-relaxed">
                {activeChapter.summary}
              </p>

              <div className="mt-6">
                <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-slate-500 font-bold">
                  Pontos-Chave do Estudo Dirigido
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {activeChapter.keyTakeaways.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-[#FFFAEB] border border-amber-200">
                <div className="text-xs font-mono-tabular font-bold uppercase text-[#92400E]">
                  Pérola Clínica para Atenção Primária e Plantão Geral
                </div>
                <p className="text-sm text-amber-950 mt-1 leading-relaxed">
                  {activeChapter.clinicalPearl}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: QUESTIONÁRIO CLÍNICO AVALIATIVO ONLINE (SIMULADOR EIXO IV)
      ===================================================================== */}
      <section
        id="questionario-clinico"
        className="py-16 bg-white border-b border-slate-200 scroll-mt-16"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="max-w-3xl">
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#064E3B] font-semibold">
                Eixo IV · Avaliação Somativa Certificadora · Casos Clínicos Comentados
              </div>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-slate-900 mt-2 tracking-tight">
                Questionário Clínico Interativo de Oftalmologia para o Generalista
              </h2>
              <p className="text-slate-600 text-base mt-2">
                Teste os conhecimentos abordados no programa de extensão
                resolvendo 4 casos clínicos extraídos do banco avaliativo
                oficial da Editora Mente e Saúde.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-xs font-mono-tabular bg-slate-100 px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700">
                Respondidas: <strong>{answeredCount}/4</strong> · Acertos:{' '}
                <strong className="text-[#064E3B]">{correctCount}/4</strong>
              </div>
              {answeredCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setShowQuizResults(false);
                  }}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {CLINICAL_QUIZ_QUESTIONS.map((q, qIdx) => {
              const userChoice = selectedAnswers[q.id];
              const isAnswered = userChoice !== undefined;
              const isCorrect = userChoice === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="bg-[#F8FAFC] rounded-xl p-6 border border-slate-200"
                >
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-slate-500">
                    <span className="font-bold text-[#0A1D56]">
                      CASO CLÍNICO 0{qIdx + 1}
                    </span>
                    <span>{q.axisReference}</span>
                  </div>

                  <p className="text-sm text-slate-700 mt-3 leading-relaxed bg-white p-4 rounded-lg border border-slate-200">
                    {q.vignette}
                  </p>

                  <h3 className="font-bold text-slate-900 text-base mt-4">
                    {q.question}
                  </h3>

                  <div className="mt-3 space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const chosen = userChoice === optIdx;
                      const isRightOption = optIdx === q.correctIndex;

                      let btnStyle =
                        'bg-white border-slate-200 text-slate-800 hover:border-slate-400';
                      if (isAnswered) {
                        if (isRightOption) {
                          btnStyle =
                            'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium';
                        } else if (chosen && !isRightOption) {
                          btnStyle =
                            'bg-red-50 border-red-400 text-red-900';
                        } else {
                          btnStyle =
                            'bg-white border-slate-200 text-slate-500 opacity-75';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full text-left p-3.5 rounded-lg border text-sm transition-colors flex items-start gap-3 cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-mono-tabular font-bold text-xs mt-0.5 shrink-0">
                            {String.fromCharCode(65 + optIdx)})
                          </span>
                          <span className="flex-1">{opt}</span>
                          {isAnswered && isRightOption && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          {isAnswered && chosen && !isRightOption && (
                            <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div
                      className={`mt-4 p-4 rounded-lg border text-xs leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                          : 'bg-amber-50 border-amber-200 text-amber-950'
                      }`}
                    >
                      <strong className="block mb-1 font-mono-tabular uppercase">
                        {isCorrect
                          ? 'Resposta Correta — Comentário Docente:'
                          : 'Comentário Docente e Gabarito Oficial:'}
                      </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

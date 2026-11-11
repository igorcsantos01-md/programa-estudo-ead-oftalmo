/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Download,
  Eye,
  FileCheck2,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import {
  CertificateDocumentViewer,
  CertificatePagesMarkup,
} from './components/CertificateDocumentViewer';
import { GitHubPromptSection } from './components/GitHubPromptSection';
import { InteractiveOphthalmologyProgram } from './components/InteractiveOphthalmologyProgram';
import { PublicAuthenticatorSection } from './components/PublicAuthenticatorSection';
import {
  LOGO_CENTRO_DATA_URL,
  LOGO_EMS_DATA_URL,
} from './data/certAssets';
import { CERTIFICATE_04_DATA } from './data/certificate04Data';
import {
  downloadOfficialCertificatePdf,
  generateQrCodeDataUrl,
} from './utils/generateCertificatePdf';

export default function App() {
  const [baseOriginUrl, setBaseOriginUrl] = useState<string>(
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://extensao-oftalmologia-1.vercel.app'
  );
  const [initialQueryCode, setInitialQueryCode] = useState<string | undefined>(
    undefined
  );
  const [printQrDataUrl, setPrintQrDataUrl] = useState<string>('');
  const [isDownloadingHero, setIsDownloadingHero] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      setBaseOriginUrl(origin);

      const params = new URLSearchParams(window.location.search);
      const codParam = params.get('codigo') || params.get('chave');
      if (codParam) {
        setInitialQueryCode(codParam);
      }

      if (codParam || window.location.hash === '#validador') {
        setTimeout(() => {
          const el = document.getElementById('validador');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 250);
      }
    }
  }, []);

  useEffect(() => {
    const cleanOrigin = baseOriginUrl.replace(/\/+$/, '');
    const fullVerifyUrl = `${cleanOrigin}/?codigo=${CERTIFICATE_04_DATA.code}#validador`;
    generateQrCodeDataUrl(fullVerifyUrl)
      .then(setPrintQrDataUrl)
      .catch(console.error);
  }, [baseOriginUrl]);

  const handleHeroDownloadPdf = async () => {
    setIsDownloadingHero(true);
    try {
      await downloadOfficialCertificatePdf(baseOriginUrl, CERTIFICATE_04_DATA);
    } finally {
      setIsDownloadingHero(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* =====================================================================
          PRINT-ONLY CONTAINER (Renders Exclusively When Printing A4 Landscape)
      ===================================================================== */}
      <CertificatePagesMarkup
        data={CERTIFICATE_04_DATA}
        qrDataUrl={printQrDataUrl}
        baseOriginUrl={baseOriginUrl}
        isPrintMode={true}
      />

      {/* =====================================================================
          TOP NAVIGATION BAR (Strict 3-Zone Contract)
      ===================================================================== */}
      <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#"
            className="font-serif-editorial text-xl font-bold tracking-tight text-[#064E3B] whitespace-nowrap shrink-0"
          >
            Editora Mente e Saúde
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              href="#programa-ead"
              className="hover:text-[#064E3B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Programa 36h
            </a>
            <a
              href="#simulador-clinico"
              className="hover:text-[#064E3B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Simulador Clínico
            </a>
            <a
              href="#ebook-estudo-dirigido"
              className="hover:text-[#064E3B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              E-Book Base
            </a>
            <a
              href="#validador"
              className="hover:text-[#064E3B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Validador Oficial
            </a>
            <a
              href="#certificado-oficial"
              className="hover:text-[#064E3B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Certificado PDF
            </a>
          </nav>

          {/* Zone 3: 1 Primary CTA Button */}
          <div className="flex items-center shrink-0">
            <button
              onClick={handleHeroDownloadPdf}
              disabled={isDownloadingHero}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#064E3B] hover:bg-[#04392B] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
            >
              {isDownloadingHero
                ? 'Gerando PDF...'
                : 'Baixar Certificado PDF'}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          HERO SECTION & INSTITUTIONAL CREDENTIALS
      ===================================================================== */}
      <section className="no-print bg-[#0B1F3A] text-white border-b border-slate-800">
        {/* Operational Utility Ribbon */}
        <div className="bg-[#061427] border-b border-slate-800/80 py-2.5 px-4 sm:px-8">
          <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 font-mono-tabular">
            <div>
              <span>Certificado Nº 04</span>
              <span aria-hidden="true"> · </span>
              <span>Livro de Extensão nº 01/2024 (Folha 24)</span>
              <span aria-hidden="true"> · </span>
              <span className="text-emerald-400 font-semibold">
                Cód. {CERTIFICATE_04_DATA.code}
              </span>
            </div>
            <div>
              <span>Item 09 do Edital (Mínimo 30h)</span>
              <span aria-hidden="true"> · </span>
              <span>Carga Horária: 36 Horas</span>
              <span aria-hidden="true"> · </span>
              <span className="text-amber-300">Fé Pública Digital Ativa</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Hero Split */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left 7 Columns: Editorial Program Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-emerald-400">
                Programa Interinstitucional de Extensão, Comunicação Científica e Educação em Saúde
              </div>

              <h1
                className="font-serif-editorial text-3xl sm:text-5xl font-bold text-white mt-3 leading-[1.12] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Programa de Extensão e Estudo Dirigido EAD: Princípios Teóricos da Oftalmologia para o Médico Generalista
              </h1>

              <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl">
                Ciclo de atualização teórica e prática clínica baseada nos
                capítulos do e-book homônimo da{' '}
                <strong className="text-white">Editora Mente e Saúde</strong> em
                parceria com o{' '}
                <strong className="text-white">
                  Centro Profissionalizante Maria Dalva de Araújo
                </strong>
                , somado à resolução comentada de questionários clínicos
                avaliativos online.
              </p>
            </div>

            {/* Primary Hero Actions */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-3.5">
              <button
                onClick={handleHeroDownloadPdf}
                disabled={isDownloadingHero}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg shadow-lg transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isDownloadingHero
                    ? 'Gerando PDF de 2 Laudas...'
                    : 'Baixar Certificado Nº 04 (.PDF Acessível)'}
                </span>
              </button>

              <a
                href="#certificado-oficial"
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm rounded-lg border border-slate-700 transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Ver Certificado no Site (2 Laudas)</span>
              </a>

              <a
                href="#validador"
                className="px-4 py-3 bg-transparent hover:bg-slate-800/60 text-slate-200 font-medium text-sm rounded-lg border border-slate-700 transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Autenticador Público</span>
              </a>
            </div>
          </div>

          {/* Right 5 Columns: Certified Holder Dossier Card */}
          <div className="lg:col-span-5 bg-[#0F294A] rounded-xl p-6 sm:p-7 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-700/80">
                <div className="flex items-center gap-3">
                  <img
                    src={LOGO_EMS_DATA_URL}
                    alt="Logo Editora Mente e Saúde"
                    className="w-11 h-11 object-contain bg-white rounded-lg p-1"
                  />
                  <img
                    src={LOGO_CENTRO_DATA_URL}
                    alt="Logo Centro Profissionalizante"
                    className="w-11 h-11 object-contain bg-white rounded-lg p-1"
                  />
                </div>
                <div className="text-right font-mono-tabular">
                  <div className="text-[11px] text-emerald-400 uppercase font-bold">
                    Registro Verificado
                  </div>
                  <div className="text-xs text-white font-bold">
                    {CERTIFICATE_04_DATA.code}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs font-mono-tabular uppercase tracking-wider text-slate-400">
                  Titular do Certificado Nº 04
                </div>
                <div className="font-serif-editorial text-2xl font-bold text-white mt-1">
                  {CERTIFICATE_04_DATA.holderName}
                </div>
                <div className="text-xs text-slate-300 font-mono-tabular mt-1">
                  {CERTIFICATE_04_DATA.holderRole} · CPF:{' '}
                  {CERTIFICATE_04_DATA.holderCpf}
                </div>
                <div className="text-xs text-emerald-300 mt-0.5">
                  {CERTIFICATE_04_DATA.holderInstitution}
                </div>
              </div>

              <dl className="mt-5 pt-4 border-t border-slate-700/80 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <dt className="text-slate-400">Período de Realização</dt>
                  <dd className="text-white font-semibold mt-0.5">
                    05/02/2024 a 15/03/2024
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Carga Horária & Conceito</dt>
                  <dd className="text-emerald-400 font-mono-tabular font-bold mt-0.5">
                    36 Horas · Nota 9,8 (Aprovado)
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Chave de Controle</dt>
                  <dd className="text-amber-300 font-mono-tabular font-semibold mt-0.5">
                    {CERTIFICATE_04_DATA.controlKey}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Emissão Oficial</dt>
                  <dd className="text-white font-semibold mt-0.5">
                    Goiânia - GO, 22/03/2024
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-300">
              <span>Editora Mente e Saúde · Centro Maria Dalva de Araújo</span>
              <button
                onClick={() => window.print()}
                className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir 2 Laudas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Institutional Metric Strip Below Hero Split */}
        <div className="bg-[#08172C] border-t border-slate-800/80 py-5 px-4 sm:px-8">
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div>
              <div className="text-slate-400 uppercase font-mono-tabular">
                Entidade Emissora Editorial
              </div>
              <div className="text-white font-bold text-sm mt-0.5">
                Editora Mente e Saúde
              </div>
              <div className="text-slate-400 font-mono-tabular mt-0.5">
                CNPJ: 51.372.335/0001-71
              </div>
            </div>

            <div>
              <div className="text-slate-400 uppercase font-mono-tabular">
                Entidade Certificadora Parceira
              </div>
              <div className="text-white font-bold text-sm mt-0.5">
                Centro Prof. Maria Dalva de Araújo
              </div>
              <div className="text-slate-400 font-mono-tabular mt-0.5">
                CNPJ: 51.269.112/0001-83
              </div>
            </div>

            <div>
              <div className="text-slate-400 uppercase font-mono-tabular">
                Enquadramento Edital (Item 09)
              </div>
              <div className="text-white font-bold text-sm mt-0.5">
                Atividades Extracurriculares (≥ 30h)
              </div>
              <div className="text-emerald-400 font-mono-tabular mt-0.5">
                Curso de Extensão EAD · 36 Horas
              </div>
            </div>

            <div>
              <div className="text-slate-400 uppercase font-mono-tabular">
                Verificação Criptográfica
              </div>
              <div className="text-white font-bold text-sm mt-0.5 font-mono-tabular">
                {CERTIFICATE_04_DATA.code}
              </div>
              <div className="text-amber-300 font-mono-tabular mt-0.5 truncate">
                SHA-256: ...{CERTIFICATE_04_DATA.sha256.slice(-16)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MAIN CONTENT SECTIONS
      ===================================================================== */}
      <main className="flex-1">
        {/* 1. Accessible 2-Lauda PDF Certificate Viewer & Downloader */}
        <CertificateDocumentViewer
          baseOriginUrl={baseOriginUrl}
          data={CERTIFICATE_04_DATA}
        />

        {/* 2. Official Public Verification System (#validador) */}
        <PublicAuthenticatorSection
          baseOriginUrl={baseOriginUrl}
          data={CERTIFICATE_04_DATA}
          initialQueryCode={initialQueryCode}
        />

        {/* 3. Interactive Ophthalmology Extension Program & Study Guide */}
        <InteractiveOphthalmologyProgram />

        {/* 4. GitHub Repository Command / Master Prompt */}
        <GitHubPromptSection />
      </main>

      {/* =====================================================================
          INSTITUTIONAL FOOTER
      ===================================================================== */}
      <footer className="no-print bg-[#0B1F3A] text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">
              Programa Interinstitucional de Extensão, Comunicação Científica e
              Educação em Saúde
            </div>
            <div>
              Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) · Centro
              Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
            </div>
            <div className="font-mono-tabular text-slate-400">
              Certificado Nº 04 · Código: {CERTIFICATE_04_DATA.code} · Chave:{' '}
              {CERTIFICATE_04_DATA.controlKey}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#certificado-oficial"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Certificado 2 Laudas
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="#validador"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Validador Oficial
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="#programa-ead"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Matriz 36 Horas
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="#comando-github"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Comando GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

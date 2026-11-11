import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  FileCheck,
  KeyRound,
  QrCode,
  RefreshCw,
  Search,
  ShieldCheck,
} from 'lucide-react';
import {
  LOGO_CENTRO_DATA_URL,
  LOGO_EMS_DATA_URL,
} from '../data/certAssets';
import { CERTIFICATE_04_DATA, CertificateData } from '../data/certificate04Data';
import {
  downloadOfficialCertificatePdf,
  generateQrCodeDataUrl,
} from '../utils/generateCertificatePdf';

interface PublicAuthenticatorSectionProps {
  baseOriginUrl: string;
  data?: CertificateData;
  initialQueryCode?: string;
}

export const PublicAuthenticatorSection: React.FC<
  PublicAuthenticatorSectionProps
> = ({ baseOriginUrl, data = CERTIFICATE_04_DATA, initialQueryCode }) => {
  const [inputValue, setInputValue] = useState<string>(
    initialQueryCode || data.code
  );
  const [verifiedStatus, setVerifiedStatus] = useState<
    'valid' | 'invalid' | 'idle'
  >('valid');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const cleanOrigin = baseOriginUrl.replace(/\/+$/, '');
  const fullVerifyUrl = `${cleanOrigin}/?codigo=${data.code}#validador`;

  useEffect(() => {
    generateQrCodeDataUrl(fullVerifyUrl)
      .then(setQrDataUrl)
      .catch(console.error);
  }, [fullVerifyUrl]);

  const validateCode = (rawInput: string) => {
    const normalized = rawInput.trim().toUpperCase();
    if (!normalized) {
      setVerifiedStatus('idle');
      return;
    }
    if (
      normalized === data.code.toUpperCase() ||
      normalized === data.controlKey.toUpperCase() ||
      normalized === data.sha256.toUpperCase() ||
      normalized === '0904'
    ) {
      setVerifiedStatus('valid');
    } else {
      setVerifiedStatus('invalid');
    }
  };

  useEffect(() => {
    if (initialQueryCode) {
      setInputValue(initialQueryCode);
      validateCode(initialQueryCode);
    }
  }, [initialQueryCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateCode(inputValue);
  };

  const handleResetToOfficial = () => {
    setInputValue(data.code);
    setVerifiedStatus('valid');
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(data.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      await downloadOfficialCertificatePdf(baseOriginUrl, data);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section
      id="validador"
      className="no-print py-16 bg-white border-b border-slate-200 scroll-mt-16"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-widest text-[#064E3B] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Sistema Oficial de Verificação Pública · Fé Pública Digital</span>
            <span aria-hidden="true">·</span>
            <span>Lei nº 9.394/96</span>
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-slate-900 mt-2 tracking-tight">
            Validador Eletrônico de Autenticidade e Registro Curricular
          </h2>
          <p className="text-slate-600 text-base mt-2 leading-relaxed">
            Consulte a veracidade documental informando o{' '}
            <strong>Código de Autenticidade</strong>, a{' '}
            <strong>Chave de Controle</strong> ou o{' '}
            <strong>Hash Criptográfico SHA-256</strong> impresso nas Laudas 1 e
            2 do certificado. O sistema preenche e valida automaticamente o
            registro quando acessado via leitura de QR Code.
          </p>
        </div>

        {/* Search & Verification Bar */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-[#F8FAFC] p-4 sm:p-6 rounded-xl border border-slate-200"
        >
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Informe o Código (EMS-EXT-2024-0904) ou Chave (0904-7027-9457-8F4A)"
                aria-label="Código de Autenticidade ou Chave de Controle"
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-lg font-mono-tabular text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#064E3B] hover:bg-[#04392B] text-white font-semibold text-sm rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verificar Autenticidade</span>
            </button>
            <button
              type="button"
              onClick={handleResetToOfficial}
              className="px-4 py-3 bg-white hover:bg-slate-100 text-slate-700 font-medium text-sm rounded-lg border border-slate-300 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              title="Restaurar código padrão do Certificado Nº 04"
            >
              <RefreshCw className="w-4 h-4 text-slate-500" />
              <span>Código Nº 04</span>
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono-tabular">
            <span>Código Oficial: {data.code}</span>
            <span aria-hidden="true">·</span>
            <span>Chave de Controle: {data.controlKey}</span>
            <span aria-hidden="true">·</span>
            <span>Parâmetro URL ativo: ?codigo={data.code}#validador</span>
          </div>
        </form>

        {/* Verification Result Display */}
        {verifiedStatus === 'valid' && (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-[#F4FBF7] overflow-hidden shadow-sm">
            {/* Top Status Banner */}
            <div className="bg-[#064E3B] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0" />
                <div>
                  <div className="font-bold text-sm sm:text-base tracking-wide uppercase">
                    Certificado Autêntico e Válido — Fé Pública Confirmada
                  </div>
                  <div className="text-xs text-emerald-200 font-mono-tabular mt-0.5">
                    Averbação Ativa · Livro de Extensão nº {data.bookNumber} ·
                    Folha {data.pageNumber} · Registro Nº {data.certNumber}
                  </div>
                </div>
              </div>
              <div className="text-xs font-mono-tabular text-emerald-100 bg-emerald-900/60 px-3 py-1.5 rounded border border-emerald-700 whitespace-nowrap self-start sm:self-auto">
                SITUAÇÃO: {data.approvalStatus} (NOTA {data.finalGrade})
              </div>
            </div>

            {/* Detailed Certificate Metadata Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 8 Columns: Holder, Course, Institutions & Hash */}
              <div className="lg:col-span-8 space-y-6">
                {/* Holder & Activity Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded-lg border border-emerald-100">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Profissional Titular Certificado
                    </div>
                    <div className="text-lg font-bold text-[#0A1D56] mt-1">
                      {data.holderName}
                    </div>
                    <div className="text-xs text-slate-600 font-mono-tabular mt-1">
                      {data.holderRole} · CPF: {data.holderCpf}
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      IES: {data.holderInstitution}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      Enquadramento Edital (Item 09)
                    </div>
                    <div className="text-sm font-bold text-[#064E3B] mt-1">
                      {data.modality} · Carga Horária: {data.totalHoursWritten}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      Período: {data.period}
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Emissão: {data.issueDate}
                    </div>
                  </div>
                </div>

                {/* Title & Scope */}
                <div className="bg-white p-5 rounded-lg border border-emerald-100">
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Título Oficial da Atividade Extracurricular Certificada
                  </div>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    "{data.activityTitle}"
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Formação complementar realizada em parceria institucional
                    entre a <strong>Editora Mente e Saúde</strong> (CNPJ:
                    51.372.335/0001-71) e o{' '}
                    <strong>
                      Centro Profissionalizante Maria Dalva de Araújo
                    </strong>{' '}
                    (CNPJ: 51.269.112/0001-83), atendendo integralmente ao
                    requisito mínimo de 30 horas por certificado previsto no
                    Item 09 (Atividades Extracurriculares).
                  </p>
                </div>

                {/* Cryptographic Verification Keys */}
                <div className="bg-white p-5 rounded-lg border border-emerald-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Chaves Criptográficas e Rastreabilidade</span>
                    </span>
                    <button
                      onClick={handleCopyHash}
                      className="text-xs font-mono-tabular text-[#064E3B] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>
                        {copiedHash ? 'Hash Copiado!' : 'Copiar SHA-256'}
                      </span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-tabular">
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                      <span className="text-slate-500 block text-[10px]">
                        CÓDIGO DE AUTENTICIDADE:
                      </span>
                      <strong className="text-[#064E3B] text-sm">
                        {data.code}
                      </strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                      <span className="text-slate-500 block text-[10px]">
                        CHAVE DE CONTROLE / DÍGITO:
                      </span>
                      <strong className="text-[#92400E] text-sm">
                        {data.controlKey}
                      </strong>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200 font-mono-tabular text-xs break-all">
                    <span className="text-slate-500 block text-[10px]">
                      HASH DOCUMENTAL SHA-256:
                    </span>
                    <span className="text-slate-800 font-medium">
                      {data.sha256}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 4 Columns: Institutional Seals, QR Code & Direct Actions */}
              <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-emerald-100 flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <img
                    src={LOGO_EMS_DATA_URL}
                    alt="Logo Editora Mente e Saúde"
                    className="w-12 h-12 object-contain"
                  />
                  <img
                    src={LOGO_CENTRO_DATA_URL}
                    alt="Logo Centro Profissionalizante Maria Dalva de Araújo"
                    className="w-12 h-12 object-contain"
                  />
                </div>

                <div className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">
                  QR Code Oficial de Validação
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Aponte a câmera do celular para validar instantaneamente
                </p>

                <div className="my-4 p-3 bg-white border-2 border-[#064E3B] rounded-lg shadow-sm">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="QR Code Oficial"
                      className="w-36 h-36 object-contain"
                    />
                  ) : (
                    <div className="w-36 h-36 flex items-center justify-center text-xs text-slate-400">
                      <QrCode className="w-8 h-8 animate-spin" />
                    </div>
                  )}
                </div>

                <div className="w-full space-y-2.5 mt-2">
                  <button
                    onClick={handleDownloadPdf}
                    disabled={isDownloading}
                    className="w-full py-2.5 px-4 bg-[#064E3B] hover:bg-[#04392B] text-white font-semibold text-xs rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>
                      {isDownloading
                        ? 'Gerando PDF (2 Laudas)...'
                        : 'Baixar PDF Oficial (2 Laudas)'}
                    </span>
                  </button>

                  <a
                    href="#certificado-oficial"
                    className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4 text-[#0A1D56]" />
                    <span>Inspecionar Frente e Verso na Tela</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {verifiedStatus === 'invalid' && (
          <div className="mt-6 p-6 rounded-xl border border-amber-300 bg-amber-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-950 text-base">
                  Código ou Chave Não Localizado na Base Desta Atividade
                </h3>
                <p className="text-xs text-amber-900 mt-1">
                  O código informado (
                  <code className="font-mono-tabular font-bold">
                    {inputValue}
                  </code>
                  ) não corresponde ao Certificado Nº 04. Para consultar o
                  certificado titular deste repositório, utilize o código{' '}
                  <strong className="font-mono-tabular">{data.code}</strong> ou
                  a chave{' '}
                  <strong className="font-mono-tabular">
                    {data.controlKey}
                  </strong>
                  .
                </p>
              </div>
            </div>
            <button
              onClick={handleResetToOfficial}
              className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              Validar {data.code}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  Layers,
  Printer,
  QrCode,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  LOGO_CENTRO_DATA_URL,
  LOGO_EMS_DATA_URL,
  SIG_BARBARA_DATA_URL,
  SIG_JAMES_DATA_URL,
} from '../data/certAssets';
import { CERTIFICATE_04_DATA, CertificateData } from '../data/certificate04Data';
import {
  createOfficialCertificateBlobUrl,
  downloadOfficialCertificatePdf,
  generateQrCodeDataUrl,
} from '../utils/generateCertificatePdf';

interface CertificateDocumentViewerProps {
  baseOriginUrl: string;
  data?: CertificateData;
}

export const CertificatePagesMarkup: React.FC<{
  data: CertificateData;
  qrDataUrl: string;
  baseOriginUrl: string;
  pageFilter?: 'both' | 'page1' | 'page2';
  isPrintMode?: boolean;
}> = ({
  data,
  qrDataUrl,
  baseOriginUrl,
  pageFilter = 'both',
  isPrintMode = false,
}) => {
  const cleanOrigin = baseOriginUrl.replace(/\/+$/, '');
  const fullVerifyUrl = `${cleanOrigin}/?codigo=${data.code}#validador`;
  const shortSiteUrl = `${cleanOrigin}/`;

  return (
    <div
      className={
        isPrintMode
          ? 'print-only-container hidden'
          : 'flex flex-col items-center gap-8'
      }
    >
      {/* ===================================================================
          LAUDA 1 — FRENTE DO CERTIFICADO (Exact 297mm x 210mm proportion)
      =================================================================== */}
      {(pageFilter === 'both' || pageFilter === 'page1' || isPrintMode) && (
        <article
          aria-label={`Certificado Oficial Nº ${data.certNumber} - Frente`}
          className="cert-a4-page relative bg-[#FFFDFA] text-[#0F172A] shadow-2xl select-text overflow-hidden shrink-0"
          style={{
            width: '297mm',
            height: '210mm',
            boxSizing: 'border-box',
          }}
        >
          {/* Outer Emerald Border (5mm inset) */}
          <div
            className="pointer-events-none absolute"
            style={{
              left: '5mm',
              top: '5mm',
              width: '287mm',
              height: '200mm',
              border: '0.8mm solid #064E3B',
            }}
          />
          {/* Middle Gold Border (6.8mm inset) */}
          <div
            className="pointer-events-none absolute"
            style={{
              left: '6.8mm',
              top: '6.8mm',
              width: '283.4mm',
              height: '196.4mm',
              border: '0.35mm solid #D97706',
            }}
          />
          {/* Inner Navy Border (8.2mm inset) */}
          <div
            className="pointer-events-none absolute"
            style={{
              left: '8.2mm',
              top: '8.2mm',
              width: '280.6mm',
              height: '193.6mm',
              border: '0.5mm solid #0A1D56',
            }}
          />

          {/* Tripartite Institutional Header */}
          <div
            className="absolute flex items-center justify-between"
            style={{
              left: '14mm',
              top: '11.5mm',
              width: '269mm',
              height: '21.5mm',
            }}
          >
            {/* Left Block: Editora Mente e Saúde */}
            <div className="flex items-center gap-[3mm] w-[82mm]">
              <img
                src={LOGO_EMS_DATA_URL}
                alt="Logotipo Editora Mente e Saúde"
                className="w-[20mm] h-[20mm] object-contain shrink-0"
              />
              <div className="leading-tight">
                <div className="font-bold text-[#064E3B] text-[8.5pt] tracking-tight">
                  EDITORA MENTE E SAÚDE
                </div>
                <div className="font-mono-tabular font-bold text-[#0F172A] text-[7.5pt] mt-[1mm]">
                  CNPJ: 51.372.335/0001-71
                </div>
                <div className="text-[#0D9488] text-[7pt] mt-[0.8mm]">
                  Conselho Editorial e Extensão Científica
                </div>
              </div>
            </div>

            {/* Center Block: Programa Interinstitucional */}
            <div className="text-center flex-1 px-[2mm]">
              <div className="font-bold text-[#064E3B] text-[8.5pt] leading-[1.25]">
                PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA
                <br />E EDUCAÇÃO EM SAÚDE
              </div>
              <div className="font-mono-tabular font-bold text-[#0A1D56] text-[7.4pt] mt-[1.5mm]">
                Certificado Nº {data.certNumber} · Livro de Extensão nº{' '}
                {data.bookNumber} · Cód. {data.code}
              </div>
            </div>

            {/* Right Block: Centro Profissionalizante Maria Dalva de Araújo */}
            <div className="flex items-center justify-end gap-[3mm] w-[82mm] text-right">
              <div className="leading-tight">
                <div className="font-bold text-[#0A1D56] text-[8.5pt] tracking-tight">
                  CENTRO PROFISSIONALIZANTE
                  <br />
                  MARIA DALVA DE ARAÚJO
                </div>
                <div className="font-mono-tabular font-bold text-[#0F172A] text-[7.5pt] mt-[1mm]">
                  CNPJ: 51.269.112/0001-83
                </div>
              </div>
              <img
                src={LOGO_CENTRO_DATA_URL}
                alt="Logotipo Centro Profissionalizante Maria Dalva de Araújo"
                className="w-[20mm] h-[20mm] object-contain shrink-0"
              />
            </div>
          </div>

          {/* Header Divider Line */}
          <div
            className="absolute bg-[#064E3B]"
            style={{
              left: '14mm',
              top: '35mm',
              width: '269mm',
              height: '0.3mm',
            }}
          />

          {/* Main Title */}
          <div
            className="absolute left-0 right-0 text-center"
            style={{ top: '38.5mm' }}
          >
            <h1
              className="font-bold text-[#064E3B] tracking-wide uppercase"
              style={{
                fontFamily: "'Times New Roman', Georgia, serif",
                fontSize: '23.5pt',
                lineHeight: 1.1,
              }}
            >
              {data.mainTitle}
            </h1>
            <div
              className="mx-auto bg-[#D97706]"
              style={{
                width: '107mm',
                height: '0.5mm',
                marginTop: '2mm',
              }}
            />
          </div>

          {/* Institutional Opening Statement */}
          <p
            className="absolute text-center text-[#0F172A]"
            style={{
              left: '24mm',
              width: '249mm',
              top: '54.2mm',
              fontSize: '10.2pt',
              lineHeight: '1.38',
            }}
          >
            A Editora Mente e Saúde (CNPJ: 51.372.335/0001-71), em parceria
            institucional com o Centro Profissionalizante Maria Dalva de Araújo
            (CNPJ:
            <br />
            51.269.112/0001-83), certifica para os devidos fins de comprovação
            curricular, acadêmica e de títulos (Lei nº 9.394/96) que
          </p>

          {/* Titular Highlight Box */}
          <div
            className="absolute flex flex-col items-center justify-center text-center"
            style={{
              left: '24mm',
              top: '67mm',
              width: '249mm',
              height: '21mm',
              backgroundColor: '#EDFDF5',
              border: '0.35mm solid #D97706',
            }}
          >
            <div
              className="font-bold text-[#0A1D56] tracking-wide"
              style={{
                fontFamily: "'Times New Roman', Georgia, serif",
                fontSize: '22.5pt',
                lineHeight: 1.1,
              }}
            >
              {data.holderName}
            </div>
            <div
              className="font-bold text-[#0F172A] mt-[1.2mm]"
              style={{ fontSize: '10pt' }}
            >
              {data.holderRole} &nbsp;|&nbsp; CPF: {data.holderCpf}{' '}
              &nbsp;|&nbsp; {data.holderInstitution}
            </div>
          </div>

          {/* Body Paragraph 1 */}
          <div
            className="absolute text-[#0F172A] text-left"
            style={{
              left: '24.5mm',
              width: '248mm',
              top: '92.5mm',
              fontSize: '10pt',
              lineHeight: '1.38',
            }}
          >
            concluiu com <strong>APROVAÇÃO</strong> e aproveitamento integral a
            Atividade Extracurricular intitulada{' '}
            <strong>"{data.activityTitle}"</strong>, desenvolvida na modalidade
            de <strong>{data.modality}</strong>, realizada no período de{' '}
            {data.period}, contabilizando carga horária total de{' '}
            <strong>{data.totalHoursWritten}</strong>.
          </div>

          {/* Body Paragraph 2 */}
          <div
            className="absolute text-[#0F172A] text-left"
            style={{
              left: '24.5mm',
              width: '248mm',
              top: '109.8mm',
              fontSize: '10pt',
              lineHeight: '1.38',
            }}
          >
            No âmbito desta formação complementar em ambiente virtual de
            aprendizagem, o profissional cumpriu integralmente o ciclo de
            atualização teórica baseado nos capítulos do e-book homônimo da
            Editora Mente e Saúde, abrangendo semiologia da acuidade visual,
            diagnóstico diferencial da síndrome do olho vermelho, triagem de
            glaucoma, catarata e retinopatia diabética/hipertensiva na atenção
            primária, manejo inicial de urgências oculares e resolução comentada
            de questionários clínicos avaliativos online, obtendo nota final{' '}
            <strong>
              {data.finalGrade} ({data.approvalStatus})
            </strong>
            .
          </div>

          {/* Location and Date */}
          <div
            className="absolute left-0 right-0 text-center italic text-[#0F172A]"
            style={{
              top: '132.5mm',
              fontFamily: "'Times New Roman', Georgia, serif",
              fontSize: '13pt',
            }}
          >
            {data.issueDate}
          </div>

          {/* Footer Area: Signatures + Public Faith Seal + QR Code + Manual Verification */}
          {/* Left Signature: Bárbara Lima dos Santos */}
          <div
            className="absolute text-center"
            style={{
              left: '15mm',
              top: '148mm',
              width: '78mm',
            }}
          >
            <img
              src={SIG_BARBARA_DATA_URL}
              alt="Assinatura Bárbara Lima dos Santos"
              className="mx-auto object-contain"
              style={{ width: '64mm', height: '18mm' }}
            />
            <div
              className="w-full bg-[#0F172A]"
              style={{ height: '0.35mm', marginTop: '1mm' }}
            />
            <div className="font-bold text-[#064E3B] text-[7.8pt] mt-[1.2mm]">
              BÁRBARA LIMA DOS SANTOS
            </div>
            <div className="text-[#0F172A] text-[6.8pt] leading-tight mt-[0.4mm]">
              Editora-Chefe e Coordenadora de Extensão Editorial
            </div>
            <div className="font-mono-tabular font-bold text-[#064E3B] text-[6.1pt] mt-[0.5mm]">
              Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
            </div>
          </div>

          {/* Official Circular Seal of Public Faith */}
          <div
            className="absolute rounded-full flex flex-col items-center justify-center text-center"
            style={{
              left: '97.5mm',
              top: '153.5mm',
              width: '23mm',
              height: '23mm',
              backgroundColor: '#FFF2C7',
              border: '0.6mm solid #D97706',
            }}
          >
            <div
              className="font-bold text-[#78350F] uppercase"
              style={{
                fontFamily: "'Times New Roman', Georgia, serif",
                fontSize: '6.3pt',
                lineHeight: 1.1,
              }}
            >
              SELO OFICIAL
            </div>
            <div
              className="font-bold text-[#78350F] uppercase mt-[0.6mm]"
              style={{
                fontFamily: "'Times New Roman', Georgia, serif",
                fontSize: '7.8pt',
                lineHeight: 1.1,
              }}
            >
              FÉ PÚBLICA
            </div>
            <div className="font-mono-tabular font-bold text-[#78350F] text-[5.2pt] mt-[1mm]">
              {data.code}
            </div>
          </div>

          {/* QR Code Box */}
          <a
            href={fullVerifyUrl}
            className="absolute bg-white flex items-center justify-center"
            style={{
              left: '123.5mm',
              top: '151.5mm',
              width: '25mm',
              height: '25mm',
              border: '0.25mm solid #064E3B',
            }}
            title="Verificar autenticidade via QR Code"
          >
            {qrDataUrl && (
              <img
                src={qrDataUrl}
                alt={`QR Code de Verificação ${data.code}`}
                style={{ width: '23mm', height: '23mm' }}
              />
            )}
          </a>

          {/* Manual Public Authentication Box */}
          <div
            className="absolute bg-white text-left p-[1.8mm] flex flex-col justify-between"
            style={{
              left: '150.5mm',
              top: '151.5mm',
              width: '50.5mm',
              height: '25mm',
              border: '0.25mm solid #064E3B',
            }}
          >
            <div className="font-bold text-[#064E3B] text-[5.9pt] uppercase tracking-tight">
              AUTENTICAÇÃO PÚBLICA MANUAL
            </div>
            <div className="font-mono-tabular font-bold text-[#0F172A] text-[6.1pt]">
              Cód.: {data.code}
            </div>
            <div className="font-mono-tabular font-bold text-[#92400E] text-[6.1pt]">
              Chave: {data.controlKey}
            </div>
            <div className="font-bold text-[#0A1D56] text-[5.4pt]">
              Endereço p/ Verificação Online:
            </div>
            <a
              href={fullVerifyUrl}
              className="font-mono-tabular text-[#0F172A] text-[4.6pt] truncate hover:underline"
            >
              {shortSiteUrl}
            </a>
          </div>

          {/* Right Signature: James Araújo de Santana */}
          <div
            className="absolute text-center"
            style={{
              left: '203mm',
              top: '148mm',
              width: '79mm',
            }}
          >
            <img
              src={SIG_JAMES_DATA_URL}
              alt="Assinatura James Araújo de Santana"
              className="mx-auto object-contain"
              style={{ width: '64mm', height: '18mm' }}
            />
            <div
              className="w-full bg-[#0F172A]"
              style={{ height: '0.35mm', marginTop: '1mm' }}
            />
            <div className="font-bold text-[#0A1D56] text-[7.8pt] mt-[1.2mm]">
              JAMES ARAÚJO DE SANTANA
            </div>
            <div className="text-[#0F172A] text-[6.8pt] leading-tight mt-[0.4mm]">
              Coordenador de Extensão e Projetos Educativos
            </div>
            <div className="font-mono-tabular font-bold text-[#0A1D56] text-[5.8pt] mt-[0.5mm]">
              Centro Profissionalizante Maria Dalva de Araújo (CNPJ:
              51.269.112/0001-83)
            </div>
          </div>

          {/* Bottom Security Verification Strip */}
          <div
            className="absolute left-0 right-0 text-center font-mono-tabular font-bold text-[#064E3B]"
            style={{
              top: '188.5mm',
              fontSize: '6.1pt',
            }}
          >
            Verifique via QR Code ou acesse {shortSiteUrl} informando o Código{' '}
            {data.code} ou Chave {data.controlKey}
          </div>
        </article>
      )}

      {/* ===================================================================
          LAUDA 2 — VERSO OFICIAL (MEMORIAL DESCRITIVO E MATRIZ DE 36 HORAS)
      =================================================================== */}
      {(pageFilter === 'both' || pageFilter === 'page2' || isPrintMode) && (
        <article
          aria-label={`Certificado Oficial Nº ${data.certNumber} - Verso (Memorial Descritivo)`}
          className="cert-a4-page relative bg-[#FFFDFA] text-[#0F172A] shadow-2xl select-text overflow-hidden shrink-0"
          style={{
            width: '297mm',
            height: '210mm',
            boxSizing: 'border-box',
          }}
        >
          {/* Outer Emerald Border (5mm inset) */}
          <div
            className="pointer-events-none absolute"
            style={{
              left: '5mm',
              top: '5mm',
              width: '287mm',
              height: '200mm',
              border: '0.8mm solid #064E3B',
            }}
          />
          {/* Middle Gold Border (6.8mm inset) */}
          <div
            className="pointer-events-none absolute"
            style={{
              left: '6.8mm',
              top: '6.8mm',
              width: '283.4mm',
              height: '196.4mm',
              border: '0.35mm solid #D97706',
            }}
          />
          {/* Inner Navy Border (8.2mm inset) */}
          <div
            className="pointer-events-none absolute"
            style={{
              left: '8.2mm',
              top: '8.2mm',
              width: '280.6mm',
              height: '193.6mm',
              border: '0.5mm solid #0A1D56',
            }}
          />

          {/* Verso Header */}
          <div
            className="absolute flex items-center gap-[3.5mm]"
            style={{
              left: '14mm',
              top: '11.5mm',
              width: '269mm',
              height: '14.5mm',
            }}
          >
            <img
              src={LOGO_EMS_DATA_URL}
              alt="Logo Editora Mente e Saúde"
              className="w-[13mm] h-[13mm] object-contain shrink-0"
            />
            <img
              src={LOGO_CENTRO_DATA_URL}
              alt="Logo Centro Profissionalizante Maria Dalva de Araújo"
              className="w-[13mm] h-[13mm] object-contain shrink-0"
            />
            <div className="leading-tight">
              <h2
                className="font-bold text-[#064E3B] uppercase"
                style={{
                  fontFamily: "'Times New Roman', Georgia, serif",
                  fontSize: '13.5pt',
                }}
              >
                MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE
                EXTRACURRICULAR
              </h2>
              <div className="text-[#0F172A] text-[8.5pt] mt-[0.8mm]">
                Verso Oficial do Certificado Nº {data.certNumber} · Fé Pública
                Interinstitucional e Validação Curricular
              </div>
            </div>
          </div>

          {/* Verso Header Line */}
          <div
            className="absolute bg-[#064E3B]"
            style={{
              left: '14mm',
              top: '28mm',
              width: '269mm',
              height: '0.45mm',
            }}
          />

          {/* Box 1: DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL */}
          <div
            className="absolute bg-white p-[3.2mm]"
            style={{
              left: '14mm',
              top: '31mm',
              width: '155mm',
              height: '31mm',
              border: '0.25mm solid #064E3B',
            }}
          >
            <div className="font-bold text-[#064E3B] text-[8.2pt]">
              1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL
            </div>
            <div className="text-[#0F172A] text-[8.3pt] space-y-[1.1mm] mt-[2mm]">
              <div>
                Titular Certificado: <strong>{data.holderName}</strong>
              </div>
              <div>CPF Registrado: {data.holderCpf}</div>
              <div>Qualificação Profissional: {data.holderRole}</div>
              <div>Instituição de Origem: {data.holderInstitution}</div>
            </div>
          </div>

          {/* Box 2: ENQUADRAMENTO CURRICULAR E PONTUAÇÃO */}
          <div
            className="absolute bg-[#F0F5FF] p-[3.2mm] flex flex-col justify-between"
            style={{
              left: '173mm',
              top: '31mm',
              width: '110mm',
              height: '31mm',
              border: '0.25mm solid #0A1D56',
            }}
          >
            <div>
              <div className="font-bold text-[#0A1D56] text-[8.2pt]">
                2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO
              </div>
              <div className="font-bold text-[#0F172A] text-[7.7pt] leading-[1.3] mt-[1.8mm]">
                {data.item09FramingLine1}
                <br />
                {data.item09FramingLine2}
                <br />
                {data.item09FramingLine3}
              </div>
            </div>
            <div className="font-mono-tabular font-bold text-[#064E3B] text-[7pt]">
              Período: 05/02 a 15/03/2024 | Total: {data.totalHoursNumeric}h (
              {data.approvalStatus} - Nota {data.finalGrade})
            </div>
          </div>

          {/* Box 3: MATRIZ PROGRAMÁTICA E METODOLOGIA PEDAGÓGICA (36 HORAS) */}
          <div
            className="absolute"
            style={{
              left: '14mm',
              top: '65mm',
              width: '269mm',
            }}
          >
            <div
              className="bg-[#EDFDF5] px-[4mm] flex items-center"
              style={{
                height: '7.5mm',
                border: '0.25mm solid #064E3B',
              }}
            >
              <span className="font-bold text-[#064E3B] text-[8.2pt]">
                3. MATRIZ PROGRAMÁTICA E METODOLOGIA PEDAGÓGICA (
                {data.totalHoursNumeric} HORAS)
              </span>
            </div>

            {data.axes.map((axis) => (
              <div
                key={axis.id}
                className="bg-white grid"
                style={{
                  gridTemplateColumns: '79mm 165mm 25mm',
                  height: '14mm',
                  borderLeft: '0.25mm solid #CCD6E0',
                  borderRight: '0.25mm solid #CCD6E0',
                  borderBottom: '0.25mm solid #CCD6E0',
                }}
              >
                {/* Column 1: Axis Title & Subtitle */}
                <div
                  className="px-[3mm] py-[1.4mm] flex flex-col justify-center"
                  style={{ borderRight: '0.25mm solid #E2E8F0' }}
                >
                  <div className="font-bold text-[#0A1D56] text-[7pt] leading-[1.18]">
                    {axis.titleLine1}
                    {axis.titleLine2 ? ` ${axis.titleLine2}` : ''}
                  </div>
                  <div className="text-[#475569] text-[6pt] leading-[1.15] mt-[0.7mm]">
                    {axis.subtitleLine1}
                  </div>
                </div>

                {/* Column 2: Analytical Description */}
                <div
                  className="px-[3mm] py-[1.4mm] flex items-center text-[#0F172A] text-[7.2pt] leading-[1.28]"
                  style={{ borderRight: '0.25mm solid #E2E8F0' }}
                >
                  <div>
                    {axis.descLine1} {axis.descLine2}
                  </div>
                </div>

                {/* Column 3: Partial Hours */}
                <div className="flex items-center justify-center font-mono-tabular font-bold text-[#064E3B] text-[8pt]">
                  {axis.hours}
                </div>
              </div>
            ))}
          </div>

          {/* Box 4: REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO */}
          <div
            className="absolute bg-[#FFFAEB] p-[3.2mm] flex items-center justify-between"
            style={{
              left: '14mm',
              top: '131.5mm',
              width: '269mm',
              height: '31mm',
              border: '0.35mm solid #D97706',
            }}
          >
            <div className="pr-[4mm] flex-1">
              <div className="font-bold text-[#92400E] text-[8.2pt]">
                4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE
                VERIFICAÇÃO DE AUTENTICIDADE
              </div>
              <div className="text-[#0F172A] text-[7.6pt] leading-[1.28] mt-[1.2mm]">
                Certificado registrado sob o nº {data.certNumber} no Livro de
                Extensão e Cursos nº {data.bookNumber}, Folha {data.pageNumber},
                expedido pela Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) e
                Centro Profissionalizante Maria Dalva de Araújo (CNPJ:
                51.269.112/0001-83).
              </div>
              <div className="font-mono-tabular font-bold text-[#064E3B] text-[7.5pt] mt-[1.4mm]">
                CÓDIGO DE AUTENTICIDADE: {data.code} &nbsp;&nbsp;|&nbsp;&nbsp;
                CHAVE DE CONTROLE / DÍGITO: {data.controlKey}
              </div>
              <div className="font-mono-tabular font-bold text-[#0A1D56] text-[6.8pt] mt-[0.8mm] truncate">
                ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE):{' '}
                <a href={fullVerifyUrl} className="underline">
                  {fullVerifyUrl}
                </a>
              </div>
              <div className="font-mono-tabular font-bold text-[#0F172A] text-[6.8pt] mt-[0.8mm]">
                HASH SHA-256: {data.sha256}
              </div>
            </div>

            <a
              href={fullVerifyUrl}
              className="bg-white flex items-center justify-center shrink-0"
              style={{
                width: '26mm',
                height: '26mm',
                border: '0.25mm solid #064E3B',
              }}
              title="Verificar autenticidade via QR Code"
            >
              {qrDataUrl && (
                <img
                  src={qrDataUrl}
                  alt={`QR Code Verso ${data.code}`}
                  style={{ width: '24mm', height: '24mm' }}
                />
              )}
            </a>
          </div>

          {/* Verso Footer */}
          <div
            className="absolute flex items-end justify-between"
            style={{
              left: '18mm',
              top: '164mm',
              width: '261mm',
              height: '26mm',
            }}
          >
            {/* Left Compact Signature */}
            <div className="text-center w-[74mm]">
              <img
                src={SIG_BARBARA_DATA_URL}
                alt="Assinatura Bárbara Lima dos Santos"
                className="mx-auto object-contain"
                style={{ width: '54mm', height: '15mm' }}
              />
              <div
                className="w-full bg-[#0F172A]"
                style={{ height: '0.35mm' }}
              />
              <div className="font-bold text-[#064E3B] text-[7.5pt] mt-[1mm]">
                BÁRBARA LIMA DOS SANTOS
              </div>
              <div className="font-mono-tabular font-bold text-[#064E3B] text-[6pt] mt-[0.4mm]">
                Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
              </div>
            </div>

            {/* Center Date & Chancela */}
            <div className="text-center pb-[0.5mm]">
              <div
                className="italic text-[#0F172A]"
                style={{
                  fontFamily: "'Times New Roman', Georgia, serif",
                  fontSize: '10.5pt',
                }}
              >
                {data.issueDate}
              </div>
              <div className="font-bold text-[#475569] text-[6.8pt] mt-[0.8mm]">
                Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo
                o Território Nacional
              </div>
              <div className="font-mono-tabular text-[#064E3B] text-[6.2pt] mt-[0.4mm]">
                Registro: {data.code} · Chave: {data.controlKey}
              </div>
            </div>

            {/* Right Compact Signature */}
            <div className="text-center w-[75mm]">
              <img
                src={SIG_JAMES_DATA_URL}
                alt="Assinatura James Araújo de Santana"
                className="mx-auto object-contain"
                style={{ width: '54mm', height: '15mm' }}
              />
              <div
                className="w-full bg-[#0F172A]"
                style={{ height: '0.35mm' }}
              />
              <div className="font-bold text-[#0A1D56] text-[7.5pt] mt-[1mm]">
                JAMES ARAÚJO DE SANTANA
              </div>
              <div className="font-mono-tabular font-bold text-[#0A1D56] text-[6pt] mt-[0.4mm]">
                Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
              </div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export const CertificateDocumentViewer: React.FC<
  CertificateDocumentViewerProps
> = ({ baseOriginUrl, data = CERTIFICATE_04_DATA }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [pageFilter, setPageFilter] = useState<'both' | 'page1' | 'page2'>(
    'both'
  );
  const [viewMode, setViewMode] = useState<'interactive' | 'native-pdf'>(
    'interactive'
  );
  const [zoom, setZoom] = useState<number>(0.85);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const cleanOrigin = baseOriginUrl.replace(/\/+$/, '');
  const fullVerifyUrl = `${cleanOrigin}/?codigo=${data.code}#validador`;

  useEffect(() => {
    let active = true;
    generateQrCodeDataUrl(fullVerifyUrl)
      .then((url) => {
        if (active) setQrDataUrl(url);
      })
      .catch(console.error);
    return () => {
      active = false;
    };
  }, [fullVerifyUrl]);

  useEffect(() => {
    const updateResponsiveZoom = () => {
      const w = window.innerWidth;
      if (w < 640) setZoom(0.31);
      else if (w < 1024) setZoom(0.58);
      else if (w < 1280) setZoom(0.76);
      else setZoom(0.88);
    };
    updateResponsiveZoom();
    window.addEventListener('resize', updateResponsiveZoom);
    return () => window.removeEventListener('resize', updateResponsiveZoom);
  }, []);

  useEffect(() => {
    let currentBlobUrl: string | null = null;
    if (viewMode === 'native-pdf') {
      createOfficialCertificateBlobUrl(baseOriginUrl, data)
        .then((url) => {
          currentBlobUrl = url;
          setPdfBlobUrl(url);
        })
        .catch(console.error);
    }
    return () => {
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl);
      }
    };
  }, [viewMode, baseOriginUrl, data]);

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      await downloadOfficialCertificatePdf(baseOriginUrl, data);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyVerifyLink = () => {
    navigator.clipboard.writeText(fullVerifyUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2200);
  };

  return (
    <section
      id="certificado-oficial"
      className="no-print py-16 bg-[#0F172A] text-white border-y border-slate-800"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Top Section Header & Document Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-emerald-400 uppercase tracking-widest">
              <FileCheck2 className="w-4 h-4" />
              <span>Documento Oficial Acessível · Formato A4 Paisagem (2 Laudas)</span>
              <span aria-hidden="true">·</span>
              <span>Cód. {data.code}</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-white mt-2 tracking-tight">
              Certificado Oficial Nº 04 — Visualizador & Download PDF
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl">
              Visualização integral da <strong>Lauda 1 (Frente)</strong> e da{' '}
              <strong>Lauda 2 (Verso — Memorial Descritivo de 36 Horas)</strong>{' '}
              com texto 100% selecionável/acessível, logotipos institucionais
              originais, assinaturas reconhecidas e QR Code dinâmico vinculado a
              este portal autenticador.
            </p>
          </div>

          {/* Primary Download & Print Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center gap-2.5 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm rounded-lg shadow-lg transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>
                {isDownloading
                  ? 'Gerando PDF Acessível...'
                  : 'Baixar Certificado Oficial (.PDF)'}
              </span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium text-sm rounded-lg border border-slate-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Imprimir (A4 Paisagem)</span>
            </button>
          </div>
        </div>

        {/* Reader Toolbar (PDF Reader Style Bar) */}
        <div className="mt-6 bg-slate-900/90 border border-slate-800 rounded-t-xl px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Left: Lauda Switcher & View Mode */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => {
                  setViewMode('interactive');
                  setPageFilter('both');
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'interactive' && pageFilter === 'both'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Ambas as Laudas (1 e 2)
              </button>
              <button
                onClick={() => {
                  setViewMode('interactive');
                  setPageFilter('page1');
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'interactive' && pageFilter === 'page1'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Lauda 1 · Frente
              </button>
              <button
                onClick={() => {
                  setViewMode('interactive');
                  setPageFilter('page2');
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'interactive' && pageFilter === 'page2'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Lauda 2 · Verso (Memorial)
              </button>
            </div>

            <button
              onClick={() =>
                setViewMode(
                  viewMode === 'interactive' ? 'native-pdf' : 'interactive'
                )
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'native-pdf'
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>
                {viewMode === 'native-pdf'
                  ? 'Voltar ao Leitor Interativo'
                  : 'Visualizar Arquivo PDF Embutido'}
              </span>
            </button>
          </div>

          {/* Center: QR Code Verification Target Indicator */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400 font-mono-tabular">
            <QrCode className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate max-w-[360px]">
              QR Code ativo: {fullVerifyUrl}
            </span>
            <button
              onClick={handleCopyVerifyLink}
              className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 ml-1 cursor-pointer"
              title="Copiar link de verificação"
            >
              {copiedUrl ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar URL</span>
                </>
              )}
            </button>
          </div>

          {/* Right: Zoom Controls */}
          {viewMode === 'interactive' && (
            <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setZoom((z) => Math.max(0.3, +(z - 0.1).toFixed(2)))}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Reduzir Zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono-tabular text-xs text-slate-200 min-w-[46px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(1.25, +(z + 0.1).toFixed(2)))}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Aumentar Zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(0.88)}
                className="ml-1 px-2 py-0.5 text-[11px] text-slate-400 hover:text-white border-l border-slate-800 cursor-pointer"
              >
                Padrão
              </button>
            </div>
          )}
        </div>

        {/* Document Viewport Container */}
        <div className="bg-slate-950/90 border-x border-b border-slate-800 rounded-b-xl p-4 sm:p-8 overflow-x-auto flex flex-col items-center">
          {viewMode === 'native-pdf' ? (
            <div className="w-full flex flex-col items-center">
              <div className="w-full flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 mb-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>
                    PDF Vetorial Acessível gerado nativamente (2 Laudas A4
                    Paisagem · Texto selecionável e links clicáveis)
                  </span>
                </div>
                {pdfBlobUrl && (
                  <a
                    href={pdfBlobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium"
                  >
                    <span>Abrir PDF em Nova Guia</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              {pdfBlobUrl ? (
                <iframe
                  src={pdfBlobUrl}
                  title="Visualizador PDF Nativo Certificado Nº 04"
                  className="w-full h-[780px] rounded-lg border border-slate-800 bg-white"
                />
              ) : (
                <div className="py-24 text-center text-slate-400 text-sm">
                  Renderizando documento PDF vetorial...
                </div>
              )}
            </div>
          ) : (
            <div
              className="flex flex-col items-center transition-transform duration-150 origin-top"
              style={{
                transform: `scale(${zoom})`,
                marginBottom:
                  pageFilter === 'both'
                    ? `calc((420mm + 32px) * (${zoom} - 1))`
                    : `calc(210mm * (${zoom} - 1))`,
              }}
            >
              <CertificatePagesMarkup
                data={data}
                qrDataUrl={qrDataUrl}
                baseOriginUrl={baseOriginUrl}
                pageFilter={pageFilter}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

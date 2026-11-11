import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import {
  LOGO_CENTRO_DATA_URL,
  LOGO_EMS_DATA_URL,
  SIG_BARBARA_DATA_URL,
  SIG_JAMES_DATA_URL,
} from '../data/certAssets';
import { CERTIFICATE_04_DATA, CertificateData } from '../data/certificate04Data';

export async function generateQrCodeDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 480,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });
}

export async function buildCertificatePdfDocument(
  baseOriginUrl: string,
  data: CertificateData = CERTIFICATE_04_DATA
): Promise<jsPDF> {
  const cleanOrigin = baseOriginUrl.replace(/\/+$/, '');
  const fullVerifyUrl = `${cleanOrigin}/?codigo=${data.code}#validador`;
  const shortSiteUrl = `${cleanOrigin}/`;

  const qrDataUrl = await generateQrCodeDataUrl(fullVerifyUrl);

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // Set PDF Document Metadata for Accessibility & Standards
  doc.setProperties({
    title: `Certificado Nº ${data.certNumber} - ${data.code} - ${data.holderName}`,
    subject: data.activityTitle,
    author: 'Editora Mente e Saúde & Centro Profissionalizante Maria Dalva de Araújo',
    keywords: `Certificado, Extensão, Oftalmologia, ${data.code}, ${data.holderName}, Item 09`,
    creator: 'Sistema Oficial de Certificação e Fé Pública — Editora Mente e Saúde',
  });

  // =========================================================================
  // LAUDA 1 — FRENTE DO CERTIFICADO (297mm x 210mm)
  // =========================================================================
  const drawTripleFrame = () => {
    // Warm archival background
    doc.setFillColor(255, 253, 250);
    doc.rect(0, 0, 297, 210, 'F');

    // Outer Emerald Institutional Border
    doc.setDrawColor(6, 78, 59);
    doc.setLineWidth(0.8);
    doc.rect(5, 5, 287, 200, 'S');

    // Middle Gold Border
    doc.setDrawColor(217, 119, 6);
    doc.setLineWidth(0.35);
    doc.rect(6.8, 6.8, 283.4, 196.4, 'S');

    // Inner Navy Border
    doc.setDrawColor(10, 29, 86);
    doc.setLineWidth(0.5);
    doc.rect(8.2, 8.2, 280.6, 193.6, 'S');
  };

  drawTripleFrame();

  // Left Header Block (Editora Mente e Saúde)
  doc.addImage(LOGO_EMS_DATA_URL, 'PNG', 14, 12, 20, 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 78, 59);
  doc.text('EDITORA MENTE E SAÚDE', 37, 18);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CNPJ: 51.372.335/0001-71', 37, 22.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(13, 148, 136);
  doc.text('Conselho Editorial e Extensão Científica', 37, 26.5);

  // Center Header Block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 78, 59);
  doc.text(
    'PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA',
    148.5,
    17,
    { align: 'center' }
  );
  doc.text('E EDUCAÇÃO EM SAÚDE', 148.5, 21.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(10, 29, 86);
  doc.text(
    `Certificado Nº ${data.certNumber} · Livro de Extensão nº ${data.bookNumber} · Cód. ${data.code}`,
    148.5,
    26.2,
    { align: 'center' }
  );

  // Right Header Block (Centro Profissionalizante Maria Dalva de Araújo)
  doc.addImage(LOGO_CENTRO_DATA_URL, 'PNG', 263, 12, 20, 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(10, 29, 86);
  doc.text('CENTRO PROFISSIONALIZANTE', 259, 17.5, { align: 'right' });
  doc.text('MARIA DALVA DE ARAÚJO', 259, 21.8, { align: 'right' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CNPJ: 51.269.112/0001-83', 259, 26.2, { align: 'right' });

  // Header Horizontal Line
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.line(14, 35, 283, 35);

  // Main Certificate Title
  doc.setFont('times', 'bold');
  doc.setFontSize(23.5);
  doc.setTextColor(6, 78, 59);
  doc.text(data.mainTitle, 148.5, 47, { align: 'center' });

  // Gold Underline below Main Title
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.5);
  doc.line(95, 50, 202, 50);

  // Institutional Preamble
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.2);
  doc.setTextColor(15, 23, 42);
  doc.text(
    'A Editora Mente e Saúde (CNPJ: 51.372.335/0001-71), em parceria institucional com o Centro Profissionalizante Maria Dalva de Araújo (CNPJ:',
    148.5,
    58.2,
    { align: 'center' }
  );
  doc.text(
    '51.269.112/0001-83), certifica para os devidos fins de comprovação curricular, acadêmica e de títulos (Lei nº 9.394/96) que',
    148.5,
    62.6,
    { align: 'center' }
  );

  // Highlight Box for Professional Holder
  doc.setFillColor(237, 252, 245);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.3);
  doc.rect(24, 67, 249, 21, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(22.5);
  doc.setTextColor(10, 29, 86);
  doc.text(data.holderName, 148.5, 76.8, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `${data.holderRole}  |  CPF: ${data.holderCpf}  |  ${data.holderInstitution}`,
    148.5,
    84,
    { align: 'center' }
  );

  // Body Paragraph 1 (Objective Data & Item 09 Framing)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  const p1StartY = 96.2;
  const lineStep = 4.06;
  data.frontParagraph1Lines.forEach((line, idx) => {
    doc.text(line, 24.5, p1StartY + idx * lineStep);
  });

  // Body Paragraph 2 (Technical-Pedagogical Scope)
  const p2StartY = 113.5;
  data.frontParagraph2Lines.forEach((line, idx) => {
    doc.text(line, 24.5, p2StartY + idx * lineStep);
  });

  // Location and Date
  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text(data.issueDate, 148.5, 137, { align: 'center' });

  // Left Signature Block (Bárbara Lima dos Santos)
  doc.addImage(SIG_BARBARA_DATA_URL, 'PNG', 22, 149, 64, 18);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(15, 168.5, 93, 168.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(6, 78, 59);
  doc.text('BÁRBARA LIMA DOS SANTOS', 54, 173, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('Editora-Chefe e Coordenadora de Extensão Editorial', 54, 176.8, {
    align: 'center',
  });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.3);
  doc.setTextColor(6, 78, 59);
  doc.text('Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)', 54, 180.5, {
    align: 'center',
  });

  // Center Seal of Public Faith
  doc.setFillColor(255, 242, 199);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.6);
  doc.circle(109, 165, 11.5, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 53, 15);
  doc.text('SELO OFICIAL', 109, 161.2, { align: 'center' });

  doc.setFontSize(8);
  doc.text('FÉ PÚBLICA', 109, 165.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(5.4);
  doc.text(data.code, 109, 169.5, { align: 'center' });

  // Center QR Code Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(123.5, 151.5, 25, 25, 'FD');
  doc.addImage(qrDataUrl, 'PNG', 124.5, 152.5, 23, 23);
  doc.link(123.5, 151.5, 25, 25, { url: fullVerifyUrl });

  // Center Manual Authentication Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(150.5, 151.5, 50.5, 25, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(6, 78, 59);
  doc.text('AUTENTICAÇÃO PÚBLICA MANUAL', 152.5, 155.5);

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(15, 23, 42);
  doc.text(`Cód.: ${data.code}`, 152.5, 159.8);

  doc.setTextColor(146, 64, 14);
  doc.text(`Chave: ${data.controlKey}`, 152.5, 163.8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(10, 29, 86);
  doc.text('Endereço p/ Verificação Online:', 152.5, 167.8);

  doc.setFont('courier', 'normal');
  doc.setFontSize(4.7);
  doc.setTextColor(15, 23, 42);
  const displayUrlLine =
    shortSiteUrl.length > 42 ? shortSiteUrl.slice(0, 42) : shortSiteUrl;
  doc.text(displayUrlLine, 152.5, 171.5);
  doc.link(150.5, 151.5, 50.5, 25, { url: fullVerifyUrl });

  // Right Signature Block (James Araújo de Santana)
  doc.addImage(SIG_JAMES_DATA_URL, 'PNG', 210, 149, 64, 18);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(203, 168.5, 282, 168.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(10, 29, 86);
  doc.text('JAMES ARAÚJO DE SANTANA', 242.5, 173, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('Coordenador de Extensão e Projetos Educativos', 242.5, 176.8, {
    align: 'center',
  });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(10, 29, 86);
  doc.text(
    'Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)',
    242.5,
    180.5,
    { align: 'center' }
  );

  // Bottom Security Verification Line
  doc.setFont('courier', 'bold');
  doc.setFontSize(6.1);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Verifique via QR Code ou acesse ${shortSiteUrl} informando o Código ${data.code} ou Chave ${data.controlKey}`,
    148.5,
    191.5,
    { align: 'center' }
  );

  // =========================================================================
  // LAUDA 2 — VERSO OFICIAL (MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO)
  // =========================================================================
  doc.addPage('a4', 'landscape');
  drawTripleFrame();

  // Top Header Logos & Title
  doc.addImage(LOGO_EMS_DATA_URL, 'PNG', 14, 12, 13, 13);
  doc.addImage(LOGO_CENTRO_DATA_URL, 'PNG', 29, 12, 13, 13);

  doc.setFont('times', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(6, 78, 59);
  doc.text(
    'MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE EXTRACURRICULAR',
    46,
    17.5
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `Verso Oficial do Certificado Nº ${data.certNumber} · Fé Pública Interinstitucional e Validação Curricular`,
    46,
    22.5
  );

  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.5);
  doc.line(14, 28, 283, 28);

  // Section 1: DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(14, 31, 155, 31, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text('1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL', 18, 36.2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(15, 23, 42);
  doc.text(`Titular Certificado: ${data.holderName}`, 18, 42.2);
  doc.text(`CPF Registrado: ${data.holderCpf}`, 18, 47.4);
  doc.text(`Qualificação Profissional: ${data.holderRole}`, 18, 52.6);
  doc.text(`Instituição de Origem: ${data.holderInstitution}`, 18, 57.8);

  // Section 2: ENQUADRAMENTO CURRICULAR E PONTUAÇÃO
  doc.setFillColor(240, 245, 255);
  doc.setDrawColor(10, 29, 86);
  doc.setLineWidth(0.25);
  doc.rect(173, 31, 110, 31, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(10, 29, 86);
  doc.text('2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO', 177, 36.2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(15, 23, 42);
  doc.text(data.item09FramingLine1, 177, 42.2);
  doc.text(data.item09FramingLine2, 177, 45.4);
  doc.text(data.item09FramingLine3, 177, 48.6);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.1);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Período: 05/02 a 15/03/2024 | Total: ${data.totalHoursNumeric}h (${data.approvalStatus} - Nota ${data.finalGrade})`,
    177,
    58
  );

  // Section 3: MATRIZ PROGRAMÁTICA E METODOLOGIA PEDAGÓGICA (36 HORAS)
  doc.setFillColor(237, 252, 245);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(14, 65, 269, 7.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `3. MATRIZ PROGRAMÁTICA E METODOLOGIA PEDAGÓGICA (${data.totalHoursNumeric} HORAS)`,
    18,
    70.2
  );

  const rowHeight = 14;
  const startRowY = 72.5;

  data.axes.forEach((axis, idx) => {
    const ry = startRowY + idx * rowHeight;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(204, 214, 224);
    doc.setLineWidth(0.25);
    doc.rect(14, ry, 269, rowHeight, 'FD');

    // Vertical column dividers
    doc.setDrawColor(227, 232, 240);
    doc.line(93, ry, 93, ry + rowHeight);
    doc.line(258, ry, 258, ry + rowHeight);

    // Axis Title (Left column)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.1);
    doc.setTextColor(10, 29, 86);
    doc.text(axis.titleLine1, 17, ry + 4.2);
    if (axis.titleLine2) {
      doc.text(axis.titleLine2, 17, ry + 7.2);
    }

    // Axis Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(71, 85, 105);
    doc.text(axis.subtitleLine1, 17, ry + 11.2);

    // Axis Analytical Description (Center column)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(15, 23, 42);
    doc.text(axis.descLine1, 96, ry + 5.2);
    doc.text(axis.descLine2, 96, ry + 9.2);

    // Axis Hours (Right column)
    doc.setFont('courier', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(6, 78, 59);
    doc.text(axis.hours, 263.5, ry + 8.2);
  });

  // Section 4: REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO
  doc.setFillColor(255, 250, 235);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.35);
  doc.rect(14, 131.5, 269, 31, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(146, 64, 14);
  doc.text(
    '4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE AUTENTICIDADE',
    18,
    136.8
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `Certificado registrado sob o nº ${data.certNumber} no Livro de Extensão e Cursos nº ${data.bookNumber}, Folha ${data.pageNumber}, expedido pela Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) e Centro Profissionalizante Maria`,
    18,
    142
  );
  doc.text('Dalva de Araújo (CNPJ: 51.269.112/0001-83).', 18, 145.2);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `CÓDIGO DE AUTENTICIDADE: ${data.code}   |   CHAVE DE CONTROLE / DÍGITO: ${data.controlKey}`,
    18,
    149.8
  );

  doc.setFontSize(7);
  doc.setTextColor(10, 29, 86);
  const manualVerifyLine = `ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE): ${fullVerifyUrl}`;
  doc.text(
    manualVerifyLine.length > 118
      ? manualVerifyLine.slice(0, 118)
      : manualVerifyLine,
    18,
    154.8
  );
  doc.link(18, 151.5, 230, 5, { url: fullVerifyUrl });

  doc.setFontSize(7);
  doc.setTextColor(15, 23, 42);
  doc.text(`HASH SHA-256: ${data.sha256}`, 18, 159.8);

  // QR Code inside Box 4 (Right side)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(6, 78, 59);
  doc.setLineWidth(0.25);
  doc.rect(253.5, 134, 26, 26, 'FD');
  doc.addImage(qrDataUrl, 'PNG', 254.5, 135, 24, 24);
  doc.link(253.5, 134, 26, 26, { url: fullVerifyUrl });

  // Page 2 Footer Signatures & Seal Text
  doc.addImage(SIG_BARBARA_DATA_URL, 'PNG', 26, 164, 54, 15);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(18, 180, 92, 180);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(6, 78, 59);
  doc.text('BÁRBARA LIMA DOS SANTOS', 55, 184.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.text('Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)', 55, 188, {
    align: 'center',
  });

  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(data.issueDate, 148.5, 179.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional',
    148.5,
    184.2,
    { align: 'center' }
  );

  doc.setFont('courier', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Registro: ${data.code} · Chave: ${data.controlKey}`,
    148.5,
    188,
    { align: 'center' }
  );

  doc.addImage(SIG_JAMES_DATA_URL, 'PNG', 215, 164, 54, 15);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(204, 180, 279, 180);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(10, 29, 86);
  doc.text('JAMES ARAÚJO DE SANTANA', 241.5, 184.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.text(
    'Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)',
    241.5,
    188,
    { align: 'center' }
  );

  return doc;
}

export async function downloadOfficialCertificatePdf(
  baseOriginUrl: string,
  data: CertificateData = CERTIFICATE_04_DATA
): Promise<void> {
  const doc = await buildCertificatePdfDocument(baseOriginUrl, data);
  const fileName = `Certificado_Extensao_${data.certNumber}_${data.code}_LUCAS_GONCALVES_SILVEIRA.pdf`;
  doc.save(fileName);
}

export async function createOfficialCertificateBlobUrl(
  baseOriginUrl: string,
  data: CertificateData = CERTIFICATE_04_DATA
): Promise<string> {
  const doc = await buildCertificatePdfDocument(baseOriginUrl, data);
  const blob = doc.output('blob');
  return URL.createObjectURL(blob);
}

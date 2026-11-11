export interface CertificateAxis {
  id: string;
  titleLine1: string;
  titleLine2?: string;
  subtitleLine1: string;
  subtitleLine2?: string;
  descLine1: string;
  descLine2: string;
  hours: string;
}

export interface CertificateData {
  certNumber: string;
  bookNumber: string;
  pageNumber: string;
  code: string;
  controlKey: string;
  sha256: string;
  holderName: string;
  holderRole: string;
  holderCpf: string;
  holderInstitution: string;
  mainTitle: string;
  activityTitle: string;
  modality: string;
  period: string;
  periodShort: string;
  issueDate: string;
  totalHoursNumeric: string;
  totalHoursWritten: string;
  finalGrade: string;
  approvalStatus: string;
  item09FramingLine1: string;
  item09FramingLine2: string;
  item09FramingLine3: string;
  frontParagraph1Lines: [string, string, string];
  frontParagraph2Lines: [string, string, string, string];
  axes: [CertificateAxis, CertificateAxis, CertificateAxis, CertificateAxis];
}

export const CERTIFICATE_04_DATA: CertificateData = {
  certNumber: '04',
  bookNumber: '01/2024',
  pageNumber: '24',
  code: 'EMS-EXT-2024-0904',
  controlKey: '0904-7027-9457-8F4A',
  sha256: '7c3e9a14b8d02f65e1928a40c6b51d29e8f17a63b4c52d90f1837e2a5b6c0904',
  holderName: 'LUCAS GONÇALVES SILVEIRA',
  holderRole: 'Médico',
  holderCpf: '702.794.941-57',
  holderInstitution: 'Centro Universitário Alfredo Nasser (UNIFAN)',
  mainTitle: 'CERTIFICADO DE CURSO DE EXTENSÃO',
  activityTitle:
    'Programa de Extensão e Estudo Dirigido EAD: Princípios Teóricos da Oftalmologia para o Médico Generalista',
  modality: 'Curso de Extensão',
  period: '05 de fevereiro a 15 de março de 2024',
  periodShort: '05 de fevereiro a 15 de março de 2024',
  issueDate: 'Goiânia - GO, 22 de março de 2024.',
  totalHoursNumeric: '36',
  totalHoursWritten: '36 (trinta e seis) horas',
  finalGrade: '9,8',
  approvalStatus: 'APROVADO',
  item09FramingLine1:
    'Item 09 - Atividades Extracurriculares: Cursos de extensão, estágios em',
  item09FramingLine2:
    'instituições de ensino, cursos de língua e de computação, aprovação em',
  item09FramingLine3:
    'concursos, congressos médicos (Pelo menos 30 horas por certificado)',
  frontParagraph1Lines: [
    'concluiu com APROVAÇÃO e aproveitamento integral a Atividade Extracurricular intitulada "Programa de Extensão e Estudo Dirigido EAD: Princípios',
    'Teóricos da Oftalmologia para o Médico Generalista", desenvolvida na modalidade de Curso de Extensão, realizada no período de 05 de fevereiro a 15',
    'de março de 2024, contabilizando carga horária total de 36 (trinta e seis) horas.',
  ],
  frontParagraph2Lines: [
    'No âmbito desta formação complementar em ambiente virtual de aprendizagem, o profissional cumpriu integralmente o ciclo de atualização teórica',
    'baseado nos capítulos do e-book homônimo da Editora Mente e Saúde, abrangendo semiologia da acuidade visual, diagnóstico diferencial da síndrome do',
    'olho vermelho, triagem de glaucoma, catarata e retinopatia diabética/hipertensiva na atenção primária, manejo inicial de urgências oculares e',
    'resolução comentada de questionários clínicos avaliativos online, obtendo nota final 9,8 (APROVADO).',
  ],
  axes: [
    {
      id: 'Eixo I',
      titleLine1: 'Eixo I — Anatomofisiologia Ocular Aplicada e Semiologia',
      titleLine2: 'Básica da Visão na Atenção Primária',
      subtitleLine1: 'Exame Externo, Acuidade Visual (Snellen), Reflexos Pupilares e Fundoscopia Direta',
      descLine1:
        'Estudo dirigido dos capítulos 1 a 3 do e-book institucional sobre anatomia clínica do segmento anterior e posterior, aferição padronizada',
      descLine2:
        'da acuidade visual, avaliação de reflexos fotomotores (defeito pupilar aferente relativo) e técnica de oftalmoscopia direta.',
      hours: '09h 00min',
    },
    {
      id: 'Eixo II',
      titleLine1: 'Eixo II — Diagnóstico Diferencial da Síndrome do Olho',
      titleLine2: 'Vermelho e Urgências Oculares no Pronto-Socorro',
      subtitleLine1: 'Conjuntivites, Ceratites, Uveíte Anterior, Glaucoma Agudo e Trauma Ocular',
      descLine1:
        'Análise sistematizada dos sinais de alarme no olho vermelho agudo, manejo imediato de queimaduras químicas oculares, corpos estranhos',
      descLine2:
        'corneanos, crise aguda de fechamento angular e contraindicações absolutas ao uso indiscriminado de colírios corticosteroides e anestésicos.',
      hours: '09h 00min',
    },
    {
      id: 'Eixo III',
      titleLine1: 'Eixo III — Oftalmologia nas Doenças Crônicas Sistêmicas',
      titleLine2: 'e Prevenção da Cegueira Evitável no SUS',
      subtitleLine1: 'Retinopatia Diabética e Hipertensiva, Catarata Senil, DMRI e Glaucoma Crônico',
      descLine1:
        'Fisiopatologia e estadiamento clínico da retinopatia diabética e hipertensiva, rastreamento do glaucoma primário de ângulo aberto,',
      descLine2:
        'leucocorias na infância (Teste do Olhinho / Reflexo Vermelho) e critérios de referência regulada para centros especializados.',
      hours: '09h 00min',
    },
    {
      id: 'Eixo IV',
      titleLine1: 'Eixo IV — Estudo Dirigido do E-Book Homônimo e Resolução',
      titleLine2: 'de Questionários Clínicos Avaliativos Online',
      subtitleLine1: 'Discussão de Casos Clínicos Integrados e Avaliação Somativa Certificadora',
      descLine1:
        'Revisão bibliográfica integral da obra "Princípios Teóricos da Oftalmologia para o Médico Generalista" (Editora Mente e Saúde) e',
      descLine2:
        'resolução de banco de questões clínicas de múltipla escolha com aprovação final e aproveitamento de 98% (Nota 9,8).',
      hours: '09h 00min',
    },
  ],
};

export interface RedEyeCondition {
  id: string;
  name: string;
  category: 'Benigna / Manejo APS' | 'Urgência Relativa (24-48h)' | 'Emergência Oftalmológica Imediata';
  acuity: string;
  pain: string;
  hyperemia: string;
  pupil: string;
  discharge: string;
  fluorescein: string;
  iop: string;
  clinicalConduct: string;
  redFlags: string[];
}

export const RED_EYE_DIFFERENTIAL_DATA: RedEyeCondition[] = [
  {
    id: 'conjuntivite-viral',
    name: 'Conjuntivite Aguda (Viral / Adenoviral)',
    category: 'Benigna / Manejo APS',
    acuity: 'Preservada (normal, salvo pseudomembrana ou ceratite subepitelial)',
    pain: 'Ausente ou desconforto leve (sensação de areia / corpo estranho)',
    hyperemia: 'Difusa, predominando nos fórnices e conjuntiva tarsal',
    pupil: 'Isocórica e fotorreagente normal',
    discharge: 'Serosa / aquosa clara, frequentemente associada a linfonodo pré-auricular',
    fluorescein: 'Negativa (epitélio corneano íntegro na apresentação típica)',
    iop: 'Normal (10–21 mmHg)',
    clinicalConduct:
      'Compressas frias filtradas, colírios lubrificantes sem conservantes, orientação de higiene rigorosa e afastamento laboral/escolar durante fase secretiva. Evitar corticoides tópicos.',
    redFlags: [
      'Redução de acuidade visual',
      'Fotofobia intensa persistente após 7 dias',
      'Formação de membranas conjuntivais aderentes',
    ],
  },
  {
    id: 'ceratite-infecciosa',
    name: 'Ceratite Infecciosa / Úlcera de Córnea',
    category: 'Emergência Oftalmológica Imediata',
    acuity: 'Reduzida (proporcional ao acometimento do eixo visual e edema)',
    pain: 'Dor ocular moderada a intensa com fotofobia acentuada e blefaroespasmo',
    hyperemia: 'Injeção ciliar / pericerática (halo violáceo ao redor do limbo)',
    pupil: 'Normal ou miose reacional discreta',
    discharge: 'Mucopurulenta (bacteriana) ou aquosa com lesão dendrítica (herpética)',
    fluorescein: 'Positiva — impregnação estromal ou padrão dendrítico/geográfico',
    iop: 'Normal ou discretamente elevada por inflamação trabecular',
    clinicalConduct:
      'Suspender imediatamente o uso de lentes de contato. NUNCA prescrever colírio anestésico para uso domiciliar nem corticoide tópico sem exclusão herpética/fúngica. Encaminhamento imediato ao oftalmologista.',
    redFlags: [
      'Usuário de lentes de contato com dor ocular aguda',
      'Infiltrado corneano esbranquiçado visível à lanterna',
      'Hipópio na câmara anterior',
    ],
  },
  {
    id: 'uveite-anterior',
    name: 'Uveíte Anterior Aguda (Iridociclite)',
    category: 'Urgência Relativa (24-48h)',
    acuity: 'Levemente a moderadamente reduzida (turvação vítrea/câmara anterior)',
    pain: 'Dor profunda ocular e periorbitária, agravada pela luz (fotofobia consensual)',
    hyperemia: 'Pericerática / ciliar circunferencial sem secreção purulenta',
    pupil: 'Miose (pupila contraída) ou irregular por sinéquias posteriores',
    discharge: 'Ausente ou lacrimejamento reflexo discreto',
    fluorescein: 'Negativa na superfície corneana (precipitados ceráticos no endotélio)',
    iop: 'Geralmente reduzida (hipotonia ciliar) ou elevada em uveítes hipertensivas',
    clinicalConduct:
      'Investigar associação com espondiloartropatias (HLA-B27), doenças inflamatórias intestinais ou infecções. Referenciar em 24h para biomicroscopia (pesquisa de células/flare) e cicloplégico + corticoterapia guiada.',
    redFlags: [
      'Dor no olho acometido ao iluminar o olho contralateral sadio',
      'Pupila em miose pouco reativa ou discórica',
      'Histórico de espondilite anquilosante ou artrite reativa',
    ],
  },
  {
    id: 'glaucoma-agudo',
    name: 'Glaucoma Primário de Ângulo Fechado (Crise Aguda)',
    category: 'Emergência Oftalmológica Imediata',
    acuity: 'Acentuadamente reduzida (visão de halos coloridos ao redor das luzes)',
    pain: 'Dor ocular lancinante associada a cefaleia hemicraniana, náuseas e vômitos',
    hyperemia: 'Injeção conjuntival e ciliar intensa com edema corneano ("córnea em vidro fosco")',
    pupil: 'Midríase média fixa (semidilatada e arreativa à luz)',
    discharge: 'Lacrimejamento reflexo sem secreção purulenta',
    fluorescein: 'Negativa (edema epitelial difuso da córnea por hipertensão ocular)',
    iop: 'Criticamente elevada (> 40–60 mmHg — globo ocular pétreo à palpação bidigital)',
    clinicalConduct:
      'Emergência médica: iniciar redução pressórica sistêmica/tópica no pronto-socorro (acetazolamida VO/EV se sem contraindicação, betabloqueador tópico) e transferir de imediato para iridotomia a laser.',
    redFlags: [
      'Globo ocular endurecido ("pétreo") à palpação bidigital comparativa',
      'Midríase média arreativa + náuseas/vômitos simulando abdome agudo ou enxaqueca',
      'Câmara anterior rasa ao exame com foco luminoso lateral',
    ],
  },
];

export interface EbookChapter {
  number: string;
  title: string;
  axis: string;
  pages: string;
  readingTime: string;
  summary: string;
  keyTakeaways: string[];
  clinicalPearl: string;
}

export const EBOOK_CHAPTERS: EbookChapter[] = [
  {
    number: 'Capítulo 01',
    title: 'Anatomia Clínica do Bulbo Ocular e Fisiologia Óptica na Prática Médica',
    axis: 'Eixo I (09h)',
    pages: 'pp. 12–44',
    readingTime: '2h 15min de estudo dirigido',
    summary:
      'Estudo integrado das túnicas fibrosa (esclera e córnea), vascular (úvea: íris, corpo ciliar e coroide) e neural (retina), além da dinâmica do humor aquoso e transparência dos meios refrativos.',
    keyTakeaways: [
      'A córnea responde por cerca de dois terços (≈ 43 dioptrias) do poder refrativo total do olho humano.',
      'O humor aquoso é produzido nos processos ciliares (câmara posterior), atravessa a pupila e drena na malha trabecular (ângulo iridocorneano).',
      'A mácula lútea e a fóvea central concentram cones responsáveis pela visão central de alta resolução e percepção cromática.',
    ],
    clinicalPearl:
      'Sempre avalie a profundidade da câmara anterior iluminando lateralmente a íris com lanterna clínica: sombra extensa no setor nasal sugere câmara rasa e risco de fechamento angular sob midríase farmacológica.',
  },
  {
    number: 'Capítulo 02',
    title: 'Sistematização do Exame Oftalmológico na Atenção Primária e Emergência',
    axis: 'Eixo I (09h)',
    pages: 'pp. 45–82',
    readingTime: '2h 30min de estudo dirigido',
    summary:
      'Protocolo passo a passo para aferição da acuidade visual com tabela de Snellen e buraco estenopeico (pinhole), teste dos reflexos pupilares (swinging flashlight test), motilidade extrínseca e fundoscopia direta.',
    keyTakeaways: [
      'A melhora da acuidade visual com o buraco estenopeico (pinhole) indica que a baixa visual decorre prioritariamente de vício refrativo não corrigido.',
      'O Defeito Pupilar Aferente Relativo (pupila de Marcus Gunn) é o sinal semiológico objetivo mais sensível de neuropatia óptica unilateral ou assimétrica.',
      'O Teste do Reflexo Vermelho (Teste do Olhinho de Bruckner) deve ser realizado em todos os recém-nascidos para detecção precoce de catarata congênita e retinoblastoma.',
    ],
    clinicalPearl:
      'Em qualquer trauma ocular ou queixa visual aguda no pronto-socorro, a medida documentada da acuidade visual de cada olho separadamente funciona como o "sinal vital" fundamental da oftalmologia.',
  },
  {
    number: 'Capítulo 03',
    title: 'Abordagem Sindrômica do Olho Vermelho e Manejo de Urgências Oculares',
    axis: 'Eixo II (09h)',
    pages: 'pp. 83–136',
    readingTime: '3h 00min de estudo dirigido',
    summary:
      'Algoritmos decisórios para diferenciar afecções autolimitadas da conjuntiva de patologias ameaçadoras à visão (ceratites infecciosas, uveítes, esclerites, glaucoma agudo e queimaduras químicas).',
    keyTakeaways: [
      'Queimaduras químicas por álcalis (cal, cimento, amônia, soda cáustica) causam saponificação celular e penetração rápida: a lavagem copiosa com SF 0,9% deve preceder qualquer exame.',
      'Na suspeita de perfuração ocular (pupila em gota, atalamia, prolapso uveal), jamais comprimir o globo ocular; proteger com escudo rígido e encaminhar para microcirurgia.',
      'Colírios anestésicos tópicos (proximetacaína/tetracaína) são estritamente proscritos para prescrição domiciliar pelo risco de ceratopatia tóxica grave e perfuração corneana.',
    ],
    clinicalPearl:
      'Diante de hiperemia ocular acompanhada de dor moderada/intensa, baixa da visão, fotofobia marcante ou alteração pupilar, o diagnóstico nunca deve ser rotulado como "conjuntivite simples".',
  },
  {
    number: 'Capítulo 04',
    title: 'Manifestações Oculares de Doenças Sistêmicas: Diabetes, HAS e Senilidade',
    axis: 'Eixo III & IV (18h)',
    pages: 'pp. 137–198',
    readingTime: '3h 15min de estudo dirigido',
    summary:
      'Diretrizes de rastreamento da retinopatia diabética (não proliferativa, proliferativa e edema macular), classificação de Keith-Wagener-Barker na hipertensão arterial, catarata senil e glaucoma crônico.',
    keyTakeaways: [
      'Pacientes com Diabetes Mellitus tipo 2 devem realizar fundoscopia dilatada já no momento do diagnóstico; no DM tipo 1, em até 5 anos após o início da doença.',
      'O Glaucoma Primário de Ângulo Aberto é assintomático nas fases iniciais, cursando com aumento da escavação do disco óptico (> 0,6 ou assimetria > 0,2) e perda campimétrica periférica.',
      'O achado de papiledema bilateral ao fundo de olho em paciente com crise hipertensiva configura hipertensão maligna (Grau IV de Keith-Wagener) e emergência clínica.',
    ],
    clinicalPearl:
      'A boa acuidade visual central NÃO exclui retinopatia diabética proliferativa grave nem glaucoma avançado, pois ambas as doenças podem poupar a fóvea até estágios tardios.',
  },
];

export interface ClinicalQuizQuestion {
  id: number;
  vignette: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  axisReference: string;
}

export const CLINICAL_QUIZ_QUESTIONS: ClinicalQuizQuestion[] = [
  {
    id: 1,
    vignette:
      'Paciente feminina, 64 anos, hipermetrope, dá entrada no pronto-socorro com dor ocular intensa em olho direito iniciada há 3 horas ao sair de uma sessão de cinema, associada a visão de halos coloridos, cefaleia frontal ipsilateral, náuseas e dois episódios de vômito. Ao exame: hiperemia pericerática acentuada em OD, córnea opalescente (edema), pupila em semimidríase fixa (5 mm) não reagente à luz e globo ocular endurecido à palpação bidigital.',
    question: 'Qual é a hipótese diagnóstica principal e a conduta inicial prioritária na emergência?',
    options: [
      'Enxaqueca oftálmica com aura visual; administrar analgesia venosa e triptano.',
      'Crise aguda de Glaucoma Primário de Ângulo Fechado; iniciar redução da pressão intraocular (ex.: acetazolamida sistêmica + hipotensor tópico) e encaminhar de emergência para iridotomia.',
      'Conjuntivite bacteriana hiperaguda; iniciar colírio antibiótico de amplo espectro a cada 2 horas.',
      'Uveíte anterior aguda; instilar colírio midriático/cicloplégico (atropina 1%) para aliviar o espasmo ciliar.',
    ],
    correctIndex: 1,
    explanation:
      'A tríade de dor ocular intensa com sintomas autonômicos (náuseas/vômitos), edema corneano com hiperemia ciliar e pupila em midríase média fixa em paciente hipermetrope após ambiente escuro (midríase fisiológica precipitando bloqueio pupilar) é clássica do Glaucoma Agudo de Ângulo Fechado. Midriáticos são formalmente contraindicados.',
    axisReference: 'Eixo II — Urgências Oculares no Pronto-Socorro',
  },
  {
    id: 2,
    vignette:
      'Trabalhador da construção civil, 32 anos, sofre acidente ocular com respingo de argamassa/cal (álcali) no olho esquerdo há 20 minutos. Chega à UPA com blefaroespasmo intenso, lacrimejamento e dor severa.',
    question: 'Qual deve ser a primeira ação médica imediata na sala de emergência?',
    options: [
      'Solicitar radiografia de órbitas antes de manipular o globo ocular.',
      'Neutralizar o álcali lavando o olho com solução levemente ácida diluída.',
      'Iniciar imediatamente irrigação ocular copiosa e contínua com soro fisiológico 0,9% ou Ringer Lactato (pelo menos 1 a 2 litros / 30 minutos), evertendo as pálpebras para remover partículas dos fórnices.',
      'Prescrever colírio anestésico de uso domiciliar a cada 1 hora e liberar para consulta ambulatorial.',
    ],
    correctIndex: 2,
    explanation:
      'Queimaduras químicas oculares (especialmente por álcalis, que sofrem penetração rápida por saponificação de ácidos graxos das membranas celulares) exigem lavagem mecânica imediata e abundante na cena e na admissão hospitalar, com limpeza dos fundos de saco conjuntivais antes de qualquer etapa burocrática.',
    axisReference: 'Eixo II — Trauma e Queimaduras Químicas Oculares',
  },
  {
    id: 3,
    vignette:
      'Homem de 58 anos, portador de Diabetes Mellitus tipo 2 há 14 anos com controle glicêmico irregular (HbA1c 9,4%), comparece à UBS totalmente assintomático do ponto de vista visual (acuidade visual 20/20 em ambos os olhos com óculos).',
    question: 'Qual orientação reflete corretamente os princípios de rastreamento da Retinopatia Diabética?',
    options: [
      'Como a acuidade visual é 20/20 bilateralmente, não há necessidade de exame de fundo de olho neste momento.',
      'A acuidade visual normal não exclui retinopatia diabética proliferativa; o paciente necessita de mapeamento de retina / fundoscopia periódica para identificar microaneurismas, exsudatos ou neovasos antes da perda visual.',
      'O rastreamento no DM tipo 2 só é indicado após 10 anos do início de insulinoterapia plena.',
      'A presença de catarata senil impede o desenvolvimento de edema macular diabético.',
    ],
    correctIndex: 1,
    explanation:
      'A Retinopatia Diabética frequentemente evolui de forma silenciosa até fases proliferativas avançadas (hemorragia vítrea ou descolamento tracional de retina). O rastreamento anual por fundoscopia/retinografia permite indicar fotocoagulação a laser ou terapia anti-VEGF em tempo hábil.',
    axisReference: 'Eixo III — Oftalmologia nas Doenças Crônicas Sistêmicas',
  },
  {
    id: 4,
    vignette:
      'Jovem de 22 anos, usuária de lentes de contato gelatinosas (com hábito de dormir e tomar banho com as lentes), procura atendimento por olho vermelho, dor intensa, fotofobia e mancha esbranquiçada paracentral na córnea do olho esquerdo há 24 horas. O teste da fluoresceína evidencia defeito epitelial corado em verde intenso sobre o infiltrado.',
    question: 'Qual conduta é CORRETA para o médico generalista neste cenário?',
    options: [
      'Realizar oclusão compressiva do olho afetado com gaze por 48 horas e prescrever dexametasona colírio.',
      'Suspender imediatamente o uso das lentes de contato, NÃO ocluir o olho, NÃO prescrever corticoides ou anestésicos tópicos e encaminhar em caráter de urgência oftalmológica no mesmo dia para abordagem de úlcera de córnea.',
      'Prescrever apenas lágrima artificial e tranquilizar a paciente quanto à adaptação normal da lente.',
      'Fornecer frasco de colírio anestésico para a paciente pingar em casa sempre que sentir dor.',
    ],
    correctIndex: 1,
    explanation:
      'Úlcera de córnea / ceratite infecciosa em usuário de lentes de contato (alto risco para Pseudomonas aeruginosa e Acanthamoeba) constitui emergência oftalmológica. O olho infectado nunca deve sofrer curativo oclusivo e o uso de corticoides ou anestésicos tópicos domiciliares pode precipitar perfuração corneana.',
    axisReference: 'Eixo II & IV — Estudo Dirigido de Casos Clínicos',
  },
];

export const GITHUB_MASTER_PROMPT = `CONTEXTO E OBJETIVO:
Você é um Engenheiro Front-End Sênior e Designer Editorial Acadêmico. Sua missão é elaborar o sistema/site/plataforma completa para repositório GitHub e deploy na Vercel referente ao CERTIFICADO Nº 04 do Item 09 da Matriz Curricular ("Programa de Extensão e Estudo Dirigido EAD: Princípios Teóricos da Oftalmologia para o Médico Generalista" — 36 horas), cumprindo simultaneamente:

1. Portal Acadêmico Interativo e Explicativo sobre o Programa de Extensão e Estudo Dirigido EAD em Oftalmologia para o Médico Generalista (com explorador clínico de Síndrome do Olho Vermelho e Urgências Oculares, estudo dirigido dos capítulos do e-book da Editora Mente e Saúde e simulador de questões clínicas).
2. Sistema Oficial de Verificação Pública de Autenticidade (#validador) com leitura automática de parâmetro de URL (?codigo=EMS-EXT-2024-0904#validador), validação por Código ou Chave de Controle, exibição de Hash SHA-256 e QR Code dinâmico apontando automaticamente para o endereço onde o site estiver hospedado.
3. Visualizador Nativo e Exportador de PDF Acessível/Selecionável de 2 Laudas em A4 Paisagem (297mm x 210mm — Lauda 1: Frente / Lauda 2: Verso - Memorial Descritivo), mantendo 100% da formatação original, logotipos institucionais, selo de fé pública e assinaturas de Bárbara Lima dos Santos e James Araújo de Santana.

DADOS EXATOS DO CERTIFICADO Nº 04 (ITEM 09):
- Titular Certificado: LUCAS GONÇALVES SILVEIRA
- Qualificação e IES: Médico | CPF: 702.794.941-57 | Centro Universitário Alfredo Nasser (UNIFAN)
- Entidades Emissoras: Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) em parceria institucional com o Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
- Enquadramento no Edital: Item 09 - Atividades Extracurriculares: Cursos de extensão, estágios em instituições de ensino, cursos de língua e de computação, aprovação em concursos, congressos médicos (Pelo menos 30 horas por certificado)
- Registro Oficial: Certificado Nº 04 · Livro de Extensão nº 01/2024 · Folha 24
- Código de Autenticidade: EMS-EXT-2024-0904
- Chave de Controle / Dígito: 0904-7027-9457-8F4A
- Hash SHA-256: 7c3e9a14b8d02f65e1928a40c6b51d29e8f17a63b4c52d90f1837e2a5b6c0904
- Título da Atividade: "Programa de Extensão e Estudo Dirigido EAD: Princípios Teóricos da Oftalmologia para o Médico Generalista"
- Modalidade: Curso de Extensão (36 horas)
- Período de Realização: 05 de fevereiro a 15 de março de 2024
- Data de Emissão: Goiânia - GO, 22 de março de 2024.
- Nota Final e Situação: 9,8 (APROVADO)

MATRIZ PROGRAMÁTICA DO VERSO (36 HORAS — 4 EIXOS DE 09H):
- Eixo I (09h 00min): Anatomofisiologia Ocular Aplicada e Semiologia Básica da Visão na Atenção Primária (Exame Externo, Acuidade Visual Snellen, Reflexos Pupilares e Fundoscopia Direta).
- Eixo II (09h 00min): Diagnóstico Diferencial da Síndrome do Olho Vermelho e Urgências Oculares no Pronto-Socorro (Conjuntivites, Ceratites, Uveíte Anterior, Glaucoma Agudo e Trauma Ocular).
- Eixo III (09h 00min): Oftalmologia nas Doenças Crônicas Sistêmicas e Prevenção da Cegueira Evitável no SUS (Retinopatia Diabética e Hipertensiva, Catarata Senil, DMRI e Glaucoma Crônico).
- Eixo IV (09h 00min): Estudo Dirigido do E-Book Homônimo e Resolução de Questionários Clínicos Avaliativos Online (Discussão de Casos Clínicos Integrados e Avaliação Somativa Certificadora - Nota 9,8).`;

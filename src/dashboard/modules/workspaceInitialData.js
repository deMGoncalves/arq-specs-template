export const STORAGE_KEY = "cdd-specs-workspace";

const chapterSections = [
  {
    id: "SCN-001",
    order: "01",
    slug: "overview-and-objectives",
    title: "Visão Geral e Objetivos",
    description:
      "Introduz a solução, seu propósito, o contexto inicial e os objetivos estratégicos que orientarão o blueprint.",
    specPath: "specs/01_introduction/001_introduction-and-goals.md",
    focusAreas: ["norte estratégico", "stakeholders", "quality attributes"],
    introduction: {
      status: "not-started",
      lastUpdated: "",
      overview: "",
      problem: "",
      audience: "",
      keyFeatures: [],
      nonFunctional: {
        performance: "",
        security: "",
        availability: "",
        scalability: ""
      },
      stakeholders: [],
      qualityGoals: [],
      references: ""
    },
    notes: "",
    actionItems: [],
    quickLinks: []
  },
  {
    id: "SCN-002",
    order: "02",
    slug: "restrictions-and-guidelines",
    title: "Restrições e Diretrizes",
    description:
      "Registra limitações impostas, padrões obrigatórios e decisões corporativas que moldam o design.",
    specPath: "specs/02_constraints/README.md",
    focusAreas: ["governança", "tecnologia", "processos"],
    introduction: null,
    notes: "",
    actionItems: [],
    quickLinks: []
  },
  {
    id: "SCN-003",
    order: "03",
    slug: "system-scope-and-context",
    title: "Escopo do Sistema e Contexto",
    description:
      "Delimita fronteiras, atores envolvidos e integrações com sistemas externos, tanto de negócio quanto técnicos.",
    specPath: "specs/03_context/README.md",
    focusAreas: ["atores", "sistemas", "fronteiras"],
    introduction: null,
    notes: "",
    actionItems: [],
    quickLinks: []
  },
  {
    id: "SCN-004",
    order: "04",
    slug: "architectural-strategy",
    title: "Estratégia Arquitetural",
    description:
      "Resume decisões de alto nível, princípios e diretrizes que guiam a evolução da solução.",
    specPath: "specs/04_solution-strategy/README.md",
    focusAreas: ["princípios", "trade-offs", "roadmap"],
    introduction: null,
    notes: "",
    actionItems: [],
    quickLinks: []
  },
  {
    id: "SCN-005",
    order: "05",
    slug: "structural-view-components",
    title: "Visão Estrutural (Componentes)",
    description:
      "Detalha a decomposição estática em containers e componentes, destacando responsabilidades e interações.",
    specPath: "specs/05_building-blocks/README.md",
    focusAreas: ["containers", "componentes", "responsabilidades"],
    introduction: null,
    notes: "",
    actionItems: [],
    quickLinks: []
  },
  {
    id: "SCN-006",
    order: "06",
    slug: "behavioral-view-scenarios",
    title: "Visão de Comportamento (Cenários)",
    description:
      "Apresenta os principais fluxos dinâmicos, cenários de uso e narrativas BDD que demonstram o comportamento esperado.",
    specPath: "specs/06_runtime/README.md",
    focusAreas: ["fluxos", "interações", "bdd"],
    introduction: null,
    notes: "",
    actionItems: [],
    quickLinks: []
  },
  {
    id: "SCN-007",
    order: "07",
    slug: "deployment-view",
    title: "Visão de Implantação",
    description:
      "Descreve os ambientes, topologias e pipelines de entrega que dão suporte à solução.",
    specPath: "specs/07_deployment/README.md",
    focusAreas: ["topologia", "infraestrutura", "pipelines"],
    introduction: null,
    notes: "",
    actionItems: [],
    quickLinks: []
  },
  {
    id: "SCN-008",
    order: "08",
    slug: "crosscutting-concepts",
    title: "Conceitos Transversais",
    description:
      "Reúne decisões de design reutilizáveis e políticas que permeiam múltiplas partes do sistema.",
    specPath: "specs/08_crosscutting/README.md",
    focusAreas: ["segurança", "observabilidade", "padrões"],
    introduction: null,
    notes: "",
    actionItems: [],
    quickLinks: []
  },
  {
    id: "SCN-009",
    order: "09",
    slug: "decision-log",
    title: "Registro de Decisões",
    description:
      "Mantém o histórico das ADRs com contexto, decisão, justificativa e consequências.",
    specPath: "specs/09_decisions/README.md",
    focusAreas: ["adrs", "impactos", "rastreabilidade"],
    introduction: null,
    notes: "",
    actionItems: [],
    quickLinks: []
  },
  {
    id: "SCN-010",
    order: "10",
    slug: "quality-and-scenarios",
    title: "Qualidade e Cenários",
    description:
      "Define atributos de qualidade alvo e os cenários de aceitação que validam cada característica.",
    specPath: "specs/10_quality/README.md",
    focusAreas: ["qualidade", "métricas", "aceitação"],
    introduction: null,
    notes: "",
    actionItems: [],
    quickLinks: []
  },
  {
    id: "SCN-011",
    order: "11",
    slug: "risks-and-technical-debt",
    title: "Riscos e Dívida Técnica",
    description:
      "Lista riscos conhecidos, incertezas e itens de dívida técnica com respectivas estratégias de mitigação.",
    specPath: "specs/11_risks/README.md",
    focusAreas: ["riscos", "mitigação", "dívida"],
    introduction: null,
    notes: "",
    actionItems: [],
    quickLinks: []
  },
  {
    id: "SCN-012",
    order: "12",
    slug: "glossary-of-terms",
    title: "Glossário de Termos",
    description:
      "Define terminologias, acrônimos e nomenclaturas do domínio para manter entendimento comum.",
    specPath: "specs/12_glossary/README.md",
    focusAreas: ["vocabulário", "domínio", "comunicação"],
    introduction: null,
    notes: "",
    actionItems: [],
    quickLinks: []
  }
];

const emptyC4Model = {
  context: {
    purpose: "",
    primaryActors: [],
    supportingActors: [],
    relationships: []
  },
  containers: [],
  components: []
};

export const initialData = {
  meta: {
    productName: "Blueprint",
    version: "0.1.0",
    lastUpdated: new Date().toISOString(),
    description:
      "Workspace dedicada ao gerenciamento dos capítulos do blueprint, com persistência local."
  },
  chapters: chapterSections,
  constraints: [],
  c4: emptyC4Model,
  adrs: [],
  bdd: [],
  quality: [],
  risks: []
};

export const STORAGE_KEY = "cdd-specs-workspace";

const arc42Sections = [
  {
    id: "arc42-01",
    order: "01",
    slug: "introducao",
    title: "Visão Geral e Objetivos",
    description:
      "Apresenta o propósito do produto, o contexto inicial e os objetivos estratégicos que guiarão o blueprint.",
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
      "Workspace dedicado à etapa Visão Geral e Objetivos do blueprint, com persistência local."
  },
  arc42: arc42Sections,
  constraints: [],
  c4: emptyC4Model,
  adrs: [],
  bdd: [],
  quality: [],
  risks: []
};

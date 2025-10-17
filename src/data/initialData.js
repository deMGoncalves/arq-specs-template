export const STORAGE_KEY = "cdd-specs-workspace";

const arc42Sections = [
  {
    id: "arc42-01",
    order: "01",
    slug: "introducao",
    title: "Introdução e Objetivos",
    description:
      "Clarifica drivers de negócio, stakeholders e objetivos de qualidade que guiam todas as decisões.",
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
    productName: "CDD Specs Studio",
    version: "0.1.0",
    lastUpdated: new Date().toISOString(),
    description:
      "Workspace dedicado à seção 01 (Introdução e Objetivos) do arc42, com persistência local."
  },
  arc42: arc42Sections,
  constraints: [],
  c4: emptyC4Model,
  adrs: [],
  bdd: [],
  quality: [],
  risks: []
};

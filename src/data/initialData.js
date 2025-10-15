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
      qualityGoals: [
        { id: "quality-goal-1", title: "", motivation: "", metric: "", target: "" },
        { id: "quality-goal-2", title: "", motivation: "", metric: "", target: "" },
        { id: "quality-goal-3", title: "", motivation: "", metric: "", target: "" }
      ],
      references: ""
    },
    notes: "",
    actionItems: [],
    quickLinks: [
      { label: "Visão geral", target: "arc42-03" },
      { label: "Decisões relacionadas", target: "adr-001" }
    ]
  },
  {
    id: "arc42-02",
    order: "02",
    slug: "restricoes",
    title: "Restrições",
    description:
      "Restrição de negócio, técnicas e organizacionais que delimitam o espaço de solução.",
    specPath: "specs/02_constraints/002_constraints.md",
    focusAreas: ["prazos", "compliance", "padrões de código"],
    notes: "",
    actionItems: []
  },
  {
    id: "arc42-03",
    order: "03",
    slug: "contexto",
    title: "Contexto e Escopo",
    description:
      "Contexto de negócio e técnico, integração com sistemas externos e fronteiras.",
    specPath: "specs/03_context/003_context-and-scope.md",
    focusAreas: ["negócio", "atores", "interfaces"],
    notes: "",
    actionItems: []
  },
  {
    id: "arc42-04",
    order: "04",
    slug: "estrategia",
    title: "Estratégia de Solução",
    description:
      "Decisões arquiteturais de alto nível que traduzem objetivos de negócio em diretrizes técnicas.",
    specPath: "specs/04_solution-strategy/004_solution-strategy.md",
    focusAreas: ["linhas mestras", "trade-offs"],
    notes: "",
    actionItems: []
  },
  {
    id: "arc42-05",
    order: "05",
    slug: "building-blocks",
    title: "Building Block View",
    description:
      "Quebra estrutural C4 (Containers e Componentes) e relação com as responsabilidades.",
    specPath: "specs/05_building-blocks/005_building-block-view.md",
    focusAreas: ["c4", "responsabilidades"],
    notes: "",
    actionItems: [],
    quickLinks: [
      { label: "Containers", target: "container-frontend" },
      { label: "Componentes", target: "component-arc42-editor" }
    ]
  },
  {
    id: "arc42-06",
    order: "06",
    slug: "runtime",
    title: "Runtime View",
    description:
      "Cenários dinâmicos que descrevem fluxos e colaboram com os critérios BDD.",
    specPath: "specs/06_runtime/006_runtime-view.md",
    focusAreas: ["fluxos", "bdd", "cenários"],
    notes: "",
    actionItems: []
  },
  {
    id: "arc42-07",
    order: "07",
    slug: "deployment",
    title: "Deployment View",
    description:
      "Como os artefatos são entregues, infraestrutura utilizada e esteiras de publicação.",
    specPath: "specs/07_deployment/007_deployment-view.md",
    focusAreas: ["infraestrutura", "pipeline"],
    notes: "",
    actionItems: []
  },
  {
    id: "arc42-08",
    order: "08",
    slug: "crosscutting",
    title: "Crosscutting Concepts",
    description:
      "Decisões transversais (segurança, observabilidade, i18n) que impactam todo o sistema.",
    specPath: "specs/08_crosscutting/008_crosscutting-concepts.md",
    focusAreas: ["segurança", "observabilidade"],
    notes: "",
    actionItems: []
  },
  {
    id: "arc42-09",
    order: "09",
    slug: "decisoes",
    title: "Decisões e ADRs",
    description:
      "Histórico de decisões, contexto e trade-offs documentados como registros arquiteturais.",
    specPath: "specs/09_decisions/009_architectural-decisions.md",
    focusAreas: ["histórico", "trade-offs"],
    notes: "",
    actionItems: []
  },
  {
    id: "arc42-10",
    order: "10",
    slug: "qualidade",
    title: "Requisitos de Qualidade",
    description:
      "SLIs/SLOs, atributos de qualidade priorizados e cenários mensuráveis.",
    specPath: "specs/10_quality/010_quality-requirements.md",
    focusAreas: ["confiabilidade", "SLIs"],
    notes: "",
    actionItems: []
  },
  {
    id: "arc42-11",
    order: "11",
    slug: "riscos",
    title: "Riscos e Dívida Técnica",
    description:
      "Riscos arquiteturais, mitigação e vigilância contínua para reduzir débito técnico.",
    specPath: "specs/11_risks/011_risks-and-technical-debt.md",
    focusAreas: ["mitigação", "monitoramento"],
    notes: "",
    actionItems: []
  },
  {
    id: "arc42-12",
    order: "12",
    slug: "glossario",
    title: "Glossário",
    description:
      "Vocabulário controlado que compõe a linguagem ubíqua do domínio.",
    specPath: "specs/12_glossary/012_glossary.md",
    focusAreas: ["linguagem", "consistência"],
    notes: "",
    actionItems: []
  }
];

const constraints = [
  {
    id: "constraint-standards",
    title: "Padrões de Código CDD",
    specPath: "specs/02_constraints/patterns/",
    summary:
      "Catálogo de 39+ padrões que guiam a implementação e evitam deriva arquitetural.",
    relatedSections: ["arc42-02", "arc42-10"]
  },
  {
    id: "constraint-governance",
    title: "Governança Explícita",
    specPath: "specs/02_constraints/002_constraints.md",
    summary: "Checklist tático para garantir aderência aos princípios SOLID e Clean.",
    relatedSections: ["arc42-02", "arc42-05", "arc42-11"]
  }
];

const c4Model = {
  context: {
    purpose: "Dar forma viva aos artefatos arc42, ADR e BDD em um mesmo ambiente operacional.",
    primaryActors: [
      {
        id: "actor-arquiteto",
        name: "Arquiteto de Software",
        goals: [
          "Mapear rapidamente decisões arquiteturais aos artefatos de documentação",
          "Evoluir o arc42 sem perder rastreabilidade"
        ]
      },
      {
        id: "actor-dev",
        name: "Desenvolvedor",
        goals: [
          "Consumir contexto mínimo necessário para implementar uma feature",
          "Conectar cenários BDD ao código e às decisões"
        ]
      }
    ],
    supportingActors: [
      {
        id: "actor-product",
        name: "Product Manager",
        goals: ["Entender implicações técnicas de backlog e riscos emergentes"]
      }
    ],
    relationships: [
      {
        id: "rel-01",
        from: "actor-arquiteto",
        to: "container-frontend",
        description: "Atualiza arc42, ADRs e vincula cenários BDD."
      },
      {
        id: "rel-02",
        from: "actor-dev",
        to: "container-frontend",
        description: "Consulta contexto e critérios de aceite antes de codificar."
      }
    ]
  },
  containers: [
    {
      id: "container-frontend",
      name: "Frontend SPA",
      technology: "React + Vite + shadcn/ui",
      responsibility:
        "Interface de documentação viva, persistência local e exportação do arc42.",
      specPath: "specs/05_building-blocks/containers/CNT-[NNN]_[container-name].md",
      linkedArc42: ["arc42-05", "arc42-06"],
      linkedAdrs: ["adr-001"],
      linkedFeatures: ["feature-001", "feature-002"]
    },
    {
      id: "container-storage",
      name: "Persistência Local",
      technology: "LocalStorage",
      responsibility:
        "Garantir que o trabalho do time fique salvo no browser sem necessidade de backend.",
      specPath: "specs/05_building-blocks/components/CMP-[NNN]_[component-name].md",
      linkedArc42: ["arc42-02", "arc42-07"],
      linkedAdrs: ["adr-002"],
      linkedFeatures: ["feature-002"]
    }
  ],
  components: [
    {
      id: "component-arc42-editor",
      name: "Arc42 Knowledge Map",
      containerId: "container-frontend",
      responsibility:
        "Gerencia narrativa das seções arc42, integra com ADRs e cenários BDD.",
      specPath: "specs/05_building-blocks/components/CMP-001_arc42-editor.md",
      linkedArc42: ["arc42-01", "arc42-05", "arc42-06"],
      linkedAdrs: ["adr-001"],
      linkedFeatures: ["feature-001"]
    },
    {
      id: "component-adr-manager",
      name: "ADR Decision Log",
      containerId: "container-frontend",
      responsibility:
        "Mantém registro histórico das decisões arquiteturais e seus impactos.",
      specPath: "specs/05_building-blocks/components/CMP-002_adr-manager.md",
      linkedArc42: ["arc42-09"],
      linkedAdrs: ["adr-001", "adr-002"],
      linkedFeatures: ["feature-003"]
    },
    {
      id: "component-bdd-workbench",
      name: "BDD Workbench",
      containerId: "container-frontend",
      responsibility:
        "Permite criar cenários Gherkin vinculados a componentes e decisões.",
      specPath: "specs/06_runtime/scenarios/SCN-001_documentar-cenario.md",
      linkedArc42: ["arc42-06", "arc42-10"],
      linkedAdrs: ["adr-003"],
      linkedFeatures: ["feature-002", "feature-003"]
    }
  ]
};

const adrs = [
  {
    id: "adr-001",
    title: "Adotar React SPA com persistência local",
    status: "accepted",
    date: "2024-08-01",
    context:
      "Precisamos de uma interface responsiva para editar arc42, sem depender de backend inicial.",
    decision:
      "Utilizar React com Vite, estilização com tailwind e componentes shadcn. Persistir dados em LocalStorage.",
    consequences:
      "O time consegue trabalhar offline e exportar artefatos sob demanda. Precisamos planejar sincronização futura.",
    specPath: "specs/09_decisions/adrs/ADR-[NNN]_frontend-stack.md",
    links: {
      arc42: ["arc42-02", "arc42-05", "arc42-07"],
      c4: ["container-frontend", "component-arc42-editor"],
      bdd: ["feature-001"]
    }
  },
  {
    id: "adr-002",
    title: "Persistir dados em LocalStorage",
    status: "accepted",
    date: "2024-08-02",
    context:
      "Não existe infraestrutura backend aprovada para primeira versão do produto.",
    decision: "Persistir todo o trabalho em LocalStorage com opção de exportar JSON manualmente.",
    consequences: "Limitação de compartilhamento instantâneo. Precisaremos de backup manual.",
    specPath: "specs/09_decisions/adrs/ADR-[NNN]_storage-strategy.md",
    links: {
      arc42: ["arc42-02", "arc42-07"],
      c4: ["container-storage"],
      bdd: ["feature-002"]
    }
  },
  {
    id: "adr-003",
    title: "Documentar cenários BDD antes da implementação",
    status: "proposed",
    date: "2024-08-05",
    context:
      "Queremos reforçar alinhamento de expectativas e transformar documentação em critério testável.",
    decision:
      "Registrar cada fluxo crítico como cenário BDD conectado aos componentes C4 correspondentes.",
    consequences:
      "Maior disciplina na escrita das especificações, possível aumento de esforço inicial.",
    specPath: "specs/09_decisions/adrs/ADR-[NNN]_bdd-first.md",
    links: {
      arc42: ["arc42-06", "arc42-10"],
      c4: ["component-bdd-workbench"],
      bdd: ["feature-003"]
    }
  }
];

const bddFeatures = [
  {
    id: "feature-001",
    reference: "FEAT-001",
    title: "Cadastrar missão arc42",
    narrative:
      "Como arquiteto, quero capturar os objetivos de negócio para direcionar as decisões técnicas.",
    businessGoals: ["Manter foco nas necessidades de stakeholders", "Alinhar time em torno da missão"],
    linkedArc42: ["arc42-01"],
    linkedComponents: ["component-arc42-editor"],
    linkedAdrs: ["adr-001"],
    scenarios: [
      {
        id: "scenario-001",
        title: "Registrar missão principal",
        given: ["Que existe um projeto novo"],
        when: ["Eu preencho a missão no editor"],
        then: ["O objetivo fica disponível na visão geral"]
      }
    ]
  },
  {
    id: "feature-002",
    reference: "FEAT-002",
    title: "Salvar trabalho localmente",
    narrative:
      "Como desenvolvedor, quero que as informações fiquem salvas automaticamente enquanto documento o sistema.",
    businessGoals: ["Evitar perda de conhecimento", "Garantir continuidade mesmo offline"],
    linkedArc42: ["arc42-02", "arc42-07"],
    linkedComponents: ["component-bdd-workbench", "component-arc42-editor"],
    linkedAdrs: ["adr-002", "adr-003"],
    scenarios: [
      {
        id: "scenario-002",
        title: "Persistência automática",
        given: ["Que eu estou editando um ADR"],
        when: ["Eu salvo a decisão"],
        then: ["O app grava uma cópia no navegador"]
      },
      {
        id: "scenario-003",
        title: "Recuperar versão ao reabrir",
        given: ["Que existe uma versão salva"],
        when: ["Eu volto ao aplicativo"],
        then: ["Os dados ficam disponíveis sem sincronização manual"]
      }
    ]
  },
  {
    id: "feature-003",
    reference: "FEAT-003",
    title: "Vincular cenários a decisões",
    narrative:
      "Como product manager, quero ver os impactos de uma decisão nos cenários BDD.",
    businessGoals: ["Avaliar riscos rapidamente", "Garantir rastreabilidade completa"],
    linkedArc42: ["arc42-06", "arc42-09", "arc42-11"],
    linkedComponents: ["component-adr-manager", "component-bdd-workbench"],
    linkedAdrs: ["adr-003"],
    scenarios: [
      {
        id: "scenario-004",
        title: "Localizar impacto",
        given: ["Que uma decisão foi registrada"],
        when: ["Eu abro a decisão"],
        then: ["Os cenários impactados são exibidos automaticamente"]
      }
    ]
  }
];

const qualityAttributes = [
  {
    id: "quality-resilience",
    title: "Resiliência de Documentação",
    metric: "Tempo máximo de recuperação de uma sessão perdida",
    target: "Até 5 minutos",
    linkedArc42: ["arc42-10", "arc42-11"],
    linkedFeatures: ["feature-002"]
  },
  {
    id: "quality-traceability",
    title: "Rastreabilidade 360º",
    metric: "% de artefatos vinculados a pelo menos um outro artefato",
    target: "90%",
    linkedArc42: ["arc42-05", "arc42-09"],
    linkedFeatures: ["feature-003"]
  }
];

const riskRegister = [
  {
    id: "risk-storage-loss",
    title: "Perda de dados no navegador",
    description: "Usuário limpar cache do navegador e perder documentação recente.",
    mitigation:
      "Incentivar exportação periódica via JSON e alertar sobre risco em mudanças críticas.",
    linkedArc42: ["arc42-11"],
    linkedAdrs: ["adr-002"]
  },
  {
    id: "risk-alignment",
    title: "Misalignment entre ADR e BDD",
    description: "Esquecer de atualizar cenários BDD após uma decisão ser revisitada.",
    mitigation: "Checklist de revisão com foco em links cruzados.",
    linkedArc42: ["arc42-09", "arc42-10"],
    linkedAdrs: ["adr-003"]
  }
];

export const initialData = {
  meta: {
    productName: "CDD Specs Studio",
    version: "0.1.0",
    lastUpdated: new Date().toISOString(),
    description:
      "Aplicativo de documentação colaborativa baseado em arc42, C4, ADRs e BDD com persistência local."
  },
  arc42: arc42Sections,
  constraints,
  c4: c4Model,
  adrs,
  bdd: bddFeatures,
  quality: qualityAttributes,
  risks: riskRegister
};

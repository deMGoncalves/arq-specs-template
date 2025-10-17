import { generateId } from "./utils.js";

const HEADING_ALIASES = {
  overview: [
    "visao geral",
    "resumo",
    "introducao",
    "escopo inicial",
    "sumario executivo"
  ],
  problem: ["problema", "desafio", "motivacao", "contexto do problema"],
  audience: [
    "publico alvo",
    "audiencia",
    "usuarios",
    "beneficiarios",
    "personas"
  ],
  stakeholders: [
    "stakeholders",
    "atores",
    "partes interessadas",
    "areas envolvidas",
    "responsaveis"
  ],
  features: [
    "funcionalidades",
    "principais funcionalidades",
    "destaques",
    "caracteristicas principais",
    "escopo funcional"
  ],
  nonFunctional: [
    "requisitos nao funcionais",
    "qualidade tecnica",
    "atributos de qualidade",
    "non functional",
    "metas de engenharia"
  ],
  qualityGoals: [
    "metas de qualidade",
    "objetivos de qualidade",
    "qualidade e cenarios",
    "requisitos de qualidade"
  ],
  notes: ["notas", "observacoes", "comentarios"],
  actionItems: [
    "proximos passos",
    "plano de acao",
    "action items",
    "tarefas pendentes",
    "roadmap inicial"
  ],
  references: ["referencias", "fontes", "documentos de origem"]
};

const TOKEN_SPLITTER = /[:\-–—]\s*/;

function normalizeHeading(value) {
  if (!value) {
    return "";
  }
  return value
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectSectionKey(normalizedHeading) {
  return Object.entries(HEADING_ALIASES).find(([, aliases]) =>
    aliases.some((alias) => normalizedHeading.startsWith(alias))
  )?.[0];
}

function cleanLine(line) {
  return line.replace(/^[\s•*-\u2022]+/, "").trim();
}

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function extractBulletItems(text) {
  if (!text) {
    return [];
  }
  return text
    .split("\n")
    .map((line) => cleanLine(line))
    .filter(Boolean);
}

function parseSections(rawText) {
  const lines = rawText.replace(/\r/g, "").split("\n");
  const sections = {};
  let currentKey = null;
  let buffer = [];

  function commitBuffer() {
    if (currentKey && buffer.length) {
      const content = buffer.join("\n").trim();
      if (content) {
        sections[currentKey] = sections[currentKey]
          ? `${sections[currentKey]}\n${content}`
          : content;
      }
    }
    buffer = [];
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      if (currentKey) {
        buffer.push("");
      }
      return;
    }

    const normalized = normalizeHeading(line);
    const detectedKey = detectSectionKey(normalized);

    if (detectedKey) {
      commitBuffer();
      currentKey = detectedKey;
      const inlineContent = line.split(TOKEN_SPLITTER).slice(1).join(" - ").trim();
      buffer = inlineContent ? [inlineContent] : [];
    } else if (currentKey) {
      buffer.push(line);
    }
  });

  commitBuffer();
  return sections;
}

function deriveKeyFeatures(sections, paragraphs) {
  const featuresSource = sections.features || sections.overview || "";
  const bulletItems = extractBulletItems(featuresSource);
  if (bulletItems.length === 0) {
    const fallbackBullets = paragraphs
      .flatMap((paragraph) =>
        paragraph
          .split("\n")
          .map((line) => cleanLine(line))
          .filter((line) => /^[-*•]/.test(line))
      )
      .map((line) => cleanLine(line));
    bulletItems.push(...fallbackBullets);
  }

  const unique = new Map();
  bulletItems.forEach((item, index) => {
    const [name, description] = item.split(TOKEN_SPLITTER);
    const normalizedName = cleanLine(name || "").toLowerCase();
    if (!normalizedName) {
      return;
    }
    if (!unique.has(normalizedName)) {
      unique.set(normalizedName, {
        id: generateId("feature-ai"),
        name: cleanLine(name || "") || `Funcionalidade ${index + 1}`,
        description: cleanLine(description || ""),
        critical: /critico|critica|essencial|must/i.test(item)
      });
    }
  });

  return Array.from(unique.values());
}

function deriveStakeholders(sections) {
  const stakeholdersSource = sections.stakeholders || sections.audience || "";
  const bulletItems = extractBulletItems(stakeholdersSource);
  if (bulletItems.length === 0) {
    return [];
  }

  return bulletItems.map((item, index) => {
    const [rolePart, expectationPart] = item.split(TOKEN_SPLITTER);
    const areaMatch = /\(([^)]+)\)/.exec(rolePart || "");
    return {
      id: generateId("stakeholder-ai"),
      role: cleanLine((rolePart || "").replace(/\(([^)]+)\)/, "").trim()) ||
        `Stakeholder ${index + 1}`,
      area: cleanLine(areaMatch?.[1] || ""),
      expectations: cleanLine(expectationPart || "")
    };
  });
}

function deriveQualityGoals(sections) {
  const qualitySource = sections.qualityGoals || sections.nonFunctional || "";
  const bulletItems = extractBulletItems(qualitySource);
  if (bulletItems.length === 0) {
    return [];
  }

  return bulletItems.map((item, index) => {
    const [title, rest] = item.split(TOKEN_SPLITTER);
    const safeRest = cleanLine(rest || "");
    const metricMatch = /(?:medir|metricas?|baseline):?\s*(.+)$/i.exec(safeRest);
    const targetMatch = /(?:meta|alvo|target):?\s*(.+)$/i.exec(safeRest);
    return {
      id: generateId("quality-goal-ai"),
      title: cleanLine(title || "") || `Meta de qualidade ${index + 1}`,
      motivation: metricMatch ? cleanLine(safeRest.replace(metricMatch[0], "").trim()) : safeRest,
      metric: cleanLine(metricMatch?.[1] || ""),
      target: cleanLine(targetMatch?.[1] || "")
    };
  });
}

function deriveNonFunctional(sections) {
  const result = {};
  const nonFunctionalSource = sections.nonFunctional || sections.qualityGoals || "";
  if (!nonFunctionalSource) {
    return result;
  }
  const lines = extractBulletItems(nonFunctionalSource);
  lines.forEach((line) => {
    const normalized = normalizeHeading(line);
    if (normalized.includes("desempenho") || normalized.includes("performance")) {
      result.performance = cleanLine(line);
    } else if (normalized.includes("seguranca") || normalized.includes("security")) {
      result.security = cleanLine(line);
    } else if (normalized.includes("disponibilidade") || normalized.includes("availability")) {
      result.availability = cleanLine(line);
    } else if (normalized.includes("escala") || normalized.includes("escalabilidade")) {
      result.scalability = cleanLine(line);
    }
  });
  return result;
}

function deriveSimpleList(source) {
  if (!source) {
    return [];
  }
  return extractBulletItems(source);
}

export function extractIntroductionInsights(rawText, context = {}) {
  const safeText = typeof rawText === "string" ? rawText : String(rawText || "");
  if (!safeText.trim()) {
    return {
      overview: "",
      problem: "",
      audience: "",
      keyFeatures: [],
      stakeholders: [],
      qualityGoals: [],
      nonFunctional: {},
      notes: [],
      actionItems: [],
      source: context.filename || "documento"
    };
  }

  const sections = parseSections(safeText);
  const paragraphs = splitParagraphs(safeText);

  const overview =
    sections.overview || paragraphs[0] || "";
  const problem =
    sections.problem || paragraphs.find((paragraph) =>
      /problema|desafio|dor/i.test(paragraph)
    ) || paragraphs[1] || "";
  const audience =
    sections.audience || sections.stakeholders || paragraphs.find((paragraph) =>
      /usuario|publico|cliente/i.test(paragraph)
    ) || "";

  return {
    overview: overview.trim(),
    problem: problem.trim(),
    audience: audience.trim(),
    keyFeatures: deriveKeyFeatures(sections, paragraphs),
    stakeholders: deriveStakeholders(sections),
    qualityGoals: deriveQualityGoals(sections),
    nonFunctional: deriveNonFunctional(sections),
    notes: deriveSimpleList(sections.notes),
    actionItems: deriveSimpleList(sections.actionItems),
    source: context.filename || "documento"
  };
}

function normalizeValue(value) {
  return value ? value.toString().trim() : "";
}

function ensureArrayOfClones(list) {
  return Array.isArray(list)
    ? list.map((item) => ({ ...item }))
    : [];
}

export function mergeIntroductionWithDraft(current, draft) {
  if (!draft) {
    return {
      nextState: current,
      applied: [],
      skipped: [],
      details: {
        keyFeatures: [],
        stakeholders: [],
        qualityGoals: [],
        nonFunctional: [],
        references: []
      }
    };
  }

  const nextState = {
    ...current,
    nonFunctional: { ...current.nonFunctional },
    keyFeatures: ensureArrayOfClones(current.keyFeatures),
    stakeholders: ensureArrayOfClones(current.stakeholders),
    qualityGoals: ensureArrayOfClones(current.qualityGoals),
    references: ensureArrayOfClones(current.references)
  };

  const applied = new Set();
  const skipped = new Set();
  const details = {
    keyFeatures: [],
    stakeholders: [],
    qualityGoals: [],
    nonFunctional: [],
    references: []
  };

  ["overview", "problem", "audience"].forEach((field) => {
    const incoming = normalizeValue(draft[field]);
    if (!incoming) {
      return;
    }
    const currentValue = normalizeValue(nextState[field]);
    if (currentValue) {
      skipped.add(field);
      return;
    }
    nextState[field] = incoming;
    applied.add(field);
  });

  if (draft.nonFunctional) {
    Object.entries(draft.nonFunctional).forEach(([key, value]) => {
      const incoming = normalizeValue(value);
      if (!incoming) {
        return;
      }
      const currentValue = normalizeValue(nextState.nonFunctional?.[key]);
      if (currentValue) {
        skipped.add(`nonFunctional.${key}`);
        return;
      }
      nextState.nonFunctional[key] = incoming;
      applied.add(`nonFunctional.${key}`);
      details.nonFunctional.push(key);
    });
  }

  if (Array.isArray(draft.keyFeatures) && draft.keyFeatures.length) {
    const existingNames = new Set(
      nextState.keyFeatures.map((feature) => normalizeValue(feature.name).toLowerCase())
    );
    draft.keyFeatures.forEach((feature) => {
      const name = normalizeValue(feature?.name);
      if (!name) {
        return;
      }
      const normalizedName = name.toLowerCase();
      if (existingNames.has(normalizedName)) {
        return;
      }
      existingNames.add(normalizedName);
      nextState.keyFeatures.push({
        id: feature.id || generateId("key-feature"),
        name,
        description: normalizeValue(feature.description),
        critical: Boolean(feature.critical)
      });
      applied.add("keyFeatures");
      details.keyFeatures.push(name);
    });
  }

  if (Array.isArray(draft.stakeholders) && draft.stakeholders.length) {
    const existingRoles = new Set(
      nextState.stakeholders.map((stakeholder) =>
        normalizeValue(stakeholder.role).toLowerCase()
      )
    );
    draft.stakeholders.forEach((stakeholder) => {
      const role = normalizeValue(stakeholder?.role);
      if (!role) {
        return;
      }
      const normalizedRole = role.toLowerCase();
      if (existingRoles.has(normalizedRole)) {
        return;
      }
      existingRoles.add(normalizedRole);
      nextState.stakeholders.push({
        id: stakeholder.id || generateId("stakeholder"),
        role,
        area: normalizeValue(stakeholder.area),
        expectations: normalizeValue(stakeholder.expectations)
      });
      applied.add("stakeholders");
      details.stakeholders.push(role);
    });
  }

  if (Array.isArray(draft.qualityGoals) && draft.qualityGoals.length) {
    const existingGoals = new Set(
      nextState.qualityGoals.map((goal) =>
        normalizeValue(goal.title).toLowerCase()
      )
    );
    draft.qualityGoals.forEach((goal) => {
      const title = normalizeValue(goal?.title);
      if (!title) {
        return;
      }
      const normalizedTitle = title.toLowerCase();
      if (existingGoals.has(normalizedTitle)) {
        return;
      }
      existingGoals.add(normalizedTitle);
      nextState.qualityGoals.push({
        id: goal.id || generateId("quality-goal"),
        title,
        metric: normalizeValue(goal.metric),
        target: normalizeValue(goal.target),
        motivation: normalizeValue(goal.motivation)
      });
      applied.add("qualityGoals");
      details.qualityGoals.push(title);
    });
  }

  if (Array.isArray(draft.references) && draft.references.length) {
    const existingReferences = new Set(
      nextState.references.map((reference) =>
        normalizeValue(reference.name).toLowerCase()
      )
    );
    draft.references.forEach((reference) => {
      const name = normalizeValue(reference?.name);
      const data = normalizeValue(reference?.data);
      if (!name || !data) {
        return;
      }
      const normalizedName = name.toLowerCase();
      if (existingReferences.has(normalizedName)) {
        return;
      }
      existingReferences.add(normalizedName);
      nextState.references.push({
        id: reference.id || generateId("reference"),
        name,
        size: Number(reference.size) || 0,
        type: normalizeValue(reference.type),
        data,
        uploadedAt: reference.uploadedAt || new Date().toISOString()
      });
      applied.add("references");
      details.references.push(name);
    });
  }

  return {
    nextState,
    applied: Array.from(applied),
    skipped: Array.from(skipped),
    details
  };
}

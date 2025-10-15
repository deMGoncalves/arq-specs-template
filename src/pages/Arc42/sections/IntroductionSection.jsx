import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../../components/ui/card.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { Input } from "../../../components/ui/input.jsx";
import { Label } from "../../../components/ui/label.jsx";
import { Textarea } from "../../../components/ui/textarea.jsx";
import { Badge } from "../../../components/ui/badge.jsx";
import { Checkbox } from "../../../components/ui/checkbox.jsx";
import { cn, formatDate } from "../../../lib/utils.js";
import MarkdownPreview from "../../../components/MarkdownPreview.jsx";
import { Drawer } from "../../../components/ui/drawer.jsx";

const STATUS_BADGE = {
  "not-started": { variant: "outline", label: "🔴 Não iniciado" },
  "in-progress": { variant: "warning", label: "🟡 Em progresso" },
  complete: { variant: "success", label: "🟢 Completo" }
};

const OVERVIEW_ITEMS = [
  {
    field: "overview",
    type: "overview",
    title: "Resumo do sistema",
    helper: "Descreva o contexto do produto e sua proposta de valor.",
    emptyMessage: "Inclua um resumo de alto nível para orientar novos leitores."
  },
  {
    field: "problem",
    type: "overview",
    title: "Problema que resolvemos",
    helper: "Explique a dor principal que este sistema elimina.",
    emptyMessage: "Documente o problema para alinhar priorizações."
  },
  {
    field: "audience",
    type: "overview",
    title: "Público-alvo",
    helper: "Liste os perfis que interagem ou se beneficiam diretamente.",
    emptyMessage: "Defina para quem o sistema foi concebido."
  }
];

function generateId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function createFeature(index) {
  return {
    id: `key-feature-${index + 1}`,
    name: "",
    description: "",
    critical: false
  };
}

function createStakeholder(index) {
  return {
    id: `stakeholder-${index + 1}`,
    role: "",
    area: "",
    expectations: ""
  };
}

function createQualityGoal(index) {
  return {
    id: `quality-goal-${index + 1}`,
    title: "",
    motivation: "",
    metric: "",
    target: ""
  };
}

function ensureWithDefaults(list, size, factory) {
  if (size === 0) {
    return Array.isArray(list)
      ? list.map((item, index) => {
          const fallback = factory(index);
          return {
            ...fallback,
            ...item,
            id: item?.id || fallback.id
          };
        })
      : [];
  }

  const source =
    list && list.length
      ? list
      : Array.from({ length: size }, (_, index) => factory(index));
  return source.map((item, index) => {
    const fallback = factory(index);
    return {
      ...fallback,
      ...item,
      id: item?.id || fallback.id
    };
  });
}

function buildIntroductionState(section) {
  const intro = section.introduction || {};
  const normalizedStakeholders = Array.isArray(intro.stakeholders)
    ? intro.stakeholders.map((stakeholder) => ({
        id: stakeholder?.id,
        role: stakeholder?.role || "",
        area: stakeholder?.area || stakeholder?.department || "",
        expectations: stakeholder?.expectations || stakeholder?.notes || ""
      }))
    : [];
  return {
    status: intro.status || "not-started",
    lastUpdated: intro.lastUpdated || "",
    overview: intro.overview || "",
    problem: intro.problem || "",
    audience: intro.audience || "",
    keyFeatures: ensureWithDefaults(intro.keyFeatures, 0, createFeature),
    nonFunctional: {
      performance: intro.nonFunctional?.performance || "",
      security: intro.nonFunctional?.security || "",
      availability: intro.nonFunctional?.availability || "",
      scalability: intro.nonFunctional?.scalability || ""
    },
    stakeholders: ensureWithDefaults(normalizedStakeholders, 0, createStakeholder),
    qualityGoals: ensureWithDefaults(intro.qualityGoals, 3, createQualityGoal),
    references: intro.references || ""
  };
}

function normalizeString(value) {
  return value ? value.trim() : "";
}

function normalizeArray(array, mapper) {
  return Array.isArray(array) ? array.map(mapper) : [];
}

function normalizeIntroductionForSave(state) {
  return {
    overview: normalizeString(state.overview),
    problem: normalizeString(state.problem),
    audience: normalizeString(state.audience),
    keyFeatures: normalizeArray(state.keyFeatures, (feature) => ({
      id: feature.id,
      name: normalizeString(feature.name),
      description: normalizeString(feature.description),
      critical: Boolean(feature.critical)
    })),
    nonFunctional: {
      performance: normalizeString(state.nonFunctional.performance),
      security: normalizeString(state.nonFunctional.security),
      availability: normalizeString(state.nonFunctional.availability),
      scalability: normalizeString(state.nonFunctional.scalability)
    },
    stakeholders: normalizeArray(state.stakeholders, (stakeholder) => ({
      id: stakeholder.id,
      role: normalizeString(stakeholder.role),
      area: normalizeString(stakeholder.area),
      expectations: normalizeString(stakeholder.expectations)
    })),
    qualityGoals: normalizeArray(state.qualityGoals, (goal, index) => ({
      id: goal.id || `quality-goal-${index + 1}`,
      title: normalizeString(goal.title),
      motivation: normalizeString(goal.motivation),
      metric: normalizeString(goal.metric),
      target: normalizeString(goal.target)
    })),
    references: normalizeString(state.references)
  };
}

function hasContent(value) {
  if (value == null) {
    return false;
  }
  if (Array.isArray(value)) {
    return value.some(hasContent);
  }
  if (typeof value === "object") {
    return Object.values(value).some(hasContent);
  }
  return normalizeString(String(value)).length > 0;
}

function determineAutoStatus(introduction, notes, actionItems) {
  const hasAnyContent = [
    introduction.overview,
    introduction.problem,
    introduction.audience,
    introduction.keyFeatures,
    introduction.nonFunctional,
    introduction.stakeholders,
    introduction.qualityGoals,
    introduction.references,
    notes,
    actionItems
  ].some(hasContent);

  return hasAnyContent ? "in-progress" : "not-started";
}

function IntroductionSection({
  section,
  relatedAdrs,
  relatedFeatures,
  relatedContainers,
  relatedComponents,
  onUpdate
}) {
  const [formState, setFormState] = useState(() => buildIntroductionState(section));
  const [notes, setNotes] = useState(section.notes || "");
  const [actionItems, setActionItems] = useState(section.actionItems || []);
  const [newAction, setNewAction] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const skipDirtyCheck = useRef(false);
  const [editorConfig, setEditorConfig] = useState(null);
  const [editorValue, setEditorValue] = useState("");
  const [editorView, setEditorView] = useState("edit");
  const [featureDraft, setFeatureDraft] = useState({
    name: "",
    description: "",
    critical: false
  });
  const [featureEditorView, setFeatureEditorView] = useState("edit");
  const [stakeholderDraft, setStakeholderDraft] = useState({
    role: "",
    area: "",
    expectations: ""
  });
  const [stakeholderEditorView, setStakeholderEditorView] = useState("edit");

  const baselineIntroduction = useMemo(
    () => buildIntroductionState(section),
    [section]
  );
  const baselineSerialized = useMemo(
    () => JSON.stringify(baselineIntroduction),
    [baselineIntroduction]
  );

  useEffect(() => {
    setFormState(baselineIntroduction);
    setNotes(section.notes || "");
    setActionItems(section.actionItems || []);
  }, [baselineIntroduction, section]);

  useEffect(() => {
    if (!editorConfig) {
      return;
    }

    if (editorConfig.mode === "markdown") {
      setEditorView("edit");
      const initialValue = editorConfig.type === "overview"
        ? formState[editorConfig.field] || ""
        : "";
      setEditorValue(initialValue);
    } else if (editorConfig.mode === "feature") {
      const feature = formState.keyFeatures.find(
        (item) => item.id === editorConfig.featureId
      );
      setFeatureDraft({
        name: feature?.name || "",
        description: feature?.description || "",
        critical: Boolean(feature?.critical)
      });
      setFeatureEditorView("edit");
    } else if (editorConfig.mode === "stakeholder") {
      const stakeholder = formState.stakeholders.find(
        (item) => item.id === editorConfig.stakeholderId
      );
      setStakeholderDraft({
        role: stakeholder?.role || "",
        area: stakeholder?.area || "",
        expectations: stakeholder?.expectations || ""
      });
      setStakeholderEditorView("edit");
    }
  }, [editorConfig, formState]);

  useEffect(() => {
    if (skipDirtyCheck.current) {
      skipDirtyCheck.current = false;
      setIsDirty(false);
      return;
    }

    const serializedCurrent = JSON.stringify(formState);
    const originalNotes = section.notes || "";
    const originalActions = section.actionItems || [];
    const hasChanges =
      serializedCurrent !== baselineSerialized ||
      originalNotes !== notes ||
      JSON.stringify(originalActions) !== JSON.stringify(actionItems);
    setIsDirty(hasChanges);
  }, [
    formState,
    notes,
    actionItems,
    baselineSerialized,
    section.notes,
    section.actionItems
  ]);

  function handleFieldChange(field, value) {
    setFormState((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleAddFeature() {
    const newFeature = {
      id: generateId("key-feature"),
      name: "",
      description: "",
      critical: false
    };
    const nextIndex = formState.keyFeatures.length;

    setFormState((current) => ({
      ...current,
      keyFeatures: [...current.keyFeatures, newFeature]
    }));
    setFeatureDraft({ name: "", description: "", critical: false });
    setEditorConfig({
      mode: "feature",
      featureId: newFeature.id,
      title: "Funcionalidade",
      isNew: true,
      index: nextIndex
    });
    setFeatureEditorView("edit");
  }

  function handleOpenFeatureEditor(feature, index = 0) {
    const safeName = feature.name?.trim();
    setEditorConfig({
      mode: "feature",
      featureId: feature.id,
      title: safeName ? `Funcionalidade: ${safeName}` : "Funcionalidade"
    });
    setFeatureDraft({
      name: feature.name || "",
      description: feature.description || "",
      critical: Boolean(feature.critical)
    });
    setFeatureEditorView("edit");
  }

  function handleOpenMarkdownEditor(item) {
    setEditorConfig({
      mode: "markdown",
      type: item.type,
      field: item.field,
      title: item.title
    });
    setEditorView("edit");
  }

  function handleRemoveFeature(featureId) {
    setFormState((current) => ({
      ...current,
      keyFeatures: current.keyFeatures.filter((feature) => feature.id !== featureId)
    }));
    if (editorConfig?.mode === "feature" && editorConfig.featureId === featureId) {
      handleCloseEditor();
    }
  }

  function handleAddStakeholder() {
    const newStakeholder = {
      id: generateId("stakeholder"),
      role: "",
      area: "",
      expectations: ""
    };
    const nextIndex = formState.stakeholders.length;

    setFormState((current) => ({
      ...current,
      stakeholders: [...current.stakeholders, newStakeholder]
    }));
    setStakeholderDraft({
      role: "",
      area: "",
      expectations: ""
    });
    setEditorConfig({
      mode: "stakeholder",
      stakeholderId: newStakeholder.id,
      title: "Stakeholder",
      isNew: true,
      index: nextIndex
    });
    setStakeholderEditorView("edit");
  }

  function handleOpenStakeholderEditor(stakeholder, index = 0) {
    const safeRole = stakeholder.role?.trim();
    setEditorConfig({
      mode: "stakeholder",
      stakeholderId: stakeholder.id,
      title: safeRole ? `Stakeholder: ${safeRole}` : "Stakeholder",
      index
    });
    setStakeholderDraft({
      role: stakeholder.role || "",
      area: stakeholder.area || "",
      expectations: stakeholder.expectations || ""
    });
    setStakeholderEditorView("edit");
  }

  function handleRemoveStakeholder(stakeholderId) {
    setFormState((current) => ({
      ...current,
      stakeholders: current.stakeholders.filter(
        (stakeholder) => stakeholder.id !== stakeholderId
      )
    }));
    if (
      editorConfig?.mode === "stakeholder" &&
      editorConfig.stakeholderId === stakeholderId
    ) {
      handleCloseEditor();
    }
  }

  function handleQualityGoalChange(goalId, field, value) {
    setFormState((current) => ({
      ...current,
      qualityGoals: current.qualityGoals.map((goal) =>
        goal.id === goalId ? { ...goal, [field]: value } : goal
      )
    }));
  }

  function handleAddActionItem() {
    if (!newAction.trim()) {
      return;
    }
    setActionItems((current) => [...current, newAction.trim()]);
    setNewAction("");
  }

  function handleRemoveActionItem(value) {
    setActionItems((current) => current.filter((item) => item !== value));
  }

  function handleSave() {
    const trimmedActions = actionItems.map((item) => item.trim()).filter(Boolean);
    const trimmedNotes = notes.trim();
    const normalizedIntroduction = normalizeIntroductionForSave(formState);
    const derivedStatus = determineAutoStatus(
      normalizedIntroduction,
      trimmedNotes,
      trimmedActions
    );
    const lastUpdated = new Date().toISOString();

    skipDirtyCheck.current = true;
    setFormState((current) => ({
      ...current,
      ...normalizedIntroduction,
      status: derivedStatus,
      lastUpdated
    }));
    setNotes(trimmedNotes);
    setActionItems(trimmedActions);

    onUpdate({
      introduction: {
        ...normalizedIntroduction,
        status: derivedStatus,
        lastUpdated
      },
      notes: trimmedNotes,
      actionItems: trimmedActions
    });
    setIsDirty(false);
  }

  function handleMarkComplete() {
    const trimmedActions = actionItems.map((item) => item.trim()).filter(Boolean);
    const trimmedNotes = notes.trim();
    const normalizedIntroduction = normalizeIntroductionForSave(formState);
    const lastUpdated = new Date().toISOString();

    skipDirtyCheck.current = true;
    setFormState((current) => ({
      ...current,
      ...normalizedIntroduction,
      status: "complete",
      lastUpdated
    }));
    setNotes(trimmedNotes);
    setActionItems(trimmedActions);

    onUpdate({
      introduction: {
        ...normalizedIntroduction,
        status: "complete",
        lastUpdated
      },
      notes: trimmedNotes,
      actionItems: trimmedActions
    });
    setIsDirty(false);
  }

  const normalizedCurrent = normalizeIntroductionForSave(formState);
  const autoStatusPreview = determineAutoStatus(
    normalizedCurrent,
    notes,
    actionItems
  );
  const statusDisplay = STATUS_BADGE[formState.status] || STATUS_BADGE["not-started"];
  const lastUpdatedLabel = formState.lastUpdated
    ? formatDate(formState.lastUpdated)
    : null;
  const canMarkComplete =
    formState.status !== "complete" && autoStatusPreview === "in-progress";
  const markdownInitialValue =
    editorConfig?.mode === "markdown"
      ? editorConfig.type === "overview"
        ? formState[editorConfig.field] || ""
        : ""
      : "";
  const currentFeature =
    editorConfig?.mode === "feature"
      ? formState.keyFeatures.find(
          (feature) => feature.id === editorConfig.featureId
        )
      : null;
  const currentStakeholder =
    editorConfig?.mode === "stakeholder"
      ? formState.stakeholders.find(
          (stakeholder) => stakeholder.id === editorConfig.stakeholderId
        )
      : null;
  const trimmedFeatureDraft = {
    name: featureDraft.name.trim(),
    description: featureDraft.description.trim(),
    critical: Boolean(featureDraft.critical)
  };
  const featureHasChanges =
    editorConfig?.mode === "feature" && currentFeature
      ? trimmedFeatureDraft.name !== (currentFeature.name || "").trim() ||
        trimmedFeatureDraft.description !== (currentFeature.description || "").trim() ||
        trimmedFeatureDraft.critical !== Boolean(currentFeature.critical)
      : false;
  const trimmedStakeholderDraft = {
    role: stakeholderDraft.role.trim(),
    area: stakeholderDraft.area.trim(),
    expectations: stakeholderDraft.expectations.trim()
  };
  const stakeholderHasChanges =
    editorConfig?.mode === "stakeholder" && currentStakeholder
      ? trimmedStakeholderDraft.role !== (currentStakeholder.role || "").trim() ||
        trimmedStakeholderDraft.area !== (currentStakeholder.area || "").trim() ||
        trimmedStakeholderDraft.expectations !== (currentStakeholder.expectations || "").trim()
      : false;
  const editorHasChanges = editorConfig
    ? editorConfig.mode === "markdown"
      ? editorValue !== markdownInitialValue
      : editorConfig.mode === "feature"
        ? featureHasChanges
        : editorConfig.mode === "stakeholder"
          ? stakeholderHasChanges
          : false
    : false;
  const isMarkdownEditor = editorConfig?.mode === "markdown";
  const isFeatureEditor = editorConfig?.mode === "feature";
  const isStakeholderEditor = editorConfig?.mode === "stakeholder";

  function handleCloseEditor() {
    if (editorConfig?.mode === "feature" && editorConfig.isNew) {
      const feature = formState.keyFeatures.find(
        (item) => item.id === editorConfig.featureId
      );
      const shouldRemove =
        !feature?.name?.trim() &&
        !feature?.description?.trim() &&
        !feature?.critical;
      if (shouldRemove) {
        setFormState((current) => ({
          ...current,
          keyFeatures: current.keyFeatures.filter(
            (item) => item.id !== editorConfig.featureId
          )
        }));
      }
    }

    if (editorConfig?.mode === "stakeholder" && editorConfig.isNew) {
      const stakeholder = formState.stakeholders.find(
        (item) => item.id === editorConfig.stakeholderId
      );
      const hasContent = stakeholder
        ? [
            stakeholder.role,
            stakeholder.area,
            stakeholder.expectations
          ].some((value) => normalizeString(value))
        : false;
      if (!hasContent) {
        setFormState((current) => ({
          ...current,
          stakeholders: current.stakeholders.filter(
            (item) => item.id !== editorConfig.stakeholderId
          )
        }));
      }
    }

    setEditorConfig(null);
    setEditorValue("");
    setEditorView("edit");
    setFeatureDraft({ name: "", description: "", critical: false });
    setFeatureEditorView("edit");
    setStakeholderDraft({
      role: "",
      area: "",
      expectations: ""
    });
    setStakeholderEditorView("edit");
  }

  function handleSaveEditor() {
    if (!editorConfig) {
      return;
    }
    if (editorConfig.mode === "markdown") {
      if (editorConfig.type === "overview") {
        handleFieldChange(editorConfig.field, editorValue);
      }
      handleCloseEditor();
      return;
    }

    if (editorConfig.mode === "feature") {
      const { featureId } = editorConfig;
      setFormState((current) => ({
        ...current,
        keyFeatures: current.keyFeatures.map((feature) =>
          feature.id === featureId
            ? {
                ...feature,
                name: trimmedFeatureDraft.name,
                description: trimmedFeatureDraft.description,
                critical: trimmedFeatureDraft.critical
              }
            : feature
        )
      }));
      handleCloseEditor();
      return;
    }

    if (editorConfig.mode === "stakeholder") {
      const { stakeholderId } = editorConfig;
      setFormState((current) => ({
        ...current,
        stakeholders: current.stakeholders.map((stakeholder) =>
          stakeholder.id === stakeholderId
            ? {
                ...stakeholder,
                role: trimmedStakeholderDraft.role,
                area: trimmedStakeholderDraft.area,
                expectations: trimmedStakeholderDraft.expectations
              }
            : stakeholder
        )
      }));
      handleCloseEditor();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
          <Button variant="ghost" size="sm">
            <Link to="/arc42" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold text-foreground">
            {section.order}. {section.title}
          </h1>
          <p className="text-sm text-muted-foreground">{section.description}</p>
          <p className="text-xs text-muted-foreground">
            Caminho no repositório:{" "}
            <a
              href={`/${section.specPath}`}
              className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700"
            >
              {section.specPath} <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
        <Button
          variant={isDirty ? "default" : "ghost"}
          size="sm"
          onClick={handleSave}
          disabled={!isDirty}
        >
          Salvar introspecção
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status do capítulo</CardTitle>
          <CardDescription>
            Status evolui automaticamente conforme o conteúdo. Marque como completo quando finalizar a seção.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Status atual
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant={statusDisplay.variant}>{statusDisplay.label}</Badge>
              {lastUpdatedLabel ? (
                <span className="text-xs text-muted-foreground">
                  Atualizado em {lastUpdatedLabel}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  Ainda não atualizado
                </span>
              )}
            </div>
          </div>
          {formState.status === "complete" ? (
            <p className="text-xs text-muted-foreground">
              Qualquer nova alteração salva nesta tela retornará o status para Em Progresso.
            </p>
          ) : (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleMarkComplete}
              disabled={!canMarkComplete}
            >
              Marcar capítulo como completo
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>1.1 Visão Geral</CardTitle>
          <CardDescription>
            Capture a narrativa principal, o problema endereçado e o público-alvo.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6 space-y-4">
          {OVERVIEW_ITEMS.map((item) => (
            <div
              key={item.field}
              className="group cursor-pointer rounded-lg border border-border bg-muted/20 p-4 transition hover:border-brand-500/60 hover:bg-card"
              role="button"
              tabIndex={0}
              onClick={() => handleOpenMarkdownEditor(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleOpenMarkdownEditor(item);
                }
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.helper}</p>
                </div>
                <span className="text-xs font-medium uppercase tracking-wide text-brand-600 opacity-0 transition group-hover:opacity-100">
                  Editar ↵
                </span>
              </div>
              <div className="mt-3">
                <MarkdownPreview
                  value={formState[item.field]}
                  emptyMessage={item.emptyMessage}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>1.2 Requisitos Fundamentais</CardTitle>
          <CardDescription>
            Defina as funcionalidades centrais e os requisitos não funcionais críticos.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button type="button" size="sm" variant="outline" onClick={handleAddFeature}>
                <Plus className="mr-2 h-4 w-4" />
                Nova funcionalidade
              </Button>
            </div>
            <div className="space-y-3">
              {formState.keyFeatures.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center">
                  <Badge variant="outline">Funcionalidades</Badge>
                  <p className="text-sm text-muted-foreground">
                    Nenhuma funcionalidade cadastrada ainda. Clique em “Nova funcionalidade” para adicionar a primeira.
                  </p>
                  <Button size="sm" variant="outline" onClick={handleAddFeature}>
                    <Plus className="mr-2 h-4 w-4" /> Nova funcionalidade
                  </Button>
                </div>
              ) : (
                formState.keyFeatures.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="group cursor-pointer rounded-lg border border-border bg-muted/20 p-4 transition hover:border-brand-500/60 hover:bg-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleOpenFeatureEditor(feature, index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleOpenFeatureEditor(feature, index);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">
                            {feature.name?.trim() || `Funcionalidade ${index + 1}`}
                          </p>
                          {feature.critical ? (
                            <Badge variant="danger">Crítica</Badge>
                          ) : null}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Clique para editar nome e descrição detalhada.
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRemoveFeature(feature.id);
                        }}
                        aria-label="Remover funcionalidade"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-3">
                      <MarkdownPreview
                        value={feature.description}
                        emptyMessage="Descreva o propósito e o valor entregue por esta funcionalidade."
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>1.3 Stakeholders</CardTitle>
          <CardDescription>
            Identifique papéis, áreas de atuação e expectativas que direcionam o produto.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button type="button" size="sm" variant="outline" onClick={handleAddStakeholder}>
                <Plus className="mr-2 h-4 w-4" />
                Novo stakeholder
              </Button>
            </div>
            <div className="space-y-3">
              {formState.stakeholders.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center">
                  <Badge variant="outline">Stakeholders</Badge>
                  <p className="text-sm text-muted-foreground">
                    Nenhum stakeholder cadastrado. Clique em “Novo stakeholder” para documentar papéis, áreas e expectativas.
                  </p>
                  <Button size="sm" variant="outline" onClick={handleAddStakeholder}>
                    <Plus className="mr-2 h-4 w-4" /> Novo stakeholder
                  </Button>
                </div>
              ) : (
                formState.stakeholders.map((stakeholder, index) => (
                  <div
                    key={stakeholder.id}
                    className="group cursor-pointer rounded-lg border border-border bg-muted/20 p-4 transition hover:border-brand-500/60 hover:bg-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleOpenStakeholderEditor(stakeholder, index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleOpenStakeholderEditor(stakeholder, index);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">
                          {stakeholder.role?.trim() || `Stakeholder ${index + 1}`}
                        </p>
                        {stakeholder.area?.trim() ? (
                          <Badge variant="outline">{stakeholder.area.trim()}</Badge>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            Informe a área para reforçar o contexto organizacional.
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Clique para editar papel, área e expectativas de envolvimento.
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRemoveStakeholder(stakeholder.id);
                        }}
                        aria-label="Remover stakeholder"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-3">
                      <MarkdownPreview
                        value={stakeholder.expectations}
                        emptyMessage="Capture expectativas, compromissos e indicadores de sucesso esperados."
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>1.4 Objetivos de Qualidade (Top 3)</CardTitle>
          <CardDescription>
            Liste os objetivos prioritários, por que importam e como serão medidos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formState.qualityGoals.map((goal, index) => (
            <div
              key={goal.id}
              className="rounded-lg border border-border p-4"
            >
              <p className="text-sm font-semibold text-foreground">
                {["🥇", "🥈", "🥉"][index] || "🎯"} Objetivo Prioritário {index + 1}
              </p>
              <div className="mt-3 grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-1 space-y-2">
                  <Label htmlFor={`${goal.id}-title`}>Título</Label>
                  <Input
                    id={`${goal.id}-title`}
                    value={goal.title}
                    onChange={(event) =>
                      handleQualityGoalChange(goal.id, "title", event.target.value)
                    }
                  />
                </div>
                <div className="lg:col-span-1 space-y-2">
                  <Label htmlFor={`${goal.id}-metric`}>Métrica</Label>
                  <Input
                    id={`${goal.id}-metric`}
                    value={goal.metric}
                    onChange={(event) =>
                      handleQualityGoalChange(goal.id, "metric", event.target.value)
                    }
                  />
                </div>
                <div className="lg:col-span-1 space-y-2">
                  <Label htmlFor={`${goal.id}-target`}>Meta</Label>
                  <Input
                    id={`${goal.id}-target`}
                    value={goal.target}
                    onChange={(event) =>
                      handleQualityGoalChange(goal.id, "target", event.target.value)
                    }
                  />
                </div>
                <div className="lg:col-span-3 space-y-2">
                  <Label htmlFor={`${goal.id}-motivation`}>Motivação</Label>
                  <Textarea
                    id={`${goal.id}-motivation`}
                    value={goal.motivation}
                    onChange={(event) =>
                      handleQualityGoalChange(
                        goal.id,
                        "motivation",
                        event.target.value
                      )
                    }
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Referências</CardTitle>
          <CardDescription>
            Aponte documentos externos, RFCs ou fontes que embasam esta visão.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formState.references}
            onChange={(event) => handleFieldChange("references", event.target.value)}
            rows={3}
            placeholder="Cole URLs, caminhos de repositório ou documentos relacionados."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notas complementares</CardTitle>
          <CardDescription>
            Use este espaço para registrar pendências e próximos passos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="introduction-notes">Notas principais</Label>
            <Textarea
              id="introduction-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-3">
            <Label>Próximas ações</Label>
            <div className="flex gap-2">
              <Input
                value={newAction}
                placeholder="Ex: Validar objetivo de qualidade com o time de produto"
                onChange={(event) => setNewAction(event.target.value)}
              />
              <Button type="button" variant="outline" onClick={handleAddActionItem}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {actionItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Adicione atividades para evoluir a introdução.
                </p>
              ) : null}
              {actionItems.map((item) => (
                <Badge
                  key={item}
                  variant="neutral"
                  className="group inline-flex items-center gap-2"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveActionItem(item)}
                    className="text-muted-foreground transition group-hover:text-foreground"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Decisões relacionadas</CardTitle>
            <CardDescription>
              ADRs conectadas a esta visão inicial.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {relatedAdrs.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Vincule uma decisão arquitetural a esta seção para rastrear impacto.
              </p>
            ) : (
              relatedAdrs.map((adr) => (
                <div
                  key={adr.id}
                  className="rounded-lg border border-border p-4 text-sm text-muted-foreground"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-foreground">{adr.title}</p>
                    <Badge
                      variant={adr.status === "accepted" ? "success" : "warning"}
                    >
                      {adr.status}
                    </Badge>
                  </div>
                  <p className="mt-1">{adr.context}</p>
                  <div className="mt-3 flex justify-end">
                    <Button variant="ghost" size="sm">
                      <Link
                        to={`/adrs/${adr.id}`}
                        className="flex w-full items-center justify-center"
                      >
                        Abrir ADR
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cenários BDD conectados</CardTitle>
            <CardDescription>
              Fluxos comportamentais que dependem desta visão.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {relatedFeatures.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Crie ou vincule cenários BDD para tornar esta seção verificável.
              </p>
            ) : (
              relatedFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="rounded-lg border border-border p-4 text-sm text-muted-foreground"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-foreground">
                      {feature.reference} • {feature.title}
                    </p>
                    <Badge variant="outline">
                      {feature.scenarios.length} cenários
                    </Badge>
                  </div>
                  <p className="mt-1">{feature.narrative}</p>
                  <div className="mt-3 flex justify-end">
                    <Button variant="ghost" size="sm">
                      <Link
                        to={`/bdd/${feature.id}`}
                        className="flex w-full items-center justify-center"
                      >
                        Abrir feature
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>C4 Model</CardTitle>
          <CardDescription>
            Containers e componentes associados a esta visão.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Containers
            </h3>
            {relatedContainers.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Vincule containers que implementam esta decisão.
              </p>
            ) : (
              relatedContainers.map((container) => (
                <div
                  key={container.id}
                  className="rounded-lg border border-border p-4 text-sm text-muted-foreground"
                >
                  <p className="font-semibold text-foreground">{container.name}</p>
                  <p>Tech: {container.technology}</p>
                  <p>{container.responsibility}</p>
                </div>
              ))
            )}
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Componentes
            </h3>
            {relatedComponents.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum componente vinculado ainda.
              </p>
            ) : (
              relatedComponents.map((component) => (
                <div
                  key={component.id}
                  className="rounded-lg border border-border p-4 text-sm text-muted-foreground"
                >
                  <p className="font-semibold text-foreground">
                    {component.name}
                  </p>
                  <p>{component.responsibility}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Drawer
        open={Boolean(editorConfig)}
        onClose={handleCloseEditor}
        title={editorConfig?.title}
        description={isFeatureEditor
          ? "Defina nome, criticidade e narrativa. A descrição aceita Markdown."
          : isStakeholderEditor
            ? "Atualize papel, contatos e expectativas. A seção de expectativas aceita Markdown."
            : "Use Markdown para destacar termos (**negrito**, _itálico_, listas com '-')."}
        footer={(
          <div className="flex flex-wrap items-center justify-end gap-2">
            {isFeatureEditor ? (
              <Button
                type="button"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => editorConfig?.featureId && handleRemoveFeature(editorConfig.featureId)}
              >
                Remover
              </Button>
            ) : null}
            {isStakeholderEditor ? (
              <Button
                type="button"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => editorConfig?.stakeholderId && handleRemoveStakeholder(editorConfig.stakeholderId)}
              >
                Remover
              </Button>
            ) : null}
            <Button type="button" variant="ghost" onClick={handleCloseEditor}>
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSaveEditor}
              disabled={!editorHasChanges}
            >
              Salvar conteúdo
            </Button>
          </div>
        )}
      >
        <div className="space-y-4">
          {isFeatureEditor ? (
            <div className="space-y-4" id="feature-editor">
              <div className="space-y-2">
                <Label htmlFor="feature-name" className="text-sm font-semibold text-foreground">
                  Nome da funcionalidade
                </Label>
                <Input
                  id="feature-name"
                  value={featureDraft.name}
                  onChange={(event) =>
                    setFeatureDraft((current) => ({
                      ...current,
                      name: event.target.value
                    }))
                  }
                  placeholder="Ex: Mapa estratégico de stakeholders"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="feature-description" className="text-sm font-semibold text-foreground">
                    Descrição detalhada
                  </Label>
                  <div className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 p-1">
                    <button
                      type="button"
                      className={cn(
                        "rounded-sm px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                        featureEditorView === "edit"
                          ? "bg-brand-500 text-white shadow-soft"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setFeatureEditorView("edit")}
                    >
                      Escrita
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "rounded-sm px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                        featureEditorView === "preview"
                          ? "bg-brand-500 text-white shadow-soft"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setFeatureEditorView("preview")}
                    >
                      Pré-visualização
                    </button>
                  </div>
                </div>
                {featureEditorView === "edit" ? (
                  <>
                    <Textarea
                      id="feature-description"
                      value={featureDraft.description}
                      onChange={(event) =>
                        setFeatureDraft((current) => ({
                          ...current,
                          description: event.target.value
                        }))
                      }
                      rows={14}
                      placeholder="Explique a jornada do usuário, fluxos principais e métricas de sucesso."
                      className="min-h-[260px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Aceita Markdown básico para destacar casos de uso, fluxos e SLAs.
                    </p>
                  </>
                ) : (
                  <div className="rounded-lg border border-dashed border-border p-4">
                    <MarkdownPreview
                      value={featureDraft.description}
                      emptyMessage="Pré-visualização disponível após adicionar conteúdo."
                    />
                  </div>
                )}
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="feature-critical"
                  checked={featureDraft.critical}
                  onChange={(event) =>
                    setFeatureDraft((current) => ({
                      ...current,
                      critical: event.target.checked
                    }))
                  }
                />
                <div>
                  <Label htmlFor="feature-critical" className="text-sm font-semibold text-foreground">
                    Marcar como funcionalidade crítica
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Utilize para itens que bloqueiam releases ou impactam diretamente o core do produto.
                  </p>
                </div>
              </div>
            </div>
          ) : isStakeholderEditor ? (
            <div className="space-y-4" id="stakeholder-editor">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="stakeholder-role" className="text-sm font-semibold text-foreground">
                    Papel
                  </Label>
                  <Input
                    id="stakeholder-role"
                    value={stakeholderDraft.role}
                    onChange={(event) =>
                      setStakeholderDraft((current) => ({
                        ...current,
                        role: event.target.value
                      }))
                    }
                    placeholder="Ex: Product Owner"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stakeholder-area" className="text-sm font-semibold text-foreground">
                    Área
                  </Label>
                  <Input
                    id="stakeholder-area"
                    value={stakeholderDraft.area}
                    onChange={(event) =>
                      setStakeholderDraft((current) => ({
                        ...current,
                        area: event.target.value
                      }))
                    }
                    placeholder="Ex: Estratégia Corporativa"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="stakeholder-expectations" className="text-sm font-semibold text-foreground">
                    Expectativas
                  </Label>
                  <div className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 p-1">
                    <button
                      type="button"
                      className={cn(
                        "rounded-sm px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                        stakeholderEditorView === "edit"
                          ? "bg-brand-500 text-white shadow-soft"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setStakeholderEditorView("edit")}
                    >
                      Escrita
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "rounded-sm px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                        stakeholderEditorView === "preview"
                          ? "bg-brand-500 text-white shadow-soft"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setStakeholderEditorView("preview")}
                    >
                      Pré-visualização
                    </button>
                  </div>
                </div>
                {stakeholderEditorView === "edit" ? (
                  <>
                    <Textarea
                      id="stakeholder-expectations"
                      value={stakeholderDraft.expectations}
                      onChange={(event) =>
                        setStakeholderDraft((current) => ({
                          ...current,
                          expectations: event.target.value
                        }))
                      }
                      rows={12}
                      className="min-h-[220px]"
                      placeholder="Descreva expectativas, indicadores de sucesso, rituais e riscos percebidos."
                    />
                    <p className="text-xs text-muted-foreground">
                      Aceita Markdown para bullet points, destaques e links úteis.
                    </p>
                  </>
                ) : (
                  <div className="rounded-lg border border-dashed border-border p-4">
                    <MarkdownPreview
                      value={stakeholderDraft.expectations}
                      emptyMessage="Pré-visualização disponível após adicionar conteúdo."
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="markdown-editor" className="text-sm font-semibold text-foreground">
                  Conteúdo
                </Label>
                <div className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 p-1">
                  <button
                    type="button"
                    className={cn(
                      "rounded-sm px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                      editorView === "edit"
                        ? "bg-brand-500 text-white shadow-soft"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setEditorView("edit")}
                  >
                    Escrita
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "rounded-sm px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                      editorView === "preview"
                        ? "bg-brand-500 text-white shadow-soft"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setEditorView("preview")}
                  >
                    Pré-visualização
                  </button>
                </div>
              </div>
              {editorView === "edit" ? (
                <>
                  <Textarea
                    id="markdown-editor"
                    value={editorValue}
                    onChange={(event) => setEditorValue(event.target.value)}
                    rows={14}
                    placeholder="Escreva aqui usando Markdown..."
                    className="min-h-[260px]"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Exemplos: <code>**negrito**</code>, <code>_ênfase_</code>, <code>- item de lista</code>, <code>`trecho de código`</code>.
                  </p>
                </>
              ) : (
                <div className="rounded-lg border border-dashed border-border p-4">
                  <MarkdownPreview
                    value={editorValue}
                    emptyMessage="Pré-visualização disponível após adicionar conteúdo."
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default IntroductionSection;

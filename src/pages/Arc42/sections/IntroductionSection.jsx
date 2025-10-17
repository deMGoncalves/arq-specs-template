import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Download, ExternalLink, FileText, Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../../components/ui/card.jsx";
import { Button, buttonVariants } from "../../../components/ui/button.jsx";
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

function formatFileSize(bytes) {
  const numericValue = Number(bytes);
  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return "0 B";
  }
  const units = ["B", "KB", "MB", "GB"];
  let size = numericValue;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  const formatted =
    unitIndex === 0 ? Math.round(size).toString() : size.toFixed(1);
  return `${formatted.replace(".0", "")} ${units[unitIndex]}`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("Falha ao ler arquivo"));
    reader.readAsDataURL(file);
  });
}

function createReferenceFromLegacyText(text, lastUpdated) {
  const safeText = String(text || "");
  if (!safeText.trim()) {
    return null;
  }
  let size = safeText.length;
  if (typeof TextEncoder !== "undefined") {
    size = new TextEncoder().encode(safeText).length;
  }
  return {
    id: generateId("reference"),
    name: "referencias.txt",
    size,
    type: "text/plain",
    data: `data:text/plain;charset=utf-8,${encodeURIComponent(safeText)}`,
    uploadedAt: lastUpdated || new Date().toISOString()
  };
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

function buildNoteItems(rawNotes) {
  if (!rawNotes) {
    return [];
  }
  if (Array.isArray(rawNotes)) {
    return rawNotes
      .map((note) => normalizeString(note))
      .filter(Boolean);
  }
  return String(rawNotes)
    .split("\n")
    .map((item) => normalizeString(item))
    .filter(Boolean);
}

function serializeNoteItems(items) {
  return items
    .map((item) => normalizeString(item))
    .filter(Boolean)
    .join("\n");
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
  const normalizedQualityGoals = Array.isArray(intro.qualityGoals)
    ? intro.qualityGoals
        .map((goal) => ({
          id: goal?.id,
          title: goal?.title || goal?.name || "",
          metric: goal?.metric || goal?.measurement || "",
          target: goal?.target || goal?.goal || "",
          motivation: goal?.motivation || goal?.rationale || ""
        }))
        .filter((goal) =>
          [goal.title, goal.metric, goal.target, goal.motivation].some((value) =>
            normalizeString(value)
          )
        )
    : [];
  const legacyReference = createReferenceFromLegacyText(intro.references, intro.lastUpdated);
  const normalizedReferences = Array.isArray(intro.references)
    ? intro.references
        .map((reference, index) => ({
          id: reference?.id || generateId("reference"),
          name: reference?.name || `referencia-${index + 1}`,
          size: Number(reference?.size) || 0,
          type: reference?.type || "",
          data: reference?.data || "",
          uploadedAt: reference?.uploadedAt || reference?.createdAt || ""
        }))
        .filter(
          (reference) => normalizeString(reference.name) && normalizeString(reference.data)
        )
    : legacyReference
      ? [legacyReference]
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
    qualityGoals: ensureWithDefaults(normalizedQualityGoals, 0, createQualityGoal),
    references: normalizedReferences
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
    })).filter((goal) =>
      [goal.title, goal.metric, goal.target, goal.motivation].some(Boolean)
    ),
    references: Array.isArray(state.references)
      ? state.references
          .map((reference, index) => ({
            id: reference.id || `reference-${index + 1}`,
            name: normalizeString(reference.name),
            size: Number(reference.size) || 0,
            type: normalizeString(reference.type),
            data: typeof reference.data === "string" ? reference.data : "",
            uploadedAt: reference.uploadedAt || ""
          }))
          .filter(
            (reference) => reference.name && reference.data
          )
      : []
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
  onUpdate
}) {
  const [formState, setFormState] = useState(() => buildIntroductionState(section));
  const [noteItems, setNoteItems] = useState(() => buildNoteItems(section.notes));
  const [newNote, setNewNote] = useState("");
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [actionItems, setActionItems] = useState(section.actionItems || []);
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
  const [qualityGoalDraft, setQualityGoalDraft] = useState({
    title: "",
    metric: "",
    target: "",
    motivation: ""
  });
  const [qualityGoalEditorView, setQualityGoalEditorView] = useState("edit");
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const baselineIntroduction = useMemo(
    () => buildIntroductionState(section),
    [section]
  );
  const baselineSerialized = useMemo(
    () => JSON.stringify(baselineIntroduction),
    [baselineIntroduction]
  );
  const baselineNotes = useMemo(
    () => buildNoteItems(section.notes),
    [section.notes]
  );
  const baselineNotesSerialized = useMemo(
    () => JSON.stringify(baselineNotes),
    [baselineNotes]
  );

  useEffect(() => {
    setFormState(baselineIntroduction);
    setNoteItems(buildNoteItems(section.notes));
    setNewNote("");
    setEditingNoteIndex(null);
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
    } else if (editorConfig.mode === "quality-goal") {
      const qualityGoal = formState.qualityGoals.find(
        (item) => item.id === editorConfig.qualityGoalId
      );
      setQualityGoalDraft({
        title: qualityGoal?.title || "",
        metric: qualityGoal?.metric || "",
        target: qualityGoal?.target || "",
        motivation: qualityGoal?.motivation || ""
      });
      setQualityGoalEditorView("edit");
    }
  }, [editorConfig, formState]);

  useEffect(() => {
    if (skipDirtyCheck.current) {
      skipDirtyCheck.current = false;
      setIsDirty(false);
      return;
    }

    const serializedCurrent = JSON.stringify(formState);
    const currentNotesSerialized = JSON.stringify(
      noteItems.map((item) => item.trim()).filter(Boolean)
    );
    const originalActions = section.actionItems || [];
    const hasChanges =
      serializedCurrent !== baselineSerialized ||
      currentNotesSerialized !== baselineNotesSerialized ||
      JSON.stringify(originalActions) !== JSON.stringify(actionItems);
    setIsDirty(hasChanges);
  }, [
    formState,
    noteItems,
    actionItems,
    baselineSerialized,
    baselineNotesSerialized,
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

  function handleAddQualityGoal() {
    const newQualityGoal = {
      id: generateId("quality-goal"),
      title: "",
      metric: "",
      target: "",
      motivation: ""
    };
    const nextIndex = formState.qualityGoals.length;

    setFormState((current) => ({
      ...current,
      qualityGoals: [...current.qualityGoals, newQualityGoal]
    }));
    setQualityGoalDraft({
      title: "",
      metric: "",
      target: "",
      motivation: ""
    });
    setEditorConfig({
      mode: "quality-goal",
      qualityGoalId: newQualityGoal.id,
      title: "Objetivo de qualidade",
      isNew: true,
      index: nextIndex
    });
    setQualityGoalEditorView("edit");
  }

  function handleOpenQualityGoalEditor(goal, index = 0) {
    const safeTitle = goal.title?.trim();
    setEditorConfig({
      mode: "quality-goal",
      qualityGoalId: goal.id,
      title: safeTitle ? `Objetivo de qualidade: ${safeTitle}` : "Objetivo de qualidade",
      index
    });
    setQualityGoalDraft({
      title: goal.title || "",
      metric: goal.metric || "",
      target: goal.target || "",
      motivation: goal.motivation || ""
    });
    setQualityGoalEditorView("edit");
  }

  function handleRemoveQualityGoal(goalId) {
    setFormState((current) => ({
      ...current,
      qualityGoals: current.qualityGoals.filter((goal) => goal.id !== goalId)
    }));
    if (
      editorConfig?.mode === "quality-goal" &&
      editorConfig.qualityGoalId === goalId
    ) {
      handleCloseEditor();
    }
  }

  function handleReferencePicker() {
    fileInputRef.current?.click();
  }

  async function handleReferenceUpload(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) {
      return;
    }
    setIsUploading(true);
    try {
      const uploads = await Promise.all(
        files.map(async (file) => {
          const data = await readFileAsDataUrl(file);
          return {
            id: generateId("reference"),
            name: file.name,
            size: file.size,
            type: file.type,
            data,
            uploadedAt: new Date().toISOString()
          };
        })
      );
      setFormState((current) => ({
        ...current,
        references: [...current.references, ...uploads]
      }));
    } catch (error) {
      console.error("Falha ao processar upload de referências", error);
    } finally {
      setIsUploading(false);
    }
  }

  function handleReferenceInputChange(event) {
    handleReferenceUpload(event.target.files);
    event.target.value = "";
  }

  function handleReferenceDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    if (isUploading) {
      return;
    }
    handleReferenceUpload(event.dataTransfer.files);
  }

  function handleReferenceDragOver(event) {
    event.preventDefault();
    if (!isDragging) {
      setIsDragging(true);
    }
  }

  function handleReferenceDragLeave(event) {
    event.preventDefault();
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    setIsDragging(false);
  }

  function handleReferenceRemove(referenceId) {
    setFormState((current) => ({
      ...current,
      references: current.references.filter((reference) => reference.id !== referenceId)
    }));
  }

  function handleSubmitNote() {
    const value = newNote.trim();
    if (!value) {
      return;
    }
    if (editingNoteIndex !== null) {
      setNoteItems((current) =>
        current.map((item, index) => (index === editingNoteIndex ? value : item))
      );
    } else {
      setNoteItems((current) => [...current, value]);
    }
    setNewNote("");
    setEditingNoteIndex(null);
  }

  function handleEditNote(index) {
    const note = noteItems[index];
    setNewNote(note);
    setEditingNoteIndex(index);
  }

  function handleCancelNoteEdit() {
    setNewNote("");
    setEditingNoteIndex(null);
  }

  function handleRemoveNote(index) {
    setNoteItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
    if (editingNoteIndex === index) {
      setNewNote("");
      setEditingNoteIndex(null);
    }
  }

  function handleSave() {
    const trimmedActions = actionItems.map((item) => item.trim()).filter(Boolean);
    const normalizedNotes = serializeNoteItems(noteItems);
    const cleanedNoteItems = buildNoteItems(normalizedNotes);
    const normalizedIntroduction = normalizeIntroductionForSave(formState);
    const derivedStatus = determineAutoStatus(
      normalizedIntroduction,
      normalizedNotes,
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
    setNoteItems(cleanedNoteItems);
    setActionItems(trimmedActions);

    onUpdate({
      introduction: {
        ...normalizedIntroduction,
        status: derivedStatus,
        lastUpdated
      },
      notes: normalizedNotes,
      actionItems: trimmedActions
    });
    setIsDirty(false);
  }

  function handleMarkComplete() {
    const trimmedActions = actionItems.map((item) => item.trim()).filter(Boolean);
    const normalizedNotes = serializeNoteItems(noteItems);
    const cleanedNoteItems = buildNoteItems(normalizedNotes);
    const normalizedIntroduction = normalizeIntroductionForSave(formState);
    const lastUpdated = new Date().toISOString();

    skipDirtyCheck.current = true;
    setFormState((current) => ({
      ...current,
      ...normalizedIntroduction,
      status: "complete",
      lastUpdated
    }));
    setNoteItems(cleanedNoteItems);
    setActionItems(trimmedActions);

    onUpdate({
      introduction: {
        ...normalizedIntroduction,
        status: "complete",
        lastUpdated
      },
      notes: normalizedNotes,
      actionItems: trimmedActions
    });
    setIsDirty(false);
  }

  const normalizedCurrent = normalizeIntroductionForSave(formState);
  const autoStatusPreview = determineAutoStatus(
    normalizedCurrent,
    serializeNoteItems(noteItems),
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
  const currentQualityGoal =
    editorConfig?.mode === "quality-goal"
      ? formState.qualityGoals.find(
          (goal) => goal.id === editorConfig.qualityGoalId
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
  const trimmedQualityGoalDraft = {
    title: qualityGoalDraft.title.trim(),
    metric: qualityGoalDraft.metric.trim(),
    target: qualityGoalDraft.target.trim(),
    motivation: qualityGoalDraft.motivation.trim()
  };
  const qualityGoalHasChanges =
    editorConfig?.mode === "quality-goal" && currentQualityGoal
      ? trimmedQualityGoalDraft.title !== (currentQualityGoal.title || "").trim() ||
        trimmedQualityGoalDraft.metric !== (currentQualityGoal.metric || "").trim() ||
        trimmedQualityGoalDraft.target !== (currentQualityGoal.target || "").trim() ||
        trimmedQualityGoalDraft.motivation !== (currentQualityGoal.motivation || "").trim()
      : false;
  const editorHasChanges = editorConfig
    ? editorConfig.mode === "markdown"
      ? editorValue !== markdownInitialValue
      : editorConfig.mode === "feature"
        ? featureHasChanges
        : editorConfig.mode === "stakeholder"
          ? stakeholderHasChanges
          : editorConfig.mode === "quality-goal"
            ? qualityGoalHasChanges
            : false
    : false;
  const isMarkdownEditor = editorConfig?.mode === "markdown";
  const isFeatureEditor = editorConfig?.mode === "feature";
  const isStakeholderEditor = editorConfig?.mode === "stakeholder";
  const isQualityGoalEditor = editorConfig?.mode === "quality-goal";

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

    if (editorConfig?.mode === "quality-goal" && editorConfig.isNew) {
      const goal = formState.qualityGoals.find(
        (item) => item.id === editorConfig.qualityGoalId
      );
      const hasContent = goal
        ? [
            goal.title,
            goal.metric,
            goal.target,
            goal.motivation
          ].some((value) => normalizeString(value))
        : false;
      if (!hasContent) {
        setFormState((current) => ({
          ...current,
          qualityGoals: current.qualityGoals.filter(
            (item) => item.id !== editorConfig.qualityGoalId
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
    setQualityGoalDraft({
      title: "",
      metric: "",
      target: "",
      motivation: ""
    });
    setQualityGoalEditorView("edit");
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
      return;
    }

    if (editorConfig.mode === "quality-goal") {
      const { qualityGoalId } = editorConfig;
      setFormState((current) => ({
        ...current,
        qualityGoals: current.qualityGoals.map((goal) =>
          goal.id === qualityGoalId
            ? {
                ...goal,
                title: trimmedQualityGoalDraft.title,
                metric: trimmedQualityGoalDraft.metric,
                target: trimmedQualityGoalDraft.target,
                motivation: trimmedQualityGoalDraft.motivation
              }
            : goal
        )
      }));
      handleCloseEditor();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
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
          <CardTitle>1.4 Objetivos de Qualidade</CardTitle>
          <CardDescription>
            Liste os objetivos prioritários, por que importam e como serão medidos.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button type="button" size="sm" variant="outline" onClick={handleAddQualityGoal}>
                <Plus className="mr-2 h-4 w-4" />
                Novo objetivo
              </Button>
            </div>
            <div className="space-y-3">
              {formState.qualityGoals.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center">
                  <Badge variant="outline">Objetivos de qualidade</Badge>
                  <p className="text-sm text-muted-foreground">
                    Nenhum objetivo cadastrado. Utilize “Novo objetivo” para registrar metas prioritárias e seus indicadores.
                  </p>
                  <Button size="sm" variant="outline" onClick={handleAddQualityGoal}>
                    <Plus className="mr-2 h-4 w-4" /> Novo objetivo
                  </Button>
                </div>
              ) : (
                formState.qualityGoals.map((goal, index) => {
                  const goalTitle = goal.title?.trim() || `Objetivo ${index + 1}`;
                  const metric = goal.metric?.trim();
                  const target = goal.target?.trim();
                  return (
                    <div
                      key={goal.id}
                      className="group cursor-pointer rounded-lg border border-border bg-muted/20 p-4 transition hover:border-brand-500/60 hover:bg-card"
                      role="button"
                      tabIndex={0}
                      onClick={() => handleOpenQualityGoalEditor(goal, index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleOpenQualityGoalEditor(goal, index);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-foreground">
                              {goalTitle}
                            </p>
                            {metric ? <Badge variant="outline">{metric}</Badge> : null}
                          </div>
                          {target ? (
                            <p className="text-xs text-muted-foreground">Meta: {target}</p>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              Informe a meta para deixar o objetivo mensurável.
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Clique para revisar título, métrica, meta e motivação detalhada.
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleRemoveQualityGoal(goal.id);
                          }}
                          aria-label="Remover objetivo de qualidade"
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-3">
                        <MarkdownPreview
                          value={goal.motivation}
                          emptyMessage="Descreva a motivação: riscos mitigados, expectativas de stakeholders e critérios de aceitação."
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Referências</CardTitle>
          <CardDescription>
            Aponte documentos externos, RFCs ou fontes que embasam esta visão.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            role="button"
            tabIndex={0}
            onClick={handleReferencePicker}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleReferencePicker();
              }
            }}
            onDrop={handleReferenceDrop}
            onDragOver={handleReferenceDragOver}
            onDragLeave={handleReferenceDragLeave}
            className={cn(
              "flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-muted/20 text-center transition",
              isDragging ? "border-brand-500 bg-brand-50/60 text-brand-600" : "hover:border-brand-500/60 hover:bg-card"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleReferenceInputChange}
            />
            <p className="text-sm font-semibold text-foreground">
              Arraste e solte arquivos ou clique para selecionar
            </p>
            <p className="text-xs text-muted-foreground">
              Anexe PDFs, imagens ou documentos que reforcem o racional arquitetural.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading}
              onClick={(event) => {
                event.stopPropagation();
                handleReferencePicker();
              }}
            >
              {isUploading ? "Processando..." : "Selecionar arquivos"}
            </Button>
          </div>
          <div className="space-y-3">
            {formState.references.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum arquivo anexado ainda. Utilize o upload para manter rastreabilidade com as fontes consultadas.
              </p>
            ) : (
              formState.references.map((reference) => (
                <div
                  key={reference.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-md bg-card p-2">
                      <FileText className="h-4 w-4 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {reference.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(reference.size)} • {reference.type || "Tipo desconhecido"}
                      </p>
                      {reference.uploadedAt ? (
                        <p className="text-xs text-muted-foreground">
                          Enviado em {formatDate(reference.uploadedAt)}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {reference.data ? (
                      <a
                        href={reference.data}
                        download={reference.name}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "text-muted-foreground hover:text-brand-600"
                        )}
                        aria-label={`Baixar ${reference.name}`}
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    ) : null}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleReferenceRemove(reference.id)}
                      aria-label={`Remover ${reference.name}`}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
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
            <Label htmlFor="introduction-new-note">
              {editingNoteIndex !== null ? "Editar nota selecionada" : "Adicionar nova nota"}
            </Label>
            <Textarea
              id="introduction-new-note"
              value={newNote}
              onChange={(event) => setNewNote(event.target.value)}
              rows={3}
              placeholder="Ex: Alinhar expectativas com o time de vendas na próxima coletiva."
            />
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSubmitNote}
                disabled={!newNote.trim()}
              >
                {editingNoteIndex !== null ? "Atualizar nota" : "Adicionar nota"}
              </Button>
              {editingNoteIndex !== null ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelNoteEdit}
                >
                  Cancelar edição
                </Button>
              ) : null}
            </div>
          </div>
          <div className="space-y-3">
            {noteItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhuma nota registrada ainda. Capture aprendizados rápidos, riscos emergentes ou lembretes relacionados à introdução.
              </p>
            ) : (
              noteItems.map((note, index) => (
                <div
                  key={`note-${index}`}
                  className="space-y-2 rounded-lg border border-border bg-muted/30 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Nota {index + 1}</p>
                      <p className="text-xs text-muted-foreground">
                        Clique em editar para ajustar o texto ou remover se a nota deixar de fazer sentido.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditNote(index)}
                      >
                        Editar
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveNote(index)}
                        aria-label={`Remover nota ${index + 1}`}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border border-dashed border-border bg-card/70 p-3">
                    <MarkdownPreview value={note} emptyMessage="Nota vazia" />
                  </div>
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
            ? "Atualize papel, área e expectativas. A seção de expectativas aceita Markdown."
            : isQualityGoalEditor
              ? "Documente objetivo, métrica, meta e motivação. A motivação aceita Markdown."
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
            {isQualityGoalEditor ? (
              <Button
                type="button"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => editorConfig?.qualityGoalId && handleRemoveQualityGoal(editorConfig.qualityGoalId)}
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
          ) : isQualityGoalEditor ? (
            <div className="space-y-4" id="quality-goal-editor">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="quality-goal-title" className="text-sm font-semibold text-foreground">
                    Título do objetivo
                  </Label>
                  <Input
                    id="quality-goal-title"
                    value={qualityGoalDraft.title}
                    onChange={(event) =>
                      setQualityGoalDraft((current) => ({
                        ...current,
                        title: event.target.value
                      }))
                    }
                    placeholder="Ex: Disponibilidade contínua"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quality-goal-metric" className="text-sm font-semibold text-foreground">
                    Métrica acompanhada
                  </Label>
                  <Input
                    id="quality-goal-metric"
                    value={qualityGoalDraft.metric}
                    onChange={(event) =>
                      setQualityGoalDraft((current) => ({
                        ...current,
                        metric: event.target.value
                      }))
                    }
                    placeholder="Ex: Tempo médio fora do ar"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quality-goal-target" className="text-sm font-semibold text-foreground">
                    Meta desejada
                  </Label>
                  <Input
                    id="quality-goal-target"
                    value={qualityGoalDraft.target}
                    onChange={(event) =>
                      setQualityGoalDraft((current) => ({
                        ...current,
                        target: event.target.value
                      }))
                    }
                    placeholder="Ex: &lt; 10 minutos/mês"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="quality-goal-motivation" className="text-sm font-semibold text-foreground">
                    Motivação
                  </Label>
                  <div className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 p-1">
                    <button
                      type="button"
                      className={cn(
                        "rounded-sm px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                        qualityGoalEditorView === "edit"
                          ? "bg-brand-500 text-white shadow-soft"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setQualityGoalEditorView("edit")}
                    >
                      Escrita
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "rounded-sm px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                        qualityGoalEditorView === "preview"
                          ? "bg-brand-500 text-white shadow-soft"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setQualityGoalEditorView("preview")}
                    >
                      Pré-visualização
                    </button>
                  </div>
                </div>
                {qualityGoalEditorView === "edit" ? (
                  <>
                    <Textarea
                      id="quality-goal-motivation"
                      value={qualityGoalDraft.motivation}
                      onChange={(event) =>
                        setQualityGoalDraft((current) => ({
                          ...current,
                          motivation: event.target.value
                        }))
                      }
                      rows={12}
                      className="min-h-[220px]"
                      placeholder="Explique o porquê do objetivo, impactos esperados e como validar o resultado."
                    />
                    <p className="text-xs text-muted-foreground">
                      Aceita Markdown para bullets, destaques e referências cruzadas.
                    </p>
                  </>
                ) : (
                  <div className="rounded-lg border border-dashed border-border p-4">
                    <MarkdownPreview
                      value={qualityGoalDraft.motivation}
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

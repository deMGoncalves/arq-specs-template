import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Dialog,
  Flex,
  Heading,
  Switch,
  Table,
  Text,
  TextArea,
  TextField
} from "@radix-ui/themes";
import MarkdownPreview from "@/components/MarkdownPreview.jsx";
import { formatDate, generateId } from "@/utils";
import { useAppActions, useAppData } from "@/context/WorkspaceProvider.jsx";

const STATUS_OPTIONS = [
  { value: "not-started", label: "Não iniciado", color: "ruby" },
  { value: "in-progress", label: "Em andamento", color: "amber" },
  { value: "complete", label: "Completo", color: "grass" }
];

function useChapterSection(slug) {
  const { chapters = [], arc42 = [] } = useAppData();

  return useMemo(() => {
    const collection = chapters.length ? chapters : arc42;
    return (
      collection.find((item) => item.slug === slug) ||
      collection.find((item) => item.id === "SCN-001") ||
      null
    );
  }, [arc42, chapters, slug]);
}

function StatusBadge({ status }) {
  const selected = STATUS_OPTIONS.find((item) => item.value === status);
  if (!selected) {
    return (
      <Badge size="2" variant="soft" color="gray">
        Não definido
      </Badge>
    );
  }
  return (
    <Badge size="2" variant="soft" color={selected.color}>
      {selected.label}
    </Badge>
  );
}

function EditableTextCard({
  title,
  helper,
  value,
  placeholder,
  onSave,
  multiline = true,
  renderPreview
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value || "");

  useEffect(() => {
    if (open) {
      setDraft(value || "");
    }
  }, [open, value]);

  const handleSave = () => {
    onSave(draft.trim());
    setOpen(false);
  };

  return (
    <>
      <Card className="oo-card">
        <Flex direction="column" gap="3">
          <Flex align="center" justify="between" gap="3">
            <Flex direction="column" gap="1">
              <Text size="2" weight="medium">
                {title}
              </Text>
              {helper ? (
                <Text size="1" color="gray">
                  {helper}
                </Text>
              ) : null}
            </Flex>
            <Button variant="ghost" color="gray" onClick={() => setOpen(true)}>
              Editar
            </Button>
          </Flex>
          <div className="editable-content">
            {renderPreview ? (
              renderPreview({ value, placeholder })
            ) : value ? (
              <Text size="2" color="gray">
                {value}
              </Text>
            ) : (
              <Text size="2" color="gray">
                <span className="field-empty">{placeholder}</span>
              </Text>
            )}
          </div>
        </Flex>
      </Card>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content maxWidth="520px">
          <Dialog.Title>{title}</Dialog.Title>
          {helper ? (
            <Dialog.Description>
              {helper}
            </Dialog.Description>
          ) : null}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSave();
            }}
          >
            {multiline ? (
              <TextArea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={6}
                autoFocus
              />
            ) : (
              <TextField.Root
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                autoFocus
              />
            )}
            <Flex justify="end" gap="2" mt="4">
              <Dialog.Close>
                <Button variant="ghost" color="gray" type="button">
                  Cancelar
                </Button>
              </Dialog.Close>
              <Button type="submit" color="iris">
                Salvar alterações
              </Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}

function FeatureDialog({ open, onOpenChange, feature, onSave }) {
  const isEditing = Boolean(feature?.id);
  const [draft, setDraft] = useState(
    feature || { id: "", name: "", description: "", critical: false }
  );

  useEffect(() => {
    setDraft(feature || { id: "", name: "", description: "", critical: false });
  }, [feature]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...draft,
      id: draft.id || generateId("feature"),
      name: draft.name.trim(),
      description: draft.description.trim()
    };
    onSave(payload);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="560px">
        <Dialog.Title>
          {isEditing ? "Editar funcionalidade" : "Nova funcionalidade"}
        </Dialog.Title>
        <form onSubmit={handleSubmit} className="dialog-form">
          <label className="dialog-label">
            <span>Nome da funcionalidade</span>
            <TextField.Root
              required
              value={draft.name}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          </label>
          <label className="dialog-label">
            <span>Descrição</span>
            <TextArea
              required
              rows={4}
              value={draft.description}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, description: event.target.value }))
              }
            />
          </label>

          <Flex align="center" gap="2">
            <Switch
              checked={draft.critical}
              onCheckedChange={(checked) =>
                setDraft((prev) => ({ ...prev, critical: checked }))
              }
            />
            <Text size="2" color="gray">
              Marcar como funcionalidade crítica
            </Text>
          </Flex>

          <Flex justify="end" gap="2" mt="4">
            <Dialog.Close>
              <Button type="button" variant="ghost" color="gray">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button type="submit" color="iris">
              {isEditing ? "Salvar alterações" : "Adicionar funcionalidade"}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

function StakeholderDialog({ open, onOpenChange, stakeholder, onSave }) {
  const isEditing = Boolean(stakeholder?.id);
  const [draft, setDraft] = useState(
    stakeholder || { id: "", role: "", area: "", expectations: "" }
  );

  useEffect(() => {
    setDraft(stakeholder || { id: "", role: "", area: "", expectations: "" });
  }, [stakeholder]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...draft,
      id: draft.id || generateId("stakeholder"),
      role: draft.role.trim(),
      area: draft.area.trim(),
      expectations: draft.expectations.trim()
    };
    onSave(payload);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="560px">
        <Dialog.Title>
          {isEditing ? "Editar stakeholder" : "Novo stakeholder"}
        </Dialog.Title>
        <form onSubmit={handleSubmit} className="dialog-form">
          <label className="dialog-label">
            <span>Papel</span>
            <TextField.Root
              required
              value={draft.role}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, role: event.target.value }))
              }
            />
          </label>
          <label className="dialog-label">
            <span>Área ou equipe</span>
            <TextField.Root
              value={draft.area}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, area: event.target.value }))
              }
            />
          </label>
          <label className="dialog-label">
            <span>Expectativas principais</span>
            <TextArea
              rows={4}
              value={draft.expectations}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  expectations: event.target.value
                }))
              }
            />
          </label>
          <Flex justify="end" gap="2" mt="4">
            <Dialog.Close>
              <Button type="button" variant="ghost" color="gray">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button type="submit" color="iris">
              {isEditing ? "Salvar alterações" : "Adicionar stakeholder"}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

function QualityGoalDialog({ open, onOpenChange, goal, onSave }) {
  const isEditing = Boolean(goal?.id);
  const [draft, setDraft] = useState(
    goal || { id: "", title: "", metric: "", target: "", motivation: "" }
  );

  useEffect(() => {
    setDraft(goal || { id: "", title: "", metric: "", target: "", motivation: "" });
  }, [goal]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...draft,
      id: draft.id || generateId("quality"),
      title: draft.title.trim(),
      metric: draft.metric.trim(),
      target: draft.target.trim(),
      motivation: draft.motivation.trim()
    };
    onSave(payload);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="560px">
        <Dialog.Title>
          {isEditing ? "Editar objetivo de qualidade" : "Novo objetivo de qualidade"}
        </Dialog.Title>
        <form onSubmit={handleSubmit} className="dialog-form">
          <label className="dialog-label">
            <span>Título do objetivo</span>
            <TextField.Root
              required
              value={draft.title}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, title: event.target.value }))
              }
            />
          </label>
          <label className="dialog-label">
            <span>Métrica acompanhada</span>
            <TextField.Root
              value={draft.metric}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, metric: event.target.value }))
              }
            />
          </label>
          <label className="dialog-label">
            <span>Meta desejada</span>
            <TextField.Root
              value={draft.target}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, target: event.target.value }))
              }
            />
          </label>
          <label className="dialog-label">
            <span>Motivação</span>
            <TextArea
              rows={4}
              value={draft.motivation}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, motivation: event.target.value }))
              }
            />
          </label>
          <Flex justify="end" gap="2" mt="4">
            <Dialog.Close>
              <Button type="button" variant="ghost" color="gray">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button type="submit" color="iris">
              {isEditing ? "Salvar alterações" : "Adicionar objetivo"}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

function useIntroductionUpdater(section, updateChapter) {
  return useCallback((updates) => {
    if (!section) {
      return;
    }
    const introduction = {
      ...section.introduction,
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    updateChapter(section.id, { introduction });
  }, [section, updateChapter]);
}

function OverviewObjectivesPage() {
  const section = useChapterSection("overview-and-objectives");
  const { updateChapter } = useAppActions();
  const updateIntroduction = useIntroductionUpdater(section, updateChapter);

  const [featureDialogOpen, setFeatureDialogOpen] = useState(false);
  const [featureEditing, setFeatureEditing] = useState(null);

  const [stakeholderDialogOpen, setStakeholderDialogOpen] = useState(false);
  const [stakeholderEditing, setStakeholderEditing] = useState(null);

  const [qualityDialogOpen, setQualityDialogOpen] = useState(false);
  const [qualityEditing, setQualityEditing] = useState(null);

  if (!section) {
    return <Navigate to="/" replace />;
  }

  const { introduction } = section;

  const handleFeatureSave = (feature) => {
    const features = introduction.keyFeatures || [];
    const exists = features.some((item) => item.id === feature.id);
    const nextFeatures = exists
      ? features.map((item) => (item.id === feature.id ? feature : item))
      : [...features, feature];
    updateIntroduction({ keyFeatures: nextFeatures });
    setFeatureDialogOpen(false);
    setFeatureEditing(null);
  };

  const handleFeatureRemove = (featureId) => {
    const features = introduction.keyFeatures || [];
    updateIntroduction({
      keyFeatures: features.filter((item) => item.id !== featureId)
    });
  };

  const handleStakeholderSave = (stakeholder) => {
    const stakeholders = introduction.stakeholders || [];
    const exists = stakeholders.some((item) => item.id === stakeholder.id);
    const nextStakeholders = exists
      ? stakeholders.map((item) => (item.id === stakeholder.id ? stakeholder : item))
      : [...stakeholders, stakeholder];
    updateIntroduction({ stakeholders: nextStakeholders });
    setStakeholderDialogOpen(false);
    setStakeholderEditing(null);
  };

  const handleStakeholderRemove = (stakeholderId) => {
    const stakeholders = introduction.stakeholders || [];
    updateIntroduction({
      stakeholders: stakeholders.filter((item) => item.id !== stakeholderId)
    });
  };

  const handleQualitySave = (goal) => {
    const qualityGoals = introduction.qualityGoals || [];
    const exists = qualityGoals.some((item) => item.id === goal.id);
    const nextGoals = exists
      ? qualityGoals.map((item) => (item.id === goal.id ? goal : item))
      : [...qualityGoals, goal];
    updateIntroduction({ qualityGoals: nextGoals });
    setQualityDialogOpen(false);
    setQualityEditing(null);
  };

  const handleQualityRemove = (goalId) => {
    const qualityGoals = introduction.qualityGoals || [];
    updateIntroduction({
      qualityGoals: qualityGoals.filter((item) => item.id !== goalId)
    });
  };

  const handleReferenceSave = (content) => {
    updateIntroduction({ references: content });
  };

  const handleNotesSave = (notes) => {
    updateChapter(section.id, { notes });
  };

  return (
    <Box className="app-surface">
      <main className="chapter-page">
        <Flex direction="column" gap="5">
          <Flex align="center" gap="3" wrap="wrap">
            <Button variant="ghost" color="gray" asChild>
              <Link to="/">Voltar</Link>
            </Button>
            <Badge size="2" variant="soft" color="iris">
              Capítulo {section.order}
            </Badge>
            <StatusBadge status={introduction.status} />
          </Flex>

          <Flex direction="column" gap="3">
            <Heading size="8">{section.title}</Heading>
            <Text size="3" color="gray">
              {section.description}
            </Text>
          </Flex>

          <Card>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="center" wrap="wrap" gap="3">
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium">
                    Estado do capítulo
                  </Text>
                  <Text size="1" color="gray">
                    Atualize o status conforme o conteúdo evoluir. Marque como completo quando
                    estiver pronto para revisão.
                  </Text>
                </Flex>
                <StatusBadge status={introduction.status} />
              </Flex>
              <Flex gap="2" wrap="wrap">
                {STATUS_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant={introduction.status === option.value ? "solid" : "surface"}
                    color={option.color}
                    onClick={() => updateIntroduction({ status: option.value })}
                  >
                    {option.label}
                  </Button>
                ))}
              </Flex>
              <Text size="1" color="gray">
                Última atualização: {formatDate(introduction.lastUpdated)}
              </Text>
            </Flex>
          </Card>

          <Flex direction="column" gap="3">
            <Text size="2" weight="medium">
              1.1 Visão Geral
            </Text>
            <EditableTextCard
              title="Resumo do sistema"
              helper="Descreva o contexto do produto e sua proposta de valor."
              value={introduction.overview}
              placeholder="Inclua um resumo de alto nível para orientar novos leitores."
              onSave={(value) => updateIntroduction({ overview: value })}
            />
            <EditableTextCard
              title="Problema que resolvemos"
              helper="Explique a dor principal que este sistema elimina."
              value={introduction.problem}
              placeholder="Documente o problema para alinhar priorizações."
              onSave={(value) => updateIntroduction({ problem: value })}
            />
            <EditableTextCard
              title="Público-alvo"
              helper="Liste os perfis que interagem ou se beneficiam diretamente."
              value={introduction.audience}
              placeholder="Defina para quem o sistema foi concebido."
              onSave={(value) => updateIntroduction({ audience: value })}
            />
          </Flex>

          <Card>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="center">
                <Text size="2" weight="medium">
                  1.2 Requisitos fundamentais
                </Text>
                <Button
                  variant="surface"
                  color="iris"
                  onClick={() => {
                    setFeatureEditing(null);
                    setFeatureDialogOpen(true);
                  }}
                >
                  Nova funcionalidade
                </Button>
              </Flex>

              {introduction.keyFeatures?.length ? (
                <Flex direction="column" gap="3">
                  {introduction.keyFeatures.map((feature) => (
                    <Card key={feature.id} variant="surface">
                      <Flex direction="column" gap="2">
                        <Flex align="center" justify="between">
                          <Text size="2" weight="medium">
                            {feature.name}
                          </Text>
                          <Flex gap="2">
                            {feature.critical ? (
                              <Badge color="red" variant="soft">
                                Crítica
                              </Badge>
                            ) : null}
                            <Button
                              variant="ghost"
                              color="gray"
                              onClick={() => {
                                setFeatureEditing(feature);
                                setFeatureDialogOpen(true);
                              }}
                            >
                              Editar
                            </Button>
                            <Button
                              variant="ghost"
                              color="red"
                              onClick={() => handleFeatureRemove(feature.id)}
                            >
                              Remover
                            </Button>
                          </Flex>
                        </Flex>
                        <Text size="2" color="gray">
                          {feature.description}
                        </Text>
                      </Flex>
                    </Card>
                  ))}
                </Flex>
              ) : (
                <Callout.Root variant="surface">
                  <Callout.Text>
                    Nenhuma funcionalidade cadastrada. Clique em &quot;Nova funcionalidade&quot; para
                    adicionar a primeira.
                  </Callout.Text>
                </Callout.Root>
              )}
            </Flex>
          </Card>

          <Card>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="center">
                <Text size="2" weight="medium">
                  1.3 Stakeholders
                </Text>
                <Button
                  variant="surface"
                  color="iris"
                  onClick={() => {
                    setStakeholderEditing(null);
                    setStakeholderDialogOpen(true);
                  }}
                >
                  Novo stakeholder
                </Button>
              </Flex>
              {introduction.stakeholders?.length ? (
                <Table.Root variant="surface">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell>Papel</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Área</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Expectativas</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {introduction.stakeholders.map((stakeholder) => (
                      <Table.Row key={stakeholder.id}>
                        <Table.RowHeaderCell>{stakeholder.role}</Table.RowHeaderCell>
                        <Table.Cell>{stakeholder.area || "—"}</Table.Cell>
                        <Table.Cell>{stakeholder.expectations || "—"}</Table.Cell>
                        <Table.Cell align="right">
                          <Flex justify="end" gap="2">
                            <Button
                              variant="ghost"
                              color="gray"
                              onClick={() => {
                                setStakeholderEditing(stakeholder);
                                setStakeholderDialogOpen(true);
                              }}
                            >
                              Editar
                            </Button>
                            <Button
                              variant="ghost"
                              color="red"
                              onClick={() => handleStakeholderRemove(stakeholder.id)}
                            >
                              Remover
                            </Button>
                          </Flex>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              ) : (
                <Callout.Root variant="surface">
                  <Callout.Text>
                    Nenhum stakeholder cadastrado. Utilize o botão acima para documentar papéis e
                    expectativas.
                  </Callout.Text>
                </Callout.Root>
              )}
            </Flex>
          </Card>

          <Card>
            <Flex direction="column" gap="3">
              <Flex justify="between" align="center">
                <Text size="2" weight="medium">
                  1.4 Objetivos de qualidade
                </Text>
                <Button
                  variant="surface"
                  color="iris"
                  onClick={() => {
                    setQualityEditing(null);
                    setQualityDialogOpen(true);
                  }}
                >
                  Novo objetivo
                </Button>
              </Flex>
              {introduction.qualityGoals?.length ? (
                <Flex direction="column" gap="3">
                  {introduction.qualityGoals.map((goal) => (
                    <Card key={goal.id} variant="surface">
                      <Flex direction="column" gap="2">
                        <Flex align="center" justify="between">
                          <Text size="2" weight="medium">
                            {goal.title}
                          </Text>
                          <Flex gap="2">
                            <Button
                              variant="ghost"
                              color="gray"
                              onClick={() => {
                                setQualityEditing(goal);
                                setQualityDialogOpen(true);
                              }}
                            >
                              Editar
                            </Button>
                            <Button
                              variant="ghost"
                              color="red"
                              onClick={() => handleQualityRemove(goal.id)}
                            >
                              Remover
                            </Button>
                          </Flex>
                        </Flex>
                        <Text size="2" color="gray">
                          Métrica acompanhada: {goal.metric || "—"}
                        </Text>
                        <Text size="2" color="gray">
                          Meta alvo: {goal.target || "—"}
                        </Text>
                        <Text size="2" color="gray">
                          Motivação: {goal.motivation || "—"}
                        </Text>
                      </Flex>
                    </Card>
                  ))}
                </Flex>
              ) : (
                <Callout.Root variant="surface">
                  <Callout.Text>
                    Nenhum objetivo registrado. Utilize este espaço para conectar atributos de
                    qualidade a métricas mensuráveis.
                  </Callout.Text>
                </Callout.Root>
              )}
            </Flex>
          </Card>

          <Card>
            <Flex direction="column" gap="3">
              <Text size="2" weight="medium">
                Referências
              </Text>
              <EditableTextCard
                title="Documentos e links"
                helper="Liste materiais de referência que sustentam o capítulo."
                value={introduction.references}
                placeholder="Adicione links ou notas adicionais para facilitar o rastreio."
                onSave={handleReferenceSave}
                renderPreview={({ value, placeholder }) => (
                  <MarkdownPreview value={value} emptyMessage={placeholder} />
                )}
              />
            </Flex>
          </Card>

          <Card>
            <Flex direction="column" gap="3">
              <Text size="2" weight="medium">
                Notas complementares
              </Text>
              <EditableTextCard
                title="Anotações"
                helper="Capture aprendizados, riscos emergentes ou itens de follow-up."
                value={section.notes}
                placeholder="Nenhuma nota registrada ainda."
                onSave={handleNotesSave}
                renderPreview={({ value, placeholder }) => (
                  <MarkdownPreview value={value} emptyMessage={placeholder} />
                )}
              />
            </Flex>
          </Card>
        </Flex>
      </main>

      <FeatureDialog
        open={featureDialogOpen}
        onOpenChange={setFeatureDialogOpen}
        feature={featureEditing}
        onSave={handleFeatureSave}
      />
      <StakeholderDialog
        open={stakeholderDialogOpen}
        onOpenChange={setStakeholderDialogOpen}
        stakeholder={stakeholderEditing}
        onSave={handleStakeholderSave}
      />
      <QualityGoalDialog
        open={qualityDialogOpen}
        onOpenChange={setQualityDialogOpen}
        goal={qualityEditing}
        onSave={handleQualitySave}
      />
    </Box>
  );
}

export default OverviewObjectivesPage;

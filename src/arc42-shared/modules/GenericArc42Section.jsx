import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../shared/modules/ui/card.jsx";
import { Button } from "../../shared/modules/ui/button.jsx";
import { Textarea } from "../../shared/modules/ui/textarea.jsx";
import { Input } from "../../shared/modules/ui/input.jsx";
import { Badge } from "../../shared/modules/ui/badge.jsx";

function GenericArc42Section({
  section,
  relatedAdrs,
  relatedFeatures,
  relatedContainers,
  relatedComponents,
  onUpdate
}) {
  const [notes, setNotes] = useState(section.notes || "");
  const [actionItems, setActionItems] = useState(section.actionItems || []);
  const [newAction, setNewAction] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setNotes(section.notes || "");
    setActionItems(section.actionItems || []);
  }, [section]);

  useEffect(() => {
    const originalNotes = section.notes || "";
    const originalActions = section.actionItems || [];
    const hasChanges =
      originalNotes !== notes ||
      JSON.stringify(originalActions) !== JSON.stringify(actionItems);
    setIsDirty(hasChanges);
  }, [notes, actionItems, section]);

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
    onUpdate({
      notes: notes.trim(),
      actionItems: trimmedActions
    });
    setIsDirty(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
          <Button variant="ghost" size="sm">
            <Link to="/arc42/overview" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold text-foreground">
            {section.order}. {section.title}
          </h1>
          <p className="text-sm text-muted-foreground">{section.description}</p>
        </div>
        <Button
          variant={isDirty ? "default" : "ghost"}
          size="sm"
          onClick={handleSave}
          disabled={!isDirty}
        >
          Salvar alterações
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Narrativa estratégica</CardTitle>
          <CardDescription>
            Documente a missão desta seção, pontos de atenção e links prioritários.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Notas principais
            </label>
            <Textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Como esta seção orienta decisões ou quais são os hotspots?"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Próximas ações
            </label>
            <div className="flex gap-2">
              <Input
                value={newAction}
                placeholder="Ex: Validar com stakeholders"
                onChange={(event) => setNewAction(event.target.value)}
              />
              <Button type="button" variant="outline" onClick={handleAddActionItem}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {actionItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Adicione atividades para evoluir a seção.
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
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Caminho no repositório:{" "}
              <a
                href={`/${section.specPath}`}
                className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700"
              >
                {section.specPath} <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Decisões relacionadas</CardTitle>
            <CardDescription>
              ADRs conectadas a esta seção arc42.
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
                        to={`/arc42/arc42-09/adrs/${adr.id}`}
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
              Fluxos comportamentais que dependem desta seção.
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
                        to={`/arc42/arc42-06/bdd/${feature.id}`}
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
            Containers e componentes associados a esta seção.
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
                  <p className="font-semibold text-foreground">
                    {container.name}
                  </p>
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
    </div>
  );
}

export default GenericArc42Section;

import { useMemo, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../shared/modules/ui/card.jsx";
import { Textarea } from "../../shared/modules/ui/textarea.jsx";
import { Input } from "../../shared/modules/ui/input.jsx";
import { Button } from "../../shared/modules/ui/button.jsx";
import { Badge } from "../../shared/modules/ui/badge.jsx";
import { Checkbox } from "../../shared/modules/ui/checkbox.jsx";
import { Label } from "../../shared/modules/ui/label.jsx";
import { Separator } from "../../shared/modules/ui/separator.jsx";
import { ScrollArea } from "../../shared/modules/ui/scroll-area.jsx";
import { useAppActions, useAppData } from "../../context/WorkspaceProvider.jsx";
import { generateId } from "../../lib/utils.js";
import ContextContainer from "../modules/Container.jsx";

function selectOptions(options, selected, onToggle) {
  return options.map((option) => (
    <label
      key={option.value}
      className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground"
    >
      <span className="flex-1 text-foreground">{option.label}</span>
      <Checkbox
        checked={selected.includes(option.value)}
        onChange={(event) => onToggle(option.value, event.target.checked)}
      />
    </label>
  ));
}

function ContainerEditor({
  initialValue,
  arc42Options,
  adrOptions,
  featureOptions,
  onSave,
  onDelete
}) {
  const [form, setForm] = useState(
    initialValue || {
      name: "",
      technology: "",
      responsibility: "",
      specPath: "",
      linkedArc42: [],
      linkedAdrs: [],
      linkedFeatures: []
    }
  );

  function toggleSelection(field, value, checked) {
    setForm((prev) => {
      const current = new Set(prev[field]);
      if (checked) {
        current.add(value);
      } else {
        current.delete(value);
      }
      return {
        ...prev,
        [field]: Array.from(current)
      };
    });
  }

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{form.name || "Novo container"}</CardTitle>
        <CardDescription>
          Defina responsabilidades, tecnologia e vincule artefatos relacionados.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="container-name">Nome</Label>
            <Input
              id="container-name"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              placeholder="Ex: Frontend SPA"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="container-tech">Tecnologia</Label>
            <Input
              id="container-tech"
              value={form.technology}
              onChange={(event) => handleChange("technology", event.target.value)}
              placeholder="React, Vite, LocalStorage"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="container-resp">Responsabilidade</Label>
          <Textarea
            id="container-resp"
            value={form.responsibility}
            onChange={(event) =>
              handleChange("responsibility", event.target.value)
            }
            placeholder="Qual o papel deste container na solução?"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="container-spec">Arquivo @specs (opcional)</Label>
          <Input
            id="container-spec"
            value={form.specPath}
            onChange={(event) => handleChange("specPath", event.target.value)}
            placeholder="specs/05_building-blocks/containers/CNT-001_frontend.md"
          />
        </div>
        <Separator />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Seções arc42 vinculadas</Label>
            <div className="space-y-2">
              {selectOptions(arc42Options, form.linkedArc42, (value, checked) =>
                toggleSelection("linkedArc42", value, checked)
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>ADRs relacionadas</Label>
            <div className="space-y-2">
              {selectOptions(adrOptions, form.linkedAdrs, (value, checked) =>
                toggleSelection("linkedAdrs", value, checked)
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Cenários BDD impactados</Label>
          <div className="space-y-2">
            {selectOptions(featureOptions, form.linkedFeatures, (value, checked) =>
              toggleSelection("linkedFeatures", value, checked)
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete?.(form.id)}
          disabled={!form.id}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remover
        </Button>
        <Button size="sm" onClick={() => onSave(form)}>
          <Save className="mr-2 h-4 w-4" />
          Salvar
        </Button>
      </CardFooter>
    </Card>
  );
}

function ComponentEditor({
  initialValue,
  containerOptions,
  arc42Options,
  adrOptions,
  featureOptions,
  onSave,
  onDelete
}) {
  const [form, setForm] = useState(
    initialValue || {
      name: "",
      containerId: containerOptions[0]?.value || "",
      responsibility: "",
      specPath: "",
      linkedArc42: [],
      linkedAdrs: [],
      linkedFeatures: []
    }
  );

  function toggleSelection(field, value, checked) {
    setForm((prev) => {
      const current = new Set(prev[field]);
      if (checked) {
        current.add(value);
      } else {
        current.delete(value);
      }
      return {
        ...prev,
        [field]: Array.from(current)
      };
    });
  }

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{form.name || "Novo componente"}</CardTitle>
        <CardDescription>
          Componentes residem dentro de containers e conectam decisões e cenários.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="component-name">Nome</Label>
            <Input
              id="component-name"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              placeholder="Ex: Arc42 Editor"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="component-container">Container pai</Label>
            <select
              id="component-container"
              value={form.containerId}
              onChange={(event) =>
                handleChange("containerId", event.target.value)
              }
              className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm"
            >
              {containerOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="component-resp">Responsabilidade</Label>
          <Textarea
            id="component-resp"
            value={form.responsibility}
            onChange={(event) =>
              handleChange("responsibility", event.target.value)
            }
            placeholder="O que este componente entrega?"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="component-spec">Arquivo @specs (opcional)</Label>
          <Input
            id="component-spec"
            value={form.specPath}
            onChange={(event) => handleChange("specPath", event.target.value)}
            placeholder="specs/05_building-blocks/components/CMP-001_editor.md"
          />
        </div>
        <Separator />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Seções arc42 vinculadas</Label>
            <div className="space-y-2">
              {selectOptions(arc42Options, form.linkedArc42, (value, checked) =>
                toggleSelection("linkedArc42", value, checked)
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>ADRs relacionadas</Label>
            <div className="space-y-2">
              {selectOptions(adrOptions, form.linkedAdrs, (value, checked) =>
                toggleSelection("linkedAdrs", value, checked)
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Cenários BDD impactados</Label>
          <div className="space-y-2">
            {selectOptions(featureOptions, form.linkedFeatures, (value, checked) =>
              toggleSelection("linkedFeatures", value, checked)
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete?.(form.id)}
          disabled={!form.id}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remover
        </Button>
        <Button size="sm" onClick={() => onSave(form)}>
          <Save className="mr-2 h-4 w-4" />
          Salvar
        </Button>
      </CardFooter>
    </Card>
  );
}

function C4Workspace() {
  const { c4, arc42, adrs, bdd } = useAppData();
  const {
    updateC4,
    upsertC4Container,
    removeC4Container,
    upsertC4Component,
    removeC4Component
  } = useAppActions();
  const [purpose, setPurpose] = useState(c4.context.purpose);

  const arc42Options = useMemo(
    () =>
      arc42.map((section) => ({
        value: section.id,
        label: `${section.order}. ${section.title}`
      })),
    [arc42]
  );

  const adrOptions = useMemo(
    () =>
      adrs.map((adr) => ({
        value: adr.id,
        label: adr.title
      })),
    [adrs]
  );

  const featureOptions = useMemo(
    () =>
      bdd.map((feature) => ({
        value: feature.id,
        label: `${feature.reference} • ${feature.title}`
      })),
    [bdd]
  );

  const containerOptions = useMemo(
    () =>
      c4.containers.map((container) => ({
        value: container.id,
        label: container.name
      })),
    [c4.containers]
  );

  function handleSavePurpose() {
    updateC4({
      context: {
        ...c4.context,
        purpose
      }
    });
  }

  function handleAddContainer() {
    upsertC4Container({
      id: generateId("container"),
      name: "Novo container",
      technology: "",
      responsibility: "",
      specPath: "",
      linkedArc42: [],
      linkedAdrs: [],
      linkedFeatures: []
    });
  }

  function handleAddComponent() {
    upsertC4Component({
      id: generateId("component"),
      name: "Novo componente",
      containerId: containerOptions[0]?.value || "",
      responsibility: "",
      specPath: "",
      linkedArc42: [],
      linkedAdrs: [],
      linkedFeatures: []
    });
  }

  return (
    <ContextContainer className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">C4 Workspace</h1>
        <p className="text-sm text-muted-foreground">
          Estruture contexto, containers e componentes conectados ao arc42, ADRs
          e cenários BDD.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contexto</CardTitle>
          <CardDescription>
            Resuma o propósito do sistema e os relacionamentos principais.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="purpose">Propósito</Label>
            <Textarea
              id="purpose"
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-3 rounded-lg border border-border p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Atores chave
              </h3>
              {c4.context.primaryActors.map((actor) => (
                <div key={actor.id}>
                  <p className="text-sm font-semibold text-foreground">
                    {actor.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {actor.goals.join(" • ")}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-3 rounded-lg border border-border p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Atores de suporte
              </h3>
              {c4.context.supportingActors.map((actor) => (
                <div key={actor.id}>
                  <p className="text-sm font-semibold text-foreground">
                    {actor.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {actor.goals.join(" • ")}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-3 rounded-lg border border-border p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Relacionamentos
              </h3>
              {c4.context.relationships.map((relationship) => (
                <div key={relationship.id}>
                  <p className="text-sm font-semibold text-foreground">
                    {relationship.from} → {relationship.to}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {relationship.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button size="sm" onClick={handleSavePurpose}>
            <Save className="mr-2 h-4 w-4" />
            Atualizar propósito
          </Button>
        </CardFooter>
      </Card>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Containers</h2>
            <p className="text-sm text-muted-foreground">
              Estrutura macro do sistema e suas responsabilidades.
            </p>
          </div>
          <Button size="sm" onClick={handleAddContainer}>
            <Plus className="mr-2 h-4 w-4" />
            Novo container
          </Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {c4.containers.map((container) => (
            <ContainerEditor
              key={container.id}
              initialValue={container}
              arc42Options={arc42Options}
              adrOptions={adrOptions}
              featureOptions={featureOptions}
              onSave={upsertC4Container}
              onDelete={removeC4Container}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Componentes
            </h2>
            <p className="text-sm text-muted-foreground">
              Componentes internos que realizam o trabalho arquitetural.
            </p>
          </div>
          <Button size="sm" onClick={handleAddComponent}>
            <Plus className="mr-2 h-4 w-4" />
            Novo componente
          </Button>
        </div>
        <ScrollArea className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {c4.components.map((component) => (
              <ComponentEditor
                key={component.id}
                initialValue={component}
                containerOptions={containerOptions}
                arc42Options={arc42Options}
                adrOptions={adrOptions}
                featureOptions={featureOptions}
                onSave={upsertC4Component}
                onDelete={removeC4Component}
              />
            ))}
          </div>
        </ScrollArea>
      </section>
    </ContextContainer>
  );
}

export default C4Workspace;

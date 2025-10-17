import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../shared/modules/ui/card.jsx";
import { Button } from "../../shared/modules/ui/button.jsx";
import { Input } from "../../shared/modules/ui/input.jsx";
import { Textarea } from "../../shared/modules/ui/textarea.jsx";
import { Checkbox } from "../../shared/modules/ui/checkbox.jsx";
import { Label } from "../../shared/modules/ui/label.jsx";
import { useAppActions, useAppData } from "../../dashboard/containers/WorkspaceProvider.jsx";
import { formatDate, generateId } from "../../lib/utils.js";
import ContextContainer from "./Container.jsx";

const statusOptions = [
  { value: "draft", label: "Rascunho" },
  { value: "proposed", label: "Proposta" },
  { value: "accepted", label: "Aprovada" },
  { value: "superseded", label: "Substituída" }
];

function AdrEditor({ mode = "create" }) {
  const navigate = useNavigate();
  const { adrId } = useParams();
  const { adrs, chapters = [], arc42 = [], c4, bdd } = useAppData();
  const { addAdr, updateAdr } = useAppActions();

  const editingAdr = adrs.find((adr) => adr.id === adrId);

  const [form, setForm] = useState(() => {
    if (mode === "edit" && editingAdr) {
      return {
        ...editingAdr,
        links: {
          chapters: editingAdr.links.chapters || editingAdr.links.arc42 || [],
          c4: editingAdr.links.c4,
          bdd: editingAdr.links.bdd
        }
      };
    }

    return {
      id: generateId("adr"),
      title: "",
      status: "draft",
      date: new Date().toISOString(),
      context: "",
      decision: "",
      consequences: "",
      specPath: "",
      links: {
        chapters: [],
        c4: [],
        bdd: []
      }
    };
  });

  useEffect(() => {
    if (mode === "edit" && !editingAdr) {
      navigate("/scenarios/decision-log/adrs");
    }
  }, [mode, editingAdr, navigate]);

  const chapterSource = chapters.length ? chapters : arc42;

  const chapterOptions = useMemo(
    () =>
      chapterSource.map((section) => ({
        value: section.id,
        label: `${section.order}. ${section.title}`
      })),
    [chapterSource]
  );

  const c4Options = useMemo(
    () =>
      [...c4.containers, ...c4.components].map((item) => ({
        value: item.id,
        label: item.name
      })),
    [c4]
  );

  const featureOptions = useMemo(
    () =>
      bdd.map((feature) => ({
        value: feature.id,
        label: `${feature.reference} • ${feature.title}`
      })),
    [bdd]
  );

  function toggleLink(group, value, checked) {
    setForm((prev) => {
      const current = new Set(prev.links[group]);
      if (checked) {
        current.add(value);
      } else {
        current.delete(value);
      }
      return {
        ...prev,
        links: {
          ...prev.links,
          [group]: Array.from(current)
        }
      };
    });
  }

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  }

  function handleSave() {
    if (!form.title.trim()) {
      return;
    }

    if (mode === "edit") {
      updateAdr(form.id, { ...form });
    } else {
      addAdr({ ...form });
    }
    navigate("/scenarios/decision-log/adrs");
  }

  return (
    <ContextContainer className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" size="sm">
          <Link to="/scenarios/decision-log/adrs" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">
          Criado em {formatDate(form.date)}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{mode === "edit" ? "Editar ADR" : "Nova ADR"}</CardTitle>
          <CardDescription>
            Capture contexto, decisão, consequências e links para capítulos, C4 e BDD.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="adr-title">Título</Label>
              <Input
                id="adr-title"
                value={form.title}
                onChange={(event) => handleChange("title", event.target.value)}
                placeholder="Ex: Adotar React + LocalStorage"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adr-status">Status</Label>
              <select
                id="adr-status"
                className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm"
                value={form.status}
                onChange={(event) => handleChange("status", event.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adr-context">Contexto</Label>
            <Textarea
              id="adr-context"
              value={form.context}
              onChange={(event) => handleChange("context", event.target.value)}
              placeholder="Qual problema ou oportunidade motivou esta decisão?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adr-decision">Decisão</Label>
            <Textarea
              id="adr-decision"
              value={form.decision}
              onChange={(event) => handleChange("decision", event.target.value)}
              placeholder="Qual foi a escolha feita?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adr-consequences">Consequências</Label>
            <Textarea
              id="adr-consequences"
              value={form.consequences}
              onChange={(event) =>
                handleChange("consequences", event.target.value)
              }
              placeholder="Quais resultados esperamos? Riscos? Custos?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adr-spec">Arquivo @specs (opcional)</Label>
            <Input
              id="adr-spec"
              value={form.specPath}
              onChange={(event) => handleChange("specPath", event.target.value)}
              placeholder="specs/09_decisions/adrs/ADR-001_frontend-stack.md"
            />
          </div>
          <hr className="border-border" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Capítulos vinculados</Label>
              <div className="space-y-2 text-sm">
                {chapterOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2"
                  >
                    <span>{option.label}</span>
                    <Checkbox
                      checked={(form.links.chapters || form.links.arc42 || []).includes(option.value)}
                      onChange={(event) =>
                        toggleLink("chapters", option.value, event.target.checked)
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Elementos C4</Label>
              <div className="space-y-2 text-sm">
                {c4Options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2"
                  >
                    <span>{option.label}</span>
                    <Checkbox
                      checked={form.links.c4.includes(option.value)}
                      onChange={(event) =>
                        toggleLink("c4", option.value, event.target.checked)
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cenários BDD</Label>
              <div className="space-y-2 text-sm">
                {featureOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2"
                  >
                    <span>{option.label}</span>
                    <Checkbox
                      checked={form.links.bdd.includes(option.value)}
                      onChange={(event) =>
                        toggleLink("bdd", option.value, event.target.checked)
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button size="sm" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Salvar ADR
          </Button>
        </CardFooter>
      </Card>
    </ContextContainer>
  );
}

export default AdrEditor;

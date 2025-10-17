import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
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
import { generateId } from "../../lib/utils.js";
import ContextContainer from "../modules/Container.jsx";

function FeatureEditor({ mode = "create" }) {
  const navigate = useNavigate();
  const { featureId } = useParams();
  const { bdd, chapters = [], arc42 = [], c4, adrs } = useAppData();
  const chapterSource = chapters.length ? chapters : arc42;
  const { addFeature, updateFeature, removeFeature } = useAppActions();

  const editingFeature = bdd.find((feature) => feature.id === featureId);

  const [form, setForm] = useState(() => {
    if (mode === "edit" && editingFeature) {
      return {
        ...editingFeature,
        businessGoalsText: editingFeature.businessGoals.join("\n"),
        scenarios: editingFeature.scenarios.map((scenario) => ({
          ...scenario,
          givenText: scenario.given.join("\n"),
          whenText: scenario.when.join("\n"),
          thenText: scenario.then.join("\n")
        }))
      };
    }

    return {
      id: generateId("feature"),
      reference: `FEAT-${Math.floor(Math.random() * 900 + 100)}`,
      title: "",
      narrative: "",
      businessGoals: [],
      businessGoalsText: "",
      linkedChapters: [],
      linkedComponents: [],
      linkedAdrs: [],
      scenarios: [
        {
          id: generateId("scenario"),
          title: "Novo cenário",
          givenText: "",
          whenText: "",
          thenText: ""
        }
      ]
    };
  });

  useEffect(() => {
    if (mode === "edit" && !editingFeature) {
      navigate("/scenarios/behavioral-view-scenarios/bdd");
    }
  }, [mode, editingFeature, navigate]);

  const chapterOptions = useMemo(
    () =>
      chapterSource.map((section) => ({
        value: section.id,
        label: `${section.order}. ${section.title}`
      })),
    [chapterSource]
  );

  const componentOptions = useMemo(
    () =>
      [...c4.containers, ...c4.components].map((item) => ({
        value: item.id,
        label: item.name
      })),
    [c4]
  );

  const adrOptions = useMemo(
    () =>
      adrs.map((adr) => ({
        value: adr.id,
        label: adr.title
      })),
    [adrs]
  );

  function toggleLink(field, value, checked) {
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

  function handleScenarioChange(index, field, value) {
    setForm((prev) => {
      const scenarios = prev.scenarios.map((scenario, idx) =>
        idx === index ? { ...scenario, [field]: value } : scenario
      );
      return {
        ...prev,
        scenarios
      };
    });
  }

  function handleAddScenario() {
    setForm((prev) => ({
      ...prev,
      scenarios: [
        ...prev.scenarios,
        {
          id: generateId("scenario"),
          title: "Novo cenário",
          givenText: "",
          whenText: "",
          thenText: ""
        }
      ]
    }));
  }

  function handleRemoveScenario(id) {
    setForm((prev) => ({
      ...prev,
      scenarios: prev.scenarios.filter((scenario) => scenario.id !== id)
    }));
  }

  function handleDeleteFeature() {
    if (mode === "edit" && editingFeature) {
      removeFeature(editingFeature.id);
      navigate("/scenarios/behavioral-view-scenarios/bdd");
    }
  }

  function handleSave() {
    if (!form.title.trim()) {
      return;
    }

    const normalized = {
      id: form.id,
      reference: form.reference,
      title: form.title,
      narrative: form.narrative,
      businessGoals: form.businessGoalsText
        ? form.businessGoalsText
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      linkedChapters: form.linkedChapters || form.linkedArc42 || [],
      linkedComponents: form.linkedComponents,
      linkedAdrs: form.linkedAdrs,
      scenarios: form.scenarios.map((scenario) => ({
        id: scenario.id,
        title: scenario.title,
        given: scenario.givenText
          ? scenario.givenText.split("\n").map((item) => item.trim()).filter(Boolean)
          : [],
        when: scenario.whenText
          ? scenario.whenText.split("\n").map((item) => item.trim()).filter(Boolean)
          : [],
        then: scenario.thenText
          ? scenario.thenText.split("\n").map((item) => item.trim()).filter(Boolean)
          : []
      }))
    };

    if (mode === "edit") {
      updateFeature(form.id, normalized);
    } else {
      addFeature(normalized);
    }
    navigate("/scenarios/behavioral-view-scenarios/bdd");
  }

  return (
    <ContextContainer className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" size="sm">
          <Link to="/scenarios/behavioral-view-scenarios/bdd" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>
        {mode === "edit" ? (
          <Button variant="ghost" size="sm" onClick={handleDeleteFeature}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remover feature
          </Button>
        ) : null}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{mode === "edit" ? "Editar feature BDD" : "Nova feature BDD"}</CardTitle>
          <CardDescription>
            Garanta rastreabilidade, conectando esta feature a arc42, componentes C4 e ADRs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="feature-ref">Referência</Label>
              <Input
                id="feature-ref"
                value={form.reference}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, reference: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feature-title">Título</Label>
              <Input
                id="feature-title"
                value={form.title}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="Ex: Salvar documentação localmente"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feature-narrative">Narrativa</Label>
            <Textarea
              id="feature-narrative"
              value={form.narrative}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, narrative: event.target.value }))
              }
              placeholder="Como <persona>, quero <objetivo> para <benefício>"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feature-goals">Objetivos de negócio (1 por linha)</Label>
            <Textarea
              id="feature-goals"
              value={form.businessGoalsText}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  businessGoalsText: event.target.value
                }))
              }
            />
          </div>
          <hr className="border-border" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Capítulos</Label>
              <div className="space-y-2 text-sm">
                {chapterOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2"
                  >
                    <span>{option.label}</span>
                    <Checkbox
                      checked={(form.linkedChapters || form.linkedArc42 || []).includes(option.value)}
                      onChange={(event) =>
                        toggleLink("linkedChapters", option.value, event.target.checked)
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Componentes C4</Label>
              <div className="space-y-2 text-sm">
                {componentOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2"
                  >
                    <span>{option.label}</span>
                    <Checkbox
                      checked={form.linkedComponents.includes(option.value)}
                      onChange={(event) =>
                        toggleLink("linkedComponents", option.value, event.target.checked)
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>ADRs</Label>
              <div className="space-y-2 text-sm">
                {adrOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2"
                  >
                    <span>{option.label}</span>
                    <Checkbox
                      checked={form.linkedAdrs.includes(option.value)}
                      onChange={(event) =>
                        toggleLink("linkedAdrs", option.value, event.target.checked)
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Cenários</h3>
              <Button size="sm" variant="outline" onClick={handleAddScenario}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar cenário
              </Button>
            </div>
            <div className="space-y-4">
              {form.scenarios.map((scenario, index) => (
                <Card key={scenario.id} className="border-dashed">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Cenário #{index + 1}</CardTitle>
                      <CardDescription>Estruture etapas Given/When/Then.</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveScenario(scenario.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor={`scenario-title-${scenario.id}`}>Título</Label>
                      <Input
                        id={`scenario-title-${scenario.id}`}
                        value={scenario.title}
                        onChange={(event) =>
                          handleScenarioChange(index, "title", event.target.value)
                        }
                        placeholder="Ex: Recuperar dados ao reabrir o app"
                      />
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Given (1 por linha)</Label>
                        <Textarea
                          value={scenario.givenText}
                          onChange={(event) =>
                            handleScenarioChange(index, "givenText", event.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>When</Label>
                        <Textarea
                          value={scenario.whenText}
                          onChange={(event) =>
                            handleScenarioChange(index, "whenText", event.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Then</Label>
                        <Textarea
                          value={scenario.thenText}
                          onChange={(event) =>
                            handleScenarioChange(index, "thenText", event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button size="sm" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Salvar feature
          </Button>
        </CardFooter>
      </Card>
    </ContextContainer>
  );
}

export default FeatureEditor;

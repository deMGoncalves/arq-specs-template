import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../shared/modules/ui/card.jsx";
import { Badge } from "../../shared/modules/ui/badge.jsx";
import { useAppData } from "../../context/WorkspaceProvider.jsx";
import ContextContainer from "../modules/Container.jsx";

function SpecsStructure() {
  const { arc42, constraints, c4, adrs, bdd } = useAppData();

  return (
    <ContextContainer className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Estrutura @specs
        </h1>
        <p className="text-sm text-muted-foreground">
          Este aplicativo gera o conteúdo que preenche a hierarquia `specs/`
          baseada no arc42.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>01-12 • arc42</CardTitle>
          <CardDescription>
            Cada seção do arc42 recebe uma pasta numerada e arquivos Markdown.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {arc42.map((section) => (
            <div
              key={section.id}
              className="rounded-lg border border-border p-4 text-sm"
            >
              <p className="font-semibold text-foreground">
                {section.order}. {section.title}
              </p>
              <p className="text-xs text-muted-foreground">{section.specPath}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {section.focusAreas.map((item) => (
                  <Badge key={item} variant="neutral">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>02_constraints • Governança</CardTitle>
            <CardDescription>
              Regras explícitas do CDD que orientam o código.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {constraints.map((item) => (
              <div key={item.id} className="rounded-lg border border-border p-4">
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.specPath}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {item.summary}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>05_building-blocks • C4 Assets</CardTitle>
            <CardDescription>
              Containers e componentes exportáveis como Markdown.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-foreground">Containers</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                {c4.containers.map((container) => (
                  <li key={container.id}>
                    {container.name} • {container.specPath || "Definir caminho"}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-foreground">Componentes</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                {c4.components.map((component) => (
                  <li key={component.id}>
                    {component.name} • {component.specPath || "Definir caminho"}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>09_decisions/adrs</CardTitle>
            <CardDescription>
              Cada decisão é exportada como `ADR-[NNN]_titulo.md`.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {adrs.map((adr) => (
              <div key={adr.id} className="rounded-lg border border-border p-4">
                <p className="font-semibold text-foreground">{adr.title}</p>
                <p className="text-xs text-muted-foreground">
                  {adr.specPath || "Defina o caminho @specs antes de exportar"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {adr.links.arc42.map((sectionId) => (
                    <Badge key={sectionId} variant="outline">
                      {sectionId}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>06_runtime/scenarios</CardTitle>
            <CardDescription>
              Cada feature gera cenários Gherkin em Markdown.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {bdd.map((feature) => (
              <div key={feature.id} className="rounded-lg border border-border p-4">
                <p className="font-semibold text-foreground">
                  {feature.reference} • {feature.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  Exportar como `SCN-{feature.scenarios.length.toString().padStart(3, "0")}_{feature.title}`.
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {feature.scenarios.map((scenario) => (
                    <Badge key={scenario.id} variant="outline">
                      {scenario.title}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ContextContainer>
  );
}

export default SpecsStructure;

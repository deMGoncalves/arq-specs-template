import { Link, useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../shared/modules/ui/card.jsx";
import { Button } from "../../shared/modules/ui/button.jsx";
import { Badge } from "../../shared/modules/ui/badge.jsx";
import { useAppData } from "../../workspace-state/containers/AppDataProvider.jsx";

function BddWorkspace() {
  const navigate = useNavigate();
  const { bdd, arc42, c4, adrs } = useAppData();

  const arc42ById = Object.fromEntries(
    arc42.map((section) => [section.id, `${section.order}. ${section.title}`])
  );

  const c4ById = Object.fromEntries(
    [...c4.containers, ...c4.components].map((item) => [item.id, item.name])
  );

  const adrById = Object.fromEntries(adrs.map((adr) => [adr.id, adr.title]));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">BDD Workbench</h1>
          <p className="text-sm text-muted-foreground">
            Transforme contexto em cenários verificáveis, vinculando arc42, C4 e ADRs.
          </p>
        </div>
        <Button size="sm" onClick={() => navigate("/arc42/arc42-06/bdd/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova feature
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {bdd.map((feature) => (
          <Card key={feature.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle>
                    {feature.reference} • {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.narrative}</CardDescription>
                </div>
                <Badge variant="outline">{feature.scenarios.length} cenários</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Objetivos de negócio
                </p>
                <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                  {feature.businessGoals.map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Seções arc42
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {feature.linkedArc42.map((sectionId) => (
                    <Badge key={sectionId} variant="outline">
                      {arc42ById[sectionId] || sectionId}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Componentes C4
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {feature.linkedComponents.map((itemId) => (
                    <Badge key={itemId} variant="outline">
                      {c4ById[itemId] || itemId}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  ADRs relacionadas
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {feature.linkedAdrs.map((adrId) => (
                    <Badge key={adrId} variant="outline">
                      {adrById[adrId] || adrId}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Cenários
                </p>
                <div className="space-y-2 rounded-lg border border-border p-3 text-xs">
                  {feature.scenarios.map((scenario) => (
                    <div key={scenario.id} className="space-y-1">
                      <p className="font-semibold text-foreground">{scenario.title}</p>
                      <p><span className="font-semibold">Given</span> {scenario.given.join(" • ")}</p>
                      <p><span className="font-semibold">When</span> {scenario.when.join(" • ")}</p>
                      <p><span className="font-semibold">Then</span> {scenario.then.join(" • ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="outline" size="sm">
                <Link
                  to={`/arc42/arc42-06/bdd/${feature.id}`}
                  className="flex w-full items-center justify-center"
                >
                  Editar feature
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BddWorkspace;

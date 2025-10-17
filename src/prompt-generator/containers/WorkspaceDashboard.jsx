import { Link } from "react-router-dom";
import { ArrowRight, GitBranch, Layers3, Map, Workflow } from "lucide-react";
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
import { Separator } from "../../shared/modules/ui/separator.jsx";
import { useAppData } from "../../workspace-state/containers/AppDataProvider.jsx";
import { formatDate } from "../../lib/utils.js";

function StatCard({ title, value, description, icon: Icon, link }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {Icon ? <Icon className="h-5 w-5 text-brand-500" /> : null}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold text-foreground">{value}</p>
      </CardContent>
      {link ? (
        <CardFooter>
          <Button variant="ghost" size="sm">
            <Link to={link} className="flex w-full items-center justify-center gap-2">
              Acessar <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
}

function Dashboard() {
  const { meta, chapters = [], arc42 = [], adrs, bdd, c4, risks, quality } = useAppData();
  const chapterSource = chapters.length ? chapters : arc42;

  const documentedSections = chapterSource.filter(
    (section) => section.notes && section.notes.trim().length > 0
  );

  const openAdrs = adrs.filter((adr) => adr.status !== "accepted");
  const scenarios = bdd.flatMap((feature) => feature.scenarios);

  const coverage =
    adrs.length === 0
      ? 0
      : Math.round(
          (adrs.filter((adr) => adr.links.bdd.length > 0).length / adrs.length) *
            100
        );

  const upcomingRisks = risks.slice(0, 3);

  const chapterHighlights = chapterSource.slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Olá, bem-vindo ao {meta.productName}
        </h1>
        <p className="text-sm text-muted-foreground">
          Última atualização em {formatDate(meta.lastUpdated)}. Acompanhe
          abaixo o estado geral da documentação viva.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Capítulos registrados"
          value={`${documentedSections.length}/${chapterSource.length}`}
          description="Cobertura dos capítulos"
          icon={Map}
          link="/scenarios/overview"
        />
        <StatCard
          title="ADRs ativas"
          value={adrs.length}
          description={`${openAdrs.length} em aberto`}
          icon={GitBranch}
          link="/scenarios/decision-log"
        />
        <StatCard
          title="Cenários BDD"
          value={scenarios.length}
          description={`${bdd.length} features mapeadas`}
          icon={Workflow}
          link="/scenarios/behavioral-view-scenarios"
        />
        <StatCard
          title="Cobertura decisões → BDD"
          value={`${coverage}%`}
          description="ADRs vinculadas a cenários"
          icon={Layers3}
          link="/scenarios/behavioral-view-scenarios"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Highlights de capítulos</CardTitle>
            <CardDescription>
              Seções mais recentes para revisar com o time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {chapterHighlights.map((section) => (
              <div key={section.id} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {section.order}. {section.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                  <Badge variant={section.notes ? "success" : "outline"}>
                    {section.notes ? "Atualizado" : "Rascunho"}
                  </Badge>
                </div>
                <Separator className="my-3" />
                <p className="text-sm text-muted-foreground">{section.notes || "Ainda sem narrativa."}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {section.focusAreas.map((tag) => (
                    <Badge key={tag} variant="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm">
                    <Link
                      to={`/scenarios/${section.slug || section.id}`}
                      className="flex w-full items-center justify-center"
                    >
                      Editar capítulo
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Riscos e Qualidade</CardTitle>
            <CardDescription>
              Itens de vigilância contínua mapeados pelos capítulos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Riscos em foco
              </h3>
              {upcomingRisks.map((risk) => (
                <div key={risk.id} className="rounded-lg border border-border p-4">
                  <p className="text-sm font-semibold text-foreground">
                    {risk.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {risk.description}
                  </p>
                  <div className="mt-2 text-xs text-emerald-600">
                    Mitigação: {risk.mitigation}
                  </div>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Métricas de Qualidade
              </h3>
              {quality.map((item) => (
                <div key={item.id} className="rounded-lg border border-border p-4">
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.metric}
                  </p>
                  <Badge variant="outline" className="mt-2">
                    Meta: {item.target}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Fluxo C4 atual</CardTitle>
          <CardDescription>
            Visão rápida de atores, containers e componentes conectados.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2 rounded-lg border border-border p-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Atores
            </h4>
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
          <div className="space-y-2 rounded-lg border border-border p-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Containers
            </h4>
            {c4.containers.map((container) => (
              <div key={container.id}>
                <p className="text-sm font-semibold text-foreground">
                  {container.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Tech: {container.technology}
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-2 rounded-lg border border-border p-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Componentes
            </h4>
            {c4.components.map((component) => (
              <div key={component.id}>
                <p className="text-sm font-semibold text-foreground">
                  {component.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {component.responsibility}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;

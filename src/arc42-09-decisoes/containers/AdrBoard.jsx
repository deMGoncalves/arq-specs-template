import { Link, useNavigate } from "react-router-dom";
import { GitBranchPlus } from "lucide-react";
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
import { formatDate } from "../../lib/utils.js";

const statusMap = {
  accepted: { label: "Aprovada", variant: "success" },
  proposed: { label: "Proposta", variant: "warning" },
  superseded: { label: "Substituída", variant: "outline" },
  draft: { label: "Rascunho", variant: "outline" }
};

function AdrBoard() {
  const { adrs, arc42, bdd, c4 } = useAppData();
  const navigate = useNavigate();

  const arc42ById = Object.fromEntries(
    arc42.map((section) => [section.id, `${section.order}. ${section.title}`])
  );
  const featureById = Object.fromEntries(
    bdd.map((feature) => [feature.id, `${feature.reference} • ${feature.title}`])
  );
  const c4ById = Object.fromEntries(
    [...c4.containers, ...c4.components].map((item) => [item.id, item.name])
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">ADR Decision Log</h1>
          <p className="text-sm text-muted-foreground">
            Rastreie o histórico de decisões e os artefatos impactados.
          </p>
        </div>
        <Button size="sm" onClick={() => navigate("/arc42/arc42-09/adrs/new")}>
          <GitBranchPlus className="mr-2 h-4 w-4" />
          Nova ADR
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {adrs.map((adr) => {
          const status = statusMap[adr.status] || statusMap.draft;
          return (
            <Card key={adr.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg">{adr.title}</CardTitle>
                    <CardDescription>
                      Registrada em {formatDate(adr.date)}
                    </CardDescription>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Contexto
                  </p>
                  <p className="text-sm text-foreground">{adr.context}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Decisão
                  </p>
                  <p className="text-sm text-foreground">{adr.decision}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Consequências
                  </p>
                  <p className="text-sm text-foreground">{adr.consequences}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Referências cruzadas
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {adr.links.arc42.map((sectionId) => (
                      <Badge key={sectionId} variant="outline">
                        {arc42ById[sectionId] || sectionId}
                      </Badge>
                    ))}
                    {adr.links.c4.map((itemId) => (
                      <Badge key={itemId} variant="outline">
                        {c4ById[itemId] || itemId}
                      </Badge>
                    ))}
                    {adr.links.bdd.map((featureId) => (
                      <Badge key={featureId} variant="outline">
                        {featureById[featureId] || featureId}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="outline" size="sm">
                  <Link
                    to={`/arc42/arc42-09/adrs/${adr.id}`}
                    className="flex w-full items-center justify-center"
                  >
                    Editar ADR
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default AdrBoard;

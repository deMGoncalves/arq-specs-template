import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../shared/modules/ui/card.jsx";
import { Badge } from "../../shared/modules/ui/badge.jsx";
import { useAppData } from "./WorkspaceProvider.jsx";
import { formatDate } from "../../lib/utils.js";
import Container from "../modules/Container.jsx";

const INTRO_STATUS_BADGE = {
  "not-started": { variant: "outline", label: "Não iniciado" },
  "in-progress": { variant: "warning", label: "Em progresso" },
  complete: { variant: "success", label: "Completo" }
};

function ChaptersOverviewPage() {
  const { chapters = [], arc42 = [] } = useAppData();
  const chapterSource = chapters.length ? chapters : arc42;

  return (
    <Container className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold text-foreground">
          Chapters Knowledge Base
        </h1>
        <p className="text-sm text-muted-foreground">
          Navegue pelos capítulos em <code>specs/</code>; cada atualização aqui alimenta os artefatos C4, ADRs e cenários BDD gerados localmente.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {chapterSource.map((section) => {
          const introductionStatus = section.introduction?.status;
          const badgeConfig = introductionStatus
            ? INTRO_STATUS_BADGE[introductionStatus] || INTRO_STATUS_BADGE["not-started"]
            : section.notes
              ? { variant: "success", label: "Atualizado" }
              : { variant: "outline", label: "Rascunho" };
          const summaryText =
            section.introduction?.overview?.trim() ||
            section.notes ||
            "Documente esta seção com a narrativa estratégica.";
          const lastUpdatedLabel = section.introduction?.lastUpdated
            ? formatDate(section.introduction.lastUpdated)
            : null;

          return (
            <Link
              key={section.id}
              to={`/scenarios/${section.slug || section.id}`}
              className="group block focus-visible:outline-none"
            >
              <Card className="flex h-full flex-col transition duration-200 hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-soft focus-visible:-translate-y-0.5 focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-500/60 group-hover:-translate-y-0.5 group-hover:border-brand-500 group-hover:shadow-soft group-focus-visible:-translate-y-0.5 group-focus-visible:border-brand-500 group-focus-visible:shadow-soft">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">
                        {section.order}. {section.title}
                      </CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                      {lastUpdatedLabel ? (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Atualizado em {lastUpdatedLabel}
                        </p>
                      ) : null}
                    </div>
                    <Badge variant={badgeConfig.variant}>{badgeConfig.label}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{summaryText}</p>
                  <div className="flex flex-wrap gap-2">
                    {section.focusAreas.map((focus) => (
                      <Badge key={focus} variant="neutral">
                        {focus}
                      </Badge>
                    ))}
                  </div>
                  {section.quickLinks?.length ? (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Artefatos relacionados
                      </p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {section.quickLinks.map((link) => (
                          <li key={link.target}>• {link.label}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}

export default ChaptersOverviewPage;

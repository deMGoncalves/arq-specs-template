import { Link, useLocation } from "react-router-dom";
import { Menu, UploadCloud, RefreshCw } from "lucide-react";
import { Button } from "../../shared/modules/ui/button.jsx";
import { useAppActions, useAppData } from "../../workspace-state/containers/AppDataProvider.jsx";
import { cn } from "../../lib/utils.js";

const titles = [
  { match: /^\/$/, label: "Chapters Overview" },
  { match: /^\/scenarios\/overview/, label: "Chapters Overview" },
  { match: /^\/scenarios\/overview-and-objectives/, label: "01 • Visão Geral e Objetivos" },
  { match: /^\/scenarios\/restrictions-and-guidelines/, label: "02 • Restrições e Diretrizes" },
  { match: /^\/scenarios\/system-scope-and-context/, label: "03 • Escopo e Contexto" },
  { match: /^\/scenarios\/architectural-strategy/, label: "04 • Estratégia Arquitetural" },
  { match: /^\/scenarios\/structural-view-components/, label: "05 • Visão Estrutural" },
  { match: /^\/scenarios\/behavioral-view-scenarios/, label: "06 • Visão de Comportamento" },
  { match: /^\/scenarios\/behavioral-view-scenarios\/bdd/, label: "06 • BDD Workbench" },
  { match: /^\/scenarios\/deployment-view/, label: "07 • Visão de Implantação" },
  { match: /^\/scenarios\/crosscutting-concepts/, label: "08 • Conceitos Transversais" },
  { match: /^\/scenarios\/decision-log/, label: "09 • Registro de Decisões" },
  { match: /^\/scenarios\/quality-and-scenarios/, label: "10 • Qualidade e Cenários" },
  { match: /^\/scenarios\/risks-and-technical-debt/, label: "11 • Riscos e Dívida Técnica" },
  { match: /^\/scenarios\/glossary-of-terms/, label: "12 • Glossário de Termos" }
];

function Topbar() {
  const location = useLocation();
  const { meta } = useAppData();
  const { resetWorkspace } = useAppActions();

  const currentTitle =
    titles.find((entry) => entry.match.test(location.pathname))?.label ||
    "Workspace";

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground lg:hidden"
            )}
            aria-label="Abrir navegação"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-brand-600">
              {meta.productName}
            </p>
            <h2 className="text-lg font-semibold text-foreground">{currentTitle}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
            onClick={resetWorkspace}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Restaurar Template
          </Button>
          <Button variant="outline" size="sm">
            <Link
              to="/scenarios/structural-view-components/export"
              className="flex w-full items-center justify-center gap-2"
            >
              <UploadCloud className="h-4 w-4" />
              Exportar
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;

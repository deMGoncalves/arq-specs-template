import { Link, useLocation } from "react-router-dom";
import { Menu, UploadCloud, RefreshCw } from "lucide-react";
import { Button } from "../../shared/modules/ui/button.jsx";
import { useAppActions, useAppData } from "../../workspace-state/containers/AppDataProvider.jsx";
import { cn } from "../../lib/utils.js";

const titles = [
  { match: /^\/$/, label: "Arc42 Overview" },
  { match: /^\/arc42\/overview/, label: "Arc42 Overview" },
  { match: /^\/arc42\/arc42-01/, label: "01 • Introdução" },
  { match: /^\/arc42\/arc42-02/, label: "02 • Restrições" },
  { match: /^\/arc42\/arc42-03/, label: "03 • Contexto" },
  { match: /^\/arc42\/arc42-04/, label: "04 • Estratégia" },
  { match: /^\/arc42\/arc42-05/, label: "05 • Blocos" },
  { match: /^\/arc42\/arc42-06/, label: "06 • Comportamento" },
  { match: /^\/arc42\/arc42-07/, label: "07 • Implantação" },
  { match: /^\/arc42\/arc42-08/, label: "08 • Conceitos" },
  { match: /^\/arc42\/arc42-09/, label: "09 • Decisões" },
  { match: /^\/arc42\/arc42-10/, label: "10 • Qualidade" },
  { match: /^\/arc42\/arc42-11/, label: "11 • Riscos" },
  { match: /^\/arc42\/arc42-12/, label: "12 • Glossário" }
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
              to="/arc42/arc42-05/export"
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

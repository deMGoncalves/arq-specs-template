import {
  LayoutDashboard,
  Map,
  ShieldCheck,
  Users,
  Lightbulb,
  Boxes,
  Workflow,
  Server,
  Layers3,
  GitBranch,
  Gauge,
  AlertTriangle,
  BookOpen
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppData } from "../../workspace-state/containers/AppDataProvider.jsx";
import { cn, formatDate } from "../../lib/utils.js";

const navigation = [
  {
    to: "/scenarios/overview",
    label: "Visão Geral",
    icon: LayoutDashboard
  },
  {
    to: "/scenarios/overview-and-objectives",
    label: "01 • Visão Geral e Objetivos",
    icon: Map
  },
  {
    to: "/scenarios/restrictions-and-guidelines",
    label: "02 • Restrições e Diretrizes",
    icon: ShieldCheck
  },
  {
    to: "/scenarios/system-scope-and-context",
    label: "03 • Escopo e Contexto",
    icon: Users
  },
  {
    to: "/scenarios/architectural-strategy",
    label: "04 • Estratégia Arquitetural",
    icon: Lightbulb
  },
  {
    to: "/scenarios/structural-view-components",
    label: "05 • Visão Estrutural",
    icon: Boxes
  },
  {
    to: "/scenarios/behavioral-view-scenarios",
    label: "06 • Visão de Comportamento",
    icon: Workflow
  },
  {
    to: "/scenarios/deployment-view",
    label: "07 • Visão de Implantação",
    icon: Server
  },
  {
    to: "/scenarios/crosscutting-concepts",
    label: "08 • Conceitos Transversais",
    icon: Layers3
  },
  {
    to: "/scenarios/decision-log",
    label: "09 • Registro de Decisões",
    icon: GitBranch
  },
  {
    to: "/scenarios/quality-and-scenarios",
    label: "10 • Qualidade e Cenários",
    icon: Gauge
  },
  {
    to: "/scenarios/risks-and-technical-debt",
    label: "11 • Riscos e Dívida Técnica",
    icon: AlertTriangle
  },
  {
    to: "/scenarios/glossary-of-terms",
    label: "12 • Glossário de Termos",
    icon: BookOpen
  }
];

function Sidebar() {
  const { meta, chapters = [], arc42 = [] } = useAppData();
  const chapterSource = chapters.length ? chapters : arc42;

  return (
    <aside className="hidden w-72 border-r border-border bg-card/80 backdrop-blur-md lg:flex lg:flex-col">
      <div className="space-y-2 px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
          CDD Workspace
        </p>
        <h1 className="text-lg font-semibold text-foreground">{meta.productName}</h1>
        <p className="text-xs text-muted-foreground">v{meta.version}</p>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-brand-500 text-white shadow-soft"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )
              }
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="space-y-4 px-6 pb-6 text-xs text-muted-foreground">
        <div>
          <span className="font-semibold text-foreground">Última atualização</span>
          <p>{formatDate(meta.lastUpdated)}</p>
        </div>
        <div>
          <span className="font-semibold text-foreground">Cobertura capítulos</span>
          <p>
            {chapterSource.filter((section) => section.notes).length} / {chapterSource.length} seções documentadas
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

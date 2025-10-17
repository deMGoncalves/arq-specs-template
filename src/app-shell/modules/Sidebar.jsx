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
    to: "/arc42/overview",
    label: "Visão Geral",
    icon: LayoutDashboard
  },
  {
    to: "/arc42/arc42-01",
    label: "01 • Introdução",
    icon: Map
  },
  {
    to: "/arc42/arc42-02",
    label: "02 • Restrições",
    icon: ShieldCheck
  },
  {
    to: "/arc42/arc42-03",
    label: "03 • Contexto",
    icon: Users
  },
  {
    to: "/arc42/arc42-04",
    label: "04 • Estratégia",
    icon: Lightbulb
  },
  {
    to: "/arc42/arc42-05",
    label: "05 • Blocos",
    icon: Boxes
  },
  {
    to: "/arc42/arc42-06",
    label: "06 • Comportamento",
    icon: Workflow
  },
  {
    to: "/arc42/arc42-07",
    label: "07 • Implantação",
    icon: Server
  },
  {
    to: "/arc42/arc42-08",
    label: "08 • Conceitos",
    icon: Layers3
  },
  {
    to: "/arc42/arc42-09",
    label: "09 • Decisões",
    icon: GitBranch
  },
  {
    to: "/arc42/arc42-10",
    label: "10 • Qualidade",
    icon: Gauge
  },
  {
    to: "/arc42/arc42-11",
    label: "11 • Riscos",
    icon: AlertTriangle
  },
  {
    to: "/arc42/arc42-12",
    label: "12 • Glossário",
    icon: BookOpen
  }
];

function Sidebar() {
  const { meta, arc42 } = useAppData();

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
          <span className="font-semibold text-foreground">Cobertura arc42</span>
          <p>{arc42.filter((section) => section.notes).length} / {arc42.length} seções documentadas</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

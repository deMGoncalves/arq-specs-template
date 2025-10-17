import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Button } from "../components/ui/button.jsx";

const CHAPTERS = [
  {
    id: "arc42-01",
    order: "01",
    title: "Introdução e Objetivos",
    description: "Visão geral, drivers de negócio, stakeholders e objetivos de qualidade.",
    status: "Disponível",
    actionLabel: "Abrir editor",
    target: "/arc42/arc42-01",
    ready: true
  },
  {
    order: "02",
    title: "Restrições",
    description: "Limitações de negócio, técnicas e organizacionais que moldam a solução.",
    status: "Em breve",
    ready: false
  },
  {
    order: "03",
    title: "Contexto e Escopo",
    description: "Contexto de negócio e técnico, fronteiras e integrações externas.",
    status: "Em breve",
    ready: false
  },
  {
    order: "04",
    title: "Estratégia de Solução",
    description: "Diretrizes arquiteturais e decisões de alto nível que orientam o desenho.",
    status: "Em breve",
    ready: false
  },
  {
    order: "05",
    title: "Building Block View",
    description: "Decomposição estrutural em containers e componentes.",
    status: "Em breve",
    ready: false
  },
  {
    order: "06",
    title: "Runtime View",
    description: "Cenários dinâmicos e fluxos principais do sistema.",
    status: "Em breve",
    ready: false
  },
  {
    order: "07",
    title: "Deployment View",
    description: "Topologia de implantação, infraestrutura e pipelines.",
    status: "Em breve",
    ready: false
  },
  {
    order: "08",
    title: "Crosscutting Concepts",
    description: "Decisões globais de design, padrões e conceitos reutilizáveis.",
    status: "Em breve",
    ready: false
  },
  {
    order: "09",
    title: "Decisões Arquiteturais",
    description: "Registros ADR, contexto, decisão e consequências.",
    status: "Em breve",
    ready: false
  },
  {
    order: "10",
    title: "Requisitos de Qualidade",
    description: "Atributos de qualidade priorizados, métricas e metas.",
    status: "Em breve",
    ready: false
  },
  {
    order: "11",
    title: "Riscos e Dívidas",
    description: "Riscos técnicos, estratégias de mitigação e débitos a monitorar.",
    status: "Em breve",
    ready: false
  },
  {
    order: "12",
    title: "Glossário",
    description: "Vocabulário controlado e linguagem ubíqua do domínio.",
    status: "Em breve",
    ready: false
  }
];

function Home() {
  return (
    <section className="chapter-wrapper">
      <header className="chapter-header">
        <div>
          <p className="chapter-eyebrow">Arc42 Blueprint</p>
          <h1 className="chapter-title">Capítulos do blueprint arquitetural</h1>
          <p className="chapter-subtitle">
            Comece pela introdução e objetivos. Os demais capítulos ficarão disponíveis à medida que evoluirmos a automação do blueprint.
          </p>
        </div>
      </header>

      <div className="chapter-grid">
        {CHAPTERS.map((chapter) => (
          <Card key={chapter.order} className="chapter-card">
            <CardHeader>
              <div className="chapter-card__top">
                <span className="chapter-order">{chapter.order}</span>
                <Badge variant={chapter.ready ? "outline" : "secondary"} className="chapter-status">
                  {chapter.status}
                </Badge>
              </div>
              <CardTitle className="chapter-card__title">{chapter.title}</CardTitle>
              <CardDescription className="chapter-card__description">
                {chapter.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="chapter-card__footer">
              {chapter.ready ? (
                <Button asChild>
                  <Link to={chapter.target}>{chapter.actionLabel}</Link>
                </Button>
              ) : (
                <Button variant="ghost" size="sm" disabled>
                  Em breve
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Home;

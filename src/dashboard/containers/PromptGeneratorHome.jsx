import { Link } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "../../shared/modules/ui/card.jsx";
import { Badge } from "../../shared/modules/ui/badge.jsx";
import Container from "../modules/Container.jsx";

const CHAPTERS = [
  {
    id: "SCN-001",
    order: "01",
    title: "Visão Geral e Objetivos",
    description:
      "Introduz a solução, seu propósito, contexto inicial e objetivos prioritários.",
    status: "Disponível",
    slug: "overview-and-objectives",
    target: "/scenarios/overview-and-objectives",
    ready: true
  },
  {
    id: "SCN-002",
    order: "02",
    title: "Restrições e Diretrizes",
    description:
      "Registra requisitos mandatórios, padrões corporativos e tecnologias obrigatórias.",
    status: "Disponível",
    slug: "restrictions-and-guidelines",
    target: "/scenarios/restrictions-and-guidelines",
    ready: true
  },
  {
    id: "SCN-003",
    order: "03",
    title: "Escopo do Sistema e Contexto",
    description:
      "Delimita fronteiras, atores envolvidos e integrações com ambientes externos.",
    status: "Disponível",
    slug: "system-scope-and-context",
    target: "/scenarios/system-scope-and-context",
    ready: true
  },
  {
    id: "SCN-004",
    order: "04",
    title: "Estratégia Arquitetural",
    description:
      "Resume decisões de alto nível e a abordagem adotada para cumprir metas de negócio.",
    status: "Disponível",
    slug: "architectural-strategy",
    target: "/scenarios/architectural-strategy",
    ready: true
  },
  {
    id: "SCN-005",
    order: "05",
    title: "Visão Estrutural (Componentes)",
    description:
      "Detalha a decomposição estática em módulos, containers e componentes C4.",
    status: "Disponível",
    slug: "structural-view-components",
    target: "/scenarios/structural-view-components",
    ready: true
  },
  {
    id: "SCN-006",
    order: "06",
    title: "Visão de Comportamento (Cenários)",
    description:
      "Apresenta cenários dinâmicos de uso e fluxos BDD que demonstram o comportamento esperado.",
    status: "Disponível",
    slug: "behavioral-view-scenarios",
    target: "/scenarios/behavioral-view-scenarios",
    ready: true
  },
  {
    id: "SCN-007",
    order: "07",
    title: "Visão de Implantação",
    description:
      "Descreve topologias, ambientes e o mapeamento de software para infraestrutura.",
    status: "Disponível",
    slug: "deployment-view",
    target: "/scenarios/deployment-view",
    ready: true
  },
  {
    id: "SCN-008",
    order: "08",
    title: "Conceitos Transversais",
    description:
      "Explora decisões globais e padrões reutilizados, como segurança, observabilidade e camadas comuns.",
    status: "Disponível",
    slug: "crosscutting-concepts",
    target: "/scenarios/crosscutting-concepts",
    ready: true
  },
  {
    id: "SCN-009",
    order: "09",
    title: "Registro de Decisões",
    description:
      "Mantém o log das ADRs com contexto, decisão, consequências e vínculos entre artefatos.",
    status: "Disponível",
    slug: "decision-log",
    target: "/scenarios/decision-log",
    ready: true
  },
  {
    id: "SCN-010",
    order: "10",
    title: "Qualidade e Cenários",
    description:
      "Documenta atributos de qualidade alvo e os cenários que validam cada característica.",
    status: "Disponível",
    slug: "quality-and-scenarios",
    target: "/scenarios/quality-and-scenarios",
    ready: true
  },
  {
    id: "SCN-011",
    order: "11",
    title: "Riscos e Dívida Técnica",
    description:
      "Lista riscos, incertezas e dívidas técnicas, junto das estratégias de mitigação.",
    status: "Disponível",
    slug: "risks-and-technical-debt",
    target: "/scenarios/risks-and-technical-debt",
    ready: true
  },
  {
    id: "SCN-012",
    order: "12",
    title: "Glossário de Termos",
    description:
      "Define terminologias, acrônimos e nomenclaturas do domínio para entendimento comum.",
    status: "Disponível",
    slug: "glossary-of-terms",
    target: "/scenarios/glossary-of-terms",
    ready: true
  }
];

function PromptGeneratorHome() {
  return (
    <div className="dashboard-screen">
      <Container className="chapter-wrapper">
        <header className="chapter-header">
          <div>
            <p className="chapter-eyebrow">Blueprint • Chapters</p>
            <h1 className="chapter-title">PROMPT Generator</h1>
            <p className="chapter-subtitle">
              Cada cartão direciona para o capítulo correspondente deste workspace,
              organizado por contexto → containers → módulos.
            </p>
          </div>
        </header>

        <div className="chapter-grid">
          {CHAPTERS.map((chapter) => {
            const card = (
              <Card className={`chapter-card ${chapter.ready ? "" : "chapter-card--disabled"}`}>
                <CardHeader>
                  <div className="chapter-card__top">
                    <span className="chapter-order">{chapter.order}</span>
                    <Badge variant="outline" className="chapter-status">
                      {chapter.status}
                    </Badge>
                  </div>
                  <CardTitle className="chapter-card__title">{chapter.title}</CardTitle>
                  <CardDescription className="chapter-card__description">
                    {chapter.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );

            if (chapter.ready) {
              return (
                <Link key={chapter.id} to={chapter.target} className="chapter-card-link">
                  {card}
                </Link>
              );
            }

            return (
              <div key={chapter.id} className="chapter-card-placeholder">
                {card}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default PromptGeneratorHome;

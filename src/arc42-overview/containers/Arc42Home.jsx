import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../shared/modules/ui/card.jsx";
import { Badge } from "../../shared/modules/ui/badge.jsx";
import { buttonVariants } from "../../shared/modules/ui/button.jsx";
import { cn } from "../../lib/utils.js";

const CHAPTERS = [
  {
    id: "arc42-01",
    order: "01",
    title: "Visão Geral e Objetivos",
    description:
      "Introduz a solução, seu propósito, contexto inicial e objetivos prioritários.",
    status: "Disponível",
    target: "/arc42/arc42-01",
    ready: true
  },
  {
    id: "arc42-02",
    order: "02",
    title: "Restrições e Diretrizes",
    description:
      "Registra requisitos mandatórios, padrões corporativos e tecnologias obrigatórias.",
    status: "Disponível",
    target: "/arc42/arc42-02",
    ready: true
  },
  {
    id: "arc42-03",
    order: "03",
    title: "Escopo do Sistema e Contexto",
    description:
      "Delimita fronteiras, atores envolvidos e integrações com ambientes externos.",
    status: "Disponível",
    target: "/arc42/arc42-03",
    ready: true
  },
  {
    id: "arc42-04",
    order: "04",
    title: "Estratégia Arquitetural",
    description:
      "Resume decisões de alto nível e a abordagem adotada para cumprir metas de negócio.",
    status: "Disponível",
    target: "/arc42/arc42-04",
    ready: true
  },
  {
    id: "arc42-05",
    order: "05",
    title: "Visão Estrutural (Componentes)",
    description:
      "Detalha a decomposição estática em módulos, containers e componentes C4.",
    status: "Disponível",
    target: "/arc42/arc42-05",
    ready: true
  },
  {
    id: "arc42-06",
    order: "06",
    title: "Visão de Comportamento (Cenários)",
    description:
      "Apresenta cenários dinâmicos de uso e fluxos BDD que demonstram o comportamento esperado.",
    status: "Disponível",
    target: "/arc42/arc42-06",
    ready: true
  },
  {
    id: "arc42-07",
    order: "07",
    title: "Visão de Implantação",
    description:
      "Descreve topologias, ambientes e o mapeamento de software para infraestrutura.",
    status: "Disponível",
    target: "/arc42/arc42-07",
    ready: true
  },
  {
    id: "arc42-08",
    order: "08",
    title: "Conceitos Transversais",
    description:
      "Explora decisões globais e padrões reutilizados, como segurança, observabilidade e camadas comuns.",
    status: "Disponível",
    target: "/arc42/arc42-08",
    ready: true
  },
  {
    id: "arc42-09",
    order: "09",
    title: "Registro de Decisões",
    description:
      "Mantém o log das ADRs com contexto, decisão, consequências e vínculos entre artefatos.",
    status: "Disponível",
    target: "/arc42/arc42-09",
    ready: true
  },
  {
    id: "arc42-10",
    order: "10",
    title: "Qualidade e Cenários",
    description:
      "Documenta atributos de qualidade alvo e os cenários que validam cada característica.",
    status: "Disponível",
    target: "/arc42/arc42-10",
    ready: true
  },
  {
    id: "arc42-11",
    order: "11",
    title: "Riscos e Dívida Técnica",
    description:
      "Lista riscos, incertezas e dívidas técnicas, junto das estratégias de mitigação.",
    status: "Disponível",
    target: "/arc42/arc42-11",
    ready: true
  },
  {
    id: "arc42-12",
    order: "12",
    title: "Glossário de Termos",
    description:
      "Define terminologias, acrônimos e nomenclaturas do domínio para entendimento comum.",
    status: "Disponível",
    target: "/arc42/arc42-12",
    ready: true
  }
];

function Arc42Home() {
  return (
    <section className="chapter-wrapper">
      <header className="chapter-header">
        <div>
          <p className="chapter-eyebrow">Blueprint • arc42</p>
          <h1 className="chapter-title">Capítulos Rebatizados (1—12) do Novo Framework</h1>
          <p className="chapter-subtitle">
            Cada cartão direciona para o capítulo equivalente ao arc42 clássico, agora
            organizado por contexto → containers → módulos dentro deste workspace.
          </p>
        </div>
      </header>

      <div className="chapter-grid">
        {CHAPTERS.map((chapter) => (
          <Card key={chapter.id} className="chapter-card">
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
            <CardContent className="chapter-card__footer">
              {chapter.ready ? (
                <Link
                  to={chapter.target}
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  Abrir capítulo
                </Link>
              ) : (
                <span
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "pointer-events-none opacity-60"
                  )}
                >
                  Em breve
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Arc42Home;

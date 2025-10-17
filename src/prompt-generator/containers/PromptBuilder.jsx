import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "../../shared/modules/ui/card.jsx";
import { Badge } from "../../shared/modules/ui/badge.jsx";
import { Button } from "../../shared/modules/ui/button.jsx";
import { Textarea } from "../../shared/modules/ui/textarea.jsx";

const CHAPTERS = [
  {
    id: "overview-and-objectives",
    order: "01",
    title: "Visão Geral e Objetivos",
    description: "Apresenta a solução, o propósito, o contexto inicial e os objetivos prioritários.",
    status: "Disponível",
    target: "/scenarios/overview-and-objectives",
    ready: true
  },
  {
    order: "02",
    title: "Restrições e Diretrizes",
    description: "Documenta requisitos mandatórios, padrões corporativos e tecnologias obrigatórias.",
    status: "Em breve",
    ready: false
  },
  {
    order: "03",
    title: "Escopo do Sistema e Contexto",
    description: "Delimita fronteiras do sistema, atores envolvidos e integrações com ambientes externos.",
    status: "Em breve",
    ready: false
  },
  {
    order: "04",
    title: "Estratégia Arquitetural",
    description: "Resume decisões de alto nível e a abordagem adotada para cumprir metas de negócio.",
    status: "Em breve",
    ready: false
  },
  {
    order: "05",
    title: "Visão Estrutural",
    description: "Explica a decomposição estática em módulos, componentes e suas interações principais.",
    status: "Em breve",
    ready: false
  },
  {
    order: "06",
    title: "Visão de Comportamento",
    description: "Mostra cenários dinâmicos de uso, descrevendo fluxos principais e interações em runtime.",
    status: "Em breve",
    ready: false
  },
  {
    order: "07",
    title: "Visão de Implantação",
    description: "Detalha infraestrutura, topologias de implantação e o mapeamento de software para recursos.",
    status: "Em breve",
    ready: false
  },
  {
    order: "08",
    title: "Conceitos Transversais",
    description: "Reúne decisões de design globais que permeiam o sistema, como segurança, logging e padrões.",
    status: "Em breve",
    ready: false
  },
  {
    order: "09",
    title: "Registro de Decisões",
    description: "Mantém o histórico de decisões arquiteturais relevantes, contexto, justificativas e efeitos.",
    status: "Em breve",
    ready: false
  },
  {
    order: "10",
    title: "Qualidade e Cenários",
    description: "Especifica requisitos de qualidade e cenários de validação que comprovam características alvo.",
    status: "Em breve",
    ready: false
  },
  {
    order: "11",
    title: "Riscos e Dívida Técnica",
    description: "Cataloga riscos, incertezas e dívidas técnicas com respectivas estratégias de mitigação.",
    status: "Em breve",
    ready: false
  },
  {
    order: "12",
    title: "Glossário de Termos",
    description: "Define terminologias, acrônimos e nomenclaturas do domínio para promover entendimento comum.",
    status: "Em breve",
    ready: false
  }
];

const PROMPT_TEMPLATE = `# Blueprint Prompt

Utilize os capítulos abaixo como roteiro para capturar o contexto arquitetural.

## Etapas
1. Visão Geral e Objetivos
2. Restrições e Diretrizes
3. Escopo do Sistema e Contexto
4. Estratégia Arquitetural
5. Visão Estrutural
6. Visão de Comportamento
7. Visão de Implantação
8. Conceitos Transversais
9. Registro de Decisões
10. Qualidade e Cenários
11. Riscos e Dívida Técnica
12. Glossário de Termos

> Ajuste cada etapa conforme o domínio da solução.`;

function Home() {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  function handleCopyPrompt() {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(PROMPT_TEMPLATE);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = PROMPT_TEMPLATE;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Não foi possível copiar o prompt", error);
      setCopied(false);
    }
  }

  return (
    <section className="chapter-wrapper">
      <header className="chapter-header">
        <div>
          <p className="chapter-eyebrow">Blueprint</p>
          <h1 className="chapter-title">PROMPT Builder</h1>
          <p className="chapter-subtitle">
            Comece pela visão geral e objetivos. Os demais capítulos serão liberados conforme avançamos na automação do workspace.
          </p>
        </div>
      </header>

      <div className="chapter-grid">
        {CHAPTERS.map((chapter) => {
          const cardHeader = (
            <CardHeader className="chapter-card__content">
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
          );

          if (chapter.ready) {
            return (
              <Link key={chapter.order} to={chapter.target} className="chapter-card-link">
                <Card className="chapter-card">
                  {cardHeader}
                </Card>
              </Link>
            );
          }

          return (
            <Card key={chapter.order} className="chapter-card">
              {cardHeader}
            </Card>
          );
        })}
      </div>

      <Card className="prompt-card">
        <CardHeader>
          <CardTitle>Prompt consolidado</CardTitle>
          <CardDescription>
            Visualize o blueprint em Markdown e copie o conteúdo para reutilizar em outras ferramentas.
          </CardDescription>
        </CardHeader>
        <CardContent className="prompt-card__content">
      <div className="prompt-code">
        <div className="prompt-code__header">
          <span className="prompt-code__label">Markdown</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCopyPrompt}
          >
            {copied ? "Copiado!" : "Copiar"}
          </Button>
        </div>
        <Textarea
          readOnly
          value={PROMPT_TEMPLATE}
          className="prompt-textarea"
        />
      </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default Home;

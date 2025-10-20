# Documentation-First Agents Handbook

Este manual define como qualquer agente (humano ou IA) deve operar dentro do repositório **Documentation-First Approach**. Tudo começa e termina em `specs/`; o código só acontece quando a documentação estiver alinhada e aprovada.


## 0. Mandato inegociável

- Use `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` e `GEMINI.md` como referência principal.
- Consulte o template correspondente em `.gemini/template/` ou `.cursor/template/` antes de editar qualquer artefato de `specs/`, de acordo com o agente em uso.
- Mantenha `specs/12_glossary/012_glossary.md` consistente com qualquer novo termo, sigla ou conceito.
- Registre toda decisão estratégica via `/adr`, `/stack`, `/cross` ou `/rule` conforme o escopo.

---

## 1. Esboçar a proposta (Draft Change Proposal)

1. Clarifique objetivo, motivação, métricas de sucesso e restrições.
2. Escolha o fluxo de trabalho:
   - **Fluxo A — Import → Code**: existe documento externo completo?
   - **Fluxo B — Vision → Stack → Plan → Feature → Build → Code**: evolução incremental.
3. Liste artefatos de `specs/` impactados e riscos conhecidos.
4. Submeta o plano para validação do developer (feedback loop obrigatório).

Nenhum arquivo deve ser alterado antes da aprovação explícita.

---

## 2. Alinhar e refinar as specs (Review & Align)

1. Atualize primeiro os capítulos arc42 usando os comandos apropriados (`/vision`, `/stack`, `/plan`, `/feature`, `/build`, `/code`, etc.).
2. Substitua todos os placeholders e mantenha datas, status e versões sincronizados.
3. Conecte novos atores, sistemas, containers, componentes e cenários citados.
4. Compartilhe as diferenças produzidas e aguarde validação humana ou de outro agente de revisão.

---

## 3. Planejar tarefas de implementação (Plan Tasks)

1. Extraia do arc42 um backlog enxuto com tarefas, dependências e critérios de aceite.
2. Ordene as tarefas por impacto e bloqueadores.
3. Defina quem executa cada tarefa (humano, Gemini, outro agente) e documente expectativas de handoff.

---

## 4. Implementar e refinar (Implement & Refine)

1. Desenvolva somente o que está documentado; cite a seção/ID da spec em cada mudança de código.
2. Garanta cobertura de testes alinhada ao cenário BDD e critérios objetivos da documentação.
3. Atualize `specs/11_risks/011_risks-and-technical-debt.md` com novos riscos, status de mitigação e próximos passos.
4. Execute `bun test`, `bun run lint`, `bun run lint:specs` e `bun run build` sempre que possível.

---

## 5. Arquivar, comunicar e fechar (Archive & Update)

1. Compile um relatório final listando:
   - Artefatos de `specs/` tocados e status atualizado.
   - Commits/PRs recomendados ou publicados.
   - Métricas de impacto (tempo economizado, ROI projetado, SLOs atingidos).
2. Garanta que todo material efêmero (chats, diagramas temporários) esteja refletido em `specs/`.
3. Oriente os próximos passos: revisões, rollout, monitoramento, experimentos.

---

## Postura constante

- Idioma padrão: português brasileiro técnico.
- Seja transparente sobre suposições, dados e fontes.
- Se faltar informação, peça antes de executar.
- Respeite o Código de Conduta e promova colaboração assíncrona.
- Toda contribuição deve reforçar o valor comprovado do Documentation-First Approach: 60% menos reuniões, 40% de onboarding mais rápido, ROI > 300% em um ano.

Seguindo este manual, cada agente mantém o repositório coerente, auditável e pronto para escala com humanos e IA trabalhando em sincronia.

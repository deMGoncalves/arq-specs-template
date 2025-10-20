# Guia de Contribuição

Obrigado por considerar uma contribuição para o **Documentation-First Approach**. Este projeto só faz sentido se continuarmos provando que documentar antes de codar aumenta a qualidade e a velocidade de times distribuídos — inclusive quando agentes entram no jogo.

## Princípios inegociáveis

- **Documentação primeiro.** Toda alteração começa em `specs/`. Sem capítulo atualizado, não há código aprovado.
- **Fonte única de verdade.** O arc42 é o contrato vivo que alimenta humanos e agentes; divergências são tratadas como incidentes.
- **Transparência mensurável.** Cada mudança deve apontar métricas (SLOs, RTO/RPO, produtividade) e riscos associados.
- **Automação consciente.** Comandos `/vision`, `/stack`, `/plan`, etc., são seus copilotos. Sempre revise o resultado antes do commit.

## Escolha o fluxo certo

| Cenário | Fluxo recomendado | Ordem dos comandos |
| ------- | ----------------- | ------------------ |
| Já existe documentação densa (RFP, BRD, discovery completo) | **Opção A — Fluxo Acelerado** | `import` → `code` |
| Projeto greenfield ou necessidade de inspeções faseadas | **Opção B — Desenvolvimento Iterativo** | `vision` → `stack` → `plan` + `feature` → `build` → `code` |

> Dica: após cada comando, execute `bun run lint:specs` para garantir aderência ao template e mantenha `specs/12_glossary/012_glossary.md` sincronizado.

## Passo a passo para uma contribuição

1. **Abra uma issue** descrevendo objetivo, métricas e riscos percebidos. Anexe qualquer documento de apoio.
2. **Atualize a documentação** usando o fluxo escolhido. Verifique sempre os templates em `.gemini/template/` antes de editar qualquer artefato.
3. **Revise o resultado**:
   - Substitua todo `PREENCHER`.
   - Atualize status, datas e versões nos arquivos tocados.
   - Garanta correlação entre atores, sistemas, containers, componentes e cenários.
4. **Implemente o código** apenas depois que a doc estiver aprovada. Utilize `/code` para gerar plano e validar riscos.
5. **Teste tudo**:
   - `bun test`
   - `bun run lint`
   - `bun run lint:specs`
   - `bun run build`
6. **Faça commit seguindo Conventional Commits**, incluindo referência ao artefato principal (`feat: add ADR-003 edge caching`).
7. **Abra o pull request** com:
   - Resumo executivo (problema, solução, impacto nos SLOs).
   - Lista de arquivos tocados em `specs/`.
   - Evidências (prints, métricas, links de pipeline).
   - Plano de rollout/rollback.

## Revisão e aprovação

- Pelo menos um Maintainer deve aprovar mudanças de documentação estratégica (capítulos 01–04, 08–09).
- Mudanças que impliquem novos riscos precisam atualizar `specs/11_risks/011_risks-and-technical-debt.md`.
- Qualquer divergência entre código e documentação bloqueia o merge até ser resolvida.
- Se um agente for usado para gerar conteúdo, mencione no PR qual comando foi executado e quais ajustes manuais foram feitos.

## Como reportar incidentes

- Abra uma issue com o prefixo `[INCIDENT]`.
- Informe data/hora, capítulos desatualizados, sintomas percebidos e custo (tempo extra, incidentes em produção, retrabalho).
- Inclua um plano para corrigir a documentação antes de tocar no código.

## Canal de comunicação

- Discord: `#documentation-first` (assíncrono por padrão; use threads).
- Reuniões síncronas só são marcadas se a documentação não for suficiente para destravar o andamento.

Seguindo estas diretrizes, mantemos a cadência de documentação que entrega 60% menos reuniões, 40% de onboarding mais rápido e ROI de três dígitos. Bora documentar antes de codar. 🧠🚀

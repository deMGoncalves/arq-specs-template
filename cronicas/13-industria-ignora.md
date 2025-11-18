# Crônica 13: Por Que a Indústria Ignora Isso?

**Série**: Crônicas - Minha Jornada com IAs e Arquitetura de Software
**Autor**: Cleber de Moraes Gonçalves | PUCPR

---

## A Pergunta Incômoda

Você acabou de ler:

- Redução de 98.5% em alucinação (Crônica 10)
- ROI de 290-780% no primeiro ano (Crônica 11)
- Fundamentos científicos sólidos (Shannon, Vaswani, Liu et al.)

**Pergunta óbvia**: Se funciona tão bem, por que quase ninguém faz isso?

Esta crônica não vai ser confortável. Vou falar verdades que a indústria não quer ouvir.

## Razão 1: Documentação é "Chata"

### A Cultura do "Just Code"

```
Reunião de planejamento:

PM: "Precisamos de autenticação OAuth2."
Dev: "Beleza, vou codar."
PM: "Mas... não vamos especificar requisitos?"
Dev: "Pra quê? Eu sei o que fazer. Especificar é perda de tempo."

[2 semanas depois]

PM: "Isso não é o que pedimos."
Dev: "Mas você não especificou!"
PM: "Você disse que sabia o que fazer!"
```

**Ciclo interminável de mal-entendidos.**

### O Mito da Agilidade

```
"Manifesto Ágil diz: Software funcional > Documentação abrangente"

Interpretação da indústria:
  "Documentação = desperdício"
  "Documentação = waterfall"
  "Documentação = burocracia"

Realidade do Manifesto Ágil:
  "Valorizamos mais o item da esquerda,
   MAS AINDA VALORIZAMOS os itens da direita"
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

**Ágil não disse "zero documentação". A indústria entendeu errado.**

### O Problema do Feedback Imediato

Desenvolvedores são treinados para feedback imediato:

```
Escreve código → Compila → Testa → Funciona (ou não)
  ↑_______________|__________________|
        Ciclo: segundos/minutos
```

Documentação tem feedback atrasado:

```
Escreve spec → ... → Implementa → ... → Funciona melhor?
  ↑_______________|______________|______________|
        Ciclo: dias/semanas
```

**Feedback atrasado = menos motivador = menos adotado.**

## Razão 2: Custo Inicial Visível, Benefício Invisível

### A Falácia do Custo Aparente

```
Gestor vê:

Sem documentação:
  Feature pronta em: 2 semanas ✅
  (ignora: 3 semanas de retrabalho depois)

Com documentação:
  Spec leva: 1 semana
  Feature pronta em: 1 semana (após spec)
  Total: 2 semanas ❌

Gestor pensa: "Por que gastar 1 semana em spec?"
```

**Problema**: Retrabalho acontece DEPOIS da entrega inicial.

```
Timeline real:

Sem spec:
  ████████████ (2 semanas dev)
              ██████████████ (3 semanas retrabalho)
  Total: 5 semanas

Com spec:
  ████████ (1 semana spec)
          ████████ (1 semana dev)
  Total: 2 semanas

Mas gestor só mede até a primeira entrega:
  Sem spec: 2 semanas ✅
  Com spec: 2 semanas ✅
  "São iguais!" (ERRO)
```

**Métricas míopes = decisões erradas.**

### O Problema da Atribuição

```
Feature desenvolvida com Documentation-First:
  - Entregue no prazo
  - Zero bugs críticos
  - Código limpo
  - Fácil de manter

Dev: "Fiz um ótimo trabalho!"
Gestor: "Ótimo dev!"

Ninguém credita: A ESPECIFICAÇÃO.
```

**Benefício da spec é invisível.**

```
Feature desenvolvida SEM spec:
  - Atrasou 3 semanas
  - 8 bugs críticos
  - Código bagunçado
  - Difícil de manter

Dev: "A spec estava ambígua!"
Gestor: "Faltou comunicação!"

Todos culpam: FALTA DE ESPECIFICAÇÃO.
```

**Custo da falta de spec é visível APENAS quando falha.**

## Razão 3: Viés do Sobrevivente

### "Meu Código Funciona Sem Spec"

```
Dev: "Eu não preciso de spec. Meu código sempre funciona."

Realidade:
  - 60% do seu código tem bugs sutis não detectados
  - 40% dos requisitos foram mal interpretados
  - Cliente aceitou porque "tá bom o suficiente"
  - Você só lembra dos sucessos, esquece dos fracassos
```

**Viés de confirmação + viés do sobrevivente = ilusão de competência.**

### A Falência Silenciosa

```
Empresas que NÃO adotam práticas de qualidade:

Ano 1: Crescimento rápido (sem burocracia!)
Ano 2: Desaceleração (débito técnico acumula)
Ano 3: Estagnação (impossível adicionar features)
Ano 4: Declínio (concorrentes ultrapassam)
Ano 5: Falência ou pivô forçado
```

**Mas ninguém estuda as empresas que faliram.**

```
Empresas que sobrevivem:
  - Adotaram práticas de qualidade (mesmo sem saber)
  - Contrataram devs seniors experientes
  - Tiveram SORTE com decisões arquiteturais

Indústria estuda os sobreviventes:
  "Olha, eles não usam specs e deram certo!"

  (Ignorando: sobreviveram APESAR da falta de specs)
```

**Survivorship bias: estudamos quem sobreviveu, não quem morreu.**

## Razão 4: Ilusão de Controle com IAs

### "A IA Entende o Que Eu Quero"

```
Dev: "Só preciso pedir e a IA faz."

Experimento:
  Prompt: "Crie um sistema de autenticação"

  Tentativa 1: IA gera código com JWT
  Dev: "Legal!"

  Tentativa 2: IA gera código com OAuth2
  Dev: "Hmm, não era isso..."

  Tentativa 3: IA gera código com Session Cookies
  Dev: "WTF?"

Realidade: IA está adivinhando baseado em probabilidades.
Dev acha que "IA está aprendendo o que eu quero."

Verdade: IA está amostrando distribuição de probabilidade.
```

**Ilusão de controle: confundir aleatoriedade com aprendizado.**

### O Efeito Dunning-Kruger com IA

```
Competência com IA:

Iniciante:
  "IA é mágica! Faz tudo que eu peço!"
  Confiança: ████████████ (100%)
  Competência real: ██ (20%)

Intermediário:
  "IA alucina muito... não confio mais."
  Confiança: ████ (40%)
  Competência real: ██████ (60%)

Experiente:
  "IA é ferramenta. Preciso especificar bem."
  Confiança: ████████ (80%)
  Competência real: ██████████ (100%)
```

**Maioria está no pico do "IA é mágica".**

## Razão 5: Falta de Conhecimento Científico

### Desenvolvedores Não Estudam Papers

```
Papers fundamentais para trabalhar com IA:

1. Vaswani et al. (2017) - "Attention is All You Need"
   Leitores na indústria: ~5%

2. Liu et al. (2023) - "Lost in the Middle"
   Leitores na indústria: ~1%

3. Shannon (1948) - "Theory of Information"
   Leitores na indústria: ~0.5%
```

**Maioria trabalha com IA sem entender como funciona.**

### "Não Preciso Saber Como Funciona"

```
Dev: "Não preciso entender Transformer. Só preciso usar."

Analogia:
  "Não preciso entender combustão. Só preciso dirigir carro."

  Verdade: Para DIRIGIR carro, sim.
  Mas para OTIMIZAR performance? Precisa entender motor.

Mesmo com IA:
  Para USAR IA, não precisa entender Transformer.
  Para MAXIMIZAR qualidade do output? PRECISA entender.
```

**Conhecimento superficial = resultados superficiais.**

### A Armadilha da Abstração

```
Ferramentas escondem complexidade:

ChatGPT, Copilot, Claude, etc:
  - Interface simples (text in/out)
  - Comportamento complexo (oculto)

Desenvolvedores tratam como "caixa mágica":
  Input ruim → Output ruim
  "A IA é ruim."

Vs:

Input estruturado → Output determinístico
  "A IA funciona!"

Diferença: QUALIDADE DO INPUT.
```

**Abstração esconde a necessidade de estrutura.**

## Razão 6: Incentivos Desalinhados

### Gestores Medem Entregas, Não Qualidade

```
Métricas tradicionais:

✅ Features entregues por sprint
✅ Velocity (story points)
✅ Time-to-market

❌ Taxa de retrabalho
❌ Débito técnico
❌ Bugs em produção
❌ Tempo de manutenção
```

**O que você mede é o que você otimiza.**

```
Consequência:

Dev é recompensado por:
  - Entregar rápido (spec "atrasa")
  - Fechar tickets (qualidade irrelevante)
  - Parecer produtivo (código é visível, spec não)

Dev NÃO é recompensado por:
  - Escrever specs (não soma em velocity)
  - Prevenir bugs (ninguém vê bug que não aconteceu)
  - Documentar decisões (ADRs não entram em sprint)
```

**Incentivos errados = comportamentos errados.**

### A Tragédia dos Comuns

```
Cenário:

Dev A: Não escreve spec (entrega rápido, é promovido)
Dev B: Escreve spec (entrega "lento", não é promovido)

Resultado:
  - Dev A é exemplo a seguir
  - Dev B é visto como "perfeccionista"
  - Time inteiro para de escrever specs

6 meses depois:
  - Codebase vira spaghetti
  - Ninguém entende decisões passadas
  - Débito técnico insuportável

Empresa culpa: "Desenvolvedores ruins"
Realidade: Incentivos ruins
```

**Sistema recompensa comportamento errado.**

## Razão 7: Negação da Complexidade

### "Meu Projeto é Simples"

```
Dev: "Meu projeto é simples. Não precisa de Arc42/BDD/ADR."

Realidade:
  - "Simples" hoje = Complexo amanhã
  - 90% dos projetos crescem além do esperado
  - "Temporário" dura 5+ anos

Por que não especificar desde o início?
```

**Subestimação sistemática da complexidade futura.**

### O Problema do "Agora Não"

```
Sprint 1:
  Dev: "Ainda é cedo para especificar. Vou direto no código."

Sprint 5:
  Dev: "Agora tenho que entregar features. Não há tempo para specs."

Sprint 20:
  Dev: "Codebase tá uma bagunça. Preciso refatorar antes de especificar."

Sprint 50:
  Dev: "Sistema tá muito grande. Impossível especificar tudo agora."
```

**"Melhor momento para especificar" nunca chega.**

### A Dívida Técnica Invisível

```
Débito técnico técnico:
  - Código duplicado: VISÍVEL
  - Testes faltando: VISÍVEL
  - Coverage baixo: VISÍVEL

Débito técnico de documentação:
  - Decisões não documentadas: INVISÍVEL
  - Ambiguidade em requisitos: INVISÍVEL
  - Conhecimento tribal: INVISÍVEL

Até que:
  - Dev senior sai da empresa
  - Ninguém sabe por que X foi feito
  - Projeto precisa de reescrita
```

**Invisível até ser tarde demais.**

## Razão 8: Hype Cycle da IA

### "IA Vai Resolver Tudo"

```
2023: "IA vai substituir desenvolvedores!"
2024: "IA é assistente poderoso!"
2025: "IA precisa de input estruturado..." ← Estamos aqui

Hype Cycle:
  Pico de expectativas: "IA é mágica!"
  Vale da desilusão: "IA alucina demais..."
  Platô de produtividade: "IA com specs funciona!"

Maioria está no pico/vale.
```

**Expectativas irrealistas bloqueiam soluções reais.**

### O Paradoxo da Ferramenta Poderosa

```
Ferramentas poderosas criam ilusão de simplicidade:

Microsoft Word: Qualquer um "escreve" um documento
  → Mas escrever BEM requer conhecimento

Photoshop: Qualquer um "edita" uma imagem
  → Mas editar BEM requer habilidade

ChatGPT: Qualquer um "gera" código
  → Mas gerar código BOM requer especificação

Problema: Ferramenta democratiza ACESSO, não EXPERTISE.
```

**Acesso fácil ≠ Resultado bom.**

## Razão 9: Resistência à Mudança

### "Sempre Fizemos Assim"

```
Dev: "Sempre codei direto. Funciona pra mim."
Tech Lead: "Sempre entregamos sem specs. Deu certo."
CTO: "Sempre priorizamos velocidade. É nossa cultura."

Change is hard.
```

**Status quo bias: manter o que é familiar.**

### O Custo Percebido da Mudança

```
Adotar Documentation-First:

Custo percebido (IMEDIATO):
  - Aprender Arc42, BDD, ADR
  - Criar templates
  - Treinar time
  - Mudar processo

Benefício percebido (FUTURO):
  - "Talvez" melhore qualidade
  - "Talvez" reduza bugs
  - "Talvez" economize tempo

Viés: Custo certo agora > Benefício incerto futuro
```

**Aversão ao risco mata inovação.**

## Razão 10: Falta de Exemplos Públicos

### "Cadê os Casos de Sucesso?"

```
Empresas que adotam Documentation-First:

Problema: Não divulgam publicamente
  - Vantagem competitiva (não querem que concorrentes copiem)
  - Cultura de sigilo
  - Foco em produto, não processo
```

**Falta de exemplos públicos = ceticismo.**

### Este Manifesto é Parte da Solução

```
Por que escrevi estas crônicas:

1. Mostrar que funciona (dados reais)
2. Explicar fundamentos (ciência)
3. Facilitar adoção (templates, ferramentas)
4. Criar movimento (comunidade)
```

**Open-source do conhecimento.**

## A Verdade Inconveniente

### Maioria das Empresas Não Quer Qualidade

```
Elas DIZEM que querem qualidade.
Mas AGEM para maximizar velocidade.

Porque:
  - Investidores cobram crescimento
  - Mercado recompensa first-mover
  - Débito técnico é problema do "futuro eu"
```

**Incentivos de curto prazo > Sustentabilidade de longo prazo.**

### A Indústria Opera em Modo de Crise

```
Modo normal:
  - Planejamento cuidadoso
  - Especificações detalhadas
  - Qualidade priorizada

Modo crise:
  - Entregar AGORA
  - "Fazemos direito depois"
  - Qualidade sacrificada

Indústria de software:
  - Sempre em modo crise
  - "Depois" nunca chega
  - Débito acumula infinitamente
```

**Crise permanente = qualidade impossível.**

## O Que Precisa Mudar

### 1. Educação

```
Cursos de Engenharia de Software deveriam ensinar:
  ✅ Teoria da Informação (Shannon)
  ✅ Arquitetura de LLMs (Vaswani)
  ✅ Especificação formal (BDD, Arc42)

Ao invés de:
  ❌ "Aprenda framework X"
  ❌ "10 truques de produtividade"
  ❌ "Como ganhar R$ 20k/mês"
```

**Base científica > Hype do momento.**

### 2. Métricas

```
Empresas deveriam medir:
  ✅ Taxa de retrabalho
  ✅ Débito técnico
  ✅ Coverage de especificações
  ✅ Taxa de alucinação (em código gerado por IA)

Ao invés de apenas:
  ❌ Velocity
  ❌ Features/sprint
```

**Meça qualidade, não apenas quantidade.**

### 3. Incentivos

```
Desenvolvedores deveriam ser recompensados por:
  ✅ Escrever specs de qualidade
  ✅ Prevenir bugs (não apenas corrigir)
  ✅ Documentar decisões (ADRs)
  ✅ Reduzir débito técnico

Não apenas:
  ❌ Entregar features rápido
  ❌ Fechar tickets
```

**Incentive o comportamento que você quer.**

### 4. Cultura

```
Mudar narrativa de:
  "Documentação é desperdício"

Para:
  "Documentação é investimento"

De:
  "Especificar atrasa"

Para:
  "Especificar acelera (no longo prazo)"
```

**Cultura come estratégia no café da manhã.**

## Por Que EU Não Sou Ignorado

### Não Estou Vendendo Nada

```
Estas crônicas:
  ❌ Não promovem produto comercial
  ❌ Não oferecem consultoria paga
  ❌ Não vendem curso

Apenas compartilham:
  ✅ Conhecimento técnico
  ✅ Fundamentos científicos
  ✅ Templates open-source
```

**Sem conflito de interesse.**

### Tenho Dados Reais

```
Não é:
  "Acredite em mim porque eu digo"

É:
  "Veja os dados. Replique. Valide."
```

**Ciência, não marketing.**

### Fundamentos Sólidos

```
Baseado em:
  - Shannon (1948) - 77 anos de validação
  - Vaswani et al. (2017) - Base de todos LLMs
  - Liu et al. (2023) - Pesquisa recente peer-reviewed
```

**Não é hype. É ciência estabelecida.**

## Conclusão: A Indústria Vai Mudar?

### Previsão Pessimista

```
Maioria continuará:
  - Prompts diretos → Código de baixa qualidade
  - Alucinação alta → Retrabalho constante
  - "IA não funciona" → Culpa a ferramenta

Enquanto:
  - Pequena minoria adota Documentation-First
  - Obtém 10× produtividade
  - Domina mercado
```

**Darwinismo tecnológico: sobrevivem os que se adaptam.**

### Previsão Otimista

```
Ferramentas de IA vão forçar mudança:

Claude/GPT em 2025:
  "Por favor, forneça especificação estruturada
   para melhores resultados."

Claude/GPT em 2026:
  "Não posso gerar código sem especificação Arc42."

Mercado força qualidade.
```

**IAs vão EXIGIR specs.**

### Minha Aposta

```
Bifurcação da indústria:

Grupo A (maioria):
  - Continua sem specs
  - Luta com alucinação
  - Produtividade estagna

Grupo B (minoria):
  - Adota Documentation-First
  - IA funciona bem
  - Produtividade explode

Gap entre A e B:
  Ano 1: 2×
  Ano 3: 5×
  Ano 5: 10×
```

**Escolha de qual grupo fazer parte é sua.**

---

## Você Não Precisa Acreditar em Mim

Próxima crônica: Lista completa de referências científicas.

Valide por conta própria. Replique experimentos. Tire suas conclusões.

**Ciência não precisa de fé. Precisa de evidência.**

---

**Próxima Crônica**: [Você Não Precisa Acreditar em Mim](14-nao-precisa-acreditar.md) - Todas as referências científicas, como validar, como replicar.

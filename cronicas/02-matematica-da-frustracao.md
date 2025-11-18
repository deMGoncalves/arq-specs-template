# Crônica 02: A Matemática da Frustração

**Série**: Crônicas - Minha Jornada com IAs e Arquitetura de Software
**Autor**: Cleber de Moraes Gonçalves | PUCPR

---

## Por Que Seus Prompts Não Funcionam

Você já percebeu que alguns dias sua IA favorita gera código perfeito, e outros dias parece ter esquecido completamente como programar?

**Não é a IA que mudou. É a matemática que você ignora.**

## A Explosão Combinatória da Ambiguidade

Vou te mostrar por que aquele prompt "simples" que você escreveu está fadado ao fracasso.

### Exemplo Real

Seu prompt:

```
"Crie um sistema de registro de usuários"
```

Parece simples, certo? **Errado.** Vamos analisar matematicamente:

#### Ponto Ambíguo 1: "sistema"

- REST API (HTTP/JSON)
- GraphQL API
- CLI (Command Line Interface)
- GUI Desktop
- Microsserviço
- Aplicação monolítica
- Função serverless
- Biblioteca reutilizável

**8 interpretações possíveis**

#### Ponto Ambíguo 2: "registro"

- Sign-up de novos usuários
- Registro de eventos em log
- Criação de records em banco de dados
- Registro de domínio DNS

**4 interpretações possíveis**

#### Ponto Ambíguo 3: "usuários"

- Usuários finais (end users)
- Administradores do sistema
- Contas de serviço (service accounts)
- Clientes de API

**4 interpretações possíveis**

### O Cálculo Devastador

```
Total de implementações possíveis = 8 × 4 × 4 = 128
```

E isso com apenas **3 termos** em **6 palavras**.

## Escalando Para o Mundo Real

Agora considere um requisito real:

> "Implemente autenticação completa com validação de email, recuperação de senha, proteção contra força bruta, e suporte a OAuth2"

Vamos contar pontos de decisão ambíguos:

1. **Autenticação**: Username/Password? Magic Link? Biométrica? Multi-fator? (10 opções)
2. **Validação de email**: Sintaxe? DNS? SMTP? Anti-descartável? (6 opções)
3. **Recuperação de senha**: Token por email? SMS? Questões de segurança? (5 opções)
4. **Proteção contra força bruta**: Por IP? Por usuário? Por endpoint? Janela fixa ou deslizante? (8 opções)
5. **OAuth2**: Quais providers? Authorization Code? Implicit? PKCE? (12 opções)
6. **Armazenamento de sessão**: Memory? Redis? Database? JWT stateless? (4 opções)
7. **Hashing de senha**: bcrypt? argon2? scrypt? Quantos rounds? (9 opções)
8. **Token format**: JWT? Opaque? Formato customizado? (3 opções)
9. **Token storage**: Cookie? Header? LocalStorage? (3 opções)
10. **Refresh token**: Sim? Não? Rotation? (3 opções)

**Apenas 10 pontos de decisão**. Vamos calcular:

```
|Ω| = 10 × 6 × 5 × 8 × 12 × 4 × 9 × 3 × 3 × 3
|Ω| = 55.987.200 implementações possíveis
```

**Cinquenta e cinco milhões de formas diferentes** de implementar esse requisito.

Quando você escreve aquele prompt, a IA escolhe **UMA** dessas 55 milhões de opções. Baseada em quê? **Nas distribuições de probabilidade aprendidas durante treinamento**.

E você fica frustrado porque "a IA não entendeu o que eu queria".

**A IA não tem como "entender". Você não forneceu informação suficiente para colapsar esse espaço de 55 milhões de possibilidades para 1.**

## A Fórmula da Frustração

Formalizando matematicamente:

```
Ambiguidade Total = k^n

Onde:
k = número de interpretações por ponto ambíguo
n = número de pontos ambíguos
```

Para requisitos de complexidade média:

```
k ≈ 10 (conservador)
n ≈ 20 (típico)

|Ω| = 10²⁰ = 100.000.000.000.000.000.000 implementações
```

**Cem quintilhões de possibilidades.**

Para contextualizar:

- Grãos de areia na Terra: ~10¹⁸
- Estrelas no universo observável: ~10²⁴
- **Suas implementações possíveis**: 10²⁰

## Por Que Às Vezes Funciona?

Você deve estar pensando: "Mas às vezes meus prompts funcionam!"

Sim. **Quando há apenas uma implementação óbvia e estabelecida.**

Exemplos:

- "Crie uma função que ordena um array" → Implementação canônica bem conhecida
- "Implemente FizzBuzz" → Problema clássico com solução única
- "Parse JSON string" → Biblioteca padrão

**Nesses casos, k ≈ 1 e n ≈ 1, então |Ω| ≈ 1.**

Mas para qualquer coisa minimamente complexa ou específica do seu domínio? **Explosão combinatória garantida.**

## A Taxa de Acerto Real

Estudos empíricos (embora a maioria das empresas não publique métricas reais) sugerem:

- **Prompts ambíguos**: Taxa de acerto ~12%
- **Prompts "melhorados"**: Taxa de acerto ~30%
- **Especificações determinísticas**: Taxa de acerto ~89%

Por que 89% e não 100%? Porque ainda há escolhas de implementação funcionalmente equivalentes (nome de variáveis, estrutura de código, etc.). Mas são **funcionalmente** equivalentes - o comportamento observável é idêntico.

## Implicações Práticas

### O Que Você Está Fazendo Agora

1. Escreve prompt ambíguo
2. IA gera código (escolha aleatória dentro de espaço gigante)
3. Não é o que você queria
4. Escreve prompt "melhorado"
5. IA gera código diferente (outra escolha aleatória)
6. Ainda não é o que você queria
7. Repete 5-10 vezes
8. Desiste ou aceita algo "próximo"
9. Introduz bugs sutis em produção

**Tempo desperdiçado**: Horas/dias
**Taxa de frustração**: Máxima

### O Que Deverias Estar Fazendo

1. Escreve especificação determinística que colapsa |Ω| de 10²⁰ para ~10
2. IA gera código (escolha dentro de espaço minúsculo)
3. É exatamente o que você queria (funcionalmente)
4. Validação de comportamento via testes
5. Deploy em produção com confiança

**Tempo**: Mesma ordem de grandeza, mas **investido corretamente**
**Taxa de frustração**: Mínima
**Qualidade**: Reproduzível

## A Verdade Matemática

**Você não consegue debugar um sistema probabilístico que opera em um espaço de 10²⁰ possibilidades.**

A única solução é reduzir esse espaço **antes** da geração.

Como? **Através de especificações determinísticas baseadas em teoria da informação.**

## Entropia e Informação Mútua

Claude Shannon já tinha resolvido isso em 1948:

```
H(X) = -Σ P(xᵢ) × log₂(P(xᵢ))
```

Entropia mede incerteza. Sua especificação ambígua tem entropia altíssima. A IA não tem informação suficiente para reduzir essa entropia.

Informação mútua I(X;Y) quantifica quanto uma variável reduz incerteza sobre outra:

```
I(X;Y) = H(Y) - H(Y|X)
```

No nosso caso:

- X = sua especificação
- Y = código correto

**Especificação ambígua**: I(X;Y) baixo → conhecer X não reduz significativamente incerteza sobre Y
**Especificação determinística**: I(X;Y) alto → conhecer X elimina quase toda incerteza sobre Y

## Minha Conclusão

Depois de estudar os fundamentos matemáticos de IAs na PUCPR e trabalhar com arquitetura de software, a conclusão é inevitável:

**A frustração com IAs não é falha da IA. É falha de quem não compreende a matemática subjacente e continua fornecendo inputs ambíguos.**

Nas próximas crônicas, mostrarei **exatamente como** transformar especificações ambíguas (H alto) em especificações determinísticas (H baixo), e os resultados mensuráveis que obtive.

---

## Referências

- Shannon, C. E. (1948). A Mathematical Theory of Communication. Bell System Technical Journal, 27(3), 379-423.
- Liu, N. F., et al. (2023). Lost in the Middle: How Language Models Use Long Contexts. arXiv:2307.03172.

---

**Próxima Crônica**: [Contra as Specs (Aparentemente)](03-contra-specs-aparentemente.md) - Por que eu disse que era "contra specs" e o que realmente quis dizer.

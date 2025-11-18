# Crônica 03: Contra as Specs (Aparentemente)

**Série**: Crônicas - Minha Jornada com IAs e Arquitetura de Software
**Autor**: Cleber de Moraes Gonçalves | PUCPR

---

## A Declaração Polêmica

No início dessa jornada, eu disse: **"Sou contra specs"**.

Pessoas me olharam como se eu tivesse enlouquecido. Como um estudante de IA e arquitetura de software pode ser contra especificações?

**Plot twist**: Eu nunca fui contra specs. Eu era (e sou) contra **specs inúteis e ambíguas** que fingem ser documentação mas na verdade são apenas ruído.

## O Que São "Specs Tradicionais"?

Você sabe do que estou falando:

### Tipo 1: A Spec Vaga

```markdown
# Sistema de Autenticação

O sistema deve permitir que usuários façam login de forma segura.

## Requisitos
- Autenticação de usuários
- Validação de credenciais
- Sessão persistente
- Logout
```

**Problema**: Entropia altíssima. Cada frase admite dúzias de interpretações. |Ω| ≈ 10¹⁵ implementações possíveis.

### Tipo 2: A Spec "Completa" (mas inútil)

```markdown
# Sistema de Autenticação

## 1. Visão Geral
O sistema de autenticação é responsável por gerenciar o acesso de usuários...
[3 páginas de texto genérico]

## 2. Requisitos Funcionais
RF001: O sistema deve autenticar usuários
RF002: O sistema deve validar credenciais
[50 requisitos vagos]

## 3. Requisitos Não-Funcionais
RNF001: O sistema deve ser seguro
RNF002: O sistema deve ser rápido
[Platitudes que não especificam nada]
```

**Problema**: Aparenta ser "completa", mas cada item é ambíguo. Volume não é clareza. |Ω| ainda ≈ 10¹⁵.

### Tipo 3: A Spec "Técnica" (mas inconsistente)

```markdown
# API de Autenticação

## Endpoint: /login
Método: POST
Aceita email e senha.
Retorna token se válido.

## Endpoint: /logout
Método: POST
Invalida token.
```

**Problema**:

- Aceita email? E se email inválido? Sintaxe? DNS?
- "Senha" - Requisitos mínimos? Máximo? Caracteres permitidos?
- "Token" - Formato? JWT? Opaque? Onde armazenado? Validade?
- "Invalida" - Delete do banco? Blacklist? Como?

Parece específica, mas está repleta de lacunas. |Ω| ≈ 10¹⁰.

## Por Que Eu Era "Contra" Isso?

Porque essas specs têm propriedades terríveis:

### 1. Ilusão de Completude

Desenvolvedores (e IAs) acham que têm informação suficiente. **Não têm.**

Resultado: Implementações inconsistentes, bugs sutis, retrabalho infinito.

### 2. Entropia Escondida

O documento *parece* determinístico, mas cada frase esconde ambiguidade exponencial.

```
H(X) ≈ 2.8 bits → Perplexidade = 2^2.8 ≈ 7.0
```

Para cada decisão, a IA enfrenta ~7 escolhas equiprováveis. Multiplique por centenas de decisões. Resultado: código aleatório.

### 3. Não Testáveis

Como você testa "O sistema deve ser seguro"?
Como você valida "Autentica usuários"?

**Não pode.** São afirmações não verificáveis.

### 4. Não Mensuráveis

Como você mede completude?
Como você detecta ambiguidade?

**Não pode.** Não há métrica objetiva.

## O Que Eu Realmente Queria

Não era **ausência** de specs. Era specs que tivessem propriedades matemáticas específicas:

### Propriedade 1: Baixa Entropia

```
H(spec) < 0.5 bits
```

Cada ponto de decisão deve ter distribuição de probabilidade altamente concentrada. Idealmente P(opção_correta) > 0.95.

### Propriedade 2: Alta Informação Mútua

```
I(spec; implementação_correta) > 0.95 × H(implementação_correta)
```

Conhecer a spec deve eliminar >95% da incerteza sobre a implementação.

### Propriedade 3: Determinísticas e Executáveis

Specs devem ser formuladas em linguagem que permita validação automática:

```gherkin
Cenário: Login com credenciais válidas
  Dado que existe usuário com email "joao@example.com" e senha "ValidPwd123!"
  Quando POST /api/auth/login com {"email":"joao@example.com","password":"ValidPwd123!"}
  Então resposta tem status 200
  E resposta JSON contém campo "token" do tipo string não-vazio
  E resposta JSON contém campo "expiresAt" do tipo timestamp futuro
  E token é JWT válido com claim "userId" correspondente ao usuário
```

**Isso é testável. Isso é mensurável. Isso é determinístico.**

### Propriedade 4: Declaração Explícita de Invariantes

```
POST /api/auth/register
Request: {
  "email": "string",         // Formato: RFC 5322, max 255 chars
  "password": "string"        // Min 8 chars, 1 maiúscula, 1 minúscula, 1 número
}
Response 201: {
  "userId": "uuid",           // UUID v4
  "status": "pending_verification"  // Enum: pending_verification | active | suspended
}
Errors:
  400 INVALID_EMAIL          // Se email não valida RFC 5322
  409 DUPLICATE_EMAIL        // Se email já existe no sistema
  422 WEAK_PASSWORD          // Se senha não atende requisitos
```

**Cada tipo é especificado. Cada validação é explícita. Cada erro é enumerado.**

## A Transformação

Quando comecei a aplicar esses princípios, algo aconteceu:

### Antes (Spec Ambígua)

- **Tempo de especificação**: 2 horas
- **Tempo de implementação (IA)**: 30 minutos
- **Tempo de correção (bugs + retrabalho)**: 8 horas
- **Resultado**: Código funcionalmente incorreto
- **Total**: 10.5 horas

### Depois (Spec Determinística)

- **Tempo de especificação**: 4 horas
- **Tempo de implementação (IA)**: 20 minutos
- **Tempo de validação**: 30 minutos
- **Resultado**: Código funcionalmente correto
- **Total**: 5 horas

**Redução de 53% no tempo total. E o código está CORRETO.**

## A Ironia

Quando eu dizia "sou contra specs", o que eu realmente queria dizer era:

**"Sou contra a ilusão de que um documento Word de 50 páginas cheio de platitudes constitui especificação. Sou A FAVOR de specs determinísticas baseadas em teoria da informação que colapsam o espaço de possibilidades para valores mensuráveis."**

Mas "sou contra specs" é mais polêmico e gera discussão. E discussão leva pessoas a questionar suas práticas.

## O Que Aprendi

Specs não são o problema. **Ambiguidade é o problema.**

E ambiguidade não é filosófica. É **matemática**. Pode ser medida através de entropia H(X). Pode ser reduzida através de especificações estruturadas.

Não é questão de opinião. É questão de aplicar teoria da informação estabelecida (Shannon, 1948) ao problema de geração de código.

## Minha Posição Atual

**Sou A FAVOR de specs. Specs determinísticas, testáveis, mensuráveis, com entropia H < 0.5 bits.**

E nas próximas crônicas, mostrarei exatamente quais frameworks utilizo para alcançar isso e os resultados mensuráveis que obtive.

---

## Citações Técnicas

> "A specification is deterministic if and only if the entropy of the probability distribution over possible implementations is minimized to within measurement error."
> — Derivação própria baseada em Shannon (1948)

> "Low entropy specifications collapse the implementation space from exponential O(k^n) to constant O(c) where c represents functionally equivalent variations."
> — Observação baseada em análise combinatória

---

## Referências

- Shannon, C. E. (1948). A Mathematical Theory of Communication. Bell System Technical Journal, 27(3), 379-423.
- "The Documentation-First Approach: Transforming Distributed Team Communication" - FullScale.io

---

**Próxima Crônica**: [Fundamentos: Shannon e a Teoria da Informação](04-fundamentos-shannon.md) - A matemática que fundamenta tudo isso.

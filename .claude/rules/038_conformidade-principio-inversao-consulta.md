# Conformidade com o Princípio de Inversão de Consulta (CQS)

**ID**: COMPORTAMENTAL-038
**Severidade**: 🟠 Alta
**Categoria**: Comportamental

---

## O que é

Exige que um método seja ou uma **Consulta (Query)** que retorna dados sem alteração de estado, ou um **Comando (Command)** que altera o estado mas não retorna dados (exceto DTOs/Entidades).

## Por que importa

A violação do CQS introduz **efeitos colaterais inesperados** e dificulta o raciocínio sobre o código, pois o cliente assume que um método de "consulta" é seguro, mas ele silenciosamente altera o estado do sistema. Isso leva a bugs de concorrência e de estado.

## Critérios Objetivos

- [ ] Métodos que alteram o estado (Comandos) devem ter o tipo de retorno `void` ou um tipo de entidade (ex: `User`, `Order`), mas **não** um `boolean` ou código de sucesso.
- [ ] Métodos que retornam um valor (Consultas) não devem ter efeitos colaterais perceptíveis (ex: modificação de variáveis de instância, chamadas a métodos de escrita).
- [ ] O número de métodos que são híbridos (fazem Query e Command) deve ser zero.

## Exceções Permitidas

- **Caches**: Métodos de leitura que têm o efeito colateral de atualizar um cache interno (*cache-aside*) são aceitos, desde que este efeito seja uma otimização e não lógica de negócio.

## Como Detectar

### Manual

Busca por métodos que retornam um valor, mas que contêm lógica de persistência (`save()`) ou modificação de estado.

### Automático

ESLint: Regras customizadas que verificam o padrão de nomes de métodos de leitura/escrita e seus retornos.

## Relacionada com

- [036 - Restrição de Funções com Efeitos Colaterais](036_restricao-funcoes-efeitos-colaterais.md): reforça
- [010 - Princípio da Responsabilidade Única](010_principio-responsabilidade-unica.md): reforça
- [009 - Diga, Não Pergunte](009_diga-nao-pergunte.md): reforça
- [011 - Princípio Aberto/Fechado](011_principio-aberto-fechado.md): reforça

---

**Criada em**: 2025-10-08
**Versão**: 1.0

# Proibição de Nomes Enganosos (Desinformação e Encoding)

**ID**: ESTRUTURAL-035
**Severidade**: 🔴 Crítica
**Categoria**: Estrutural

---

## O que é

Proíbe o uso de nomes que impliquem falsas pistas ou sugiram um comportamento que o código não possui (ex: chamar um `Set` de `accountList`) e proíbe a codificação de tipos nos nomes (ex: `strName` ou `fValue`).

## Por que importa

Nomes enganosos são uma forma de **desinformação** que quebra a confiança do desenvolvedor no código. O *encoding* de tipo (notação húngara) é redundante e polui o código, aumentando o risco de bugs de tempo de execução quando o tipo é alterado.

## Critérios Objetivos

- [ ] Variáveis que contêm coleções (`Array`, `Set`, `Map`) devem ser nomeadas conforme a estrutura de dados real.
- [ ] É proibido o uso de prefixos de tipo desnecessários em nomes (ex: `str`, `int`, `f`).
- [ ] Nomes de variáveis não devem contradizer o tipo de dado que armazenam.

## Exceções Permitidas

- **Interfaces Legadas**: Variáveis onde a notação húngara é exigida para interoperabilidade com código legado ou *frameworks* de baixo nível.

## Como Detectar

### Manual

Verificar se o nome de uma variável contradiz seu uso ou o tipo real de dado que contém.

### Automático

ESLint: Regras personalizadas contra notação húngara e para verificar padrões de lista.

## Relacionada com

- [006 - Proibição de Nomes Abreviados](006_proibicao-nomes-abreviados.md): complementa
- [003 - Encapsulamento de Primitivos](003_encapsulamento-primitivos.md): reforça
- [034 - Nomes de Classes e Métodos Consistentes](034_nomes-classes-metodos-consistentes.md): complementa

---

**Criada em**: 2025-10-08
**Versão**: 1.0

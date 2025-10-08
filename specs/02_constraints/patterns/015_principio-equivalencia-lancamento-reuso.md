# Equivalência de Lançamento e Reuso de Pacotes (REP)

**ID**: ESTRUTURAL-015
**Severidade**: 🟠 Alta
**Categoria**: Estrutural

---

## O que é

O módulo/pacote que se destina ao reuso deve ter o mesmo escopo de lançamento (release) que o seu consumidor. A granularidade do reuso é a granularidade do lançamento.

## Por que importa

Violações do REP levam a pacotes que são difíceis de versionar e consumir, forçando clientes a aceitar módulos que não usam, ou a esperar por releases desnecessárias para obter uma correção.

## Critérios Objetivos

- [ ] O pacote reutilizável deve ser minimamente coeso (SRP aplicado a nível de pacote).
- [ ] Todos os itens do pacote reutilizável devem ser lançados sob a mesma versão (sem *sub-versionamento*).
- [ ] A pasta/pacote deve ter um único objetivo de reuso (ex: *Logging*, *Validation*, *DomainPrimitives*).

## Exceções Permitidas

- **Monorepos com Workspaces**: Ambientes onde o gerenciamento de dependências é estritamente controlado para que a versão seja sempre sincronizada.

## Como Detectar

### Manual
Verificar se o pacote contém classes que não são utilizadas em conjunto pelos clientes.

### Automático
Análise de dependências: `dependency-analysis` para identificar classes sem uso.

## Relacionada com

- [ESTRUTURAL-016]: complementa (Coesão de Pacotes)
- [COMPORTAMENTAL-010]: reforça (SRP a nível de Classe)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

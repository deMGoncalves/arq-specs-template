# 5. Visão de Blocos de Construção

**Status**: [🔴 Não Iniciado | 🟡 Em Progresso | 🟢 Completo]
**Última atualização**: [YYYY-MM-DD]

---

## 5.1 Visão Geral (Nível 1)

### Diagrama de Blocos Principais
[PREENCHER: Diagrama C4 Level 2 - Container Diagram]

```
[Inserir diagrama aqui]
```

### Containers Principais

#### [Nome do Container 1]
- **Tipo**: [Aplicação Web/API/Worker/etc]
- **Tecnologia**: [PREENCHER]
- **Responsabilidade**: [PREENCHER]
- **Dependências**: [PREENCHER]

#### [Nome do Container 2]
[PREENCHER: Repetir estrutura acima]

---

## 5.2 Decomposição do [Container Principal] (Nível 2)

### Diagrama de Componentes
[PREENCHER: Diagrama C4 Level 3 - Component Diagram]

```
[Inserir diagrama aqui]
```

### Módulos/Componentes

#### [Nome do Módulo 1]
- **Camada**: [Domain/Application/Infrastructure]
- **Responsabilidade**: [PREENCHER]
- **Expõe**: [PREENCHER: Interfaces públicas]
- **Depende de**: [PREENCHER]
- **Regras de negócio**: [PREENCHER ou link para .rules/]

#### [Nome do Módulo 2]
[PREENCHER: Repetir estrutura acima]

---

## 5.3 Organização do Código-Fonte

### Estrutura de Diretórios

```
[PREENCHER: Estrutura real do projeto]

Exemplo:
src/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   └── repositories/
├── application/
│   ├── use-cases/
│   └── dtos/
├── infrastructure/
│   ├── database/
│   ├── http/
│   └── messaging/
└── presentation/
    ├── controllers/
    └── views/
```

### Convenções de Organização

- **Por camada**: [PREENCHER: Descrição]
- **Por feature**: [PREENCHER: Descrição]
- **Por domínio**: [PREENCHER: Descrição]

---

## 5.4 Detalhamento de Componentes Críticos

### [Componente Crítico 1]

**Responsabilidade**: [PREENCHER]

**Interfaces Públicas**:
```typescript
[PREENCHER: Signature de funções/métodos principais]
```

**Dependências**:
- [PREENCHER]

**Regras Aplicáveis**: [Links para .rules/]

### [Componente Crítico 2]
[PREENCHER: Repetir estrutura acima]

---

## 5.5 Princípios de Modularização

### Coesão
[PREENCHER: Como é garantida a coesão dos módulos]

### Acoplamento
[PREENCHER: Como é minimizado o acoplamento]

### Encapsulamento
[PREENCHER: O que é público vs privado em cada módulo]

---

**Referências**: [Links para diagramas detalhados, código-fonte]

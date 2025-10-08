# Princípio do Reuso Comum (CRP)

**ID**: ESTRUTURAL-017
**Severidade**: 🟡 Média
**Categoria**: Estrutural

---

## O que é

As classes em um pacote devem ser reutilizadas em conjunto. Se você usa uma, você deve usar todas.

## Por que importa

O CRP ajuda a refinar a granularidade do pacote, garantindo que os clientes não sejam forçados a depender de classes que não usam, o que evita recompilações/redeploy desnecessários e reduz o acoplamento indesejado.

## Critérios Objetivos

- [ ] O pacote deve ser dividido se houver classes que não são utilizadas por pelo menos **50%** dos clientes que importam o pacote.
- [ ] Se uma classe é usada isoladamente, ela deve ser movida para um pacote de utilidade ou para fora do pacote coeso.
- [ ] Não deve haver mais de **3** classes públicas dentro de um pacote que não são referenciadas externamente.

## Exceções Permitidas

- **Métodos Privados de Suporte**: Classes auxiliares internas que são estritamente usadas para suportar as classes públicas do pacote.

## Como Detectar

### Manual
Verificar o diretório de `imports` de um cliente e ver quantas classes do pacote importado ele usa ativamente.

### Automático
Análise de dependências: Ferramentas que mapeiam a porcentagem de classes consumidas dentro de um pacote.

## Relacionada com

- [ESTRUTURAL-015]: complementa (Enfoca o reuso do pacote)
- [COMPORTAMENTAL-013]: reforça (ISP)

---

**Criada em**: 2025-10-04
**Versão**: 1.0

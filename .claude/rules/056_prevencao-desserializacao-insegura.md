# Prevenção de Desserialização Insegura

**ID**: SEGURANÇA-056
**Severidade**: 🔴 Crítica
**Categoria**: Segurança

---

## O que é

Evitar desserialização de dados não confiáveis de usuários. Se necessário, usar formatos seguros (JSON), validar schema antes de deserializar, e nunca deserializar objetos complexos com métodos que executam código arbitrário.

## Por que importa

Desserialização insegura permite Remote Code Execution ao exploitar gadget chains em bibliotecas. Responsável por breaches críticos (Equifax 2017). Pode levar a comprometimento completo do servidor. Substituir por JSON elimina vetores de ataque de desserialização.

## Critérios Objetivos

- [ ] Preferir JSON sobre formatos binários de serialização (Java Serialization, Pickle, YAML unmarshalling)
- [ ] Se desserialização binária é necessária, validar signature/HMAC antes de deserializar
- [ ] Whitelist de classes permitidas para desserialização (não permitir classes arbitrárias)
- [ ] Desserializar apenas dados de fontes confiáveis autenticadas
- [ ] Considerar alternativas como Protocol Buffers ou MessagePack com schema validation

## Exceções Permitidas

- **Caching interno**: Serialização para cache interno pode usar formatos binários se dados não vêm de usuários
- **RPC frameworks**: Podem usar serialização binária se autenticação e network isolation estão implementadas

## Como Detectar

### Manual

Code review procurando por uso de bibliotecas de serialização (pickle, serialize, unmarshall) com dados de usuário. Verificar origem dos dados sendo desserializados.

### Automático

SAST tools detectam uso de desserialização insegura. Ysoserial e ferramentas similares testam exploitabilidade de desserialização.

## Relacionada com

- [030 - Proibição de Funções Inseguras](030_proibicao-funcoes-inseguras.md): complementa
- [040 - Validação de Input](040_validacao-input-whitelist.md): complementa

---

**Criada em**: 2025-12-16
**Versão**: 1.0

# Tratamento de Erros sem Exposição de Informações Sensíveis

**ID**: SEGURANÇA-046
**Severidade**: 🟠 Alta
**Categoria**: Segurança

---

## O que é

Mensagens de erro devem ser genéricas para usuários finais, sem expor stack traces, detalhes de banco de dados, paths de arquivos ou informações de infraestrutura. Logs detalhados devem ser registrados apenas em sistemas internos.

## Por que importa

Stack traces e mensagens detalhadas de erro expõem estrutura interna da aplicação, facilitando reconnaissance para atacantes. 35% dos ataques bem-sucedidos utilizam informações vazadas em mensagens de erro. Mensagens genéricas reduzem superfície de ataque sem prejudicar experiência do usuário.

## Critérios Objetivos

- [ ] Respostas de erro para usuários são genéricas ("Erro interno", "Operação falhou") sem detalhes técnicos
- [ ] Stack traces e detalhes técnicos são logados apenas em sistema de logging interno
- [ ] Mensagens de erro não expõem paths de arquivos, versões de frameworks ou estrutura de banco de dados
- [ ] Errors handlers globais capturam exceções não tratadas antes de chegar ao cliente
- [ ] Códigos de erro estruturados permitem debugging sem expor internals (ex: ERR-1001, ERR-2043)

## Exceções Permitidas

- **Ambiente de desenvolvimento**: Pode exibir stack traces completas para facilitar debugging
- **Validação de formulários**: Erros de validação de input podem ser específicos (ex: "Email inválido")

## Como Detectar

### Manual

Revisar error handlers procurando por `res.send(error.stack)` ou `console.log(error)` em produção. Testar endpoints forçando erros e verificar responses.

### Automático

DAST tools testam responses de erro procurando por palavras-chave como "Exception", "SQLException", paths de arquivos ou versões de frameworks.

## Relacionada com

- [027 - Tratamento de Erros de Domínio](027_qualidade-tratamento-erros-dominio.md): complementa
- [059 - Logging Seguro](059_logging-seguro-sem-pii.md): complementa
- [063 - Proteção Information Disclosure](063_protecao-information-disclosure.md): implementa

---

**Criada em**: 2025-12-16
**Versão**: 1.0

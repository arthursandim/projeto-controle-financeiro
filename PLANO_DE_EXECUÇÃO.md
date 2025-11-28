# Plano de Execução: Testes Automatizados com Cypress
## Sistema de Controle de Gastos - Adaptado à Realidade do Projeto

**Projeto:** projeto-controle-financeiro
**Stack:** Node.js (Express) + React + Sequelize + SQLite
**Escopo de Testes:** Categoria e Conta (sem autenticação)
**Prazo:** 11 Dias
**Base de Estrutura:** Arquitetura do nex-web-test, adaptada ao contexto atual

---

## 📊 Contexto Atual do Projeto

### Backend (Já Implementado)
- ✅ Modelo Categoria com validações (nome único, cor, ícone)
- ✅ Modelo Conta com relacionamento FK para Categoria
- ✅ 7 endpoints de Categoria (CRUD + relações)
- ✅ 7 endpoints de Conta (CRUD + mark as paid)
- ✅ Serviços com lógica de negócio
- ✅ Repositórios para acesso a dados
- ✅ Middleware centralizado de erros
- ✅ CORS habilitado, sem autenticação

### Frontend (Já Implementado)
- ✅ Componentes Categoria (List, Card, Form)
- ✅ Componentes Conta (List, Card, Form)
- ✅ Serviços de API (axios)
- ✅ React Router com 2 rotas (/, /categorias)
- ✅ Filtros básicos em Conta
- ✅ Formatação de moeda e datas

### O Que Testar
- Endpoints funcionam corretamente
- Validações de negócio são cumpridas
- Fluxos de usuário (criar, editar, deletar, marcar pago)
- Filtros funcionam
- Erros são tratados adequadamente

---

## 🎯 Estratégia de Testes

### Princípios
1. **Separação em Camadas** (Models, Adapters, Commands, Libraries) como no nex-web-test, mas simplificado para 2 entidades
2. **API-First** - Testar API antes de UI (ganha velocidade)
3. **Reutilização** - Comandos customizados organizados por entidade
4. **Pragmatismo** - Sem autenticação = testes mais simples e diretos
5. **Escalabilidade** - Estrutura pronta para crescer com novas entidades

### Padrão de Nomenclatura
- Comandos customizados: `camelCase` (ex: `categoriaApi_Create`)
- Classes/Modelos: `PascalCase` (ex: `Categoria`)
- Testes: `snake_case` (ex: `categoria.controller.cy.js`)
- Tags para filtro: `@fastRun` (smoke tests), `@integration` (testes de integração)

---

## 📅 Fases de Implementação

### **Fase 1: Infraestrutura (Dias 1-2)**

#### Dia 1: Setup e Configuração ✅
**Tarefas:**
- [x] Cypress já instalado
- [x] Instalar: `@cypress/grep`, `@faker-js/faker`, `dotenv`
- [x] Criar `.env` com `baseUrl=http://localhost:5173` e `baseApiUrl=http://localhost:3000/api`
- [x] Criar `cypress.env.json` (vazio, sem dados sensíveis neste projeto)
- [x] Atualizar `cypress.config.js`:
  - [x] Definir `baseUrl` e `baseApiUrl`
  - [x] Integrar plugin `@cypress/grep`
  - [x] Adicionar retries (1-2 tentativas em modo headless)
- [x] Criar primeiro teste dummy: "Home carrega"

**Resultado:** ✅ Cypress pronto com variáveis de ambiente e plugin de tags configurados.

#### Dia 2: Estrutura de Pastas e Camadas ✅
**Tarefas:**
- [x] Criar estrutura base:
  ```
  cypress/
  ├── e2e/
  │   ├── Categoria/
  │   ├── Conta/
  │   └── Integration/
  ├── support/
  │   ├── commands.js
  │   ├── Commands/
  │   │   ├── Categoria/ (index.js, Api_commands.js, UI_commands.js, Assertions_commands.js)
  │   │   ├── Conta/ (index.js, Api_commands.js, UI_commands.js, Assertions_commands.js)
  │   │   └── Utils/ (UIHelpers.js, ResetDatabase_commands.js)
  │   ├── models/ (Categoria.js, Conta.js)
  │   ├── adapters/ (CategoriaAdapter.js, ContaAdapter.js)
  │   ├── library/ (CategoriaLib.js, ContaLib.js)
  │   └── fixtures/
  ├── cypress.config.js
  └── plugins/
  ```
- [x] Criar `cypress/support/commands.js` com imports dos comandos
- [x] Criar `CONTRIBUTING.md` com convenções:
  - [x] Nomenclatura (Api_commands, Assertions_commands, etc)
  - [x] Padrão de estrutura de comandos
  - [x] Guia de uso de Models, Adapters, Libraries
  - [x] Padrão de commit/branch

**Resultado:** ✅ Estrutura de pastas criada, pronta para implementação de testes.

---

### **Fase 2: Camadas de Suporte (Dias 3-4)**

#### Dia 3: Modelos, Adapters e Libraries ✅
**Tarefas:**
- [x] Criar `cypress/support/models/Categoria.js`:
  - [x] Classe ES6 com constructor e propriedades
  - [x] Validações básicas (nome não vazio, cor válida)
  - [x] Métodos de validação

- [x] Criar `cypress/support/adapters/CategoriaAdapter.js`:
  - [x] `static adapterToPOST(categoria)` - Converte para formato POST
  - [x] `static adapterToPUT(categoria)` - Converte para formato PUT

- [x] Criar `cypress/support/library/CategoriaLib.js`:
  - [x] `makeAFakeCategoria()` - Gera categoria random com faker
  - [x] `makeAFakeCategoriaArray(qty)` - Gera array de categorias

- [x] Criar `cypress/support/models/Conta.js` (similar a Categoria)
- [x] Criar `cypress/support/adapters/ContaAdapter.js`
- [x] Criar `cypress/support/library/ContaLib.js`

**Resultado:** ✅ Camada de modelos e factories pronta para uso nos testes. Todos testados e validados.

#### Dia 4: Comandos Customizados - Camada API ✅
**Tarefas:**
- [x] Criar `cypress/support/Commands/Categoria/Api_commands.js`:
  - [x] `cy.categoriaApi_Create(categoria)` - POST /api/categorias
  - [x] `cy.categoriaApi_GetAll()` - GET /api/categorias
  - [x] `cy.categoriaApi_GetById(id)` - GET /api/categorias/:id
  - [x] `cy.categoriaApi_Update(id, categoria)` - PUT /api/categorias/:id
  - [x] `cy.categoriaApi_Delete(id)` - DELETE /api/categorias/:id

- [x] Criar `cypress/support/Commands/Categoria/Assertions_commands.js`:
  - [x] `cy.categoriaShouldExist(nome)` - Valida se existe
  - [x] `cy.categoriaShouldHaveColor(nome, cor)` - Valida cor

- [x] Criar `cypress/support/Commands/Categoria/index.js`:
  - [x] Imports dos arquivos acima

- [x] Repetir para `Commands/Conta/` (Api_commands.js, Assertions_commands.js, index.js)

- [x] Registrar em `cypress/support/commands.js`:
  ```javascript
  import './Commands/Categoria/index.js';
  import './Commands/Conta/index.js';
  ```

- [x] Criar testes de validação dos comandos (categoria.api.commands.test.cy.js, conta.api.commands.test.cy.js)
- [x] Corrigir estrutura de resposta (response.body.dados)
- [x] Implementar beforeEach explícito com cy.resetDatabase()

**Resultado:** ✅ Comandos API prontos e reutilizáveis. Testes de validação dos comandos passando.

**Commits:**
- bb3e215 - feat: Fase 2, Dia 4 - Criar Comandos API (Categoria e Conta)
- af3f65c - fix: Corrigir estrutura de resposta dos testes API (response.body.dados)
- e3997cb - fix: Adicionar beforeEach explícito para resetar banco em cada teste
- 8bc2309 - fix: Corrigir acesso a response.body.dados nos comandos API
- 707dc44 - fix: Corrigir uso de greaterThanOrEqual para be.at.least() no Chai
- 45d36aa - fix: Corrigir acesso a response.body.dados nos comandos de asserção

---

## 🔄 Extra: Limpeza do Banco de Dados para Testes Atômicos ✅

### Implementação concluída:
**Backend:**
- [x] `backend/src/services/resetService.js` - Serviço que limpa tabelas
- [x] `backend/src/controllers/resetController.js` - Controlador do endpoint
- [x] `backend/src/routes/resetRoutes.js` - Rota DELETE /api/reset
- [x] `backend/src/app.js` - Registro da rota com proteção NODE_ENV

**Cypress:**
- [x] `cypress/support/Commands/Utils/ResetDatabase_commands.js` - Comando cy.resetDatabase()
- [x] `cypress/support/commands.js` - Importação do comando
- [x] `cypress/support/e2e.js` - beforeEach hook para limpeza automática

**Benefícios:**
- ✅ Testes atômicos - Cada teste começa com banco limpo
- ✅ Isolados - Testes não interferem um com outro
- ✅ Determinísticos - Mesma entrada = mesmo resultado
- ✅ Seguros - Apenas em NODE_ENV !== 'production'

**Commit:** d496ce5 - feat: Implementar limpeza de banco de dados para testes atômicos

---

### **Fase 3: Testes de API (Dias 5-7)**

#### Dia 5: Testes de Categoria (CRUD Básico) 🚀 (EM PROGRESSO)
**Arquivo:** `cypress/e2e/Categoria/categoria.controller.cy.js`

**Testes:**
- [ ] `@fastRun - Deve listar todas as categorias` (GET)
  - Setup: Criar 3 categorias via API
  - Verificar: Array contém as 3 categorias

- [ ] `@fastRun - Deve criar categoria com sucesso` (POST)
  - Usar `categoriaLib.makeAFakeCategoria()`
  - Adaptar com `CategoriaAdapter.adapterToPOST()`
  - Verificar response status 201 + dados retornados

- [ ] Deve atualizar categoria existente (PUT)
  - Setup: Criar categoria
  - Atualizar nome
  - Verificar mudança foi persistida

- [ ] Deve deletar categoria sem contas (DELETE)
  - Setup: Criar categoria
  - Deletar
  - Verificar 404 ao buscar

- [ ] `@fastRun - Não deve deletar categoria com contas` (DELETE com erro)
  - Setup: Criar categoria + conta vinculada
  - Tentar deletar categoria
  - Verificar erro 400 ou 409

**Tags:** `@fastRun` para CRUD básico
**Status:** Iniciando implementação dos testes CRUD

---

#### Dia 6: Testes de Conta (CRUD + Mark as Paid)
**Arquivo:** `cypress/e2e/Conta/conta.controller.cy.js`

**Testes:**
- `@fastRun - Deve listar todas as contas` (GET)
- `@fastRun - Deve criar conta com categoria válida` (POST)
  - Usar `categoriaLib.makeAFakeCategoria()` para setup
  - Usar `contaLib.makeAFakeConta(categId)`
  - Verificar resposta

- Deve listar contas com filtros (GET com query params)
  - Filtrar por `categoria_id`
  - Filtrar por `status`
  - Filtrar por data range

- Deve atualizar conta existente (PUT)

- Deve marcar conta como paga (PATCH)
  - Setup: Criar conta (status PENDENTE)
  - PATCH /contas/:id/pagar
  - Verificar: status = PAGA, data_pagamento = hoje

- Deve deletar conta (DELETE)

**Validações de Erro:**
- Não criar conta sem `categoria_id` (400)
- Não criar conta com valor <= 0 (400)
- Não atualizar conta inexistente (404)

---

#### Dia 7: Testes de Validações e Edge Cases
**Arquivo:** `cypress/e2e/Categoria/categoria.validation.cy.js`

**Testes de Categoria:**
- Não permitir nome vazio (400)
- Não permitir nome duplicado (409)
- Validar formato de cor hexadecimal (400)

**Arquivo:** `cypress/e2e/Conta/conta.validation.cy.js`

**Testes de Conta:**
- Não permitir descrição vazia (400)
- Não permitir valor negativo (400)
- Não permitir categoria_id inexistente (400)
- Validar formato de data (400)

**Arquivo:** `cypress/e2e/Integration/integration.cy.js`

**Testes de Integração:**
- Criar categoria + criar conta + deletar categoria (não deve ser possível)
- Criar múltiplas categorias + criar contas + verificar relatório de totais

---

### **Fase 4: Testes de UI (Dias 8-10)**

#### Dia 8: Comandos UI e Helpers
**Tarefas:**
- [ ] Criar `cypress/support/Commands/Categoria/UI_commands.js`:
  - `cy.categoriaUI_Navigate()` - Vai para /categorias
  - `cy.categoriaUI_FillForm(categoria)` - Preenche formulário
  - `cy.categoriaUI_Submit()` - Clica em salvar
  - `cy.categoriaUI_Delete(nome)` - Delete via UI
  - `cy.categoriaUI_Edit(nome, novoNome)` - Edit via UI

- [ ] Criar `cypress/support/Commands/Conta/UI_commands.js`:
  - `cy.contaUI_Navigate()` - Vai para home
  - `cy.contaUI_FillForm(conta)` - Preenche formulário
  - `cy.contaUI_SelectCategory(nome)` - Seleciona categoria no dropdown
  - `cy.contaUI_Submit()` - Clica em salvar
  - `cy.contaUI_MarkAsPaid(descricao)` - Marca como paga via botão
  - `cy.contaUI_Filter(categoria, status)` - Aplica filtros

- [ ] Criar `cypress/support/Commands/Utils/UIHelpers.js`:
  - Funções auxiliares para aguardar elementos
  - Seletores comuns (botões, inputs, modais)

---

#### Dia 9: E2E Categoria - Caminho Feliz
**Arquivo:** `cypress/e2e/Categoria/categoria.happy-path.cy.js`

**Testes:**
- `@fastRun - Usuário navega para página de categorias`
  - Vai em /categorias
  - Verifica se página carregou

- `@fastRun - Usuário cria nova categoria`
  - Clica em "Nova Categoria"
  - Preenche nome, cor, ícone
  - Clica salvar
  - Verifica se aparece na lista

- Usuário edita categoria existente
  - Setup: API cria categoria
  - Clica em edit na UI
  - Muda nome
  - Salva
  - Verifica mudança

- Usuário deleta categoria
  - Setup: API cria categoria (sem contas)
  - Clica em delete
  - Confirma
  - Verifica se saiu da lista

---

#### Dia 10: E2E Conta - Caminho Feliz
**Arquivo:** `cypress/e2e/Conta/conta.happy-path.cy.js`

**Testes:**
- `@fastRun - Usuário vê dashboard carregado`
  - Vai em /
  - Verifica se lista de contas carregou

- `@fastRun - Usuário cria nova conta`
  - Setup: API cria categoria
  - Clica "Nova Conta"
  - Seleciona categoria
  - Preenche descrição, valor, data
  - Clica salvar
  - Verifica se aparece na lista com status PENDENTE

- Usuário marca conta como paga
  - Setup: API cria conta (PENDENTE)
  - Clica em "Marcar como Paga"
  - Verifica: cor muda, status = PAGA, data_pagamento aparece

- Usuário filtra contas por categoria
  - Setup: API cria 2 categorias + 3 contas
  - Seleciona filtro de categoria
  - Verifica se mostra apenas contas daquela categoria

- Usuário filtra contas por status
  - Setup: API cria contas PENDENTE e PAGA
  - Filtra por PENDENTE
  - Verifica se mostra apenas PENDENTE

---

### **Fase 5: Finalização (Dia 11)**

#### Dia 11: Cleanup, Documentação e Suporte a CI/CD
**Tarefas:**
- [ ] **Cleanup de código:**
  - Remover console.log dos comandos
  - Remover código comentado
  - Otimizar seletores (preferir data-cy)

- [ ] **Configurações de execução:**
  - Adicionar scripts no `package.json`:
    ```json
    {
      "test:open": "npx cypress open",
      "test:run": "npx cypress run",
      "test:fastRun": "npx cypress run --env grepTags=fastRun",
      "test:integration": "npx cypress run --env grepTags=integration"
    }
    ```

- [ ] **Configurar cypress.config.js para CI/CD:**
  - Modo headless (sem interface)
  - Videos apenas em caso de falha
  - Screenshots automáticas

- [ ] **Documentação:**
  - Atualizar README.md com seção de testes
  - Adicionar CONTRIBUTING.md com guia de testes
  - Adicionar comentários em testes complexos

- [ ] **Testes finais:**
  - Rodar todos em modo headless: `npm run test:run`
  - Rodar apenas fastRun: `npm run test:fastRun`
  - Verificar que todos passam ✅

---

## 📊 Matriz de Testes Resumida

| Camada | Categoria | Conta | Observações |
|--------|-----------|-------|-------------|
| **API CRUD** | 7 testes | 8 testes | Testes controller |
| **Validações** | 3 testes | 4 testes | Testes de erro |
| **UI Happy Path** | 4 testes | 5 testes | Fluxos de sucesso |
| **Integração** | - | - | 2 testes cross-entity |
| **Total** | **14 testes** | **17 testes** | **~31 testes** |

---

## 🎯 Estrutura Final Esperada

```
projeto-controle-financeiro/
├── testes-automatizados/
│   ├── cypress/
│   │   ├── e2e/
│   │   │   ├── Categoria/
│   │   │   │   ├── categoria.controller.cy.js       (CRUD + validações)
│   │   │   │   ├── categoria.happy-path.cy.js       (UI fluxos)
│   │   │   │   └── categoria.validation.cy.js       (Edge cases)
│   │   │   ├── Conta/
│   │   │   │   ├── conta.controller.cy.js           (CRUD + mark paid)
│   │   │   │   ├── conta.happy-path.cy.js           (UI fluxos)
│   │   │   │   └── conta.validation.cy.js           (Edge cases)
│   │   │   └── Integration/
│   │   │       └── integration.cy.js                (Cross-entity)
│   │   ├── support/
│   │   │   ├── commands.js                         (imports de todos os comandos)
│   │   │   ├── Commands/
│   │   │   │   ├── Categoria/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── Api_commands.js
│   │   │   │   │   ├── UI_commands.js
│   │   │   │   │   └── Assertions_commands.js
│   │   │   │   ├── Conta/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── Api_commands.js
│   │   │   │   │   ├── UI_commands.js
│   │   │   │   │   └── Assertions_commands.js
│   │   │   │   └── Utils/
│   │   │   │       └── UIHelpers.js
│   │   │   ├── models/
│   │   │   │   ├── Categoria.js
│   │   │   │   └── Conta.js
│   │   │   ├── adapters/
│   │   │   │   ├── CategoriaAdapter.js
│   │   │   │   └── ContaAdapter.js
│   │   │   ├── library/
│   │   │   │   ├── CategoriaLib.js
│   │   │   │   └── ContaLib.js
│   │   │   └── fixtures/
│   │   ├── cypress.config.js
│   │   └── plugins/
│   ├── .env                                        (baseUrl, baseApiUrl)
│   ├── .env.example
│   ├── cypress.env.json
│   ├── cypress.env.example.json
│   ├── CONTRIBUTING.md                             (convenções de testes)
│   ├── README.md                                   (instruções de como rodar testes)
│   └── package.json                                (com scripts de teste e dependências)
```

---

## ✅ Checklist de Sucesso

- [ ] Todos os ~31 testes passam em modo headless
- [ ] `npm run test:fastRun` executa apenas testes com tag @fastRun
- [ ] Sem console.log, código comentado, ou warnings
- [ ] Seletores otimizados (preferência por data-cy)
- [ ] Variáveis de ambiente configuradas (.env, cypress.env.json)
- [ ] CONTRIBUTING.md documenta padrões
- [ ] README.md tem seção de como rodar testes
- [ ] Comandos são reutilizáveis entre testes
- [ ] Estrutura permite adicionar novas entidades facilmente

---

## 🔑 Diferenciais desta Abordagem

✅ **Realista ao projeto** - Sem autenticação, apenas 2 entidades
✅ **Estrutura escalável** - Padrão claro para adicionar novas entidades
✅ **API-first** - Testes rápidos antes de testes UI
✅ **Reutilização máxima** - Comandos customizados em uma só vez
✅ **Sem over-engineering** - Simplicidade apropriada ao escopo
✅ **Pronto para CI/CD** - Scripts e configuração para automação
✅ **Bem documentado** - CONTRIBUTING.md + comentários nos testes

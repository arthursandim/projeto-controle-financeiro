# 🧪 Testes Automatizados - Cypress

Ambiente isolado para testes automatizados E2E do Sistema de Controle de Gastos.

**Status:** ✅ Fase 2, Día 4 Complete | 🚀 Fase 3, Día 5 In Progress

## 📋 Pré-requisitos

- Node.js 18+
- Backend rodando em `http://localhost:3000` (terminal 1)
- Frontend rodando em `http://localhost:5173` (terminal 2)
- Testes em um terceiro terminal

## 🚀 Instalação

```bash
cd testes-automatizados
npm install
```

## ▶️ Executar Testes

### Modo Interativo (Cypress UI)
```bash
npm run test:open
# Abre a interface do Cypress para seleção e execução visual de testes
```

### Modo Headless (Todos os testes)
```bash
npm run test:run
# Executa todos os testes em modo headless (sem interface)
```

### Smoke Tests Rápidos (@fastRun)
```bash
npm run test:fastRun
# Executa apenas testes marcados com @fastRun (testes críticos rápidos)
```

### Testes de Integração
```bash
npm run test:integration
# Executa apenas testes de integração entre entidades
```

### Modo Debug
```bash
npx cypress run --browser chrome --headed
# Executa com navegador visível para debug
```

## 🏗️ Estrutura

```
testes-automatizados/
├── cypress/
│   ├── e2e/                                  # Arquivos de teste
│   │   ├── Categoria/
│   │   │   ├── categoria.api.commands.test.cy.js        ✅ Implementado
│   │   │   ├── categoria.controller.cy.js              ⏳ Em progresso
│   │   │   ├── categoria.validation.cy.js              ⏳ Planejado
│   │   │   └── categoria.happy-path.cy.js              ⏳ Planejado
│   │   ├── Conta/
│   │   │   ├── conta.api.commands.test.cy.js          ✅ Implementado
│   │   │   ├── conta.controller.cy.js                 ⏳ Em progresso
│   │   │   ├── conta.validation.cy.js                 ⏳ Planejado
│   │   │   └── conta.happy-path.cy.js                 ⏳ Planejado
│   │   └── Integration/
│   │       └── integration.cy.js                        ⏳ Planejado
│   └── support/                              # Camadas de suporte
│       ├── Commands/
│       │   ├── Categoria/
│       │   │   ├── index.js                 ✅ Implementado
│       │   │   ├── Api_commands.js          ✅ Implementado
│       │   │   ├── Assertions_commands.js   ✅ Implementado
│       │   │   └── UI_commands.js           ⏳ Planejado
│       │   ├── Conta/
│       │   │   ├── index.js                 ✅ Implementado
│       │   │   ├── Api_commands.js          ✅ Implementado
│       │   │   ├── Assertions_commands.js   ✅ Implementado
│       │   │   └── UI_commands.js           ⏳ Planejado
│       │   └── Utils/
│       │       └── ResetDatabase_commands.js ✅ Implementado
│       ├── models/                           # Modelos de dados
│       │   ├── Categoria.js                 ✅ Implementado
│       │   └── Conta.js                     ✅ Implementado
│       ├── adapters/                         # Conversão para payloads API
│       │   ├── CategoriaAdapter.js          ✅ Implementado
│       │   └── ContaAdapter.js              ✅ Implementado
│       ├── library/                          # Geração de dados fake
│       │   ├── CategoriaLib.js              ✅ Implementado
│       │   └── ContaLib.js                  ✅ Implementado
│       ├── commands.js                      ✅ Importações centralizadas
│       ├── e2e.js                          ✅ Hooks globais
│       └── fixtures/
├── cypress.config.js                        ✅ Configuração
├── .env                                      # Variáveis de ambiente
├── .env.example                              # Template
├── cypress.env.json                          # Env do Cypress
├── package.json                              # Dependências e scripts
└── README.md                                 # Este arquivo
```

## 📊 Padrão de Nomenclatura

- **Comandos API:** `cy.categoriaApi_Create()`, `cy.contaApi_GetAll()` (camelCase)
- **Comandos UI:** `cy.categoriaUI_Navigate()`, `cy.contaUI_FillForm()` (camelCase)
- **Comandos Assertion:** `cy.categoriaShouldExist()` (camelCase)
- **Testes:** `categoria.api.commands.test.cy.js` (snake_case)
- **Tags de filtro:** `@fastRun` (testes críticos), `@integration` (testes cross-entity)

## 🎯 Estratégia de Testes

### Princípios

1. **Separação em Camadas** - Models, Adapters, Libraries, Commands
2. **API-First** - Testar API antes de UI (mais rápido)
3. **Reutilização** - Comandos customizados organizados por entidade
4. **Pragmatismo** - Sem autenticação, testes simples e diretos
5. **Escalabilidade** - Estrutura pronta para novas entidades

### Camadas de Teste

| Camada | Responsabilidade | Exemplo |
|--------|------------------|---------|
| **Models** | Validação e estrutura de dados | `Categoria.js` |
| **Adapters** | Conversão para payloads API | `CategoriaAdapter.adapterToPOST()` |
| **Libraries** | Geração de dados fake | `CategoriaLib.makeAFakeCategoria()` |
| **Commands** | Comandos Cypress customizados | `cy.categoriaApi_Create()` |
| **Tests** | Casos de teste E2E | `categoria.api.commands.test.cy.js` |

## 📅 Fases de Implementação

### ✅ Fase 1: Infraestrutura (Dias 1-2) - COMPLETA

- Cypress instalado e configurado
- Dependências: @cypress/grep, @faker-js/faker, dotenv
- `.env` com `baseUrl` e `baseApiUrl`
- Plugin de tags (@fastRun, @integration) integrado

### ✅ Fase 2: Camadas de Suporte (Days 3-4) - COMPLETA

**Day 3:** Modelos, Adapters e Libraries
- Classes para Categoria e Conta
- Conversão para POST/PUT payloads
- Geração fake de dados com faker.js

**Day 4:** Comandos API (✅ COMPLETO)
- `cy.categoriaApi_Create()`, `GetAll()`, `GetById()`, `Update()`, `Delete()`
- `cy.contaApi_Create()`, `GetAll()`, `GetById()`, `Update()`, `Delete()`, `MarkAsPaid()`
- Comandos de asserção: `categoriaShouldExist()`, `categoriaShouldHaveColor()`
- Comando de limpeza: `cy.resetDatabase()`
- Testes de validação dos comandos (categoria.api.commands.test.cy.js, conta.api.commands.test.cy.js)

### 🚀 Fase 3: Testes de API (Days 5-7) - EM PROGRESSO

**Day 5:** Testes CRUD de Categoria (🚀 EM PROGRESSO)
- Criar categoria com sucesso
- Listar categorias
- Buscar por ID
- Atualizar categoria
- Deletar categoria
- Validações de erro (nome vazio, duplicado, etc)

**Day 6:** Testes CRUD de Conta + Mark as Paid
- Criar conta com categoria válida
- Listar contas (com filtros)
- Buscar por ID
- Atualizar conta
- Marcar conta como paga
- Validações de erro

**Day 7:** Testes de Validação e Integração
- Edge cases de Categoria
- Edge cases de Conta
- Testes cross-entity (criar categoria + conta + deletar categoria)

### ⏳ Fase 4: Testes de UI (Days 8-10)

- Comandos UI para Categoria e Conta
- Helpers de navegação e interação
- E2E happy path para Categoria
- E2E happy path para Conta

### ⏳ Fase 5: Finalização (Day 11)

- Cleanup de código
- Configuração para CI/CD
- Documentação final
- Verificação final de todos os testes

## 📚 Documentação

- [CONTRIBUTING.md](../CONTRIBUTING.md) - Guia de contribuição e padrões de testes
- [PLANO_DE_EXECUÇÃO.md](../PLANO_DE_EXECUÇÃO.md) - Plano detalhado com 11 dias

## 🔗 Integração com o Projeto

Este diretório é isolado e contém apenas os testes. O projeto principal está na raiz.

Para rodar o projeto completo:

```bash
# Terminal 1: Backend
cd backend
npm run dev
# Servidor rodando em http://localhost:3000

# Terminal 2: Frontend
cd frontend
npm run dev
# Aplicação rodando em http://localhost:5173

# Terminal 3: Testes (opcional)
cd testes-automatizados
npm install  # (primeira vez)
npm run test:open
# Interface do Cypress aberta para seleção de testes
```

## 🐛 Troubleshooting

### Backend/Frontend não respondendo
- Verifique se ambos estão rodando nos terminais 1 e 2
- Verifique URLs em `.env`: `baseUrl=http://localhost:5173` e `baseApiUrl=http://localhost:3000/api`

### Testes falhando
- Rode `npm run test:run` no modo headless para ver logs
- Use `npm run test:open` para debug interativo
- Verifique se o banco de dados está limpo (comando `cy.resetDatabase()` é chamado no beforeEach)

### Erros de variáveis de ambiente
- Copie `.env.example` para `.env`
- Verifique `cypress.env.json` para variáveis do Cypress

---

**Desenvolvido com Cypress para o Sistema de Controle de Gastos** 💰

**Status Atual:** ✅ Fase 2 Complete | 🚀 Fase 3 In Progress

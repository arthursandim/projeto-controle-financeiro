# Guia de Contribuição - Testes Automatizados com Cypress

## Sobre Este Guia

Este documento descreve as convenções, padrões e arquitetura dos testes automatizados com Cypress para o projeto Sistema de Controle de Gastos.

---

## 🏗️ Arquitetura de Testes

Os testes são organizados em **camadas bem definidas**, promovendo reutilização e manutenibilidade:

### 1. **Testes** (`cypress/e2e/`)
Arquivos de teste reais que executam os cenários (`.cy.js`)

```
cypress/e2e/
├── Categoria/
│   ├── categoria.controller.cy.js       (CRUD + validações API)
│   ├── categoria.happy-path.cy.js       (Fluxos de UI)
│   └── categoria.validation.cy.js       (Edge cases)
├── Conta/
│   ├── conta.controller.cy.js
│   ├── conta.happy-path.cy.js
│   └── conta.validation.cy.js
└── Integration/
    └── integration.cy.js
```

### 2. **Comandos Customizados** (`cypress/support/Commands/`)
Reutilizáveis ações e validações organizadas por entidade

**Estrutura por Entidade:**
```
Commands/[Entidade]/
├── index.js                    # Imports centralizados
├── Api_commands.js             # Operações CRUD na API
├── UI_commands.js              # Interações com a interface
├── Assertions_commands.js       # Validações e asserções
└── Contract_commands.js        # Validação de schema (opcional)
```

### 3. **Modelos** (`cypress/support/models/`)
Classes ES6 que representam entidades com validações

### 4. **Adapters** (`cypress/support/adapters/`)
Convertem objetos Model para formatos esperados pela API

### 5. **Libraries (Factories)** (`cypress/support/library/`)
Funções para gerar dados fake usando `@faker-js/faker`

---

## 📝 Convenções de Nomenclatura

### Comandos Customizados
```javascript
// Padrão: [entidade][Tipo]_[Ação]

// API Commands
cy.categoriaApi_Create(categoria)
cy.categoriaApi_GetAll()
cy.categoriaApi_Delete(id)

// UI Commands
cy.categoriaUI_Navigate()
cy.categoriaUI_FillForm(categoria)
cy.categoriaUI_Submit()

// Assertions
cy.categoriaShouldExist(nome)
```

### Arquivos
- Classes: PascalCase (Categoria.js, CategoriaAdapter.js)
- Factories: camelCase + Lib (categoriaLib.js)
- Testes: snake_case (categoria.controller.cy.js)

---

## 🏷️ Tags de Teste

```javascript
describe('Categoria CRUD', { tags: '@fastRun' }, () => {
  it('@fastRun - Deve criar categoria', () => { ... });
});
```

**Executar com tags:**
```bash
npm run test:fastRun       # Apenas @fastRun
npm run test:integration  # Apenas @integration
```

---

## 🚀 Executando Testes

```bash
npm run test:open          # Modo interativo
npm run test:run           # Modo headless (todos)
npm run test:fastRun       # Smoke tests
```

---

## ✨ Boas Práticas

### ✅ Faça
- Reutilize comandos customizados
- Use factories para dados fake
- Organize testes por entidade
- Prefira seletores `data-cy`
- Use API para setup (mais rápido)

### ❌ Evite
- Hard-coded values
- Dependência entre testes
- Seletores frágeis
- Waits fixos
- Lógica complexa nos testes

---

## 🔧 Adicionando Nova Entidade

1. Crie a estrutura em `cypress/e2e/[Entidade]` e `cypress/support/Commands/[Entidade]`
2. Registre em `support/commands.js`
3. Siga o padrão de nomenclatura

---

## 📚 Recursos

- [Cypress Docs](https://docs.cypress.io)
- [Faker.js](https://fakerjs.dev/)
- [@cypress/grep](https://github.com/cypress-io/cypress/tree/develop/npm/grep)

# CLAUDE.md - Reference Guide for Claude Code

Quick reference guide for Claude Code when working with this repository.

**Project:** Sistema de Controle de Gastos (Financial Control System)
**Status:** ✅ Backend/Frontend Complete | 🧪 Testing Phase (Fase 2, Dia 4 Complete)
**Type:** Full-stack web application (Node.js + React + Cypress E2E Tests)

## Documentation Map

- **README.md** - Complete documentation (start here)
- **CONTRIBUTING.md** - Implementation guide and contribution patterns
- **PLANO_DE_EXECUÇÃO.md** - Testing plan and progress (11-day Cypress E2E implementation)
- **testes-automatizados/README.md** - How to run tests
- **examples/** - Reference implementation files

## Architecture Overview

**Layered Architecture:**
```
React Frontend (port 5173)
        ↓ HTTP/REST
Controllers (Express)
        ↓ Validate/Delegate
Services (Business Logic)
        ↓ Operations
Repositories (ORM queries)
        ↓
Database (SQLite/PostgreSQL)
```

## Backend File Structure

```
backend/src/
├── config/
│   └── database.js              # Sequelize config
├── models/
│   ├── Categoria.js             # Category entity
│   └── Conta.js                 # Bill/expense entity
├── repositories/
│   ├── categoriaRepository.js    # Data access
│   └── contaRepository.js
├── services/
│   ├── categoriaService.js       # Business logic
│   └── contaService.js
├── controllers/
│   ├── categoriaController.js    # HTTP handlers
│   └── contaController.js
├── routes/
│   ├── categoriaRoutes.js        # Endpoint definitions
│   └── contaRoutes.js
├── middlewares/
│   └── errorHandler.js           # Error handling
├── app.js                        # Express setup
└── server.js                     # Server entry point
```

## Frontend File Structure

```
frontend/src/
├── services/
│   ├── api.js                   # Axios instance
│   ├── categoriaService.js
│   └── contaService.js
├── components/
│   ├── Categoria/
│   │   ├── CategoriaList.jsx
│   │   ├── CategoriaCard.jsx
│   │   ├── CategoriaForm.jsx
│   │   └── *.css
│   └── Conta/
│       ├── ContaList.jsx
│       ├── ContaCard.jsx
│       ├── ContaForm.jsx
│       └── *.css
├── App.jsx                      # Router setup
└── main.jsx                     # App entry point
```

## Core Entities

### Categoria (Category)
```
id, nome (UNIQUE), descricao, cor, icone
criado_em, atualizado_em
```

### Conta (Bill/Expense)
```
id, categoria_id (FK), descricao, valor
data_vencimento, data_pagamento
status (PENDENTE | PAGA | ATRASADA)
observacoes, criado_em, atualizado_em
```

**Relationship:** Categoria 1:N Conta (cascade delete)

## Key Patterns

### Backend Request Flow
1. **Route** receives request
2. **Controller** validates input, catches errors
3. **Service** handles business logic
4. **Repository** executes database query
5. **Controller** formats response

### Adding a Feature
1. Create model in `models/`
2. Create repository in `repositories/`
3. Create service in `services/`
4. Create controller in `controllers/`
5. Create routes in `routes/`
6. Register routes in `app.js`

### Frontend Component Pattern
```
Feature/
├── FeatureList.jsx      # Listing
├── FeatureCard.jsx      # Individual item
├── FeatureForm.jsx      # Create/Edit
└── Feature*.css
```

## API Quick Reference

### Categorias
```
GET    /api/categorias              List all
GET    /api/categorias/:id          Get by ID
POST   /api/categorias              Create
PUT    /api/categorias/:id          Update
DELETE /api/categorias/:id          Delete
GET    /api/categorias/:id/contas   List bills
GET    /api/categorias/:id/total    Get total
```

### Contas
```
GET    /api/contas                  List all (filterable)
GET    /api/contas/:id              Get by ID
POST   /api/contas                  Create
PUT    /api/contas/:id              Update
DELETE /api/contas/:id              Delete
PATCH  /api/contas/:id/pagar        Mark as paid
GET    /api/contas/relatorio        Get report
```

## Development Commands

```bash
# Backend (cd backend)
npm run dev       # Start with hot reload
npm start         # Production
npm test          # Run tests

# Frontend (cd frontend)
npm run dev       # Start with hot reload
npm run build     # Production build
npm run preview   # Preview build
npm test          # Run tests
```

## Important Implementation Details

1. **Separation of Concerns** - Each layer has single responsibility
2. **Dependency Injection** - Classes receive dependencies via constructor
3. **Error Handling** - Services throw errors, controllers catch and format
4. **Validation** - Controller validates input before service execution
5. **CORS** - Express needs `cors()` middleware for frontend requests
6. **Database Sync** - Sequelize auto-creates tables on startup with `alter: true`
7. **Hot Reload** - Nodemon (backend) and Vite (frontend) auto-reload changes

## Testing Infrastructure

**Cypress E2E Tests** (In Progress - Fase 2/Day 4 Complete)

Test structure organized in layers:
- **Models** - Data validation and structure
- **Adapters** - Convert domain objects to API payloads
- **Libraries** - Fake data generation with faker.js
- **Commands** - Custom Cypress commands for API and UI interactions
- **Tests** - E2E test scenarios

**Current Progress:**
- ✅ Fase 1: Infrastructure setup (Cypress, dependencies, .env)
- ✅ Fase 2, Día 3: Models, Adapters, Libraries for Categoria and Conta
- ✅ Fase 2, Día 4: API Commands with proper response handling
- 🚀 Fase 3, Día 5: CRUD tests for Categoria (in progress)
- ⏳ Fase 3-5: Remaining CRUD, validation, UI, and integration tests

See **PLANO_DE_EXECUÇÃO.md** for detailed test plan and **testes-automatizados/README.md** for how to run tests.

## When Adding Features

- Follow the layered architecture pattern
- Add model → repository → service → controller → routes
- Test API first (Postman/curl) before frontend
- Update this guide if adding new patterns
- See CONTRIBUTING.md for detailed examples

## Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000/5173 in use | Kill process or change port in .env |
| CORS error | Verify `app.use(cors())` in app.js |
| Models not syncing | Delete database.sqlite and restart |
| Frontend can't reach API | Check baseURL in services/api.js |

## Stack
- **Backend:** Express.js, Sequelize, SQLite/PostgreSQL
- **Frontend:** React 18+, Vite, React Router, Axios
- **Database:** SQLite (dev) / PostgreSQL (prod)

## See Also

- README.md - Full documentation
- CONTRIBUTING.md - Implementation guide
- examples/ - Reference code

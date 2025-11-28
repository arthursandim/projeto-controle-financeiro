# Sistema de Controle de Gastos 💰

Sistema web completo para gerenciamento de contas e despesas, implementado em arquitetura de camadas com Node.js (Backend) e React (Frontend).

## Índice

- [Quick Start](#quick-start)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Stack Tecnológico](#stack-tecnológico)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Banco de Dados](#banco-de-dados)
- [API Endpoints](#api-endpoints)
- [Desenvolvimento](#desenvolvimento)
- [Próximas Melhorias](#próximas-melhorias)

## Quick Start

### Requisitos
- **Node.js 18+** → [Download](https://nodejs.org/)
- **npm** (vem com Node.js)
- Um editor de código como VS Code

Verifique a instalação:
```bash
node --version
npm --version
```

### Rodar o Projeto (2 terminais)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
# 🚀 Servidor rodando em http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
# 🚀 Aplicação rodando em http://localhost:5173
```

**Abra no navegador:** `http://localhost:5173`

### Problemas Comuns

**Porta já em uso:**
```bash
# Windows: Encontrar processo usando a porta
netstat -ano | findstr :3000

# Ou mudar a porta no .env (backend) ou vite.config.js (frontend)
```

**Erro de dependências:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Banco não conecta:**
```bash
# O banco é criado automaticamente como database.sqlite
# Se houver erro, delete o arquivo:
rm database.sqlite
npm run dev
```

## Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Editor de código (VS Code recomendado)

## Instalação e Execução

### Backend

```bash
cd backend
npm install
npm run dev
```

O servidor rodará em `http://localhost:3000`

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação rodará em `http://localhost:5173`

## Funcionalidades

### Categorias
- ✅ Listar todas as categorias
- ✅ Criar nova categoria
- ✅ Editar categoria
- ✅ Deletar categoria
- ✅ Validação de nome único
- ✅ Suporte a cores e ícones
- ✅ Cálculo de total por categoria

### Contas/Despesas
- ✅ Listar todas as contas
- ✅ Criar nova conta
- ✅ Editar conta
- ✅ Deletar conta
- ✅ Marcar conta como paga
- ✅ Filtrar por categoria e status
- ✅ Relatório com totalizações
- ✅ Gerenciamento de status (PENDENTE, PAGA, ATRASADA)

### Interface
- ✅ Dashboard responsivo
- ✅ Formulários validados
- ✅ Navegação entre páginas (React Router)
- ✅ Design moderno e intuitivo

## Arquitetura

O sistema segue o padrão de arquitetura em camadas (Layered Architecture) com separação clara de responsabilidades:

```
┌─────────────────────────────────────┐
│   CAMADA DE APRESENTAÇÃO (React)    │
│   - Componentes de UI               │
│   - Gestão de Estado                │
└─────────────────────────────────────┘
              ↓ HTTP/REST
┌─────────────────────────────────────┐
│  CAMADA DE CONTROLE (Controllers)   │
│  - Validação de requisições         │
│  - Roteamento                       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   CAMADA DE NEGÓCIO (Services)      │
│  - Lógica de negócio                │
│  - Regras de cálculo                │
│  - Validações complexas             │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   CAMADA DE DADOS (Repository)      │
│  - Acesso ao banco de dados         │
│  - Queries com Sequelize            │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  BANCO DE DADOS (SQLite/PostgreSQL) │
└─────────────────────────────────────┘
```

### Padrões Implementados

1. **Injeção de Dependência** - Controllers recebem services, services recebem repositories
2. **Separação de Responsabilidades** - Cada camada tem uma função específica
3. **Error Handling** - Middleware centralizado para tratamento de erros
4. **Validação Multi-camada** - Ocorre em formulário, serviço e banco
5. **RESTful API** - Endpoints seguem padrões REST
6. **Component-based** - Frontend modularizado em componentes reutilizáveis

## Stack Tecnológico

### Backend
- **Node.js 18+** - Runtime JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para Node.js
- **SQLite** - Banco de dados (desenvolvimento)
- **PostgreSQL** - Recomendado para produção
- **CORS** - Compartilhamento de recursos entre origens
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **React 18+** - Biblioteca de UI
- **Vite** - Build tool e dev server
- **React Router v6+** - Roteamento cliente
- **Axios** - Cliente HTTP
- **CSS3** - Estilização

## Estrutura do Projeto

```
projeto-controle-financeiro/
│
├── backend/              # API REST com Express.js
│   ├── src/
│   │   ├── config/      # Configuração do banco de dados
│   │   │   └── database.js
│   │   ├── models/      # Modelos do Sequelize
│   │   │   ├── Categoria.js
│   │   │   └── Conta.js
│   │   ├── repositories/ # Camada de acesso aos dados
│   │   │   ├── categoriaRepository.js
│   │   │   └── contaRepository.js
│   │   ├── services/    # Lógica de negócio
│   │   │   ├── categoriaService.js
│   │   │   └── contaService.js
│   │   ├── controllers/ # Controladores HTTP
│   │   │   ├── categoriaController.js
│   │   │   └── contaController.js
│   │   ├── middlewares/ # Middleware de tratamento de erros
│   │   │   └── errorHandler.js
│   │   ├── routes/      # Definição de rotas
│   │   │   ├── categoriaRoutes.js
│   │   │   └── contaRoutes.js
│   │   ├── app.js       # Configuração da aplicação Express
│   │   └── server.js    # Inicialização do servidor
│   ├── package.json
│   ├── .env             # Variáveis de ambiente
│   └── .env.example     # Exemplo de variáveis
│
├── frontend/            # Aplicação React com Vite
│   ├── src/
│   │   ├── services/    # Serviços de API (Axios)
│   │   │   ├── api.js
│   │   │   ├── categoriaService.js
│   │   │   └── contaService.js
│   │   ├── components/  # Componentes React
│   │   │   ├── Categoria/
│   │   │   │   ├── CategoriaList.jsx
│   │   │   │   ├── CategoriaCard.jsx
│   │   │   │   ├── CategoriaForm.jsx
│   │   │   │   └── *.css
│   │   │   └── Conta/
│   │   │       ├── ContaList.jsx
│   │   │       ├── ContaCard.jsx
│   │   │       ├── ContaForm.jsx
│   │   │       └── *.css
│   │   ├── App.jsx      # Componente principal com routing
│   │   ├── App.css
│   │   ├── main.jsx     # Entrada da aplicação
│   │   └── index.css    # Estilos globais
│   ├── index.html       # HTML principal
│   ├── vite.config.js   # Configuração do Vite
│   └── package.json
│
├── examples/            # Arquivos de exemplo (referência)
│   ├── backend-exemplo-completo.js
│   └── frontend-exemplo-completo.jsx
│
├── README.md            # Este arquivo
├── CONTRIBUTING.md      # Guia para contribuidores
├── CLAUDE.md            # Guia para Claude Code
└── .gitignore
```

## Banco de Dados

### Modelagem de Dados

#### Tabela: categorias
```
id              INTEGER PRIMARY KEY
nome            VARCHAR(100) UNIQUE NOT NULL
descricao       TEXT
cor             VARCHAR(7) DEFAULT '#808080'
icone           VARCHAR(50)
criado_em       TIMESTAMP
atualizado_em   TIMESTAMP
```

#### Tabela: contas
```
id              INTEGER PRIMARY KEY
categoria_id    INTEGER NOT NULL (FK → categorias)
descricao       VARCHAR(255) NOT NULL
valor           DECIMAL(10,2) NOT NULL
data_vencimento DATE
data_pagamento  DATE
status          ENUM('PENDENTE', 'PAGA', 'ATRASADA')
observacoes     TEXT
criado_em       TIMESTAMP
atualizado_em   TIMESTAMP
```

### Relacionamentos
- Uma **Categoria** pode ter várias **Contas** (1:N)
- Uma **Conta** pertence a uma **Categoria** (N:1)
- **Cascade Delete**: Deletar uma categoria remove todas suas contas

## API Endpoints

### Categorias

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/categorias` | Listar todas as categorias |
| GET | `/api/categorias/:id` | Buscar categoria por ID |
| POST | `/api/categorias` | Criar nova categoria |
| PUT | `/api/categorias/:id` | Atualizar categoria |
| DELETE | `/api/categorias/:id` | Deletar categoria |
| GET | `/api/categorias/:id/contas` | Listar contas da categoria |
| GET | `/api/categorias/:id/total` | Obter total da categoria |

**Exemplo - Criar Categoria:**
```bash
POST http://localhost:3000/api/categorias
Content-Type: application/json

{
  "nome": "Moradia",
  "descricao": "Despesas de casa",
  "cor": "#FF5733",
  "icone": "🏠"
}
```

### Contas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/contas` | Listar todas as contas (com filtros opcionais) |
| GET | `/api/contas/:id` | Buscar conta por ID |
| POST | `/api/contas` | Criar nova conta |
| PUT | `/api/contas/:id` | Atualizar conta |
| DELETE | `/api/contas/:id` | Deletar conta |
| PATCH | `/api/contas/:id/pagar` | Marcar conta como paga |
| GET | `/api/contas/relatorio` | Obter relatório com totalizações |

**Exemplo - Criar Conta:**
```bash
POST http://localhost:3000/api/contas
Content-Type: application/json

{
  "categoria_id": 1,
  "descricao": "Aluguel",
  "valor": 1500.00,
  "data_vencimento": "2024-12-30",
  "status": "PENDENTE"
}
```

## Desenvolvimento

### Scripts Disponíveis

**Backend:**
```bash
npm run dev       # Executar com hot reload (nodemon)
npm run start     # Executar em produção
npm test          # Rodar testes
```

**Frontend:**
```bash
npm run dev       # Dev server com Vite
npm run build     # Build para produção
npm run preview   # Preview do build
npm test          # Rodar testes
```

### Variáveis de Ambiente

**Backend (.env):**
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=controle_gastos
```

**Frontend:**
Configure a URL da API em `src/services/api.js` (padrão: `http://localhost:3000/api`)

### Fluxo de Desenvolvimento

1. Terminal 1: Inicie o backend com `npm run dev` (porta 3000)
2. Terminal 2: Inicie o frontend com `npm run dev` (porta 5173)
3. Hot reload está ativado - alterações recarregam automaticamente
4. Verifique o console do navegador para erros de frontend
5. Verifique os logs do terminal backend para erros de API

### Tratamento de Erros

O sistema implementa:
- ✅ Validação de dados em formulários (frontend)
- ✅ Validação de negócio em serviços (backend)
- ✅ Middleware centralizado de tratamento de erros
- ✅ Mensagens de erro descritivas ao usuário
- ✅ Logs estruturados no backend

## 🧪 Testes Automatizados

O projeto implementa testes E2E com **Cypress** em uma estrutura de camadas:

### Estrutura de Testes

```
testes-automatizados/
├── cypress/
│   ├── e2e/              # Testes (CRUD, Validação, UI, Integração)
│   │   ├── Categoria/
│   │   ├── Conta/
│   │   └── Integration/
│   └── support/          # Camadas de suporte
│       ├── Commands/     # Comandos Cypress customizados
│       ├── models/       # Modelos de dados
│       ├── adapters/     # Conversão para payloads API
│       ├── library/      # Geração de dados fake (faker.js)
│       └── services/     # Serviços auxiliares
├── package.json          # Scripts de teste
└── README.md             # Instruções de execução
```

### Execução de Testes

```bash
cd testes-automatizados

# Modo interativo (Cypress UI)
npm run test:open

# Modo headless (todos os testes)
npm run test:run

# Apenas testes rápidos (@fastRun)
npm run test:fastRun

# Testes de integração
npm run test:integration
```

### Status Atual (Fase 2, Día 4)

- ✅ Infraestrutura: Cypress, dependências, configuração
- ✅ Modelos e Adapters para Categoria e Conta
- ✅ Comandos API (Create, GetAll, GetById, Update, Delete)
- ✅ Comandos de Asserção (Validações customizadas)
- 🚀 Testes CRUD em progresso (Fase 3)

Para mais detalhes, consulte:
- **[PLANO_DE_EXECUÇÃO.md](./PLANO_DE_EXECUÇÃO.md)** - Plano detalhado de 11 dias
- **[testes-automatizados/README.md](./testes-automatizados/README.md)** - Como executar testes

## Próximas Melhorias

- [ ] Autenticação e autorização
- [ ] Paginação nas listagens
- [ ] Filtros de data mais avançados
- [ ] Gráficos e visualizações
- [ ] Export de dados (CSV, PDF)
- [🚀] **Testes automatizados (Cypress E2E)** - Fase 2/Día 4 Complete
  - Estrutura de testes em camadas (Models, Adapters, Libraries, Commands)
  - API commands para Categoria e Conta implementados
  - Testes CRUD em progresso
  - Ver: [PLANO_DE_EXECUÇÃO.md](./PLANO_DE_EXECUÇÃO.md) e [testes-automatizados/README.md](./testes-automatizados/README.md)
- [ ] Dark mode
- [ ] Multidioma (i18n)
- [ ] Docker para containerização
- [ ] CI/CD pipeline
- [ ] Cache de dados
- [ ] Notificações em tempo real (WebSocket)

## Documentação Adicional

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guia para contribuidores e entendimento da implementação
- **[CLAUDE.md](./CLAUDE.md)** - Guia para Claude Code com referência rápida
- **examples/** - Arquivos de exemplo de implementação

## Licença

Este projeto é de código aberto e disponível para fins educacionais e comerciais.

## Suporte

Para dúvidas ou sugestões, consulte os arquivos de documentação ou abra uma issue no repositório.

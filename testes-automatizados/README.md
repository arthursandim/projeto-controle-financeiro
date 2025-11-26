# 🧪 Testes Automatizados - Cypress

Ambiente isolado para testes automatizados E2E do Sistema de Controle de Gastos.

## 📋 Pré-requisitos

- Node.js 18+
- Backend rodando em `http://localhost:3000`
- Frontend rodando em `http://localhost:5173`

## 🚀 Instalação

```bash
cd testes-automatizados
npm install
```

## ▶️ Executar Testes

### Modo Interativo (Cypress UI)
```bash
npm run test:open
```

### Modo Headless (Todos os testes)
```bash
npm run test:run
```

### Smoke Tests Rápidos (@fastRun)
```bash
npm run test:fastRun
```

### Testes de Integração
```bash
npm run test:integration
```

## 🏗️ Estrutura

```
testes-automatizados/
├── cypress/
│   ├── e2e/              # Arquivos de teste
│   │   ├── Categoria/
│   │   ├── Conta/
│   │   └── Integration/
│   └── support/          # Suporte (models, adapters, commands, libraries)
│       ├── Commands/
│       ├── models/
│       ├── adapters/
│       ├── library/
│       └── services/
├── cypress.config.js     # Configuração do Cypress
├── .env                  # Variáveis de ambiente
├── package.json          # Dependências
└── README.md             # Este arquivo
```

## 📚 Documentação

- [CONTRIBUTING.md](../CONTRIBUTING.md) - Guia de contribuição e padrões de testes

## 🔗 Integração com o Projeto

Este diretório é isolado e contém apenas os testes. O projeto principal está na raiz.

Para rodar o projeto completo:

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: Testes (opcional)
cd testes-automatizados
npm run test:open
```

---

**Desenvolvido com Cypress para o Sistema de Controle de Gastos** 💰

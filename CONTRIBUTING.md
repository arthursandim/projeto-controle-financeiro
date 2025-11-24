# Guia de Contribuição - Projeto Controle de Gastos

Este documento descreve como contribuir para o projeto e como a aplicação foi implementada, servindo como referência para novos desenvolvedores que querem entender a arquitetura.

## Para Novos Contribuidores

### Como Começar

1. **Clone o repositório:**
   ```bash
   git clone <seu-repositorio>
   cd projeto-controle-financeiro
   ```

2. **Instale as dependências:**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Inicie o desenvolvimento:**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev

   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

4. **Acesse a aplicação:**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

### Padrões de Código

#### Backend

**Estrutura de Camadas:**
- Mantenha a separação de responsabilidades entre Controllers → Services → Repositories
- Controllers validam requisições e delegam para services
- Services contêm lógica de negócio
- Repositories fazem acesso ao banco de dados

**Exemplo de Novo Endpoint:**

1. **Repository** (`src/repositories/novaRepository.js`) - Acesso aos dados
2. **Service** (`src/services/novaService.js`) - Lógica de negócio
3. **Controller** (`src/controllers/novaController.js`) - Requisições HTTP
4. **Routes** (`src/routes/novaRoutes.js`) - Definição de rotas
5. **app.js** - Registrar rotas

#### Frontend

**Componentes:**
- Organize por features (Categoria, Conta, etc)
- Componentes de lista (List), formulário (Form) e card individual (Card)
- Use hooks para estado local
- Serviços em `src/services/` para chamadas API

**Estrutura Recomendada:**
```
src/components/MinhaFeature/
├── MinhaFeatureList.jsx       # Listagem
├── MinhaFeatureCard.jsx       # Card individual
├── MinhaFeatureForm.jsx       # Formulário
├── MinhaFeatureList.css
├── MinhaFeatureCard.css
└── MinhaFeatureForm.css
```

### Adicionar Nova Entidade

Exemplo: Adicionar nova entidade "Banco"

**1. Backend - Model** (`src/models/Banco.js`)
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Banco = sequelize.define('Banco', {
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  saldo: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  }
}, {
  tableName: 'bancos',
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
});

module.exports = Banco;
```

**2. Backend - Repository** (`src/repositories/bancoRepository.js`)
```javascript
const Banco = require('../models/Banco');

class BancoRepository {
  async findAll() {
    return await Banco.findAll();
  }

  async findById(id) {
    return await Banco.findByPk(id);
  }

  async create(dados) {
    return await Banco.create(dados);
  }

  async update(id, dados) {
    const banco = await this.findById(id);
    if (!banco) return null;
    return await banco.update(dados);
  }

  async delete(id) {
    const banco = await this.findById(id);
    if (!banco) return false;
    await banco.destroy();
    return true;
  }
}

module.exports = BancoRepository;
```

**3. Backend - Service** (`src/services/bancoService.js`)
```javascript
class BancoService {
  constructor(bancoRepository) {
    this.bancoRepository = bancoRepository;
  }

  async listarBancos() {
    return await this.bancoRepository.findAll();
  }

  async buscarBancoPorId(id) {
    const banco = await this.bancoRepository.findById(id);
    if (!banco) {
      throw new Error('Banco não encontrado');
    }
    return banco;
  }

  async criarBanco(dados) {
    if (!dados.nome || dados.nome.trim() === '') {
      throw new Error('Nome do banco é obrigatório');
    }
    return await this.bancoRepository.create(dados);
  }

  async atualizarBanco(id, dados) {
    const banco = await this.bancoRepository.update(id, dados);
    if (!banco) {
      throw new Error('Banco não encontrado');
    }
    return banco;
  }

  async deletarBanco(id) {
    const resultado = await this.bancoRepository.delete(id);
    if (!resultado) {
      throw new Error('Banco não encontrado');
    }
    return resultado;
  }
}

module.exports = BancoService;
```

**4. Backend - Controller** (`src/controllers/bancoController.js`)
```javascript
class BancoController {
  constructor(bancoService) {
    this.bancoService = bancoService;
  }

  async listar(req, res, next) {
    try {
      const bancos = await this.bancoService.listarBancos();
      res.json(bancos);
    } catch (error) {
      next(error);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      const { id } = req.params;
      const banco = await this.bancoService.buscarBancoPorId(id);
      res.json(banco);
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      const banco = await this.bancoService.criarBanco(req.body);
      res.status(201).json(banco);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const banco = await this.bancoService.atualizarBanco(id, req.body);
      res.json(banco);
    } catch (error) {
      next(error);
    }
  }

  async deletar(req, res, next) {
    try {
      const { id } = req.params;
      await this.bancoService.deletarBanco(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BancoController;
```

**5. Backend - Routes** (`src/routes/bancoRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const BancoRepository = require('../repositories/bancoRepository');
const BancoService = require('../services/bancoService');
const BancoController = require('../controllers/bancoController');

const repository = new BancoRepository();
const service = new BancoService(repository);
const controller = new BancoController(service);

router.get('/', (req, res, next) => controller.listar(req, res, next));
router.get('/:id', (req, res, next) => controller.buscarPorId(req, res, next));
router.post('/', (req, res, next) => controller.criar(req, res, next));
router.put('/:id', (req, res, next) => controller.atualizar(req, res, next));
router.delete('/:id', (req, res, next) => controller.deletar(req, res, next));

module.exports = router;
```

**6. Backend - app.js** - Registrar rotas
```javascript
const bancoRoutes = require('./routes/bancoRoutes');
app.use('/api/bancos', bancoRoutes);
```

**7. Frontend** - Criar componentes em `src/components/Banco/`
- BancoList.jsx
- BancoCard.jsx
- BancoForm.jsx
- Arquivos CSS correspondentes

**8. Frontend - app.js** - Adicionar rota
```javascript
<Route path="/bancos" element={<BancoList />} />
```

### Checklist para Contribuições

Antes de fazer um commit:

- [ ] Teste localmente (backend e frontend)
- [ ] Código segue os padrões do projeto
- [ ] Sem console.logs de debug
- [ ] Sem arquivos não utilizados
- [ ] Mensagens de erro são descritivas
- [ ] API retorna status HTTP correto
- [ ] Frontend trata erros apropriadamente

### Commits

Use mensagens descritivas:
```bash
git commit -m "Adicionar CRUD de Banco"
git commit -m "Corrigir validação de categoria duplicada"
git commit -m "Melhorar performance do relatório"
```

## Estrutura de Implementação Original

Este projeto foi implementado seguindo a arquitetura em camadas com:

### Backend Stack
- **Express.js** - Framework web
- **Sequelize** - ORM para Node.js
- **SQLite** - Banco de dados (desenvolvimento)
- **PostgreSQL** - Banco de dados (produção)

### Camadas do Backend
1. **Controllers** - Recebem requisições HTTP, validam entrada, delegam para services
2. **Services** - Contêm lógica de negócio, validações complexas
3. **Repositories** - Acesso exclusivo aos dados via ORM
4. **Models** - Definição de entidades e relacionamentos

### Frontend Stack
- **React 18+** - Biblioteca de UI
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **CSS3** - Estilização

### Banco de Dados

**Tabela: categorias**
- id (INTEGER, PK)
- nome (VARCHAR(100), UNIQUE)
- descricao (TEXT)
- cor (VARCHAR(7))
- icone (VARCHAR(50))
- criado_em, atualizado_em (TIMESTAMP)

**Tabela: contas**
- id (INTEGER, PK)
- categoria_id (INTEGER, FK → categorias)
- descricao (VARCHAR(255))
- valor (DECIMAL(10,2))
- data_vencimento (DATE)
- data_pagamento (DATE)
- status (ENUM: PENDENTE, PAGA, ATRASADA)
- observacoes (TEXT)
- criado_em, atualizado_em (TIMESTAMP)

**Relacionamento:**
- Categoria 1:N Conta (cascade delete)

## Dúvidas?

Consulte os seguintes arquivos:
- **README.md** - Overview do projeto e como usar
- **CLAUDE.md** - Referência rápida de arquitetura
- **examples/** - Arquivos de exemplo de implementação

## Melhorias Futuras

Áreas onde contribuições são bem-vindas:
- [ ] Autenticação JWT
- [ ] Paginação nas listagens
- [ ] Gráficos e visualizações
- [ ] Export de dados (CSV, PDF)
- [ ] Testes automatizados
- [ ] Dark mode
- [ ] Multidioma
- [ ] Docker/Containerização
- [ ] CI/CD Pipeline
- [ ] WebSocket para atualizações em tempo real

Obrigado por contribuir! 🚀

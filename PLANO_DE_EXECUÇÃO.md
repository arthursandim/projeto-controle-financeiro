# 📅 Plano de Execução: Testes Automatizados com Cypress
**Projeto:** Sistema de Controle de Gastos (React + Node)
**Prazo:** 11 Dias
**Baseado em:** Arquitetura do projeto `nextar/nex-web-test`

## 📋 Pré-requisitos
Antes de rodar os testes, certifique-se de que a aplicação está rodando:
- [ ] Backend rodando na porta `3000` (`npm run dev` no backend)
- [ ] Frontend rodando na porta `5173` (`npm run dev` no frontend)

---

## 🚀 Fase 1: Configuração e Infraestrutura (Dias 1-2)

### Dia 1: Instalação, Setup Inicial e Estrutura Base
- [x] Instalar o Cypress no projeto (`npm install cypress --save-dev`)
- [ ] Instalar dependências complementares:
    - [ ] `npm install --save-dev @cypress/grep` (filtrar testes por tags)
    - [ ] `npm install --save-dev @faker-js/faker` (gerar dados fake)
    - [ ] `npm install dotenv` (gerenciar variáveis de ambiente)
- [ ] Abrir o Cypress pela primeira vez (`npx cypress open`)
- [ ] Configurar arquivos de ambiente:
    - [ ] Criar `.env` com variáveis de ambiente (baseUrl, baseApiUrl)
    - [ ] Criar `cypress.env.json` com dados de teste (credenciais, variáveis sensíveis)
    - [ ] Criar `.env.example` e `cypress.env.example.json` como modelos
- [ ] Configurar `cypress.config.js`:
    - [ ] Definir `baseUrl` para o Frontend (`http://localhost:5173`)
    - [ ] Definir `baseApiUrl` para o Backend (`http://localhost:3000/api`)
    - [ ] Configurar plugin `@cypress/grep`
    - [ ] Implementar estratégia de exclusão de testes em modo headless
- [ ] Criar primeiro teste simples: "Home carrega com sucesso"

### Dia 2: Estrutura de Suporte e Convenções
- [ ] Criar estrutura base de pastas:
    ```
    cypress/
    ├── e2e/
    │   ├── Authenticate/
    │   ├── Categoria/
    │   └── Conta/
    ├── support/
    │   ├── commands.js
    │   ├── Commands/
    │   │   ├── Authenticate/
    │   │   │   ├── index.js
    │   │   │   ├── Api_commands.js
    │   │   │   └── UI_commands.js
    │   │   ├── Categoria/
    │   │   ├── Conta/
    │   │   └── Utils/
    │   ├── models/
    │   ├── adapters/
    │   ├── library/
    │   └── services/
    ├── fixtures/
    └── plugins/
    ```
- [ ] Configurar IntelliSense do Cypress
- [ ] Criar arquivo `CONTRIBUTING.md` com convenções do projeto:
    - [ ] Convenção de nomenclatura (camelCase para comandos, PascalCase para classes)
    - [ ] Padrão de estrutura de testes
    - [ ] Guia de Git workflow (feature branches, commit messages)

---

## ⚙️ Fase 2: Autenticação e Fundação de Testes (Dias 3-4)

### Dia 3: Comandos de Autenticação (API + UI)
- [ ] Criar `cypress/support/Commands/Authenticate/Api_commands.js`:
    - [ ] `cy.authApi_Login(email, password)` - Autenticar via API
    - [ ] `cy.authApi_Logout()` - Desconectar
    - [ ] `cy.authApi_GetToken()` - Obter token
- [ ] Criar `cypress/support/Commands/Authenticate/UI_commands.js`:
    - [ ] `cy.authUI_Login(email, password)` - Login pela UI
    - [ ] `cy.authUI_Logout()` - Logout pela UI
- [ ] Criar arquivo de índice `cypress/support/Commands/Authenticate/index.js`
- [ ] Registrar comandos em `cypress/support/commands.js`
- [ ] Criar testes básicos de autenticação em `cypress/e2e/Authenticate/`

### Dia 4: Modelos, Adapters e Biblioteca de Dados
- [ ] Criar modelo `cypress/support/models/Categoria.js`:
    - [ ] Classe com validação de propriedades
    - [ ] Métodos getter/setter
- [ ] Criar modelo `cypress/support/models/Conta.js`:
    - [ ] Classe com validação de propriedades
    - [ ] Métodos getter/setter
- [ ] Criar adaptadores:
    - [ ] `cypress/support/adapters/CategoriaAdapter.js` (adapterToPOST, adapterToPUT)
    - [ ] `cypress/support/adapters/ContaAdapter.js` (adapterToPOST, adapterToPUT)
- [ ] Criar biblioteca `cypress/support/library/CategoriaLib.js`:
    - [ ] `makeAFakeCategoria()` - Gerar categoria fake
    - [ ] `makeAFakeCategoriaArray(quantity)` - Gerar array de categorias
- [ ] Criar biblioteca `cypress/support/library/ContaLib.js`:
    - [ ] `makeAFakeConta(categoria_id)` - Gerar conta fake
    - [ ] `makeAFakeContaArray(quantity, categoria_id)` - Gerar array de contas

---

## 📦 Fase 3: Testes de API (Backend) (Dias 5-7)

### Dia 5: Comandos e Testes de Categorias (API)
- [ ] Criar `cypress/support/Commands/Categoria/Api_commands.js`:
    - [ ] `cy.categoriaApi_Create(categoria)` - POST /categorias
    - [ ] `cy.categoriaApi_GetAll()` - GET /categorias
    - [ ] `cy.categoriaApi_GetById(id)` - GET /categorias/:id
    - [ ] `cy.categoriaApi_Update(id, categoria)` - PUT /categorias/:id
    - [ ] `cy.categoriaApi_Delete(id)` - DELETE /categorias/:id
- [ ] Criar `cypress/support/Commands/Categoria/Assertions_commands.js`:
    - [ ] `cy.categoriaShouldExist(nome)` - Validar existência
    - [ ] `cy.categoriaShouldHaveProperties(esperado, obtido)` - Validar propriedades
- [ ] Criar testes API em `cypress/e2e/Categoria/categoria.controller.cy.js`:
    - [ ] ✅ Criar categoria com sucesso
    - [ ] ✅ Listar categorias
    - [ ] ✅ Atualizar categoria
    - [ ] ✅ Deletar categoria
    - [ ] ✅ Validar regra: nome não duplicado
    - Marcar testes críticos com tag `@fastRun`

### Dia 6: Comandos e Testes de Contas (API)
- [ ] Criar `cypress/support/Commands/Conta/Api_commands.js`:
    - [ ] `cy.contaApi_Create(conta)` - POST /contas
    - [ ] `cy.contaApi_GetAll()` - GET /contas
    - [ ] `cy.contaApi_GetById(id)` - GET /contas/:id
    - [ ] `cy.contaApi_Update(id, conta)` - PUT /contas/:id
    - [ ] `cy.contaApi_MarkAsPaid(id)` - PATCH /contas/:id/pagar
    - [ ] `cy.contaApi_Delete(id)` - DELETE /contas/:id
- [ ] Criar `cypress/support/Commands/Conta/Assertions_commands.js`:
    - [ ] `cy.contaShouldExist(descricao)` - Validar existência
    - [ ] `cy.contaShouldHaveStatus(id, status)` - Validar status
- [ ] Criar testes API em `cypress/e2e/Conta/conta.controller.cy.js`:
    - [ ] ✅ Criar conta com categoria válida
    - [ ] ✅ Listar contas
    - [ ] ✅ Atualizar conta
    - [ ] ✅ Marcar como paga
    - [ ] ✅ Deletar conta
    - Marcar testes críticos com tag `@fastRun`

### Dia 7: Validações e Casos de Erro (API)
- [ ] Criar testes de validação em `cypress/e2e/Categoria/categoria.validation.cy.js`:
    - [ ] ❌ Não permitir nome vazio
    - [ ] ❌ Não permitir nome duplicado
    - [ ] ❌ Validar resposta de erro (status 400/422)
- [ ] Criar testes de validação em `cypress/e2e/Conta/conta.validation.cy.js`:
    - [ ] ❌ Não permitir conta sem categoria_id
    - [ ] ❌ Não permitir valor negativo ou zero
    - [ ] ❌ Não permitir atualizar conta inexistente (404)
    - [ ] ❌ Validar resposta de erro adequada
- [ ] Criar `cypress/support/Commands/Conta/Contract_commands.js`:
    - [ ] Validar schema de resposta POST
    - [ ] Validar schema de resposta GET
    - [ ] Validar schema de resposta PUT

---

## 🖥️ Fase 4: Testes de Interface (Frontend) (Dias 8-10)

### Dia 8: Estrutura de Comandos UI e Page Objects Modernos
- [ ] Criar `cypress/support/Commands/Categoria/UI_commands.js`:
    - [ ] `cy.categoriaUI_Navigate()` - Navegar para página de categorias
    - [ ] `cy.categoriaUI_FillForm(categoria)` - Preencher formulário
    - [ ] `cy.categoriaUI_Submit()` - Submeter formulário
    - [ ] `cy.categoriaUI_Edit(categoria)` - Editar categoria
    - [ ] `cy.categoriaUI_Delete(id)` - Deletar categoria via UI
    - [ ] `cy.categoriaUI_Search(nome)` - Buscar categoria
- [ ] Criar `cypress/support/Commands/Conta/UI_commands.js`:
    - [ ] `cy.contaUI_Navigate()` - Navegar para página de contas
    - [ ] `cy.contaUI_FillForm(conta)` - Preencher formulário
    - [ ] `cy.contaUI_SelectCategory(nomeCategoria)` - Selecionar categoria
    - [ ] `cy.contaUI_Submit()` - Submeter formulário
    - [ ] `cy.contaUI_MarkAsPaid(descricao)` - Marcar como paga
    - [ ] `cy.contaUI_Revert(descricao)` - Reverter para pendente
- [ ] Criar utilitários em `cypress/support/Commands/Utils/UIUtils.js`:
    - [ ] Seletores comuns (botões, inputs, etc)
    - [ ] Funções de aguardar elementos
    - [ ] Funções de verificar visibilidade

### Dia 9: Testes E2E - Categorias (Caminho Feliz)
- [ ] Criar `cypress/e2e/Categoria/categoria.happy-path.cy.js` com testes:
    - [ ] @fastRun - Usuário navega e visualiza lista de categorias
    - [ ] @fastRun - Usuário cria nova categoria e vê na listagem
    - [ ] Usuário edita categoria e verifica atualização
    - [ ] Usuário deleta categoria (usar API para preparar dados)
    - [ ] Usuário busca categoria por nome
    - **Estratégia:** Usar API para setup de dados quando possível (ganha velocidade)

### Dia 10: Testes E2E - Contas (Caminho Feliz)
- [ ] Criar `cypress/e2e/Conta/conta.happy-path.cy.js` com testes:
    - [ ] @fastRun - Usuário navega e visualiza dashboard
    - [ ] @fastRun - Usuário cria nova conta com categoria válida
    - [ ] Usuário verifica conta aparece no dashboard
    - [ ] Usuário marca conta como "Paga" e verifica mudança visual
    - [ ] Usuário reverte conta para "Pendente"
    - [ ] Usuário edita conta (usa API para setup)
    - [ ] Usuário filtra contas por status/categoria
    - **Estratégia:** Usar API para preparar dados de categorias

---

## 🧪 Fase 5: Testes de Validação e Edge Cases (Dia 11)

### Dia 11: Fluxos Alternativos, Validações e Finalização
- [ ] Criar `cypress/e2e/Categoria/categoria.validation.cy.js`:
    - [ ] Validação de campo obrigatório
    - [ ] Feedback visual de erro
    - [ ] Limpar erros ao corrigir campo
- [ ] Criar `cypress/e2e/Conta/conta.validation.cy.js`:
    - [ ] Validação de campos obrigatórios
    - [ ] Validação de formato de data
    - [ ] Validação de formato de valor (decimal)
    - [ ] Feedback visual de erros
- [ ] Responsividade básica:
    - [ ] Testar em viewport mobile (375x667)
    - [ ] Verificar menu/navegação em mobile
- [ ] Cleanup e documentação:
    - [ ] Remover código comentado e console.log
    - [ ] Otimizar seletores (preferir `data-cy` ao invés de xpath complexo)
    - [ ] Adicionar comentários em testes complexos
    - [ ] Criar/atualizar README.md com instruções de uso
    - [ ] Configurar scripts no `package.json`:
        ```json
        {
          "test:open": "npx cypress open",
          "test:run": "npx cypress run",
          "test:fastRun": "npx cypress run --env grepTags=fastRun",
          "test:ui": "npx cypress run --env grepTags=ui"
        }
        ```

---

## 📋 Checklist Final de Qualidade

- [ ] **Todos os testes passam em modo headless** (`npm run test:run`)
- [ ] **Testes críticos com tag @fastRun** funcionam perfeitamente
- [ ] **Sem código comentado** ou `console.log` nos testes
- [ ] **Seletores otimizados** (usar `data-cy` quando possível)
- [ ] **Variáveis de ambiente** configuradas corretamente (.env e cypress.env.json)
- [ ] **Documentação atualizada**:
  - [ ] README.md com instruções de setup
  - [ ] CONTRIBUTING.md com convenções e padrões
  - [ ] Exemplos de uso em comentários
- [ ] **Estrutura pronta para CI/CD**:
  - [ ] Scripts de execução definidos
  - [ ] Exclusão de testes específicos em modo headless
  - [ ] Suporte a filtro por tags
- [ ] **Padrão de camadas implementado**:
  - [ ] Models ✅
  - [ ] Adapters ✅
  - [ ] Commands (API + UI) ✅
  - [ ] Libraries ✅
  - [ ] Assertions ✅

---

## 📚 Estrutura Final do Projeto

```
projeto-controle-financeiro/
├── cypress/
│   ├── e2e/
│   │   ├── Authenticate/
│   │   │   └── authenticate.cy.js
│   │   ├── Categoria/
│   │   │   ├── categoria.controller.cy.js
│   │   │   ├── categoria.happy-path.cy.js
│   │   │   └── categoria.validation.cy.js
│   │   └── Conta/
│   │       ├── conta.controller.cy.js
│   │       ├── conta.happy-path.cy.js
│   │       └── conta.validation.cy.js
│   ├── support/
│   │   ├── commands.js
│   │   ├── Commands/
│   │   │   ├── Authenticate/
│   │   │   │   ├── index.js
│   │   │   │   ├── Api_commands.js
│   │   │   │   └── UI_commands.js
│   │   │   ├── Categoria/
│   │   │   │   ├── index.js
│   │   │   │   ├── Api_commands.js
│   │   │   │   ├── UI_commands.js
│   │   │   │   ├── Assertions_commands.js
│   │   │   │   └── Contract_commands.js
│   │   │   ├── Conta/
│   │   │   │   ├── index.js
│   │   │   │   ├── Api_commands.js
│   │   │   │   ├── UI_commands.js
│   │   │   │   ├── Assertions_commands.js
│   │   │   │   └── Contract_commands.js
│   │   │   └── Utils/
│   │   │       ├── UIUtils.js
│   │   │       └── NexUtils.js
│   │   ├── models/
│   │   │   ├── Categoria.js
│   │   │   └── Conta.js
│   │   ├── adapters/
│   │   │   ├── CategoriaAdapter.js
│   │   │   └── ContaAdapter.js
│   │   ├── library/
│   │   │   ├── CategoriaLib.js
│   │   │   └── ContaLib.js
│   │   ├── services/
│   │   │   └── ContaService.js
│   │   └── fixtures/
│   ├── cypress.config.js
│   └── plugins/
├── cypress.env.json
├── cypress.env.example.json
├── .env
├── .env.example
├── CONTRIBUTING.md
└── README.md (com guia de testes)
```

---

## 🎯 Diferenciais da Arquitetura Adotada

✅ **Separação em Camadas**: Models, Adapters, Commands, Libraries
✅ **Reutilização**: Comandos customizados por entidade
✅ **Escalabilidade**: Fácil adicionar novos testes e entidades
✅ **Manutenibilidade**: Código organizado e bem documentado
✅ **Validação**: Contract testing + assertions específicas
✅ **Flexibilidade**: Filtrar testes por tags (@fastRun, @integration, etc)
✅ **Ambiente**: Suporte a múltiplos ambientes via .env
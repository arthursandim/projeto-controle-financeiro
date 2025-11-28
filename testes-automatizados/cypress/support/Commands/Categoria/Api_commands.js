import CategoriaAdapter from '../../adapters/CategoriaAdapter.js';

/**
 * Comandos de API para Categoria
 * Encapsula todas as operações HTTP para a entidade Categoria
 */

Cypress.Commands.add('categoriaApi_Create', (categoria) => {
  const payload = CategoriaAdapter.adapterToPOST(categoria);

  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseApiUrl')}/categorias`,
    body: payload,
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 201) {
      cy.log(`✅ Categoria criada: ${categoria.nome} (ID: ${response.body.dados.id})`);
    } else {
      cy.log(`❌ Erro ao criar categoria: Status ${response.status}`);
      cy.log(`Mensagem: ${JSON.stringify(response.body)}`);
      cy.log(`Payload enviado: ${JSON.stringify(payload)}`);
    }
    cy.wrap(response);
  });
});

Cypress.Commands.add('categoriaApi_GetAll', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseApiUrl')}/categorias`,
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`✅ Categorias listadas: ${response.body.dados.length || 0} itens`);
    cy.wrap(response);
  });
});

Cypress.Commands.add('categoriaApi_GetById', (id) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseApiUrl')}/categorias/${id}`,
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`✅ Categoria obtida: ${response.body.dados?.nome || 'ID ' + id}`);
    cy.wrap(response);
  });
});

Cypress.Commands.add('categoriaApi_Update', (id, categoria) => {
  const payload = CategoriaAdapter.adapterToPUT(categoria);

  cy.request({
    method: 'PUT',
    url: `${Cypress.env('baseApiUrl')}/categorias/${id}`,
    body: payload,
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`✅ Categoria atualizada: ${categoria.nome}`);
    cy.wrap(response);
  });
});

Cypress.Commands.add('categoriaApi_Delete', (id) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('baseApiUrl')}/categorias/${id}`,
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`✅ Categoria deletada: ID ${id}`);
    cy.wrap(response);
  });
});

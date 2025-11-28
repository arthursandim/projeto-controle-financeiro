import ContaAdapter from '../../adapters/ContaAdapter.js';

/**
 * Comandos de API para Conta
 * Encapsula todas as operações HTTP para a entidade Conta
 */

Cypress.Commands.add('contaApi_Create', (conta) => {
  const payload = ContaAdapter.adapterToPOST(conta);

  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseApiUrl')}/contas`,
    body: payload,
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`✅ Conta criada: ${conta.descricao}`);
    cy.wrap(response);
  });
});

Cypress.Commands.add('contaApi_GetAll', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseApiUrl')}/contas`,
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`✅ Contas listadas: ${response.body.dados?.length || 0} itens`);
    cy.wrap(response);
  });
});

Cypress.Commands.add('contaApi_GetById', (id) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseApiUrl')}/contas/${id}`,
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`✅ Conta obtida: ${response.body.dados?.descricao || 'ID ' + id}`);
    cy.wrap(response);
  });
});

Cypress.Commands.add('contaApi_Update', (id, conta) => {
  const payload = ContaAdapter.adapterToPUT(conta);

  cy.request({
    method: 'PUT',
    url: `${Cypress.env('baseApiUrl')}/contas/${id}`,
    body: payload,
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`✅ Conta atualizada: ${conta.descricao}`);
    cy.wrap(response);
  });
});

Cypress.Commands.add('contaApi_Delete', (id) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('baseApiUrl')}/contas/${id}`,
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`✅ Conta deletada: ID ${id}`);
    cy.wrap(response);
  });
});

Cypress.Commands.add('contaApi_MarkAsPaid', (id) => {
  cy.request({
    method: 'PATCH',
    url: `${Cypress.env('baseApiUrl')}/contas/${id}/pagar`,
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`✅ Conta marcada como paga: ID ${id}`);
    cy.wrap(response);
  });
});

Cypress.Commands.add('contaApi_ListByFilters', (filters) => {
  const queryString = new URLSearchParams(filters).toString();

  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseApiUrl')}/contas?${queryString}`,
    failOnStatusCode: false
  }).then((response) => {
    cy.log(`✅ Contas filtradas: ${response.body.dados?.length || 0} itens`);
    cy.wrap(response);
  });
});

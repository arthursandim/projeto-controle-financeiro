/**
 * Comandos de Asserção para Conta
 * Validações customizadas para testes de Conta
 */

Cypress.Commands.add('contaShouldExist', (descricao) => {
  cy.contaApi_GetAll().then((response) => {
    const conta = response.body.find((c) => c.descricao === descricao);
    expect(conta).to.exist;
    cy.log(`✅ Conta '${descricao}' existe`);
    cy.wrap(conta);
  });
});

Cypress.Commands.add('contaShouldHaveStatus', (descricao, status) => {
  cy.contaShouldExist(descricao).then((conta) => {
    expect(conta.status).to.equal(status);
    cy.log(`✅ Conta '${descricao}' tem status '${status}'`);
  });
});

Cypress.Commands.add('contaShouldHaveValor', (descricao, valor) => {
  cy.contaShouldExist(descricao).then((conta) => {
    expect(conta.valor).to.equal(valor);
    cy.log(`✅ Conta '${descricao}' tem valor '${valor}'`);
  });
});

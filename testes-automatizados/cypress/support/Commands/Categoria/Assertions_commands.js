/**
 * Comandos de Asserção para Categoria
 * Validações customizadas para testes de Categoria
 */

Cypress.Commands.add('categoriaShouldExist', (nome) => {
  cy.categoriaApi_GetAll().then((response) => {
    const categoria = response.body.dados.find((cat) => cat.nome === nome);
    expect(categoria).to.exist;
    cy.log(`✅ Categoria '${nome}' existe`);
    cy.wrap(categoria);
  });
});

Cypress.Commands.add('categoriaShouldHaveColor', (nome, cor) => {
  cy.categoriaShouldExist(nome).then((categoria) => {
    expect(categoria.cor).to.equal(cor);
    cy.log(`✅ Categoria '${nome}' tem cor '${cor}'`);
  });
});

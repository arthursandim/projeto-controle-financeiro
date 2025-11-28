/**
 * Reset Database Command
 * Limpa o banco de dados via API DELETE /api/reset
 *
 * Uso: cy.resetDatabase()
 *
 * Este comando é utilizado em beforeEach hooks para garantir
 * que cada teste comece com um banco de dados limpo (testes atômicos)
 */
Cypress.Commands.add('resetDatabase', () => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('baseApiUrl')}/reset`,
    failOnStatusCode: false // Ignora erros em ambiente de produção
  }).then((response) => {
    if (response.status === 200) {
      cy.log(`✅ Banco de dados resetado: ${response.body.mensagem || 'Sucesso'}`);
    } else {
      cy.log(`❌ Erro ao resetar banco: Status ${response.status}`);
      cy.log(`Detalhes: ${JSON.stringify(response.body)}`);
    }
    cy.wrap(response);
  });
});

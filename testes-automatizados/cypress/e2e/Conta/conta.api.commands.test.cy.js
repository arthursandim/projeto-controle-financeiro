import CategoriaLib from '../../support/library/CategoriaLib.js';
import ContaLib from '../../support/library/ContaLib.js';

describe('🧪 Validação de Comandos API - Conta', () => {
  let categoriaId;

  beforeEach(() => {
    const categoria = CategoriaLib.makeAFakeCategoria();
    cy.categoriaApi_Create(categoria).then((response) => {
      categoriaId = response.body.id;
    });
  });

  it('@fastRun - Deve criar conta via API command', () => {
    const conta = ContaLib.makeAFakeConta(categoriaId);

    cy.contaApi_Create(conta).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      expect(response.body.descricao).to.equal(conta.descricao);
      expect(response.body.valor).to.equal(conta.valor);
      expect(response.body.categoria_id).to.equal(categoriaId);
    });
  });

  it('@fastRun - Deve listar todas as contas via API command', () => {
    const conta1 = ContaLib.makeAFakeConta(categoriaId);
    const conta2 = ContaLib.makeAFakeConta(categoriaId);

    cy.contaApi_Create(conta1).then((response1) => {
      const id1 = response1.body.id;

      cy.contaApi_Create(conta2).then((response2) => {
        cy.contaApi_GetAll().then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.length).to.be.greaterThanOrEqual(2);
          expect(response.body.map((c) => c.id)).to.include(id1);
          expect(response.body.map((c) => c.id)).to.include(response2.body.id);
        });
      });
    });
  });

  it('@fastRun - Deve obter conta por ID via API command', () => {
    const conta = ContaLib.makeAFakeConta(categoriaId);

    cy.contaApi_Create(conta).then((response) => {
      const id = response.body.id;

      cy.contaApi_GetById(id).then((getResponse) => {
        expect(getResponse.status).to.equal(200);
        expect(getResponse.body.id).to.equal(id);
        expect(getResponse.body.descricao).to.equal(conta.descricao);
      });
    });
  });

  it('@fastRun - Deve atualizar conta via API command', () => {
    const conta = ContaLib.makeAFakeConta(categoriaId);
    const contaAtualizada = ContaLib.makeAFakeConta(categoriaId);

    cy.contaApi_Create(conta).then((response) => {
      const id = response.body.id;

      cy.contaApi_Update(id, contaAtualizada).then((updateResponse) => {
        expect(updateResponse.status).to.equal(200);
        expect(updateResponse.body.descricao).to.equal(contaAtualizada.descricao);
        expect(updateResponse.body.valor).to.equal(contaAtualizada.valor);
      });
    });
  });

  it('@fastRun - Deve marcar conta como paga via API command', () => {
    const conta = ContaLib.makeAFakeConta(categoriaId);

    cy.contaApi_Create(conta).then((response) => {
      const id = response.body.id;

      cy.contaApi_MarkAsPaid(id).then((markResponse) => {
        expect(markResponse.status).to.equal(200);
        expect(markResponse.body.status).to.equal('PAGA');
        expect(markResponse.body.data_pagamento).to.exist;
      });
    });
  });

  it('@fastRun - Deve deletar conta via API command', () => {
    const conta = ContaLib.makeAFakeConta(categoriaId);

    cy.contaApi_Create(conta).then((response) => {
      const id = response.body.id;

      cy.contaApi_Delete(id).then((deleteResponse) => {
        expect(deleteResponse.status).to.equal(204);

        cy.contaApi_GetById(id).then((getResponse) => {
          expect(getResponse.status).to.equal(404);
        });
      });
    });
  });

  it('@fastRun - Deve validar existência de conta via assertion command', () => {
    const conta = ContaLib.makeAFakeConta(categoriaId);

    cy.contaApi_Create(conta).then(() => {
      cy.contaShouldExist(conta.descricao).then((foundConta) => {
        expect(foundConta).to.exist;
        expect(foundConta.descricao).to.equal(conta.descricao);
      });
    });
  });

  it('@fastRun - Deve validar status de conta via assertion command', () => {
    const conta = ContaLib.makeAFakeConta(categoriaId);

    cy.contaApi_Create(conta).then(() => {
      cy.contaShouldHaveStatus(conta.descricao, 'PENDENTE').then(() => {
        // Assertion dentro do comando
      });
    });
  });

  it('@fastRun - Deve listar contas com filtros via API command', () => {
    const conta = ContaLib.makeAFakeConta(categoriaId);

    cy.contaApi_Create(conta).then(() => {
      cy.contaApi_ListByFilters({ categoria_id: categoriaId }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.length).to.be.greaterThanOrEqual(1);
        expect(response.body.every((c) => c.categoria_id === categoriaId)).to.be.true;
      });
    });
  });
});

import CategoriaLib from '../../support/library/CategoriaLib.js';

describe('🧪 Validação de Comandos API - Categoria', () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it('@fastRun - Deve criar categoria via API command', () => {
    const categoria = CategoriaLib.makeAFakeCategoria();

    cy.categoriaApi_Create(categoria).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.sucesso).to.be.true;
      expect(response.body.dados).to.have.property('id');
      expect(response.body.dados.nome).to.equal(categoria.nome);
      expect(response.body.dados.descricao).to.equal(categoria.descricao);
      expect(response.body.dados.cor).to.equal(categoria.cor);
    });
  });

  it('@fastRun - Deve listar todas as categorias via API command', () => {
    const categoria1 = CategoriaLib.makeAFakeCategoria();
    const categoria2 = CategoriaLib.makeAFakeCategoria();

    cy.categoriaApi_Create(categoria1).then((response1) => {
      const id1 = response1.body.dados.id;

      cy.categoriaApi_Create(categoria2).then((response2) => {
        cy.categoriaApi_GetAll().then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.dados.length).to.be.greaterThanOrEqual(2);
          expect(response.body.dados.map((c) => c.id)).to.include(id1);
          expect(response.body.dados.map((c) => c.id)).to.include(response2.body.dados.id);
        });
      });
    });
  });

  it('@fastRun - Deve obter categoria por ID via API command', () => {
    const categoria = CategoriaLib.makeAFakeCategoria();

    cy.categoriaApi_Create(categoria).then((response) => {
      const id = response.body.dados.id;

      cy.categoriaApi_GetById(id).then((getResponse) => {
        expect(getResponse.status).to.equal(200);
        expect(getResponse.body.dados.id).to.equal(id);
        expect(getResponse.body.dados.nome).to.equal(categoria.nome);
      });
    });
  });

  it('@fastRun - Deve atualizar categoria via API command', () => {
    const categoria = CategoriaLib.makeAFakeCategoria();
    const categoriaAtualizada = CategoriaLib.makeAFakeCategoria();

    cy.categoriaApi_Create(categoria).then((response) => {
      const id = response.body.dados.id;

      cy.categoriaApi_Update(id, categoriaAtualizada).then((updateResponse) => {
        expect(updateResponse.status).to.equal(200);
        expect(updateResponse.body.dados.nome).to.equal(categoriaAtualizada.nome);
        expect(updateResponse.body.dados.cor).to.equal(categoriaAtualizada.cor);
      });
    });
  });

  it('@fastRun - Deve deletar categoria via API command', () => {
    const categoria = CategoriaLib.makeAFakeCategoria();

    cy.categoriaApi_Create(categoria).then((response) => {
      const id = response.body.dados.id;

      cy.categoriaApi_Delete(id).then((deleteResponse) => {
        expect(deleteResponse.status).to.equal(204);

        cy.categoriaApi_GetById(id).then((getResponse) => {
          expect(getResponse.status).to.equal(404);
        });
      });
    });
  });

  it('@fastRun - Deve validar existência de categoria via assertion command', () => {
    const categoria = CategoriaLib.makeAFakeCategoria();

    cy.categoriaApi_Create(categoria).then(() => {
      cy.categoriaShouldExist(categoria.nome).then((foundCategoria) => {
        expect(foundCategoria).to.exist;
        expect(foundCategoria.nome).to.equal(categoria.nome);
      });
    });
  });

  it('@fastRun - Deve validar cor de categoria via assertion command', () => {
    const categoria = CategoriaLib.makeAFakeCategoria();

    cy.categoriaApi_Create(categoria).then((response) => {
      expect(response.body.dados.cor).to.equal(categoria.cor);

      cy.categoriaShouldHaveColor(categoria.nome, categoria.cor).then(() => {
        // Assertion dentro do comando
      });
    });
  });
});

/**
 * Categoria Model
 * Representa uma categoria de despesa/receita para testes
 */
class Categoria {
  constructor(nome, descricao = '', cor = '#808080', icone = '') {
    this.nome = nome;
    this.descricao = descricao;
    this.cor = cor;
    this.icone = icone;
  }

  /**
   * Valida se todos os campos obrigatórios estão preenchidos corretamente
   */
  isValid() {
    return this.validateNome() && this.validateCor();
  }

  /**
   * Valida se o nome não está vazio
   */
  validateNome() {
    return this.nome && this.nome.trim().length > 0;
  }

  /**
   * Valida se a cor é um hexadecimal válido (#XXXXXX)
   */
  validateCor() {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(this.cor);
  }
}

export default Categoria;

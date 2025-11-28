/**
 * Conta Model
 * Representa uma conta (despesa/receita) para testes
 */
class Conta {
  constructor(
    categoria_id,
    descricao,
    valor,
    data_vencimento = null,
    status = 'PENDENTE',
    observacoes = ''
  ) {
    this.categoria_id = categoria_id;
    this.descricao = descricao;
    this.valor = valor;
    this.data_vencimento = data_vencimento;
    this.status = status;
    this.observacoes = observacoes;
  }

  /**
   * Valida se todos os campos obrigatórios estão preenchidos corretamente
   */
  isValid() {
    return (
      this.validateCategoriaId() &&
      this.validateDescricao() &&
      this.validateValor()
    );
  }

  /**
   * Valida se a categoria_id é um número válido
   */
  validateCategoriaId() {
    return typeof this.categoria_id === 'number' && this.categoria_id > 0;
  }

  /**
   * Valida se a descrição não está vazia
   */
  validateDescricao() {
    return this.descricao && this.descricao.trim().length > 0;
  }

  /**
   * Valida se o valor é um número maior que zero
   */
  validateValor() {
    return typeof this.valor === 'number' && this.valor > 0;
  }
}

export default Conta;

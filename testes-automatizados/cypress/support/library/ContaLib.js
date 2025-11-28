/**
 * Conta Library
 * Factory para gerar dados fake de Conta usando faker
 */
import { faker } from '@faker-js/faker';
import Conta from '../models/Conta.js';

class ContaLib {
  /**
   * Cria uma Conta fake com dados aleatórios
   * @param {number} categoria_id - ID da categoria para a conta
   * @returns {Conta} Instância de Conta com dados aleatórios
   */
  static makeAFakeConta(categoria_id) {
    const futureDate = faker.date.future();
    const dataVencimento = futureDate.toISOString().split('T')[0];
    const valor = parseFloat(
      faker.finance.amount({ min: 100, max: 5000, dec: 2 })
    );

    return new Conta(
      categoria_id,                                    // categoria_id: obrigatório
      faker.finance.transactionDescription(),          // descricao: ex. "Payment for services"
      valor,                                           // valor: entre 100 e 5000
      dataVencimento,                                  // data_vencimento: data futura
      'PENDENTE',                                      // status: sempre PENDENTE inicialmente
      faker.lorem.sentence(2)                         // observacoes: ex. "Nice description"
    );
  }

  /**
   * Cria um array de Contas fake
   * @param {number} quantity - Quantidade de contas a gerar (default: 3)
   * @param {number} categoria_id - ID da categoria para todas as contas
   * @returns {Conta[]} Array de instâncias Conta
   */
  static makeAFakeContaArray(quantity = 3, categoria_id) {
    return Array.from({ length: quantity }, () =>
      this.makeAFakeConta(categoria_id)
    );
  }
}

export default ContaLib;

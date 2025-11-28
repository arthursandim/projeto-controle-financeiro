/**
 * Categoria Library
 * Factory para gerar dados fake de Categoria usando faker
 */
import { faker } from '@faker-js/faker';
import Categoria from '../models/Categoria.js';

class CategoriaLib {
  /**
   * Cria uma Categoria fake com dados aleatórios
   * @returns {Categoria} Instância de Categoria com dados aleatórios
   */
  static makeAFakeCategoria() {
    const cores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

    return new Categoria(
      faker.commerce.department(),           // nome: ex. "Electronics"
      faker.lorem.sentence(3),                // descricao: ex. "This is a test"
      cores[Math.floor(Math.random() * cores.length)], // cor: cor hex aleatória
      faker.word.noun()                      // icone: ex. "phone"
    );
  }

  /**
   * Cria um array de Categorias fake
   * @param {number} quantity - Quantidade de categorias a gerar (default: 3)
   * @returns {Categoria[]} Array de instâncias Categoria
   */
  static makeAFakeCategoriaArray(quantity = 3) {
    return Array.from({ length: quantity }, () => this.makeAFakeCategoria());
  }
}

export default CategoriaLib;

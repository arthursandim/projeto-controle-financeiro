import Categoria from '../models/Categoria.js';
import Conta from '../models/Conta.js';

class CategoriaRepository {
  async findAll() {
    return await Categoria.findAll({
      order: [['nome', 'ASC']]
    });
  }

  async findById(id) {
    return await Categoria.findByPk(id);
  }

  async findByNome(nome) {
    return await Categoria.findOne({
      where: { nome }
    });
  }

  async findWithContas(id) {
    return await Categoria.findByPk(id, {
      include: [{
        model: Conta,
        as: 'contas',
        order: [['data_vencimento', 'ASC']]
      }]
    });
  }

  async create(dados) {
    return await Categoria.create(dados);
  }

  async update(id, dados) {
    const categoria = await this.findById(id);
    if (!categoria) return null;
    return await categoria.update(dados);
  }

  async delete(id) {
    const categoria = await this.findById(id);
    if (!categoria) return false;
    await categoria.destroy();
    return true;
  }

  async getTotalContas(id) {
    const categoria = await this.findWithContas(id);
    if (!categoria || !categoria.contas) return 0;

    return categoria.contas.reduce((total, conta) => {
      return total + parseFloat(conta.valor);
    }, 0);
  }
}

export default CategoriaRepository;

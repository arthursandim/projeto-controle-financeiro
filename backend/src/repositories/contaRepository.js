import Conta from '../models/Conta.js';
import Categoria from '../models/Categoria.js';
import { Op } from 'sequelize';

class ContaRepository {
  async findAll(filtros = {}) {
    const where = {};

    if (filtros.categoria_id) {
      where.categoria_id = filtros.categoria_id;
    }

    if (filtros.status) {
      where.status = filtros.status;
    }

    if (filtros.data_inicio && filtros.data_fim) {
      where.data_vencimento = {
        [Op.between]: [filtros.data_inicio, filtros.data_fim]
      };
    }

    return await Conta.findAll({
      where,
      include: [{
        model: Categoria,
        as: 'categoria'
      }],
      order: [['data_vencimento', 'ASC']]
    });
  }

  async findById(id) {
    return await Conta.findByPk(id, {
      include: [{
        model: Categoria,
        as: 'categoria'
      }]
    });
  }

  async findByCategoria(categoriaId) {
    return await Conta.findAll({
      where: { categoria_id: categoriaId },
      order: [['data_vencimento', 'ASC']]
    });
  }

  async create(dados) {
    return await Conta.create(dados);
  }

  async update(id, dados) {
    const conta = await this.findById(id);
    if (!conta) return null;
    return await conta.update(dados);
  }

  async delete(id) {
    const conta = await this.findById(id);
    if (!conta) return false;
    await conta.destroy();
    return true;
  }

  async marcarComoPaga(id, dataPagamento = new Date()) {
    const conta = await this.findById(id);
    if (!conta) return null;

    return await conta.update({
      status: 'PAGA',
      data_pagamento: dataPagamento
    });
  }

  async getTotais() {
    const contas = await Conta.findAll();

    const total = contas.reduce((sum, conta) => sum + parseFloat(conta.valor), 0);
    const pagas = contas.filter(c => c.status === 'PAGA')
                        .reduce((sum, conta) => sum + parseFloat(conta.valor), 0);
    const pendentes = contas.filter(c => c.status === 'PENDENTE')
                            .reduce((sum, conta) => sum + parseFloat(conta.valor), 0);

    return {
      total,
      pagas,
      pendentes,
      quantidade: contas.length,
      quantidade_pagas: contas.filter(c => c.status === 'PAGA').length,
      quantidade_pendentes: contas.filter(c => c.status === 'PENDENTE').length
    };
  }
}

export default ContaRepository;

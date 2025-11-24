import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Categoria from './Categoria.js';

const Conta = sequelize.define('Conta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorias',
      key: 'id'
    }
  },
  descricao: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  data_vencimento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  data_pagamento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('PENDENTE', 'PAGA', 'ATRASADA'),
    defaultValue: 'PENDENTE'
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'contas',
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
});

// Relacionamentos
Categoria.hasMany(Conta, { foreignKey: 'categoria_id', as: 'contas' });
Conta.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });

export default Conta;

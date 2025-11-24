import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cor: {
    type: DataTypes.STRING(7),
    allowNull: true,
    defaultValue: '#808080'
  },
  icone: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'categorias',
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
});

export default Categoria;

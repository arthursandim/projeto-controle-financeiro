import sequelize from '../config/database.js';

/**
 * ResetService
 * Responsável por limpar o banco de dados para testes
 */
class ResetService {
  async resetDatabase() {
    try {
      // Desabilitar foreign key constraints temporariamente
      await sequelize.query('PRAGMA foreign_keys = OFF');

      // Deletar dados (mantém estrutura das tabelas)
      await sequelize.query('DELETE FROM contas');
      await sequelize.query('DELETE FROM categorias');

      // Reset auto-increment (volta para 1)
      await sequelize.query("DELETE FROM sqlite_sequence WHERE name='contas'");
      await sequelize.query("DELETE FROM sqlite_sequence WHERE name='categorias'");

      // Reabilitar foreign keys
      await sequelize.query('PRAGMA foreign_keys = ON');

      return {
        tabelasLimpas: ['contas', 'categorias'],
        sequenciasResetadas: true,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Falha ao resetar banco: ${error.message}`);
    }
  }
}

export default ResetService;

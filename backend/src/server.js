import app from './app.js';
import sequelize from './config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Sincronizar banco de dados e iniciar servidor
async function iniciarServidor() {
  try {
    // Testar conexão com banco de dados
    await sequelize.authenticate();
    console.log('✅ Conexão com banco de dados estabelecida');

    // Sincronizar modelos (em desenvolvimento)
    // ATENÇÃO: usar { force: true } apaga todas as tabelas!
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📍 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

iniciarServidor();

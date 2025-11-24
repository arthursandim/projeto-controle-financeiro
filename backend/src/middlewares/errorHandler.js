function errorHandler(err, req, res, next) {
  console.error('Erro:', err);

  // Erro de validação
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Erro de validação',
      erros: err.errors.map(e => e.message)
    });
  }

  // Erro de constraint única
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      sucesso: false,
      mensagem: 'Registro duplicado'
    });
  }

  // Erros customizados do serviço
  if (err.message.includes('não encontrad')) {
    return res.status(404).json({
      sucesso: false,
      mensagem: err.message
    });
  }

  if (err.message.includes('já existe') || err.message.includes('Não é possível')) {
    return res.status(400).json({
      sucesso: false,
      mensagem: err.message
    });
  }

  // Erro genérico
  res.status(500).json({
    sucesso: false,
    mensagem: 'Erro interno do servidor',
    erro: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}

export default errorHandler;

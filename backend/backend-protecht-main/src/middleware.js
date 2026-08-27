const jwt = require('jsonwebtoken');
const config = require('./config');
const db = require('./db');

async function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ error: 'Token não informado' });
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await db('users').where({ id: payload.sub }).first();
    if (!user) return res.status(401).json({ error: 'Usuário inválido' });
    req.user = user;
    next();
  } catch { res.status(401).json({ error: 'Token inválido ou expirado' }); }
}

function adminOnly(req, res, next) {
  if (req.user?.access_nivel !== 'ADMIN') return res.status(403).json({ error: 'Acesso administrativo necessário' });
  next();
}

function errors(error, req, res, next) {
  if (error.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ error: 'Cada imagem deve ter no máximo 1 MB' });
  if (error.status) return res.status(error.status).json({ error: error.message });
  console.error(error);
  res.status(500).json({ error: 'Erro interno do servidor' });
}

module.exports = { authenticate, adminOnly, errors };

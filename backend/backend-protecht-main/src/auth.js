const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');
const db = require('./db');
const config = require('./config');
const { sendVerificationEmail } = require('./mailer');

const publicUser = user => ({ id: user.id, name: user.name, email: user.email, rm: user.rm, verified_email: user.verified_email, access_nivel: user.access_nivel });
const codeHash = code => crypto.createHash('sha256').update(code).digest('hex');

async function issueCode(user) {
  const code = String(crypto.randomInt(0, 10000)).padStart(4, '0');
  await db('users').where({ id: user.id }).update({
    verified_code: codeHash(code),
    verified_code_expires_at: new Date(Date.now() + config.verificationMinutes * 60000).toISOString(),
    verification_attempts: 0,
    verification_resends: db.raw('verification_resends + 1')
  });
  await sendVerificationEmail(user.email, code);
}

async function register({ name, email, rm, password }) {
  if (!email || !rm || !password) throw Object.assign(new Error('email, rm e password são obrigatórios'), { status: 400 });
  if (password.length < 8) throw Object.assign(new Error('A senha deve ter ao menos 8 caracteres'), { status: 400 });
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await db('users').where('email', normalizedEmail).orWhere('rm', rm.trim()).first();
  if (existing) throw Object.assign(new Error('E-mail ou RM já cadastrado'), { status: 409 });
  const [id] = await db('users').insert({ name: name || null, email: normalizedEmail, rm: rm.trim(), password: await bcrypt.hash(password, 12), access_nivel: 'USER' });
  const user = await db('users').where({ id }).first();
  await issueCode(user);
  return publicUser(user);
}

async function verify(email, code) {
  const user = await db('users').where({ email: email.trim().toLowerCase() }).first();
  if (!user || user.verified_email) throw Object.assign(new Error('Código inválido'), { status: 400 });
  if (user.verification_attempts >= config.maxAttempts) throw Object.assign(new Error('Limite de tentativas excedido'), { status: 429 });
  const expired = !user.verified_code_expires_at || new Date(user.verified_code_expires_at) < new Date();
  const valid = !expired && codeHash(String(code)) === user.verified_code;
  if (!valid) {
    await db('users').where({ id: user.id }).increment('verification_attempts', 1);
    throw Object.assign(new Error(expired ? 'Código expirado' : 'Código inválido'), { status: 400 });
  }
  await db('users').where({ id: user.id }).update({ verified_email: 1, verified_code: null, verified_code_expires_at: null, verification_attempts: 0, verification_resends: 0 });
  return { verified: true };
}

async function resend(email) {
  const user = await db('users').where({ email: email.trim().toLowerCase() }).first();
  if (!user || user.verified_email) throw Object.assign(new Error('Usuário inválido'), { status: 400 });
  if (user.verification_resends >= config.maxResends) throw Object.assign(new Error('Limite de reenvios excedido'), { status: 429 });
  await issueCode(user);
  return { sent: true };
}

async function login(email, password) {
  const user = await db('users').where({ email: email.trim().toLowerCase() }).first();
  if (!user || !(await bcrypt.compare(password || '', user.password))) throw Object.assign(new Error('Credenciais inválidas'), { status: 401 });
  if (!user.verified_email) throw Object.assign(new Error('E-mail ainda não verificado'), { status: 403 });
  return { token: jwt.sign({ sub: user.id, role: user.access_nivel }, config.jwtSecret, { expiresIn: config.jwtExpiresIn }), user: publicUser(user) };
}

module.exports = { register, verify, resend, login, publicUser };

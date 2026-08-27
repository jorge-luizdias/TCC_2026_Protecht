const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const config = require('./config');
const db = require('./db');
const auth = require('./auth');
const { authenticate, adminOnly, errors } = require('./middleware');

fs.mkdirSync(path.dirname(config.databaseFile), { recursive: true });
fs.mkdirSync(config.uploadDir, { recursive: true });
const app = express();
app.use(cors({ origin: config.corsOrigins.includes('*') ? true : config.corsOrigins }));
app.use(express.json());
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/auth/register', async (req, res, next) => { try { res.status(201).json(await auth.register(req.body)); } catch (e) { next(e); } });
app.post('/api/auth/verify', async (req, res, next) => { try { res.json(await auth.verify(req.body.email, req.body.code)); } catch (e) { next(e); } });
app.post('/api/auth/resend', async (req, res, next) => { try { res.json(await auth.resend(req.body.email)); } catch (e) { next(e); } });
app.post('/api/auth/login', async (req, res, next) => { try { res.json(await auth.login(req.body.email, req.body.password)); } catch (e) { next(e); } });

app.get('/api/courses', async (req, res, next) => { try { res.json(await db('courses').select('id', 'name', 'code').orderBy('name')); } catch (e) { next(e); } });
app.get('/api/me', authenticate, (req, res) => res.json(auth.publicUser(req.user)));
app.get('/api/admin/users', authenticate, adminOnly, async (req, res, next) => { try { res.json(await db('users').select('id', 'name', 'email', 'rm', 'verified_email', 'access_nivel').orderBy('name')); } catch (e) { next(e); } });
app.patch('/api/admin/users/:id', authenticate, adminOnly, async (req, res, next) => { try { const update = {}; if (req.body.name !== undefined) update.name = req.body.name; if (req.body.access_nivel) update.access_nivel = req.body.access_nivel; if (req.body.verified_email !== undefined) update.verified_email = req.body.verified_email ? 1 : 0; await db('users').where({ id: req.params.id }).update(update); res.json(await db('users').select('id', 'name', 'email', 'rm', 'verified_email', 'access_nivel').where({ id: req.params.id }).first()); } catch (e) { next(e); } });
app.post('/api/admin/courses', authenticate, adminOnly, async (req, res, next) => { try { if (!req.body.name || !req.body.code) throw Object.assign(new Error('name e code são obrigatórios'), { status: 400 }); const [id] = await db('courses').insert({ name: req.body.name, code: req.body.code }); res.status(201).json(await db('courses').where({ id }).first()); } catch (e) { next(e); } });
app.patch('/api/admin/courses/:id', authenticate, adminOnly, async (req, res, next) => { try { await db('courses').where({ id: req.params.id }).update({ name: req.body.name, code: req.body.code }); res.json(await db('courses').where({ id: req.params.id }).first()); } catch (e) { next(e); } });

const upload = multer({
  storage: multer.diskStorage({ destination: config.uploadDir, filename: (req, file, cb) => cb(null, `${Date.now()}-${require('node:crypto').randomUUID()}${path.extname(file.originalname).toLowerCase()}`) }),
  limits: { fileSize: 1024 * 1024, files: 3 },
  fileFilter: (req, file, cb) => cb(null, ['image/jpeg', 'image/png'].includes(file.mimetype))
});
const photoFields = upload.fields([{ name: 'photo_1', maxCount: 1 }, { name: 'photo_2', maxCount: 1 }, { name: 'photo_3', maxCount: 1 }]);
const filesOf = (files, name) => files?.[name]?.[0]?.filename || null;

app.get('/api/complaints', authenticate, async (req, res, next) => { try { res.json(await db('complaints').where({ user_id: req.user.id }).orderBy('created_at', 'desc')); } catch (e) { next(e); } });
app.post('/api/complaints', authenticate, photoFields, async (req, res, next) => {
  try {
    const required = ['user_id_course', 'user_id_enrollment_year', 'reported_user_name', 'reported_user_id_course', 'reported_user_id_enrollment_year', 'category', 'description'];
    if (required.some(field => !req.body[field])) throw Object.assign(new Error('Campos obrigatórios ausentes'), { status: 400 });
    if (!['Pendente', 'Em Análise', 'Resolvido'].includes(req.body.status || 'Pendente')) throw Object.assign(new Error('Status inválido'), { status: 400 });
    if (!/^\d{4}$/.test(String(req.body.user_id_enrollment_year)) || !/^\d{4}$/.test(String(req.body.reported_user_id_enrollment_year))) throw Object.assign(new Error('Ano de ingresso inválido'), { status: 400 });
    if (!await db('courses').where({ id: req.body.user_id_course }).first()) throw Object.assign(new Error('Curso do denunciante não encontrado'), { status: 400 });
    const [id] = await db('complaints').insert({ ...req.body, user_id: req.user.id, is_anonymous: req.body.is_anonymous ? 1 : 0, photo_1: filesOf(req.files, 'photo_1'), photo_2: filesOf(req.files, 'photo_2'), photo_3: filesOf(req.files, 'photo_3') });
    res.status(201).json(await db('complaints').where({ id }).first());
  } catch (e) { next(e); }
});

app.get('/api/admin/complaints', authenticate, adminOnly, async (req, res, next) => {
  try {
    let query = db('complaints').orderBy('created_at', 'desc');
    const onlyResolved = ['true', '1'].includes(String(req.query.only_resolved).toLowerCase());
    query = onlyResolved ? query.where('status', 'Resolvido') : query.whereIn('status', ['Em Análise', 'Resolvido']);
    //if (req.query.category) query = query.where('category', req.query.category);
    res.json(await query);
  } catch (e) { next(e); }
});
app.patch('/api/admin/complaints/:id', authenticate, adminOnly, async (req, res, next) => { try { const update = {}; if (req.body.status) { if (!['Pendente', 'Em Análise', 'Resolvido'].includes(req.body.status)) throw Object.assign(new Error('Status inválido'), { status: 400 }); update.status = req.body.status; } if (req.body.progress_report !== undefined) update.progress_report = req.body.progress_report; update.user_id_analyzer = req.user.id; await db('complaints').where({ id: req.params.id }).update(update); res.json(await db('complaints').where({ id: req.params.id }).first()); } catch (e) { next(e); } });
app.get('/api/admin/dashboard', authenticate, adminOnly, async (req, res, next) => { try { const rows = await db('complaints').select('status').count({ total: 'id' }).groupBy('status'); res.json({ complaints: rows }); } catch (e) { next(e); } });
app.use(errors);

if (require.main === module) app.listen(config.port, () => console.log(`Protecht API listening on port ${config.port}`));
module.exports = app;

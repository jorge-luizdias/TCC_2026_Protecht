process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';

const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../src/server');
const db = require('../src/db');

beforeAll(async () => { await db.migrate.latest(); });
afterAll(async () => { await db.destroy(); });

test('health check', async () => {
  const response = await request(app).get('/health');
  expect(response.statusCode).toBe(200);
  expect(response.body.status).toBe('ok');
});

test('registration requires credentials', async () => {
  const response = await request(app).post('/api/auth/register').send({ email: 'test@example.com' });
  expect(response.statusCode).toBe(400);
});

test('admin complaint listing excludes pending by default and can show only resolved', async () => {
  const password = await bcrypt.hash('Admin12345!', 4);
  const [adminId] = await db('users').insert({ email: 'admin-test@example.com', rm: 'ADMIN001', password, verified_email: 1, access_nivel: 'ADMIN' });
  const [courseId] = await db('courses').insert({ name: 'Curso Teste', code: 'TST' });
  const complaint = { user_id: adminId, user_id_course: courseId, user_id_enrollment_year: '2020', reported_user_name: 'Pessoa citada', reported_user_id_course: 'Curso informado', reported_user_id_enrollment_year: '2021', category: 'Teste', description: 'Descricao de teste' };
  await db('complaints').insert([{ ...complaint, status: 'Pendente' }, { ...complaint, status: 'Em Análise' }, { ...complaint, status: 'Resolvido' }]);
  const login = await request(app).post('/api/auth/login').send({ email: 'admin-test@example.com', password: 'Admin12345!' });
  const defaultList = await request(app).get('/api/admin/complaints').set('Authorization', `Bearer ${login.body.token}`);
  const resolvedList = await request(app).get('/api/admin/complaints?only_resolved=true').set('Authorization', `Bearer ${login.body.token}`);
  expect(defaultList.statusCode).toBe(200);
  expect(defaultList.body).toHaveLength(2);
  expect(defaultList.body.every(item => ['Em Análise', 'Resolvido'].includes(item.status))).toBe(true);
  expect(resolvedList.statusCode).toBe(200);
  expect(resolvedList.body).toHaveLength(1);
  expect(resolvedList.body[0].status).toBe('Resolvido');
});

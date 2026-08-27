const bcrypt = require('bcryptjs');
const config = require('../../config');

exports.seed = async function (knex) {
  const courses = [
    ['Informática', 'INF'], ['Enfermagem', 'ENF'], ['Biológicas', 'BIO'],
    ['Administração', 'ADM'], ['Agropecuária', 'AGR']
  ];
  for (const [name, code] of courses) {
    await knex('courses').insert({ name, code }).onConflict('code').ignore();
  }
  const password = await bcrypt.hash(config.admin.password, 12);
  await knex('users').insert({
    name: 'Administrador', email: config.admin.email.toLowerCase(), rm: config.admin.rm,
    password, verified_email: 1, access_nivel: 'ADMIN'
  }).onConflict('email').merge({ password, verified_email: 1, access_nivel: 'ADMIN' });
};

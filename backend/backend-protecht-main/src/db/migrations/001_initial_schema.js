exports.up = async function (knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.text('name');
    table.text('email').notNullable().unique();
    table.integer('verified_email').notNullable().defaultTo(0);
    table.text('verified_code');
    table.text('verified_code_expires_at');
    table.integer('verification_attempts').notNullable().defaultTo(0);
    table.integer('verification_resends').notNullable().defaultTo(0);
    table.text('rm').notNullable().unique();
    table.text('password').notNullable();
    table.text('photo');
    table.text('access_nivel').notNullable().defaultTo('USER');
    table.text('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.text('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });

  await knex.schema.createTable('courses', table => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.text('code').notNullable().unique();
  });

  await knex.schema.createTable('complaints', table => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('user_id_course').notNullable().references('id').inTable('courses');
    table.integer('user_id_enrollment_year').notNullable();
    table.text('reported_user_name').notNullable();
    table.text('reported_user_id_course').notNullable();
    table.text('reported_user_id_enrollment_year').notNullable();
    table.integer('is_anonymous').notNullable().defaultTo(0);
    table.text('category').notNullable();
    table.text('description').notNullable();
    table.text('status').notNullable().defaultTo('Pendente');
    table.text('incident_date').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.text('photo_1'); table.text('photo_2'); table.text('photo_3');
    table.integer('user_id_analyzer').references('id').inTable('users');
    table.text('progress_report');
    table.text('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.text('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });

  await knex.raw('CREATE INDEX idx_users_email ON users(email)');
  await knex.raw('CREATE INDEX idx_users_nome ON users(name)');
  await knex.raw('CREATE INDEX idx_users_rm ON users(rm)');
  await knex.raw('CREATE INDEX idx_courses_name ON courses(name)');
  await knex.raw('CREATE INDEX idx_courses_code ON courses(code)');
  await knex.raw('CREATE INDEX idx_complaints_description ON complaints(description)');
  await knex.raw('CREATE INDEX idx_complaints_user_id ON complaints(user_id)');
  await knex.raw('CREATE INDEX idx_complaints_category ON complaints(category)');
  await knex.raw('CREATE INDEX idx_complaints_status ON complaints(status)');
  await knex.raw('CREATE INDEX idx_complaints_incident_date ON complaints(incident_date)');
  await knex.raw("CREATE TRIGGER users_updated_at AFTER UPDATE ON users BEGIN UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id; END");
  await knex.raw("CREATE TRIGGER courses_updated_at AFTER UPDATE ON courses BEGIN UPDATE courses SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id; END");
  await knex.raw("CREATE TRIGGER complaints_updated_at AFTER UPDATE ON complaints BEGIN UPDATE complaints SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id; END");
};

exports.down = async function (knex) {
  await knex.raw('DROP TRIGGER IF EXISTS users_updated_at');
  await knex.raw('DROP TRIGGER IF EXISTS courses_updated_at');
  await knex.raw('DROP TRIGGER IF EXISTS complaints_updated_at');
  await knex.schema.dropTableIfExists('complaints');
  await knex.schema.dropTableIfExists('courses');
  await knex.schema.dropTableIfExists('users');
};

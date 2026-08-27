exports.up = async function (knex) {
  const columns = await knex('complaints').columnInfo();
  if (columns.reported_user_name) return;

  await knex.raw('PRAGMA foreign_keys = OFF');
  await knex.raw('DROP TRIGGER IF EXISTS complaints_updated_at');
  await knex.raw(`
    CREATE TABLE complaints_new (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      user_id_course INTEGER NOT NULL REFERENCES courses(id),
      user_id_enrollment_year TEXT NOT NULL,
      reported_user_name TEXT NOT NULL,
      reported_user_id_course TEXT NOT NULL,
      reported_user_id_enrollment_year TEXT NOT NULL,
      is_anonymous INTEGER NOT NULL DEFAULT 0,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pendente',
      incident_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      photo_1 TEXT,
      photo_2 TEXT,
      photo_3 TEXT,
      user_id_analyzer INTEGER REFERENCES users(id),
      progress_report TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await knex.raw(`
    INSERT INTO complaints_new (
      id, user_id, user_id_course, user_id_enrollment_year,
      reported_user_name, reported_user_id_course, reported_user_id_enrollment_year,
      is_anonymous, category, description, status, incident_date,
      photo_1, photo_2, photo_3, user_id_analyzer, progress_report, created_at, updated_at
    )
    SELECT
      complaints.id, complaints.user_id, complaints.user_id_course, CAST(complaints.user_id_enrollment_year AS TEXT),
      COALESCE(users.name, CAST(complaints.reported_user_id AS TEXT)),
      COALESCE(courses.name, CAST(complaints.reported_user_id_course AS TEXT)),
      CAST(complaints.reported_user_id_enrollment_year AS TEXT),
      complaints.is_anonymous, complaints.category, complaints.description, complaints.status, complaints.incident_date,
      complaints.photo_1, complaints.photo_2, complaints.photo_3, complaints.user_id_analyzer, complaints.progress_report,
      complaints.created_at, complaints.updated_at
    FROM complaints
    LEFT JOIN users ON users.id = complaints.reported_user_id
    LEFT JOIN courses ON courses.id = complaints.reported_user_id_course
  `);
  await knex.schema.dropTable('complaints');
  await knex.schema.renameTable('complaints_new', 'complaints');
  await knex.raw('CREATE INDEX idx_complaints_description ON complaints(description)');
  await knex.raw('CREATE INDEX idx_complaints_user_id ON complaints(user_id)');
  await knex.raw('CREATE INDEX idx_complaints_category ON complaints(category)');
  await knex.raw('CREATE INDEX idx_complaints_status ON complaints(status)');
  await knex.raw('CREATE INDEX idx_complaints_incident_date ON complaints(incident_date)');
  await knex.raw("CREATE TRIGGER complaints_updated_at AFTER UPDATE ON complaints BEGIN UPDATE complaints SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id; END");
  await knex.raw('PRAGMA foreign_keys = ON');
};

exports.down = async function () {
  throw new Error('Migration irreversible: dados de denunciado foram convertidos para texto');
};

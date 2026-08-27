const path = require('node:path');
require('dotenv').config();

const root = process.cwd();
const required = ['JWT_SECRET'];
for (const name of required) {
  if (!process.env[name]) throw new Error(`${name} is required`);
}

module.exports = {
  port: Number(process.env.PORT || 3000),
  databaseFile: path.resolve(root, process.env.DATABASE_FILE || './data/database.sqlite'),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  uploadDir: path.resolve(root, process.env.UPLOAD_DIR || './storage/uploads'),
  verificationMinutes: Number(process.env.VERIFICATION_EXPIRES_MINUTES || 10),
  maxAttempts: Number(process.env.VERIFICATION_MAX_ATTEMPTS || 5),
  maxResends: Number(process.env.VERIFICATION_MAX_RESENDS || 3),
  corsOrigins: (process.env.CORS_ORIGINS || '*').split(',').map(value => value.trim()),
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@admin.com',
    password: process.env.ADMIN_PASSWORD || 'change-admin-password',
    rm: process.env.ADMIN_RM || '000000'
  }
};

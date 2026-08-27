# Protecht Backend

API REST em JavaScript, Express, SQLite embutido e Knex para o sistema de denuncias.

## Requisitos

- Node.js 24+
- npm
- SMTP configurado para envio real de e-mails

## Instalação

```bash
npm install
Copy-Item .env.example .env
npm run migrate:latest
npm run seed:run
npm test
npm run dev
```

A API fica em `http://localhost:3000`. O endpoint `GET /health` verifica o status.

## Fluxo mobile

1. `POST /api/auth/register` com `email`, `rm`, `password`, opcionalmente `name`.
2. O backend envia um código de quatro dígitos.
3. `POST /api/auth/verify` com `email` e `code`.
4. `POST /api/auth/login` retorna o JWT.
5. Envie `Authorization: Bearer <token>` nas rotas protegidas.

Durante desenvolvimento sem SMTP, o código é registrado no console do servidor.

## Rotas principais

- `GET /health`
- `POST /api/auth/register`, `/verify`, `/resend`, `/login`
- `GET /api/courses`
- `GET /api/complaints`, `POST /api/complaints`
- Admin: `GET /api/admin/complaints` retorna `Em Análise` e `Resolvido`; use `?only_resolved=true` para retornar somente resolvidas. Também aceita o filtro `category`.
- Admin: `PATCH /api/admin/complaints/:id`, `GET /api/admin/dashboard`
- Admin: CRUD básico em `/api/admin/users` e `/api/admin/courses`

As migrations criam as tabelas, constraints, índices e triggers de `updated_at` definidos pelo DBML. O denunciado é informado como texto (`reported_user_name`, curso e ano), pois pode não possuir cadastro no sistema; somente o denunciante e seu curso possuem referências internas.

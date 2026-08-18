Testando o Painel Web - Protecht
================================

## Estado Atual

O frontend está **100% funcional** mas aguardando os endpoints do backend.
Atualmente, o código está estruturado para:

1. Chamar os endpoints reais quando o backend estiver pronto
2. Mostrar erros claros se a API não responder

## Rodando o Projeto

```bash
cd Web
npm run dev
```

Acesse: http://localhost:5173

## O que Funciona Agora

✅ **Tela de Login**
- Campo de email e senha
- Validação básica (campos obrigatórios)
- Mensagens de erro amigáveis
- Redirecionamento para dashboard após login (quando backend responder)

✅ **Proteção de Rotas**
- Se tentar acessar /dashboard sem autenticação → redireciona para /login
- Se logout → volta para /login

✅ **Layout do Dashboard**
- Header com nome do usuário
- Botão de logout
- Tabela de denúncias (estrutura pronta)
- Filtro por status
- Detalhes expandível

✅ **UI/UX**
- Design responsivo
- Cores consistentes
- Badges de status coloridas
- Animações suaves

## Quando o Backend Estiver Pronto

**Nenhuma mudança no frontend é necessária!** Basta:

1. Adicione os 3 endpoints no backend:
   - `POST /auth/login`
   - `GET /complaints`
   - `PATCH /complaints/:id`

2. A aplicação vai funcionar automaticamente.

## Estrutura de Dados Esperada

### POST /auth/login
```javascript
// Requisição
{
  email: "prof@escola.com",
  senha: "senha123"
}

// Resposta (sucesso)
{
  token: "eyJhbGc...",
  usuario: {
    id: 1,
    nome: "Professor João",
    role: "PROFESSOR" // ou COORDENADOR, ADMIN
  }
}

// Se role === "ALUNO" → será rejeitado com mensagem
// "Use o aplicativo mobile para acessar como aluno"
```

### GET /complaints
```javascript
// Requisição (com filtro opcional)
GET /complaints?status=PENDENTE

// Resposta
{
  denuncias: [
    {
      id: 1,
      reporter_id: 10,
      reported_user_id: 20,
      descricao: "Texto completo da denúncia...",
      data_incidente: "2026-08-15",
      status: "PENDENTE",
      created_at: "2026-08-18T10:30:00Z",
      updated_at: "2026-08-18T10:30:00Z"
    }
  ]
}
```

### PATCH /complaints/:id
```javascript
// Requisição
{
  status: "EM_ANALISE"
}

// Resposta
{
  denuncia: {
    id: 1,
    reporter_id: 10,
    reported_user_id: 20,
    descricao: "...",
    data_incidente: "2026-08-15",
    status: "EM_ANALISE",
    created_at: "2026-08-18T10:30:00Z",
    updated_at: "2026-08-18T11:00:00Z"
  }
}
```

## Arquivos Importantes

- [Web/src/services/api.js](../src/services/api.js) - Cliente da API (altere aqui se precisar)
- [Web/src/context/AuthContext.jsx](../src/context/AuthContext.jsx) - Lógica de autenticação
- [Web/INTEGRACAO_BACKEND.md](./INTEGRACAO_BACKEND.md) - Documentação completa da integração

## Troubleshooting

**Erro: "Erro ao carregar denúncias"**
- Backend não está rodando
- Verifique se `VITE_API_URL` no arquivo `.env` está correto
- Abra o DevTools (F12) → Network para ver a requisição

**Erro: "Use o aplicativo mobile para acessar como aluno"**
- Testando login com um usuário que tem role = "ALUNO"
- Teste com role = "PROFESSOR", "COORDENADOR" ou "ADMIN"

**Token não funciona**
- Backend precisa validar o header `Authorization: Bearer <token>`
- Verifique se o middleware JWT está configurado

## Próximos Passos

1. Implementar endpoints no backend (/backend/src/sever.js)
2. Testar login real
3. Testar carregamento de denúncias
4. Ajustar se necessário

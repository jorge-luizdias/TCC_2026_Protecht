# Prompt de telas - Protecht

Crie as interfaces do sistema Protecht, um sistema de denuncias para instituicoes de ensino. O produto possui dois clientes: aplicativo mobile para usuarios/denunciantes e painel web para administradores. A interface deve ser clara, acessivel, responsiva e orientada a privacidade.

## Regras de dominio

- Usuario comum possui nome opcional, e-mail, RM, senha, foto e curso.
- E-mail deve ser confirmado antes do primeiro acesso.
- O backend envia um codigo de quatro digitos por e-mail.
- O codigo deve ser digitado no aplicativo e possui expiracao.
- O usuario autenticado acessa somente seus proprios dados e denuncias.
- Administrador possui acesso ao painel completo.
- Uma denuncia pode ser anonima. O usuario denunciante continua podendo acompanhar sua propria denuncia.
- O denunciado pode nao possuir cadastro no sistema. Por isso, seu nome, curso e ano de ingresso sao informados como texto livre.
- Status validos: `Pendente`, `Em Analise` e `Resolvido`.
- Uma denuncia pode conter ate tres imagens JPEG ou PNG, com limite de 1 MB por arquivo.
- Categorias de denuncia sao selecionadas no aplicativo e devem ser apresentadas como opcoes controladas, nao como texto livre quando houver catalogo configurado.

## Aplicativo mobile - User

### 1. Tela de abertura

Conteudo:

- Logo Protecht.
- Nome do sistema.
- Indicador de carregamento enquanto verifica a sessao.

Comportamento:

- Se houver JWT valido, abrir a tela inicial.
- Se nao houver sessao, exibir opcoes `Entrar` e `Criar conta`.

### 2. Login

Campos:

- E-mail.
- Senha com opcao mostrar/ocultar.

Acoes:

- Botao `Entrar`.
- Link `Criar conta`.
- Link `Reenviar verificacao`.

Estados:

- Campos obrigatorios.
- Credenciais invalidas.
- E-mail ainda nao verificado.
- Servidor indisponivel.
- Carregamento durante o envio.

### 3. Cadastro

Campos:

- Nome completo, opcional.
- E-mail.
- RM, obrigatorio.
- Senha.
- Confirmacao da senha.

Acoes:

- Botao `Criar conta`.
- Link para voltar ao login.

Validacoes:

- E-mail valido.
- RM preenchido.
- Senha com no minimo oito caracteres.
- Senhas iguais.
- E-mail ou RM ja cadastrado.

Ao concluir, encaminhar o usuario para a verificacao de e-mail.

### 4. Verificacao de e-mail

Conteudo:

- Mensagem informando que o codigo foi enviado.
- E-mail parcialmente mascarado.
- Quatro campos numericos ou um campo de quatro digitos.
- Contagem regressiva para expiracao.

Acoes:

- Botao `Confirmar codigo`.
- Botao/link `Reenviar codigo`, respeitando o limite do backend.
- Opcao voltar para corrigir o e-mail.

Estados:

- Codigo valido: liberar acesso e encaminhar para a tela inicial.
- Codigo invalido.
- Codigo expirado.
- Limite de tentativas excedido.
- Reenvio bloqueado temporariamente.

### 5. Inicio do usuario

Conteudo:

- Saudacao com o nome, quando informado.
- Atalho principal `Fazer denuncia`.
- Resumo das denuncias do usuario por status.
- Lista curta das denuncias recentes.
- Navegacao inferior: `Inicio`, `Minhas denuncias`, `Nova denuncia`, `Perfil`.

Cada item de denuncia deve mostrar:

- Numero ou identificador.
- Categoria.
- Data do incidente.
- Status.
- Data da ultima atualizacao.

### 6. Nova denuncia

Organizar o formulario em etapas ou secoes:

#### Identificacao do denunciante

- Curso do denunciante, selecionado a partir de `courses`.
- Ano de ingresso do denunciante, com quatro digitos.

O usuario nao deve escolher nem consultar uma lista de possiveis denunciados cadastrados.

#### Dados do denunciado

- Nome do denunciado, texto livre.
- Curso informado do denunciado, texto livre.
- Ano de ingresso informado do denunciado, texto com quatro digitos.
- Aviso discreto: o denunciado pode nao possuir cadastro no sistema.

#### Ocorrencia

- Categoria.
- Descricao detalhada.
- Data e hora do ocorrido.
- Opcao `Enviar anonimamente`.
- Ate tres anexos de imagem.

Acoes:

- Selecionar/tirar foto.
- Remover foto antes do envio.
- Revisar denuncia.
- Enviar denuncia.

Validacoes:

- Campos obrigatorios.
- Ano com quatro digitos.
- Imagens somente JPEG/PNG.
- Limite de 1 MB por imagem.
- Confirmacao antes do envio definitivo.

### 7. Confirmacao de envio

Exibir:

- Mensagem de sucesso.
- Numero da denuncia.
- Status inicial `Pendente`.
- Indicacao de que a equipe responsavel analisara o caso.

Acoes:

- `Acompanhar denuncia`.
- `Voltar para inicio`.

### 8. Minhas denuncias

Conteudo:

- Lista paginada ou carregamento incremental.
- Filtros por status e categoria.
- Estado vazio quando nao houver denuncias.
- Estado de erro e opcao tentar novamente.

O usuario deve visualizar somente denuncias criadas por ele.

### 9. Detalhe da denuncia

Exibir:

- Status atual em destaque.
- Categoria.
- Data do incidente.
- Descricao.
- Imagens anexadas.
- Dados informados do denunciado.
- Indicador de anonimato.
- Historico ou ultima atualizacao administrativa.
- Relatorio de progresso/resposta do admin, quando existir.

Privacidade:

- Nunca exibir dados de outros denunciantes.
- Nao revelar dados internos do analista.
- O anonimato deve ocultar a identidade na apresentacao publica da denuncia, sem impedir o acompanhamento pelo proprio denunciante.

### 10. Perfil

Exibir e permitir editar quando suportado pela API:

- Nome.
- E-mail, preferencialmente somente leitura.
- RM, preferencialmente somente leitura.
- Foto.
- Situacao do e-mail verificado.

Acoes:

- Salvar alteracoes.
- Sair da conta.

## Painel web - Admin

Usar layout de painel com menu lateral, cabecalho, conteudo principal e estados de carregamento. O acesso deve exigir JWT de administrador.

### 1. Login administrativo

Campos:

- E-mail.
- Senha.

Estados:

- Credenciais invalidas.
- Usuario sem permissao administrativa.
- Servidor indisponivel.

### 2. Dashboard

Exibir resumos vindos de `GET /api/admin/dashboard`:

- Total de denuncias por status.
- Quantidade `Pendente`, `Em Analise` e `Resolvido`.
- Indicadores de denuncias recentes.
- Atalhos para a fila de analise e resolvidas.

Nao inventar metricas que a API nao fornece; quando necessario, indicar que o dado depende de endpoint futuro.

### 3. Fila de denuncias em analise

Fonte: `GET /api/admin/complaints`.

Comportamento esperado:

- Mostrar denuncias `Em Analise` e `Resolvido`, conforme o contrato definido para a fila administrativa.
- Nao mostrar `Pendente` nessa fila.
- Permitir filtrar por categoria.
- Exibir tabela ou lista com colunas:
  - ID.
  - Categoria.
  - Data do incidente.
  - Nome informado do denunciado.
  - Curso informado.
  - Status.
  - Ultima atualizacao.

Acoes:

- Abrir detalhes.
- Alterar status.
- Registrar relatorio de progresso.

Observacao de integracao: o backend deve corrigir a implementacao atual da rota, que esta usando `whereNot('Resolvido')`.

### 4. Denuncias resolvidas

Fonte: `GET /api/admin/complaints?only_resolved=true`.

Exibir somente denuncias com status `Resolvido`.

Recursos:

- Busca por ID, categoria ou texto quando o endpoint suportar.
- Filtro por categoria.
- Ordenacao por data e atualizacao.
- Acesso ao detalhe completo.

### 5. Detalhe e analise da denuncia

Exibir:

- Todos os campos da denuncia.
- Identidade e dados do denunciante para o admin, inclusive quando `is_anonymous=1`, conforme regra administrativa definida.
- Dados textuais do denunciado.
- Imagens com visualizacao ampliada.
- Status atual.
- Relatorio de progresso.
- Analista responsavel.
- Datas de criacao e atualizacao.

Acoes:

- Alterar para `Pendente`, `Em Analise` ou `Resolvido`.
- Adicionar ou editar relatorio de progresso.
- Salvar alteracoes.

Antes de alterar para `Resolvido`, solicitar confirmacao. Mostrar feedback de sucesso ou erro.

### 6. Gestao de usuarios

Fonte: `GET /api/admin/users` e `PATCH /api/admin/users/:id`.

Tabela:

- Nome.
- E-mail.
- RM.
- E-mail verificado.
- Nivel de acesso.

Filtros:

- Nome.
- E-mail.
- RM.
- Nivel de acesso.
- Situacao de verificacao.

Acoes:

- Editar nome.
- Alterar nivel `USER`/`ADMIN` com confirmacao.
- Atualizar situacao de verificacao somente para administradores autorizados.

Nunca exibir a senha ou qualquer hash.

### 7. Gestao de cursos

Fonte: `GET /api/courses`, `POST /api/admin/courses` e `PATCH /api/admin/courses/:id`.

Tabela:

- Nome do curso.
- Codigo.
- Acoes de editar.

Formulario:

- Nome obrigatorio.
- Codigo obrigatorio e unico.

Estados:

- Codigo duplicado.
- Curso nao encontrado.
- Confirmacao antes de salvar alteracoes.

### 8. Menu, sessao e permissoes

Menu administrativo:

- Dashboard.
- Denuncias em analise.
- Resolvidas.
- Usuarios.
- Cursos.
- Sair.

Regras:

- Usuario comum nao pode abrir rotas administrativas.
- Token expirado deve redirecionar para login.
- Exibir mensagens de erro sem expor detalhes internos do banco.
- Confirmar acoes destrutivas ou alteracoes de permissao.

## Contrato de integracao

Mobile:

- `POST /api/auth/register`
- `POST /api/auth/verify`
- `POST /api/auth/resend`
- `POST /api/auth/login`
- `GET /api/courses`
- `GET /api/me`
- `GET /api/complaints`
- `POST /api/complaints` com multipart/form-data

Admin:

- `POST /api/auth/login`
- `GET /api/admin/dashboard`
- `GET /api/admin/complaints`
- `GET /api/admin/complaints?only_resolved=true`
- `PATCH /api/admin/complaints/:id`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id`
- `POST /api/admin/courses`
- `PATCH /api/admin/courses/:id`

Use `Authorization: Bearer <token>` em todas as rotas protegidas.

## Entrega visual esperada

- Criar telas funcionais, nao uma landing page.
- Usar componentes responsivos para mobile e desktop.
- Priorizar leitura, acessibilidade, contraste e estados de erro/sucesso.
- Nao exibir informacoes de denunciados a partir de uma lista de usuarios cadastrados no fluxo do denunciante.
- Usar dados reais dos endpoints quando disponiveis e estados vazios para colecoes sem registros.
- Manter a identidade Protecht discreta, institucional e confiavel, sem expor dados sensiveis desnecessariamente.

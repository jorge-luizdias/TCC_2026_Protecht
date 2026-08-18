// Cliente fetch para chamadas à API
// Configuração: VITE_API_URL (padrão: http://localhost:3000)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Função auxiliar para requisições
async function fazerRequisicao(caminho, opcoes = {}) {
  const url = `${API_URL}${caminho}`;
  const headers = {
    'Content-Type': 'application/json',
    ...opcoes.headers,
  };

  // Adiciona token JWT se estiver autenticado
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const resposta = await fetch(url, {
    ...opcoes,
    headers,
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.message || `Erro ${resposta.status}`);
  }

  return resposta.json();
}

// Função de login
export async function login(email, senha) {
  try {
    const dados = await fazerRequisicao('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });

    // Retorna token e dados do usuário
    return {
      token: dados.token,
      usuario: {
        id: dados.usuario.id,
        nome: dados.usuario.nome,
        role: dados.usuario.role,
      },
    };
  } catch (erro) {
    throw erro;
  }
}

// Função para listar denúncias
export async function listarDenuncias(filtros = {}) {
  try {
    // Constrói query string com filtros
    const params = new URLSearchParams();
    if (filtros.status) params.append('status', filtros.status);
    if (filtros.pagina) params.append('pagina', filtros.pagina);

    const queryString = params.toString();
    const caminho = queryString ? `/complaints?${queryString}` : '/complaints';

    const dados = await fazerRequisicao(caminho);
    return dados.denuncias || [];
  } catch (erro) {
    throw erro;
  }
}

// Função para atualizar status de denúncia
export async function atualizarStatusDenuncia(id, novoStatus) {
  try {
    const dados = await fazerRequisicao(`/complaints/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: novoStatus }),
    });

    return dados.denuncia;
  } catch (erro) {
    throw erro;
  }
}

export default {
  login,
  listarDenuncias,
  atualizarStatusDenuncia,
};

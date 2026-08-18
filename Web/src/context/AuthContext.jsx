import { createContext, useState, useContext, useEffect } from 'react';
import * as apiService from '../services/api';

// Cria o contexto
const AuthContext = createContext();

// Provider do contexto
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Verifica se tem usuário salvo no localStorage ao carregar
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
    setCarregando(false);
  }, []);

  // Função de login
  async function fazerLogin(email, senha) {
    setCarregando(true);
    setErro(null);
    try {
      const { token, usuario: dadosUsuario } = await apiService.login(email, senha);

      // Rejeita se o role for ALUNO
      if (dadosUsuario.role === 'ALUNO') {
        throw new Error('Use o aplicativo mobile para acessar como aluno');
      }

      // Valida se é um role permitido (PROFESSOR, COORDENADOR, ADMIN)
      const rolesPermitidos = ['PROFESSOR', 'COORDENADOR', 'ADMIN'];
      if (!rolesPermitidos.includes(dadosUsuario.role)) {
        throw new Error('Role não permitido neste painel');
      }

      // Salva token e usuário no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(dadosUsuario));

      setUsuario(dadosUsuario);
      return true;
    } catch (err) {
      setErro(err.message);
      return false;
    } finally {
      setCarregando(false);
    }
  }

  // Função de logout
  function fazerLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  // Retorna valores do contexto
  const valor = {
    usuario,
    autenticado: !!usuario,
    carregando,
    erro,
    login: fazerLogin,
    logout: fazerLogout,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

// Hook para usar o contexto
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return contexto;
}

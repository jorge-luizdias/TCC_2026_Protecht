import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erroLocal, setErroLocal] = useState('');

  const { login, carregando: carregandoAuth, erro: erroAuth } = useAuth();
  const navegar = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErroLocal('');

    if (!email || !senha) {
      setErroLocal('Email e senha são obrigatórios');
      return;
    }

    setCarregando(true);
    const sucesso = await login(email, senha);
    setCarregando(false);

    if (sucesso) {
      navegar('/dashboard');
    } else {
      setErroLocal(erroAuth || 'Erro ao fazer login');
    }
  }

  return (
    <div className="paginaLogin">
      <div className="containerLogin">
        <div className="cardLogin">
          <h1>Protecht</h1>
          <p className="subtitulo">Painel de Professores</p>

          <form onSubmit={handleLogin} className="formularioLogin">
            <div className="grupoInput">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={carregando || carregandoAuth}
              />
            </div>

            <div className="grupoInput">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={carregando || carregandoAuth}
              />
            </div>

            {(erroLocal || erroAuth) && (
              <div className="mensagemErro">
                {erroLocal || erroAuth}
              </div>
            )}

            <button
              type="submit"
              className="botaoLogin"
              disabled={carregando || carregandoAuth}
            >
              {carregando || carregandoAuth ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="rodape">
            © 2026 Protecht - Sistema de Denúncias de Bullying
          </p>
        </div>
      </div>
    </div>
  );
}

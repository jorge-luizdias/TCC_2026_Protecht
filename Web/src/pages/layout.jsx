import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { to: '/dashboard', label: 'Início', icon: '⌂', end: true },
  { to: '/perfil', label: 'Perfil', icon: '◉' },
  { to: '/denuncias/nova', label: 'Fazer denúncia', icon: '!' },
  { to: '/denuncias', label: 'Minhas denúncias', icon: '▣' },
  { to: '/como-denunciar', label: 'Como denunciar', icon: '?' },
  { to: '/configuracoes', label: 'Configurações', icon: '⚙' },
  { to: '/suporte', label: 'Suporte', icon: '◌' },
];

const titles = {
  '/dashboard': 'Início',
  '/perfil': 'Perfil',
  '/denuncias/nova': 'Fazer denúncia',
  '/denuncias': 'Minhas denúncias',
  '/como-denunciar': 'Como denunciar',
  '/configuracoes': 'Configurações',
  '/suporte': 'Suporte',
};

const estilosLayout = `
  .layoutAplicacao { min-height: 100vh; display: flex; background: #f4f6fa; color: #1f2937; }
  .drawerAplicacao { width: 264px; min-height: 100vh; display: flex; flex-direction: column; flex-shrink: 0; background: #fff; border-right: 1px solid #e5e9f0; z-index: 30; }
  .cabecalhoDrawer { min-height: 92px; display: flex; align-items: center; justify-content: space-between; padding: 24px 24px 20px; background: #1a5fb4; }
  .logoProtecht { display: flex; align-items: center; gap: 9px; color: #fff; font-size: 20px; font-weight: 800; letter-spacing: 0; }
  .logoMark { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 8px 8px 12px 12px; background: #7b3fe4; color: #fff; font-size: 17px; font-weight: 900; }
  .botaoFecharMenu, .botaoMenu { border: 0; background: transparent; color: inherit; cursor: pointer; font-size: 26px; line-height: 1; }
  .botaoFecharMenu { display: none; color: #fff; }
  .menuNavegacao { display: flex; flex: 1; flex-direction: column; gap: 4px; padding: 24px 12px; }
  .itemMenu, .botaoSair { display: flex; align-items: center; gap: 14px; min-height: 48px; padding: 0 14px; border: 0; border-radius: 8px; background: transparent; color: #64748b; font: inherit; font-size: 14px; font-weight: 600; text-align: left; text-decoration: none; cursor: pointer; }
  .itemMenu:hover, .botaoSair:hover { background: #f0f5ff; color: #1a5fb4; }
  .itemMenuAtivo { background: #eaf2ff; color: #1a5fb4; }
  .iconeMenu { width: 24px; color: currentColor; font-size: 19px; font-weight: 800; text-align: center; }
  .rodapeDrawer { padding: 12px; border-top: 1px solid #e8edf3; }
  .rodapeDrawer small { display: block; padding: 12px 14px 0; color: #94a3b8; font-size: 11px; }
  .botaoSair { width: 100%; }
  .areaPrincipal { min-width: 0; flex: 1; }
  .cabecalhoAplicacao { min-height: 92px; display: flex; align-items: center; gap: 18px; padding: 18px 32px; background: #fff; border-bottom: 1px solid #e5e9f0; }
  .botaoMenu { display: none; color: #1a5fb4; }
  .cabecalhoAplicacao h1 { margin: 2px 0 0; color: #172033; font-size: 22px; font-weight: 800; }
  .trilhaAplicacao { margin: 0; color: #8a96a8; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  .resumoUsuario { display: flex; align-items: center; gap: 10px; margin-left: auto; color: #475569; font-size: 13px; font-weight: 700; }
  .avatarUsuario { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; background: #e9ddff; color: #6b2ec4; }
  .conteudoAplicacao { min-height: calc(100vh - 92px); padding: 30px 32px; }
  .overlayDrawer { display: none; }
  @media (max-width: 760px) {
    .drawerAplicacao { position: fixed; top: 0; bottom: 0; left: 0; width: min(82vw, 300px); transform: translateX(-100%); transition: transform 220ms ease; box-shadow: 8px 0 24px rgba(15, 23, 42, 0.16); }
    .drawerAplicacao.drawerAberto { transform: translateX(0); }
    .botaoFecharMenu, .botaoMenu, .overlayDrawer { display: block; }
    .overlayDrawer { position: fixed; inset: 0; width: 100%; border: 0; background: rgba(15, 23, 42, 0.42); cursor: pointer; z-index: 20; }
    .cabecalhoAplicacao { padding: 16px 18px; }
    .nomeUsuario { display: none; }
    .conteudoAplicacao { padding: 22px 16px; }
  }
`;

function Logo() {
  return (
    <div className="logoProtecht" aria-label="Protecht">
      <span className="logoMark">P</span>
      <span>Protecht</span>
    </div>
  );
}

function Menu({ onNavigate }) {
  return (
    <nav className="menuNavegacao" aria-label="Navegação principal">
      {menuItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) => `itemMenu${isActive ? ' itemMenuAtivo' : ''}`}
        >
          <span className="iconeMenu" aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default function Layout() {
  const [drawerAberto, setDrawerAberto] = useState(false);
  const { usuario, logout } = useAuth();
  const location = useLocation();
  const navegar = useNavigate();
  const titulo = titles[location.pathname] || 'Protecht';

  useEffect(() => {
    document.body.style.overflow = drawerAberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerAberto]);

  function handleLogout() {
    logout();
    navegar('/login');
  }

  return (
    <div className="layoutAplicacao">
      <style>{estilosLayout}</style>
      <aside className={`drawerAplicacao${drawerAberto ? ' drawerAberto' : ''}`}>
        <div className="cabecalhoDrawer">
          <Logo />
          <button className="botaoFecharMenu" onClick={() => setDrawerAberto(false)} aria-label="Fechar menu">
            ×
          </button>
        </div>
        <Menu onNavigate={() => setDrawerAberto(false)} />
        <div className="rodapeDrawer">
          <button className="botaoSair" onClick={handleLogout}>
            <span className="iconeMenu" aria-hidden="true">↪</span>
            <span>Sair</span>
          </button>
          <small>Painel Protecht</small>
        </div>
      </aside>

      {drawerAberto && (
        <button
          className="overlayDrawer"
          onClick={() => setDrawerAberto(false)}
          aria-label="Fechar menu"
        />
      )}

      <div className="areaPrincipal">
        <header className="cabecalhoAplicacao">
          <button
            className="botaoMenu"
            onClick={() => setDrawerAberto(true)}
            aria-label="Abrir menu"
          >
            ☰
          </button>
          <div>
            <p className="trilhaAplicacao">Painel Protecht</p>
            <h1>{titulo}</h1>
          </div>
          <div className="resumoUsuario">
            <span className="avatarUsuario">{usuario?.nome?.charAt(0)?.toUpperCase() || 'U'}</span>
            <span className="nomeUsuario">{usuario?.nome || 'Usuário'}</span>
          </div>
        </header>
        <main className="conteudoAplicacao">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

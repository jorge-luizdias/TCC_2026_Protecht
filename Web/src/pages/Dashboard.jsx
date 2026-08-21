import { useState, useEffect } from 'react';
import * as apiService from '../services/api';
import TabelaDenuncias from '../components/TabelaDenuncias';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [denuncias, setDenuncias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  // Carrega denúncias ao montar ou ao mudar filtro
  useEffect(() => {
    carregarDenuncias();
  }, [filtroStatus]);

  async function carregarDenuncias() {
    setCarregando(true);
    setErro('');
    try {
      const filtros = filtroStatus ? { status: filtroStatus } : {};
      const dados = await apiService.listarDenuncias(filtros);
      setDenuncias(dados);
    } catch (err) {
      setErro(err.message || 'Erro ao carregar denúncias');
    } finally {
      setCarregando(false);
    }
  }

  async function handleMudarStatus(idDenuncia, novoStatus) {
    try {
      await apiService.atualizarStatusDenuncia(idDenuncia, novoStatus);
      // Recarrega a lista
      await carregarDenuncias();
    } catch (err) {
      setErro(err.message || 'Erro ao atualizar status');
    }
  }

  return (
    <div className="paginaDashboard">
      <main className="mainDashboard">
        <div className="containerDashboard">
          <section className="secaoFiltros">
            <h2>Denúncias</h2>
            <div className="filtros">
              <label htmlFor="statusFiltro">Filtrar por status:</label>
              <select
                id="statusFiltro"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="PENDENTE">Pendente</option>
                <option value="EM_ANALISE">Em Análise</option>
                <option value="RESOLVIDO">Resolvido</option>
                <option value="REJEITADO">Rejeitado</option>
              </select>
            </div>
          </section>

          {erro && <div className="mensagemErro">{erro}</div>}

          {carregando ? (
            <div className="carregando">Carregando denúncias...</div>
          ) : denuncias.length === 0 ? (
            <div className="semDados">Nenhuma denúncia encontrada</div>
          ) : (
            <TabelaDenuncias
              denuncias={denuncias}
              onMudarStatus={handleMudarStatus}
            />
          )}
        </div>
      </main>
    </div>
  );
}

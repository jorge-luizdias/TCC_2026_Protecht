import { useState } from 'react';
import BadgeStatus from './BadgeStatus';
import '../styles/TabelaDenuncias.css';

export default function TabelaDenuncias({ denuncias, onMudarStatus }) {
  const [expandida, setExpandida] = useState(null);

  function toggleExpandir(id) {
    setExpandida(expandida === id ? null : id);
  }

  function handleMudarStatus(id, novoStatus) {
    onMudarStatus(id, novoStatus);
  }

  return (
    <div className="tabelaDenuncias">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data do Incidente</th>
            <th>Status</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {denuncias.map((denuncia) => (
            <tr key={denuncia.id} className={expandida === denuncia.id ? 'expandida' : ''}>
              <td>#{denuncia.id}</td>
              <td>{new Date(denuncia.data_incidente).toLocaleDateString('pt-BR')}</td>
              <td>
                <BadgeStatus status={denuncia.status} />
              </td>
              <td className="descricao">
                {denuncia.descricao.substring(0, 50)}...
              </td>
              <td className="acoes">
                <button
                  className="botaoExpandir"
                  onClick={() => toggleExpandir(denuncia.id)}
                >
                  {expandida === denuncia.id ? '−' : '+'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Linha expandida com detalhes */}
      {expandida && (
        <div className="detalhesExpandidos">
          {denuncias.map((denuncia) =>
            expandida === denuncia.id ? (
              <div key={denuncia.id} className="cardDetalhes">
                <h3>Detalhes da Denúncia #{denuncia.id}</h3>
                <p><strong>Descrição:</strong> {denuncia.descricao}</p>
                <p><strong>Denunciante:</strong> ID {denuncia.reporter_id}</p>
                <p><strong>Usuário Denunciado:</strong> ID {denuncia.reported_user_id}</p>
                <p><strong>Data do Incidente:</strong> {new Date(denuncia.data_incidente).toLocaleDateString('pt-BR')}</p>
                <p><strong>Status Atual:</strong> <BadgeStatus status={denuncia.status} /></p>

                <div className="acoesMudarStatus">
                  <label>Mudar status:</label>
                  <div className="botoesStatus">
                    <button
                      onClick={() => handleMudarStatus(denuncia.id, 'PENDENTE')}
                      className={denuncia.status === 'PENDENTE' ? 'ativo' : ''}
                    >
                      Pendente
                    </button>
                    <button
                      onClick={() => handleMudarStatus(denuncia.id, 'EM_ANALISE')}
                      className={denuncia.status === 'EM_ANALISE' ? 'ativo' : ''}
                    >
                      Em Análise
                    </button>
                    <button
                      onClick={() => handleMudarStatus(denuncia.id, 'RESOLVIDO')}
                      className={denuncia.status === 'RESOLVIDO' ? 'ativo' : ''}
                    >
                      Resolvido
                    </button>
                    <button
                      onClick={() => handleMudarStatus(denuncia.id, 'REJEITADO')}
                      className={denuncia.status === 'REJEITADO' ? 'ativo' : ''}
                    >
                      Rejeitado
                    </button>
                  </div>
                </div>

                <button
                  className="botaoFechar"
                  onClick={() => setExpandida(null)}
                >
                  Fechar
                </button>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

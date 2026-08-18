import '../styles/BadgeStatus.css';

export default function BadgeStatus({ status }) {
  const statusMap = {
    PENDENTE: { label: 'Pendente', classe: 'pendente' },
    EM_ANALISE: { label: 'Em Análise', classe: 'em-analise' },
    RESOLVIDO: { label: 'Resolvido', classe: 'resolvido' },
    REJEITADO: { label: 'Rejeitado', classe: 'rejeitado' },
  };

  const info = statusMap[status] || { label: status, classe: 'desconhecido' };

  return <span className={`badge badge-${info.classe}`}>{info.label}</span>;
}

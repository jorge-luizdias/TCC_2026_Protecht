import React, { createContext, useContext, useEffect, useState } from 'react';
import { createComplaint, listComplaints } from '../services/api';

const DenunciasContext = createContext(null);

const normalizeComplaint = (complaint) => ({
  ...complaint,
  numero: complaint.numero || complaint.id,
  dataEnvio: complaint.dataEnvio || new Date(complaint.created_at).toLocaleDateString('pt-BR'),
  denunciado: complaint.denunciado || complaint.reported_user_name,
  tipo: complaint.tipo || complaint.category,
  descricao: complaint.descricao || complaint.description,
  statusDesc: complaint.statusDesc || `A denúncia está ${complaint.status.toLowerCase()}.`,
});

export function DenunciasProvider({ children, session }) {
  const [denuncias, setDenuncias] = useState([]);

  useEffect(() => {
    if (!session?.token) {
      setDenuncias([]);
      return;
    }
    listComplaints(session.token).then((items) => setDenuncias(items.map(normalizeComplaint))).catch(() => setDenuncias([]));
  }, [session]);

  const addDenuncia = async (dados) => {
    const nova = await createComplaint(session.token, dados);
    const normalized = normalizeComplaint(nova);
    setDenuncias((prev) => [normalized, ...prev]);
    return normalized;
  };

  return (
    <DenunciasContext.Provider value={{ denuncias, addDenuncia }}>
      {children}
    </DenunciasContext.Provider>
  );
}

export function useDenuncias() {
  return useContext(DenunciasContext);
}

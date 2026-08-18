import React, { createContext, useContext, useState } from 'react';

const DenunciasContext = createContext(null);

export function DenunciasProvider({ children }) {
  const [denuncias, setDenuncias] = useState([]);

  const addDenuncia = (dados) => {
    const nova = {
      id: Date.now().toString(),
      numero: denuncias.length + 1,
      dataEnvio: new Date().toLocaleDateString('pt-BR'),
      status: 'Pendente',
      statusDesc: 'A denúncia foi recebida e está em análise',
      ...dados,
    };
    setDenuncias((prev) => [nova, ...prev]);
    return nova;
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

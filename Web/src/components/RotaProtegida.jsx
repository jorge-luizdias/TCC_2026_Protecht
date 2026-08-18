import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RotaProtegida({ children }) {
  const { autenticado, carregando } = useAuth();

  if (carregando) {
    return <div style={{ padding: '20px' }}>Carregando...</div>;
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

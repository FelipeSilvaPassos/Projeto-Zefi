
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUsuario } from '../context/useUsuario';

export default function RotaProtegida() {
  const { usuario } = useUsuario();
  const location = useLocation();

  if (!usuario) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          mensagem: 'Faça login para acessar essa página.',
          origem: location,
        }}
      />
    );
  }

  return <Outlet />;
}

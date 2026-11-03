import { useUsuario } from '../context/useUsuario';
import Feed from './Feed';
import Home from './Home';

/** "/" mostra o feed para quem está logado e a página de apresentação para visitantes */
export default function Inicio() {
  const { usuario } = useUsuario();
  return usuario ? <Feed /> : <Home />;
}

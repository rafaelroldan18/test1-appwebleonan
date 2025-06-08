import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

// Componente para manejar el cierre de sesión global
function LogoutHandler() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    // Si el usuario se desconecta, redirigir a la página principal
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  // Este componente no renderiza nada
  return null;
}

export default LogoutHandler;
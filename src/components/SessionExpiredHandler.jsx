import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

// Componente para manejar la expiración de sesión
function SessionExpiredHandler() {
  const { user, logout } = useAuth();

  useEffect(() => {
    // Verificar token expirado
    const checkTokenExpiration = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const session = data?.session;
        
        if (user && !session) {
          // La sesión expiró pero el estado local sigue con usuario
          toast.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
          await logout();
        }
      } catch (error) {
        console.error('Error verificando sesión:', error);
      }
    };

    // Verificar cada 5 minutos
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);
    
    // Verificar al montar el componente
    checkTokenExpiration();

    return () => clearInterval(interval);
  }, [user, logout]);

  // Este componente no renderiza nada
  return null;
}

export default SessionExpiredHandler;
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';
import Notification from './Notification';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Verificar sesión actual
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data?.session?.user || null);
      } catch (error) {
        console.error('Error al verificar sesión:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Suscribirse a cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        
        if (event === 'SIGNED_IN') {
          showNotification('success', '¡Sesión iniciada correctamente!');
        } else if (event === 'SIGNED_OUT') {
          showNotification('info', 'Has cerrado sesión');
        } else if (event === 'PASSWORD_RECOVERY') {
          showNotification('info', 'Restablecimiento de contraseña iniciado');
        }
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const showNotification = (type, message) => {
    setNotification({ type, message, id: Date.now() });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        let errorMessage = 'Error al iniciar sesión';
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Credenciales inválidas. Verifica tu correo y contraseña.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Correo no confirmado. Por favor, verifica tu bandeja de entrada.';
        }
        
        showNotification('error', errorMessage);
        return { error };
      }

      return { data };
    } catch (error) {
      showNotification('error', 'Error inesperado al iniciar sesión');
      return { error };
    }
  };

  const register = async (email, password) => {
    try {
      // Intentar el registro directamente y manejar el error si el usuario ya existe
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        let errorMessage = 'Error al registrarse';
        
        // Verificar específicamente si el error indica que el usuario ya existe
        if (error.message && error.message.includes('already registered')) {
          errorMessage = 'Este correo ya está registrado. Intenta iniciar sesión.';
          showNotification('error', errorMessage);
          return { error: { message: 'User already exists' } };
        } else if (error.message && error.message.includes('password')) {
          errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        }
        
        showNotification('error', errorMessage);
        return { error };
      }

      showNotification('success', 'Registro exitoso. Por favor, verifica tu correo para confirmar tu cuenta.');
      return { data };
    } catch (error) {
      showNotification('error', 'Error inesperado al registrarse');
      return { error };
    }
  };

  const logout = async () => {
    try {
      // Primero limpiar el estado local
      setUser(null);
      
      // Luego cerrar sesión en Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        showNotification('error', 'Error al cerrar sesión');
        return { error };
      }
      
      // Limpiar cualquier dato de sesión en localStorage
      localStorage.removeItem('supabase.auth.token');
      
      // Forzar recarga de la página para asegurar un cierre de sesión completo
      window.location.reload();
      
      return { success: true };
    } catch (error) {
      showNotification('error', 'Error inesperado al cerrar sesión');
      return { error };
    }
  };

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        showNotification('error', 'Error al enviar el correo de recuperación');
        return { error };
      }

      showNotification('success', 'Se ha enviado un correo para restablecer tu contraseña');
      return { success: true };
    } catch (error) {
      showNotification('error', 'Error inesperado al solicitar recuperación de contraseña');
      return { error };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        showNotification('error', 'Error al actualizar la contraseña');
        return { error };
      }

      showNotification('success', 'Contraseña actualizada correctamente');
      return { success: true };
    } catch (error) {
      showNotification('error', 'Error inesperado al actualizar la contraseña');
      return { error };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    showNotification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={clearNotification}
          key={notification.id}
        />
      )}
    </AuthContext.Provider>
  );
}
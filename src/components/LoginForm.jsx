import React, { useState } from 'react';
import { useAuth } from './AuthContext';

function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await login(email, password);
      if (error) {
        setError('Error al iniciar sesión. Verifica tus credenciales.');
      } else if (onSuccess) {
        // Solo llamar a onSuccess si no hay error y la función existe
        onSuccess();
      }
    } catch (err) {
      setError('Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}
      
      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full border rounded-lg px-4 py-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="w-full border rounded-lg px-4 py-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 font-semibold disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>
    </form>
  );
}

export { LoginForm };
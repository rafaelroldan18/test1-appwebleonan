import React, { useState } from 'react';
import { useAuth } from './AuthContext';

function RegisterForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const { error } = await register(email, password);
      if (error) {
        if (error.message === 'User already exists') {
          setError('Este correo ya está registrado. Intenta iniciar sesión.');
        } else {
          setError('Error al registrarse. Verifica los datos ingresados.');
        }
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
    <form onSubmit={handleRegister} className="space-y-4">
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
      
      <input
        type="password"
        placeholder="Confirmar Contraseña"
        className="w-full border rounded-lg px-4 py-2"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 font-semibold disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  );
}

export { RegisterForm };
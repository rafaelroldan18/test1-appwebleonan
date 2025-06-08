import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { X } from 'lucide-react';

function UpdatePassword({ onClose }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { updatePassword } = useAuth();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const { error } = await updatePassword(password);
      if (error) {
        setError('No se pudo actualizar la contraseña. Inténtalo de nuevo más tarde.');
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
      >
        <X />
      </button>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Cambiar Contraseña
      </h2>

      {success ? (
        <div className="text-center">
          <div className="bg-green-50 border border-green-200 text-green-600 rounded-lg p-4 mb-4">
            Tu contraseña ha sido actualizada correctamente.
          </div>
          <button
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 font-semibold"
          >
            Cerrar
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}
          
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="w-full border rounded-lg px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
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
            {loading ? 'Actualizando...' : 'Actualizar contraseña'}
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdatePassword;
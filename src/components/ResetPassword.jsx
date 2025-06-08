import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { X } from 'lucide-react';

function ResetPassword({ onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await resetPassword(email);
      if (error) {
        setError('No se pudo enviar el correo de recuperación. Verifica la dirección.');
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
        Recuperar Contraseña
      </h2>

      {success ? (
        <div className="text-center">
          <div className="bg-green-50 border border-green-200 text-green-600 rounded-lg p-4 mb-4">
            Se ha enviado un correo a <strong>{email}</strong> con instrucciones para restablecer tu contraseña.
          </div>
          <button
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 font-semibold"
          >
            Cerrar
          </button>
        </div>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}
          
          <p className="text-gray-600 text-sm mb-4">
            Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>
          
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border rounded-lg px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 font-semibold disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar correo de recuperación'}
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
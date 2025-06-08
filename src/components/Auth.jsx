import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import ResetPassword from './ResetPassword';

function Auth({ onClose }) {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'reset'

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Iniciar Sesión
            </h2>
            <LoginForm onSuccess={onClose} />
            <div className="text-center mt-4 space-y-2">
              <button
                onClick={() => setCurrentView('register')}
                className="text-blue-500 hover:text-blue-700 block w-full"
              >
                ¿No tienes cuenta? Regístrate
              </button>
              <button
                onClick={() => setCurrentView('reset')}
                className="text-gray-500 hover:text-gray-700 text-sm block w-full"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </>
        );
      case 'register':
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Registrarse
            </h2>
            <RegisterForm onSuccess={onClose} />
            <div className="text-center mt-4">
              <button
                onClick={() => setCurrentView('login')}
                className="text-blue-500 hover:text-blue-700"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </button>
            </div>
          </>
        );
      case 'reset':
        return <ResetPassword onClose={() => setCurrentView('login')} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
        >
          <X />
        </button>
        
        {renderView()}
      </div>
    </div>
  );
}

export default Auth;
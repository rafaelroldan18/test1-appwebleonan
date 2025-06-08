import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import UserDataForm from './UserDataForm';

function CompleteProfilePage() {
  const { user, userProfile, needsProfile, saveUserProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Si el usuario ya tiene perfil, redirigir a la página principal
    if (user && userProfile && !needsProfile) {
      navigate('/');
    }
    
    // Si no hay usuario autenticado, redirigir al login
    if (!user) {
      navigate('/login');
    }
  }, [user, userProfile, needsProfile, navigate]);

  const handleProfileComplete = async (profileData) => {
    await saveUserProfile(profileData);
    navigate('/');
  };

  if (!user) {
    return null; // No renderizar nada mientras redirige
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Completa tu perfil</h1>
      <p className="text-gray-600 mb-6 text-center">
        Para continuar, necesitamos algunos datos adicionales.
      </p>
      
      <UserDataForm onComplete={handleProfileComplete} />
    </div>
  );
}

export default CompleteProfilePage;
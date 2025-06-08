import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import UserDataForm from './UserDataForm';
import toast from 'react-hot-toast';

function ProfilePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setUserData(data);
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
      toast.error('No se pudieron cargar tus datos');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateComplete = () => {
    setIsEditing(false);
    fetchUserData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
      
      {isEditing ? (
        <UserDataForm 
          initialData={userData} 
          onComplete={handleUpdateComplete} 
        />
      ) : (
        <>
          {userData ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium">{userData.nombre}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Apellido</p>
                <p className="font-medium">{userData.apellido}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">{userData.telefono}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Correo electrónico</p>
                <p className="font-medium">{user.email}</p>
              </div>
              
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 font-semibold"
              >
                Editar datos
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No has completado tus datos personales</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 font-semibold"
              >
                Completar datos
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProfilePage;
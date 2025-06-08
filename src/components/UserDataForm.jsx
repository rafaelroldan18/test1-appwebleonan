import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

function UserDataForm({ onComplete, initialData = null }) {
  const { user } = useAuth();
  const [nombre, setNombre] = useState(initialData?.nombre || '');
  const [apellido, setApellido] = useState(initialData?.apellido || '');
  const [telefono, setTelefono] = useState(initialData?.telefono || '');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!telefono.trim()) newErrors.telefono = 'El número de teléfono es requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const userData = {
        nombre,
        apellido,
        telefono: telefono,
        user_id: user.id,
        updated_at: new Date()
      };
      
      // Si es actualización o creación
      if (initialData?.id) {
        const { error } = await supabase
          .from('usuarios')
          .update(userData)
          .eq('id', initialData.id);
          
        if (error) throw error;
        toast.success('Datos actualizados correctamente');
      } else {
        const { error } = await supabase
          .from('usuarios')
          .insert([{ ...userData, created_at: new Date() }]);
          
        if (error) throw error;
        toast.success('Datos guardados correctamente');
      }
      
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Error al guardar datos:', error);
      toast.error('Error al guardar los datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Actualizar datos personales' : 'Completa tus datos personales'}
      </h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={`w-full border rounded-lg px-4 py-2 ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.nombre && (
          <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Apellido
        </label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className={`w-full border rounded-lg px-4 py-2 ${errors.apellido ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.apellido && (
          <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número de teléfono
        </label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className={`w-full border rounded-lg px-4 py-2 ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.telefono && (
          <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 font-semibold disabled:opacity-50"
      >
        {loading ? 'Guardando...' : initialData ? 'Actualizar datos' : 'Guardar datos'}
      </button>
    </form>
  );
}

export default UserDataForm;
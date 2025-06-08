import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, User, ChevronDown, Loader2 } from 'lucide-react';
import logo from '../image/logo.png';

function Navbar({ onLoginClick, onLogout, isLoggedIn, userEmail }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('user-dropdown');
      if (dropdown && !dropdown.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userName = userEmail?.split('@')[0] || 'Usuario';

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setIsDropdownOpen(false);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    setShowLogoutOverlay(true);
    
    // Ejecutar el cierre de sesión
    onLogout();
    
    // Ocultar el overlay después de un tiempo
    setTimeout(() => {
      setShowLogoutOverlay(false);
    }, 1500);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-green-900/95 text-white shadow-lg' : 'bg-transparent text-white'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <span>
                <a href="#inicio">
                  <img src={logo} alt="Logo Bosque Leonan" className="h-64 w-64 text-green-400" />
                </a>
              </span>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#inicio" className="hover:text-green-300 transition-colors">Inicio</a>
                <a href="#biodiversidad" className="hover:text-green-300 transition-colors">Biodiversidad</a>
                <a href="#galeria" className="hover:text-green-300 transition-colors">Galería</a>
                <a href="#acerca_de" className="hover:text-green-300 transition-colors">Acerca de</a>
                
                {isLoggedIn ? (
                  <div className="relative" id="user-dropdown">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-green-800 transition-colors"
                    >
                      <div className="bg-green-700 rounded-full p-2">
                        <User className="h-5 w-5" />
                      </div>
                      <span>{userName}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800">
                        <a
                          href="#profile"
                          className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                          Mi Perfil
                        </a>
                        <hr className="my-1" />
                        <button
                          onClick={handleLogoutClick}
                          className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Cerrar Sesión
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={onLoginClick}
                    className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    Iniciar Sesión
                  </button>
                )}
              </div>
            </div>

            <div className="md:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-300 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-green-900/95 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#inicio"
                className="block px-3 py-2 rounded-md hover:bg-green-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </a>
              <a
                href="#biodiversidad"
                className="block px-3 py-2 rounded-md hover:bg-green-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Biodiversidad
              </a>
              <a
                href="#galeria"
                className="block px-3 py-2 rounded-md hover:bg-green-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Galería
              </a>
              <a
                href="#acerca_de"
                className="block px-3 py-2 rounded-md hover:bg-green-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Acerca de
              </a>
              
              {isLoggedIn ? (
                <>
                  <div className="px-3 py-2 flex items-center space-x-2">
                    <div className="bg-green-700 rounded-full p-2">
                      <User className="h-5 w-5" />
                    </div>
                    <span>{userName}</span>
                  </div>
                  <a
                    href="#profile"
                    className="block px-3 py-2 rounded-md hover:bg-green-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mi Perfil
                  </a>
                  <button
                    onClick={() => {
                      handleLogoutClick();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md bg-green-600 hover:bg-green-700 transition-colors"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirmar cierre de sesión</h3>
            <p className="text-gray-600 mb-6">¿Estás seguro de que deseas cerrar sesión?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogoutOverlay && (
        <div className="fixed inset-0 bg-green-900 bg-opacity-95 flex flex-col items-center justify-center z-[100]">
          <Loader2 className="h-16 w-16 text-white animate-spin mb-4" />
          <h2 className="text-2xl font-bold text-white">Cerrando sesión...</h2>
        </div>
      )}
    </>
  );
}

export { Navbar };
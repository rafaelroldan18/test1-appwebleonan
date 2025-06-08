import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import Auth from './components/Auth';
import { Inicio } from './components/Inicio';
import { Biodiversidad } from './components/Biodiversidad';
import { Galeria } from './components/Galeria';
import { Acerca_de } from './components/Acerca_de';
import { Footer } from './components/Footer';
import { AuthProvider, useAuth } from './components/AuthContext';

function AppContent() {
  const [showAuth, setShowAuth] = useState(false);
  const { user, logout } = useAuth();

  const handleLoginClick = () => {
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 overflow-x-hidden">
      <Navbar 
        onLoginClick={handleLoginClick} 
        onLogout={logout}
        isLoggedIn={!!user}
        userEmail={user?.email}
      />
      <main>
        <Inicio />
        <Biodiversidad />
        <Galeria />
        <Acerca_de />
      </main>
      <Footer />
      {showAuth && <Auth onClose={handleCloseAuth} />}
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
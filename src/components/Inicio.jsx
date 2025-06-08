import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

function Inicio() {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.5);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="inicio" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=1920")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div 
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        style={{ transform: `translateY(${offset * 0.2}px)` }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          Descubre el magestuoso<br />
          <span className="text-green-300">Bosque Leonan</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
          Explore exuberantes senderos, conozca una diversa vida silvestre y reconéctese con la naturaleza en uno de los bosques de montaña más prístinos.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <a href="#biodiversity">
            <ChevronDown className="h-10 w-10 text-white opacity-80" />
          </a>
        </div>          
      </div>
    </section>
  );
}

export { Inicio };
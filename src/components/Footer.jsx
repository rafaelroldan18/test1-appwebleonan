import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Leaf, Heart } from 'lucide-react';
import { MapPin, Phone, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center">
              <span><a href="#Home"></a></span>
              <span className="ml-2 text-xl font-semibold tracking-wider">
                <img src="/src/image/logo_banner.png" alt="" />
              </span>
            </div>
            <p className="mt-4 text-green-100">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione similique hic quam, a aliquam asperiores illum? Sint tenetur aspernatur animi, voluptates quia excepturi quaerat, nostrum enim odio, voluptatibus praesentium dolorem?
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-green-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Mapa de sitio</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-green-100 hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#biodiversity" className="text-green-100 hover:text-white transition-colors">
                  Biodiversidad
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-green-100 hover:text-white transition-colors">
                  Galeria
                </a>
              </li>
              <li>
                <a href="#conservation" className="text-green-100 hover:text-white transition-colors">
                  Acerca de
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-forest-light mt-0.5" />
                <span className="text-forest-gray">
                  Región Montañosa de Leonan,<br />Valle Central, CP 10101
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-forest-light" />
                <span className="text-forest-gray">+123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-forest-light" />
                <span className="text-forest-gray">info@bosqueleonan.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Manténgase actualizado</h3>
            <p className="text-green-100 mb-4">
              Suscríbete a nuestro boletín para recibir las últimas noticias, eventos e información de temporada.
            </p>
            <form className="space-y-2">
              <div className="flex rounded-md overflow-hidden">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="min-w-0 flex-1 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-green-200">
                Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
              </p>
            </form>
          </div>
        </div>
      </div>
      
      <div className="bg-green-950 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 md:flex-row text-center text-sm text-green-300">
          <p>© 2025 Bosque Montano Leonan. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
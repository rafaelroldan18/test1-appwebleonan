import React, { useState } from 'react';
import { X } from 'lucide-react';
import bosqueImg from '../assets/images/bosque_img.png';

function Galeria() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      url: bosqueImg,
      title: "Nombre",
      description: "Descripción: Eu cillum commodo incididunt laborum id sit sunt occaecat laboris cillum aliqua commodo."
    },
    {
      url: bosqueImg,
      title: "Nombre",
      description: "Descripción: Eu cillum commodo incididunt laborum id sit sunt occaecat laboris cillum aliqua commodo."
    },
    {
      url: bosqueImg,
      title: "Nombre",
      description: "Descripción: Eu cillum commodo incididunt laborum id sit sunt occaecat laboris cillum aliqua commodo."
    },
    {
      url: bosqueImg,
      title: "Nombre",
      description: "Descripción: Eu cillum commodo incididunt laborum id sit sunt occaecat laboris cillum aliqua commodo."
    },
    {
      url: bosqueImg,
      title: "Nombre",
      description: "Descripción: Eu cillum commodo incididunt laborum id sit sunt occaecat laboris cillum aliqua commodo."
    },
    {
      url: bosqueImg,
      title: "Nombre",
      description: "Descripción: Eu cillum commodo incididunt laborum id sit sunt occaecat laboris cillum aliqua commodo."
    },
    {
      url: bosqueImg,
      title: "Nombre",
      description: "Descripción: Eu cillum commodo incididunt laborum id sit sunt occaecat laboris cillum aliqua commodo."
    },
    {
      url: bosqueImg,
      title: "Nombre",
      description: "Descripción: Eu cillum commodo incididunt laborum id sit sunt occaecat laboris cillum aliqua commodo."
    }
  ];

  return (
    <section id="galeria" className="py-20 bg-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Galeria de Bosque Leonan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex ipsum amet asperiores autem ad tempora quam tenetur culpa, possimus animi atque corporis. Assumenda neque facilis omnis eligendi tenetur voluptas a.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer h-64"
              onClick={() => setSelectedImage(image.url)}
            >
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-medium text-lg">{image.title}</h3>
                <p className="text-gray-200 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8" />
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export { Galeria };
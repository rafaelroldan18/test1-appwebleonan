import React, { useState } from 'react';
import { Flower, Bird } from 'lucide-react';
import flora1 from '../image/flora_1.png';
import fauna1 from '../image/fauna_1.png';

function Biodiversidad() {
  const [activeCategory, setActiveCategory] = useState('flora');

  const categories = [
    { id: 'flora', name: 'Flora', icon: <Flower className="h-5 w-5" /> },
    { id: 'fauna', name: 'Fauna', icon: <Bird className="h-5 w-5" /> },
  ];

  const biodiversityData = {
    flora: {
      title: "Flora",
      description: "Ullamco fugiat ex exercitation cillum consequat laborum mollit culpa aliquip.",
      items: [
        {
          name: "Nombre",
          scientific: "Nombre científico",
          description: "Descripción: Et nulla ad cillum exercitation dolor duis aute pariatur. Et nulla ad cillum exercitation dolor duis aute pariatur",
          image: flora1
        },
        {
          name: "Nombre",
          scientific: "Nombre científico",
          description: "Descripción: Et nulla ad cillum exercitation dolor duis aute pariatur. Et nulla ad cillum exercitation dolor duis aute pariatur",
          image: flora1
        },
        {
          name: "Nombre",
          scientific: "Nombre científico",
          description: "Descripción: Et nulla ad cillum exercitation dolor duis aute pariatur. Et nulla ad cillum exercitation dolor duis aute pariatur",
          image: flora1
        },
        {
          name: "Nombre",
          scientific: "Nombre científico",
          description: "Descripción: Et nulla ad cillum exercitation dolor duis aute pariatur. Et nulla ad cillum exercitation dolor duis aute pariatur",
          image: flora1
        }
      ]
    },
    fauna: {
      title: "Fauna",
      description: "In consectetur id est sunt ipsum eu aliqua consectetur anim cillum et officia sit ex.",
      items: [
        {
          name: "Nombre",
          scientific: "Nombre científico",
          description: "Descripcion: Tempor adipisicing reprehenderit irure cillum dolore Lorem culpa laborum irure in commodo ea.",
          image: fauna1
        },
        {
          name: "Nombre",
          scientific: "Nombre científico",
          description: "Descripcion: Tempor adipisicing reprehenderit irure cillum dolore Lorem culpa laborum irure in commodo ea.",
          image: fauna1
        },
        {
          name: "Nombre",
          scientific: "Nombre científico",
          description: "Descripcion: Tempor adipisicing reprehenderit irure cillum dolore Lorem culpa laborum irure in commodo ea.",
          image: fauna1
        },
        {
          name: "Nombre",
          scientific: "Nombre científico",
          description: "Descripcion: Tempor adipisicing reprehenderit irure cillum dolore Lorem culpa laborum irure in commodo ea.",
          image: fauna1
        }
      ]
    },
  };

  const currentData = biodiversityData[activeCategory];

  return (
    <section id="biodiversidad" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Our Rich Biodiversity
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leonan forest is a living laboratory of biodiversity, home to hundreds of plant and animal species.
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1 inline-flex">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-md flex items-center transition-colors ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-green-800 mb-2">{currentData.title}</h3>
            <p className="text-gray-600">{currentData.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentData.items.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-lg text-gray-900">{item.name}</h4>
                  <p className="text-sm italic text-gray-500 mb-2">{item.scientific}</p>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { Biodiversidad };
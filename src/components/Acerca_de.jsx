import React from 'react';
import { Leaf, Mountain, Shield } from 'lucide-react';
import acercaImg from '../image/acerca_img.png';

function Acerca_de() {
  return (
    <section id="acerca_de" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Acerca del Bosque Leonan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas laboriosam temporibus corporis esse reiciendis, illo eveniet dolore. Atque, animi numquam suscipit asperiores nobis aliquam modi nisi velit voluptatum laborum placeat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-stone-50 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Mountain className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ubicación</h3>
            <p className="text-gray-600">
              Ipsum ad ut esse sunt nostrud ea anim proident occaecat commodo enim ad laborum duis.
            </p>
          </div>

          <div className="bg-stone-50 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ecosistema</h3>
            <p className="text-gray-600">
              Commodo eu adipisicing dolore veniam id irure cillum nisi est dolore eu incididunt.
            </p>
          </div>

          <div className="bg-stone-50 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Conservación</h3>
            <p className="text-gray-600">
              Do ut do pariatur exercitation nulla cillum commodo elit dolore qui dolore.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-green-50 rounded-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Historia</h3>
              <p className="text-gray-700 mb-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum, impedit rerum. Sunt culpa rem autem, labore officiis corrupti modi perspiciatis minus optio fugit similique, quia repudiandae ipsa aut magni ullam?
              </p>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt labore saepe nemo nihil iste odio commodi atque, reiciendis omnis! Sunt ducimus dolores est atque beatae hic unde dicta, reprehenderit voluptas!
              </p>
            </div>
            <div>
              <img 
                src={acercaImg} 
                alt="Vista del Bosque Leonan" 
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Acerca_de };
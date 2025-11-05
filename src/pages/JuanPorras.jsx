import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const RestaurantMenuModern = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState('34652411939');

  useEffect(() => {
    // Load WhatsApp number from localStorage
    const savedNumber = localStorage.getItem('juanPorrasWhatsapp');
    if (savedNumber) {
      // Remove the + sign if present
      setWhatsappNumber(savedNumber.replace('+', ''));
    }
  }, []);

  const menuItems = [
    {
      section: 'todos',
      name: 'PAELLA',
      price: 'Encargo',
      description: 'Receta tradicional preparada con amor',
      image: '🥘'
    },
    {
      section: 'todos',
      name: 'CODILLO',
      price: 'Encargo',
      description: 'Tierno, jugoso y delicioso',
      image: '🍖'
    },
    {
      section: 'todos',
      name: 'CONEJO',
      price: 'Encargo',
      description: 'Receta casera auténtica',
      image: '🍗'
    },
    {
      section: 'pollos',
      name: 'POLLOS ASADOS',
      price: 'Consultar',
      description: 'Viernes, Sábados y Domingos',
      image: '🐔'
    }
  ];

  const whatsappMessage = 'Hola, me gustaría información sobre los servicios de Juan el Porra';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-300 ${
      darkMode 
        ? 'text-white' 
        : 'text-gray-900 bg-white'
    }`}
    style={darkMode ? { backgroundColor: '#1B1A1F' } : {}}
    >
      
      {/* Toggle Dark Mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 ${
          darkMode
            ? 'bg-orange-500 hover:bg-orange-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
        }`}
      >
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-40 flex items-center justify-center w-12 h-12 text-white transition-all duration-300 bg-green-500 rounded-full shadow-lg hover:bg-green-600 bottom-8 right-8 hover:shadow-xl animate-pulse"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6" />
      </a>
      
      {/* Header Decorativo */}
      <div className="relative px-4 pt-16 pb-12 text-center">
        <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-500/10' : 'bg-orange-500/5'
        }`}></div>
        <div className={`absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl ${
          darkMode ? 'bg-orange-500/5' : 'bg-orange-500/3'
        }`}></div>
        
        <div className="relative z-10">
          <p className={`mb-2 text-lg font-bold tracking-widest ${
            darkMode ? 'text-orange-500' : 'text-orange-600'
          }`}>Bienvenido a</p>
          <h1 className="mb-2 font-black tracking-tight text-7xl">
            Juan el Porra
          </h1>
          <p className={`text-xl font-light ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Comida casera cada día</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-20 mx-auto max-w-7xl">
        
        {/* Sección Comidas Caseras */}
        <div className="relative mb-32">
          <div className={`absolute w-64 h-64 rounded-full -top-20 -right-20 blur-3xl ${
            darkMode ? 'bg-orange-500/5' : 'bg-orange-500/3'
          }`}></div>
          
          <div className="relative z-10">
            <div className="inline-block mb-12">
              <h2 className="text-5xl font-black tracking-tight">
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>COMIDAS</span>
                <span className={darkMode ? 'text-orange-500' : 'text-orange-600'}> CASERAS</span>
              </h2>
              <div className={`w-32 h-1 mt-4 ${
                darkMode ? 'bg-orange-500' : 'bg-orange-600'
              }`}></div>
            </div>

            {/* Grid de Items */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {menuItems.slice(0, 3).map((item, index) => (
                <div key={index} className="relative group">
                  {/* Fondo flotante con hover */}
                  <div className={`absolute w-40 h-40 transition-all duration-500 -top-6 -right-6 rounded-3xl group-hover:-top-10 group-hover:-right-10 group-hover:w-56 group-hover:h-56 blur-xl ${
                    darkMode
                      ? 'bg-orange-500/20 group-hover:bg-orange-500/40'
                      : 'bg-orange-500/10 group-hover:bg-orange-500/25'
                  }`}></div>
                  
                  {/* Card */}
                  <div className={`relative h-full p-8 transition-all duration-500 border rounded-3xl backdrop-blur-sm transform group-hover:scale-105 group-hover:-translate-y-2 ${
                    darkMode
                      ? 'bg-gray-800/80 border-orange-500/20 group-hover:border-orange-500/60 group-hover:shadow-2xl group-hover:shadow-orange-500/20'
                      : 'bg-white border-orange-500/30 group-hover:border-orange-500/60 shadow-md group-hover:shadow-2xl group-hover:shadow-orange-500/15'
                  }`}>
                    {/* Imagen circular decorativa */}
                    <div className="relative mb-8">
                      <div className={`absolute w-32 h-32 rounded-full -top-4 -right-4 blur-2xl transition-all duration-500 group-hover:scale-125 ${
                        darkMode ? 'bg-orange-500/10' : 'bg-orange-500/5'
                      }`}></div>
                      <div className={`relative flex items-center justify-center mx-auto transition-all duration-500 border-2 rounded-full w-28 h-28 transform group-hover:scale-110 ${
                        darkMode
                          ? 'bg-orange-500/20 border-orange-500/30 group-hover:bg-orange-500/40 group-hover:border-orange-500/80'
                          : 'bg-orange-500/10 border-orange-500/40 group-hover:bg-orange-500/20 group-hover:border-orange-500/80'
                      }`}>
                        <span className="text-6xl">{item.image}</span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <h3 className={`mb-1 text-3xl font-black tracking-tight transition-colors duration-300 group-hover:text-orange-500 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.name}
                    </h3>
                    <p className={`mb-4 font-bold transition-colors duration-300 ${
                      darkMode ? 'text-orange-500 group-hover:text-orange-400' : 'text-orange-600 group-hover:text-orange-500'
                    }`}>{item.price}</p>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                      darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sección Pollos Asados */}
        <div className="relative mb-32">
          <div className={`absolute rounded-full -left-20 w-80 h-80 blur-3xl ${
            darkMode ? 'bg-orange-500/5' : 'bg-orange-500/3'
          }`}></div>
          
          <div className="relative z-10">
            <div className="inline-block mb-12">
              <h2 className="text-5xl font-black tracking-tight">
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>POLLOS</span>
                <span className={darkMode ? 'text-orange-500' : 'text-orange-600'}> ASADOS</span>
              </h2>
              <div className={`w-32 h-1 mt-4 ${
                darkMode ? 'bg-orange-500' : 'bg-orange-600'
              }`}></div>
            </div>

            <div className="relative group">
              {/* Fondo flotante grande */}
              <div className={`absolute transition-all duration-500 rounded-full -top-10 -left-10 w-96 h-96 group-hover:-top-20 group-hover:-left-20 group-hover:w-96 group-hover:h-96 blur-3xl ${
                darkMode
                  ? 'bg-orange-500/15 group-hover:bg-orange-500/35'
                  : 'bg-orange-500/10 group-hover:bg-orange-500/25'
              }`}></div>
              
              {/* Card Principal */}
              <div className={`relative p-12 transition-all duration-500 border rounded-3xl backdrop-blur-sm transform group-hover:scale-105 ${
                darkMode
                  ? 'bg-gray-800/80 border-orange-500/30 group-hover:border-orange-500/80 group-hover:shadow-2xl group-hover:shadow-orange-500/20'
                  : 'bg-white border-orange-500/30 group-hover:border-orange-500/80 shadow-md group-hover:shadow-2xl group-hover:shadow-orange-500/15'
              }`}>
                <div className="grid items-center gap-12 md:grid-cols-2">
                  
                  {/* Imagen Izquierda */}
                  <div className="relative order-2 md:order-1">
                    <div className={`absolute rounded-full -top-8 -left-8 w-80 h-80 blur-3xl transition-all duration-500 group-hover:scale-125 ${
                      darkMode ? 'bg-orange-500/10' : 'bg-orange-500/5'
                    }`}></div>
                    <div className={`relative flex items-center justify-center w-64 h-64 mx-auto transition-all duration-500 border-4 rounded-full transform group-hover:scale-110 ${
                      darkMode
                        ? 'bg-orange-500/30 border-orange-500/40 group-hover:bg-orange-500/50 group-hover:border-orange-500/80'
                        : 'bg-orange-500/10 border-orange-500/40 group-hover:bg-orange-500/20 group-hover:border-orange-500/80'
                    }`}>
                      <span className="text-8xl">🐔</span>
                    </div>
                  </div>

                  {/* Contenido Derecha */}
                  <div className="order-1 md:order-2">
                    <h3 className={`mb-4 text-5xl font-black tracking-tight transition-colors duration-300 ${
                      darkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'
                    }`}>
                      POLLOS<br/>
                      <span className={darkMode ? 'text-orange-500' : 'text-orange-600'}>ASADOS</span>
                    </h3>
                    <div className="space-y-4">
                      <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                        darkMode ? 'text-gray-300 group-hover:text-gray-200' : 'text-gray-700 group-hover:text-gray-800'
                      }`}>
                        Preparados con nuestras recetas tradicionales
                      </p>
                      <div className={`p-4 border rounded-xl backdrop-blur-sm transition-all duration-300 ${
                        darkMode
                          ? 'bg-orange-500/10 border-orange-500/30 group-hover:bg-orange-500/20 group-hover:border-orange-500/60'
                          : 'bg-orange-500/10 border-orange-500/40 group-hover:bg-orange-500/20 group-hover:border-orange-500/60'
                      }`}>
                        <p className={`mb-1 text-lg font-bold transition-colors duration-300 ${
                          darkMode ? 'text-orange-400 group-hover:text-orange-300' : 'text-orange-600 group-hover:text-orange-500'
                        }`}>Disponibles:</p>
                        <p className={`transition-colors duration-300 ${
                          darkMode ? 'text-gray-300 group-hover:text-gray-200' : 'text-gray-700 group-hover:text-gray-800'
                        }`}>Viernes, Sábados y Domingos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Domingos por Encargo */}
        <div className="relative mb-32">
          <div className={`absolute rounded-full -top-20 -right-20 w-72 h-72 blur-3xl ${
            darkMode ? 'bg-orange-500/5' : 'bg-orange-500/3'
          }`}></div>
          
          <div className="relative z-10">
            <div className="inline-block mb-12">
              <h2 className="text-5xl font-black tracking-tight">
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>LOS DOMINGOS</span>
                <span className={darkMode ? 'text-orange-500' : 'text-orange-600'}> POR ENCARGO</span>
              </h2>
              <div className={`w-48 h-1 mt-4 ${
                darkMode ? 'bg-orange-500' : 'bg-orange-600'
              }`}></div>
            </div>

            <div className={`p-12 text-center rounded-3xl shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
              darkMode
                ? 'bg-orange-500 shadow-orange-500/20 hover:shadow-orange-500/40'
                : 'bg-orange-600 shadow-orange-600/20 hover:shadow-orange-600/40'
            }`}>
              <p className="mb-6 text-lg font-semibold text-white/90">Elige tu especialidad favorita:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {['PAELLA', 'CODILLO', 'CONEJO'].map((item, idx) => (
                  <div key={idx} className="px-8 py-3 transition-all duration-300 transform border rounded-full cursor-pointer bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/60 hover:bg-white/30 hover:scale-110">
                    <span className="text-lg font-bold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sección Contact */}
        <div className="relative">
          <div className={`absolute rounded-full -bottom-20 -left-20 w-80 h-80 blur-3xl ${
            darkMode ? 'bg-orange-500/5' : 'bg-orange-500/3'
          }`}></div>
          
          <div className="relative z-10 grid gap-8 md:grid-cols-2">
            
            {/* Domicilio */}
            <div className="relative group">
              <div className={`absolute w-48 h-48 transition-all duration-500 -top-6 -right-6 rounded-3xl group-hover:-top-10 group-hover:-right-10 group-hover:w-64 group-hover:h-64 blur-xl ${
                darkMode
                  ? 'bg-orange-500/10 group-hover:bg-orange-500/25'
                  : 'bg-orange-500/5 group-hover:bg-orange-500/15'
              }`}></div>
              
              <div className={`relative p-8 transition-all duration-500 border rounded-3xl backdrop-blur-sm transform group-hover:scale-105 group-hover:-translate-y-2 ${
                darkMode
                  ? 'bg-gray-800/80 border-orange-500/20 group-hover:border-orange-500/60 group-hover:shadow-2xl group-hover:shadow-orange-500/20'
                  : 'bg-white border-orange-500/30 group-hover:border-orange-500/60 shadow-md group-hover:shadow-2xl group-hover:shadow-orange-500/15'
              }`}>
                <h3 className={`mb-6 text-3xl font-black transition-colors duration-300 ${
                  darkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'
                }`}>DOMICILIO</h3>

                <div className="space-y-4">
                  <div>
                    <p className={`mb-1 text-lg font-bold transition-colors duration-300 ${
                      darkMode ? 'text-orange-500 group-hover:text-orange-400' : 'text-orange-600 group-hover:text-orange-500'
                    }`}>Ubicación:</p>
                    <p className={`text-lg transition-colors duration-300 ${
                      darkMode ? 'text-gray-300 group-hover:text-gray-200' : 'text-gray-700 group-hover:text-gray-800'
                    }`}>Ardales - Carratraca</p>
                  </div>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 px-6 py-3 font-bold text-white transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 ${
                      darkMode
                        ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/30'
                        : 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/30'
                    }`}
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Días Festivos */}
            <div className="relative group">
              <div className={`absolute w-48 h-48 transition-all duration-500 -top-6 -left-6 rounded-3xl group-hover:-top-10 group-hover:-left-10 group-hover:w-64 group-hover:h-64 blur-xl ${
                darkMode
                  ? 'bg-orange-500/10 group-hover:bg-orange-500/25'
                  : 'bg-orange-500/5 group-hover:bg-orange-500/15'
              }`}></div>
              
              <div className={`relative p-8 transition-all duration-500 border rounded-3xl backdrop-blur-sm transform group-hover:scale-105 group-hover:-translate-y-2 ${
                darkMode
                  ? 'bg-gray-800/80 border-orange-500/20 group-hover:border-orange-500/60 group-hover:shadow-2xl group-hover:shadow-orange-500/20'
                  : 'bg-white border-orange-500/30 group-hover:border-orange-500/60 shadow-md group-hover:shadow-2xl group-hover:shadow-orange-500/15'
              }`}>
                <h3 className={`mb-6 text-3xl font-black transition-colors duration-300 ${
                  darkMode ? 'text-white group-hover:text-orange-400' : 'text-gray-900 group-hover:text-orange-600'
                }`}>DÍAS FESTIVOS</h3>
                
                <div className="space-y-4">
                  <p className={`text-lg font-bold transition-colors duration-300 ${
                    darkMode ? 'text-orange-400 group-hover:text-orange-300' : 'text-orange-600 group-hover:text-orange-500'
                  }`}>Abrimos con reserva</p>
                  <p className={`transition-colors duration-300 ${
                    darkMode ? 'text-gray-300 group-hover:text-gray-200' : 'text-gray-700 group-hover:text-gray-800'
                  }`}>Consulte disponibilidad y haga su reserva</p>
                  
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 px-6 py-3 font-bold text-white transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 ${
                      darkMode
                        ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/30'
                        : 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/30'
                    }`}
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className={`px-4 pt-16 mt-32 transition-colors duration-300 ${
        darkMode
          ? 'border-t border-orange-500/10'
          : 'border-t border-orange-500/20 bg-gray-50'
      }`}>
        <div className="pb-12 mx-auto text-center max-w-7xl">
          <h3 className={`mb-4 text-2xl font-bold ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Contáctanos</h3>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-4xl font-black transition-colors hover:opacity-80 ${
              darkMode ? 'text-orange-500' : 'text-orange-600'
            }`}
          >
            <FontAwesomeIcon icon={faWhatsapp} className="w-10 h-10" />
            WhatsApp
          </a>
          <p className={`mt-4 text-sm ${
            darkMode ? 'text-gray-500' : 'text-gray-600'
          }`}>
            Llámenos para pedidos especiales y más información
          </p>
        </div>
      </footer>

    </div>
  );
};

export default RestaurantMenuModern;

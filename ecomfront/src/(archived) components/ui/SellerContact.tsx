import logo from "../../img/unstable-games-logo.png";
import insta from "../../img/InstaIcon.png";
import face from "../../img/FacebookIcon.png";
import x from "../../img/XIcon.png";

const SellerContact = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
     
      <main className="flex-grow flex items-center justify-center p-8 bg-white">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center md:items-start">
          
          
          <div className="flex justify-center md:justify-start mb-6 md:mb-0 md:w-1/3">
            <div className="  p-12 flex items-center justify-center">
              <img src={logo} alt="Unstable Games Logo" className="h-32 w-auto object-contain" />
            </div>
          </div>

         
          <div className="md:w-2/3 text-center md:text-center flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">Unstable Games</h1>
            <p className="text-lg text-gray-700 mb-4">
              Durante los últimos años, la misión de nuestro equipo ha sido diseñar juegos altamente 
              interactivos que merezcan la pena jugar una y otra vez. Queremos que nuestros juegos unan
               a las personas, les ayuden a expresarse y, en definitiva, a hacer del mundo un lugar mejor.
            </p>
            <p className="text-lg text-gray-700">
              Somos un equipo de creadores de corazón, y hemos identificado cuatro valores fundamentales
               que nos guían. Estos valores nos han ayudado en todo momento a la hora de colaborar, 
               superar nuestros límites creativos y construir nuestra marca.
            </p>
          </div>
        </div>
      </main>

      
     
  <div className="container  flex flex-col md:flex-row justify-center items-center text-center md:text-center  md:space-x-35">
    
    <div>
      <h2 className="font-bold text-2xl mb-12">Contacto:</h2>
      <p className="text-gray-700">+506 8888-8888</p>
      <p className="text-gray-700">unstable@example.com</p>
    </div>

    <div>
      <h2 className="font-bold text-2xl mb-12">Dirección:</h2>
      <p className="text-gray-700">50 metros sur de la</p>
      <p className="text-gray-700">pulpería La Principal, San</p>
      <p className="text-gray-700">Pedro, San José, Costa Rica</p>
    </div>

    <div>
      <h2 className="font-bold text-2xl mb-12">Página y redes:</h2>
      <p className="text-gray-700 block mb-2">unstablegames.com</p>
      <div className="flex justify-center space-x-4">
        <img src={insta} alt="Instagram" className="h-8 w-8" />
        <img src={face} alt="Facebook" className="h-8 w-8" />
        <img src={x} alt="X" className="h-8 w-8" />
      </div>
    </div>

  </div>


    </div>
  );
};

export default SellerContact;

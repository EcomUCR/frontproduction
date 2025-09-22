import { Button } from "./button";
import backArrowIcon from '../../img/backArrow.png';
import mainProductImage from '../../img/sombrasClaro.png';
import image1 from '../../img/productSide.png';
import image2 from '../../img/sombrasFront.png';
import image3 from '../../img/productFar.png';
import stars from '../../img/stars.png'; 

const ProductComponent = () => {
  return (
    <div className="container mx-auto p-4">
     
      <div className="flex items-center mb-16"> 
        <Button className="flex items-center bg-white border px-3 py-2 rounded-md shadow-sm text-black">
          <img src={backArrowIcon} alt="Volver" className="w-4 h-4 mr-2" />
          <span className="text-black">Volver</span>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
       
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <img src={mainProductImage} alt="Creaturas de las sombras" className="w-full rounded-lg shadow-md mb-4" />
          
         
          <div className="flex justify-center space-x-4 mt-4">
            <div className="border-2 border-blue-main rounded-md p-1">
              <img src={image1} alt="Product image 1" className="w-20 h-20 object-cover rounded-md" />
            </div>
            <div className="border-2 border-blue-main rounded-md p-1">
              <img src={image2} alt="Product image 2" className="w-20 h-20 object-cover rounded-md" />
            </div>
            <div className="border-2 border-blue-main rounded-md p-1">
              <img src={image3} alt="Product image 3" className="w-20 h-20 object-cover rounded-md" />
            </div>
          </div>
        </div>

        
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-800">Criaturas de las sombras - Expansión roca fundida</h1>
          <p className="text-sm text-gray-500 mb-2">Vista la tienda de Unstable Games</p>
          
          
          <img src={stars} alt="Calificación" className="w-24 h-auto mb-4" />

         
          <div className="mb-4">
            <span className="line-through text-lg text-gray-400 block mb-2">₡10.000</span>
            <span className="text-4xl font-extrabold text-purple-main">₡5.000</span>
          </div>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Esta expansión de Casting Shadows presenta 2 nuevos personajes jugables y 3 nuevos azulejos hexagonales, lo que te permite jugar con hasta 6 jugadores en un mapa ampliado.</li>
            <li>Con esta expansión, puedes Fortificar tus defensas para una protección adicional, o quemar ubicaciones cercanas para quemar a cualquiera que se atreva a cruzar tu camino.</li>
            <li>Esta expansión de Casting Shadows presenta 2 nuevos personajes jugables y 3 nuevos azulejos hexagonales, lo que te permite jugar con hasta 6 jugadores en un mapa ampliado.</li>
            <li>Con esta expansión, puedes Fortificar tus defensas para una protección adicional, o quemar ubicaciones cercanas para quemar a cualquiera que se atreva a cruzar tu camino.</li>
          </ul>
        </div>

      
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0 bg-gray-200 rounded-lg flex items-center justify-center p-8">
          <span className="text-gray-500">Información para compra</span>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;

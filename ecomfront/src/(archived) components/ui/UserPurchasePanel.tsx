import { Button } from "./button";
import ProductCard from "./ProductCard";
import chuchillo from "../../img/cuchillos.png";

interface UserPurchasePanelProps {
  productImageSrc?: string;
}

const UserPurchasePanel: React.FC<UserPurchasePanelProps> = ({ productImageSrc = chuchillo }) => {
  return (
    <div className="w-full md:w-1/2 p-6 rounded-lg border border-blue-main flex flex-col">
      <div className="flex-grow">
        <div className="mb-4">
          <h3 className="text-3xl font-bold text-gray-800">
            Usuario - <span className="text-green-500">Activo</span>
          </h3>
        </div>

        <div className="flex justify-between items-start gap-6">
          
          <div className="space-y-2 text-base text-gray-700 mt-5">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Última compra</h4>
            <p className="font-medium text-gray-800">Fecha:</p>
            <p>25/08/2025 22:00</p>

            <p className="font-medium text-gray-800">Artículos comprados:</p>
            <p>12</p>

            <p className="font-medium text-gray-800">Total gastado:</p>
            <p>$200000</p>
          </div>

          
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-5">Última compra</h4>
            <ProductCard
              imageSrc={productImageSrc}
              name="Set cuchillos Telstar"
              brand="Telstar"
              price="€15.750"
            />
          </div>
        </div>
      </div>

     
      <div className="mt-8">
        <Button
          variant="default"
          className="w-full bg-yellow-main hover:bg-[#f0c341]/90 text-white rounded-md py-2 px-4"
        >
          Ver historial de compras
        </Button>
      </div>
    </div>
  );
};

export default UserPurchasePanel;

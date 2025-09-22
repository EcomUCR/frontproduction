import { Link } from "react-router-dom";
import { Button } from "./button";
import userIcon from "../../img/userIconW.png";
import latterIcon from "../../img/latter.png";
import productsIcon from "../../img/productsIcon.png";

const ProfileSellerNav = () => {
  return (
    <div className="w-1/4 pl-12 pr-8 mt-8 mb-3">
      <h2 className="text-3xl font-semibold mb-6">Mi perfil</h2>
      <div className="space-y-4">
      
        <Link to="/profile-vendor">
          <Button className="bg-purple-main gap-2 justify-start w-full px-4 py-2">
            <img src={userIcon} alt="User" className="w-5 h-5" />
            <span>Información de la cuenta</span>
          </Button>
        </Link>

        
        <Button className="bg-white text-black gap-2 justify-start w-full px-4 py-2">
          <img src={latterIcon} alt="Historial" className="w-5 h-5" />
          <span>Historial de compra</span>
        </Button>

       
        <Link to="/profile-seller-products-page">
          <Button className="bg-white text-black gap-2 justify-start w-full px-4 py-2">
            <img src={productsIcon} alt="Productos" className="w-5 h-5" />
            <span>Mis productos</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileSellerNav;


import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter } from "@tabler/icons-react";
import logo from "../../img/tucaShopLogo.png";
import { Link } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
export default function Footer() {
  return (
    <footer className="bg-blue-main text-white py-6 mt-10 flex flex-col items-center font-quicksand">
      <div className="flex items-center w-full px-10">
        <div className="w-[33%] flex flex-col items-center">
          <p className=" lg:flex text-sm">Siguenos en nuestras redes:</p>
          <div className="flex justify-between space-x-3 pt-2">
            <IconBrandFacebook className="cursor-pointer hover:text-purple-main transition-colors duration-500" />
            <IconBrandTwitter className="cursor-pointer hover:text-purple-main transition-colors duration-500" />
            <IconBrandInstagram className="cursor-pointer hover:text-purple-main transition-colors duration-500" />
          </div>
        </div>
        <div className="w-[33%] flex flex-col items-center">
          <Link to="/">
            <img
              src={logo}
              alt="Logo TucaShop"
              className="h-12 w-auto"
            />
          </Link>
          <p className="text-white font-fugaz text-lg">TucaShop</p>
        </div>
        <div className="w-[33%] flex flex-col items-center">
          <p className="text-sm ">Derechos reservados eCom 2025</p>
        </div>
      </div>
      <div className="flex flex-col pt-10 items-center w-full">
        <p className="text-2xl font-bold py-10">Contacto</p>
        <div className="flex justify-center space-x-20 px-10 w-full">
          <div className="flex flex-col gap-4 justify-center items-center w-[50%]">
            <p className="text-lg">Email: info@tucashop.com</p>
            <p className="text-lg">Teléfono: +506 1234-5678</p>
            <p className="text-lg">Dirección: San José, Costa Rica</p>
          </div>
          <div className="flex flex-col items-start w-[50%]">
            <p className="pb-5">Envianos un mensaje</p>
            <form className="flex flex-col space-y-4 w-full" action="">
              <input type="text" placeholder="Correo electrónico" className="border border-white-main w-[80%] rounded-md p-2" />
              <input type="text" placeholder="Nombre" className="border border-white-main w-[80%] rounded-md p-2" />
              <textarea placeholder="Mensaje" className="border border-white-main w-[80%] rounded-md p-2" />
              <ButtonComponent style="bg-yellow-main w-[80%] text-white rounded-md p-2" text="Enviar" />
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

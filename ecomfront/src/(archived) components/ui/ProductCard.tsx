import { IconHeart, IconShoppingCart } from "@tabler/icons-react";
import ButtonComponent from "./ButtonComponent";

interface ProductCardProps {
  imageSrc: string;
  name: string;
  discountPrice?: string;
  brand: string;
  price: string;
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className="relative w-70 h-100 rounded-xl flex flex-col shadow-[1px_2px_5px_rgba(0,0,0,0.2)] items-center text-center p-4 group cursor-pointer overflow-hidden">
      {/* Imagen */}
      <div className="w-full h-60 mb-2 flex items-center justify-center rounded-xl overflow-hidden shadow-[1px_1px_4px_rgba(0,0,0,0.1)]">
        <img
          src={props.imageSrc}
          alt={props.name}
          className="w-full h-full object-center object-cover rounded-2xl"
        />
      </div>

      {/*Card Normal */}
      <div className="flex flex-col flex-1 justify-between h-[30%] pt-2 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-[-20px]">
        <div>
          <p className="font-bold font-quicksand">{props.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-main/50">{props.brand}</p>
        </div>
        <div className="font-comme">
          <p className={props.discountPrice ? "text-xs text-gray-main/50 line-through" : "text-lg text-purple-main"}>
            {props.price}
          </p>
          {props.discountPrice && (<p className="text-lg text-purple-main">{props.discountPrice}</p>)}
        </div>
      </div>
      {/*Esto es el hover morado */}
      <div className="absolute bottom-0 left-0 w-full h-[32%] bg-purple-main rounded-xl flex flex-col justify-evenly items-center p-2 transform translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-blue-main">
        <ButtonComponent icon={IconHeart} iconStyle="w-6 h-6 text-purple-main" style="p-2 hover:bg-purple-main rounded-full text-white bg-white-main absolute -top-4 right-2" />
        <IconShoppingCart className="text-white" />
        <p className={props.discountPrice ? "font-comme text-xs text-white-main/50 line-through" : "text-lg text-yellow-main"}>
          {props.price}
        </p>
        {props.discountPrice && (<p className="text-lg font-comme text-yellow-main">{props.discountPrice}</p>)}
          <p className="font-quicksand text-white font-bold">Añadir al carrito</p>
      </div>
    </div>
  );
}

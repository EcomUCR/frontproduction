import { Link } from "react-router-dom";
import { IconEdit, IconHeart, IconShoppingBag } from "@tabler/icons-react";
import ButtonComponent from "../ui/ButtonComponent";

interface ProductCardProps {
    shop: string;
    title: string;
    price: string;
    discountPrice: string;
    img: string;
    edit: boolean
}
export default function ProductCard(props: ProductCardProps) {
    return (
        <figure className="relative flex flex-col h-90 w-55 p-3 bg-light-gray rounded-2xl shadow-md font-quicksand group">
            {props.edit && (
                <Link to="/crudProduct">
                    <ButtonComponent
                        style="absolute top-4 right-4 w-9 h-9 bg-contrast-main rounded-xl flex items-center cursor-pointer justify-center hover:bg-contrast-secondary hover:text-white transition-all duration-400"
                        icon={<IconEdit />}
                    />
                </Link>
            )}

            {!props.edit && (
                <div className="group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out">
                    <ButtonComponent
                        icon={<IconHeart />}
                        iconStyle="text-white"
                        style="absolute top-3 right-3 w-9 h-9 bg-contrast-main rounded-xl flex items-center cursor-pointer justify-center hover:bg-contrast-secondary hover:text-white transition-all duration-400"
                    />
                </div>
            )}

            <div className="w-full h-[55%] mb-2">
                <img className="w-full h-full object-cover rounded-2xl" src={props.img} alt={props.title} />
            </div>
            <div className="flex flex-col justify-center items-center gap-3 h-auto">
                <p className="font-semibold text-center text-sm">{props.title}</p>
                {!props.edit &&
                    <div className="relative w-full flex">
                        <div className="text-center flex flex-col relative w-full gap-3  group-hover:transition-all group-hover:-translate-x-14 transition-all duration-300 ease-in-out">
                            <p className="font-poiret text-sm">{props.shop}</p>
                            <div className="flex flex-col">
                                {props.discountPrice && <p className="line-through font-comme text-xs text-black/30">₡ {props.price}</p> || <p>₡ {props.price}</p>}
                                {props.discountPrice && <p className="font-comme">₡ {props.discountPrice}</p>}
                            </div>
                        </div>
                        <div className="absolute flex flex-col h-17 justify-between transform translate-x-23 opacity-0 group-hover:opacity-100 bg-contrast-main text-white font-semibold p-2 rounded-xl hover:bg-gradient-to-br from-contrast-main to-contrast-secondary items-center transition-all duration-300 cursor-pointer">
                            <IconShoppingBag />
                            <ButtonComponent style="w-full text-xs" text={"Añadir al carrito"} />
                        </div>
                    </div>
                }
                {props.edit &&
                    <div className="text-center flex flex-col relative w-full gap-3">
                        <p className="font-poiret text-sm">{props.shop}</p>
                        <div className="flex flex-col">
                            {props.discountPrice && <p className="line-through font-comme text-xs text-black/30">₡ {props.price}</p> || <p>₡ {props.price}</p>}
                            {props.discountPrice && <p className="font-comme">₡ {props.discountPrice}</p>}
                        </div>
                    </div>
                }


            </div>
        </figure>
    );
}
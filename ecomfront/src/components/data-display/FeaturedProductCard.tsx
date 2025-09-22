import { IconEdit, IconHeart } from "@tabler/icons-react";
import ButtonComponent from "../ui/ButtonComponent";
import RaitingComponent from "../ui/StarRatingComponent";
interface FeaturedProductCardProps {
    shop: string;
    img: string;
    title: string;
    price: string;
    discountPrice?: string;
    rating: number;
    edit: boolean;
}
export default function FeaturedProductCard(props: FeaturedProductCardProps) {
    return (
        <figure className="relative w-full max-w-lg p-4 bg-light-gray rounded-2xl shadow-md overflow-hidden flex font-quicksand hover:scale-105 transition-all duration-300">
            {props.edit && <div className="absolute top-3 right-3 w-9 h-9 bg-contrast-main/70 rounded-full flex items-center cursor-pointer justify-center hover:bg-contrast-secondary hover:text-white transition-all duration-400"><IconEdit /></div> }
            <div className="w-1/2 flex items-center">
                <img className="w-full h-full object-cover rounded-2xl" src={props.img} alt={props.title} />
            </div>
            <div className="flex flex-col justify-between w-1/2 pl-6 py-1">
                <p className="font-light font-poiret">{props.shop}</p>
                <h3 className="font-semibold text-md">{props.title}</h3>
                <RaitingComponent value={props.rating} size={12} />
                <div>
                    {props.discountPrice && <p className="font-comme line-through text-xs text-black/30">₡ {props.price}</p> || <p className="font-comme">₡ {props.price}</p>}
                    {props.discountPrice && <p className="font-comme text-lg">₡ {props.discountPrice}</p>}
                </div>
                {!props.edit && 
                <div className="flex gap-2 w-full text-white">
                    <ButtonComponent style="bg-contrast-secondary w-full rounded-full text-base hover:bg-gradient-to-br from-contrast-main via-contrast-secondary to-main transition-all duration-400 py-2 shadow-md" text={"Añadir al carrito"} />
                    <ButtonComponent style="bg-contrast-main rounded-full h-auto w-auto p-2 flex items-center justify-center hover:bg-contrast-secondary transition-all duration-400 shadow-md" icon={<IconHeart />} iconStyle="" />
                </div>
                }
            </div>
        </figure>
    );
}
import { IconHeart, IconTrash } from "@tabler/icons-react";
import audifonos from "../../img/audifonos.png";
import StarRatingComponent from "../ui/StarRatingComponent";
export default function ProductCardShopping() {
    return (
        <figure className="flex border border-main rounded-xl my-5 w-full justify-between p-5">
            <div className="1/6 flex items-center justify-center pr-5">
                <img className="p-5 rounded-xl" src={audifonos} alt="" />
            </div>
            <div className="font-quicksand w-4/6 flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <p className="font-bold">Audifonos Razer edición Pokemon</p>
                        <p className="text-xs">Disponible</p>
                    </div>
                    <p className="text-xs">Unstable Games</p>
                    <StarRatingComponent value={4} size={10} />
                </div>
                <div className="flex justify-between">
                    <div className="flex justify-between items-center border border-contrast-secondary rounded-full p-1">
                        <p className="text-sm px-4">Cantidad</p>
                        <div className="flex gap-8 border border-contrast-secondary rounded-full px-4">
                            <button>-</button>
                            <p className="font-bold">1</p>
                            <button>+</button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex flex-col w-1/6 justify-between items-end">
                <div className="">
                    <p className="text-xs">$10.000</p>
                    <p className="font-bold text-main text-2xl">$5000</p>
                </div>
                <div className="flex gap-2 text-main">
                    <IconHeart />
                    <IconTrash />
                </div>
            </div>
        </figure>
    );
}
import { IconThumbUp } from "@tabler/icons-react";
import foto from "../../img/perfil.png";
import StarRatingComponent from "../ui/StarRatingComponent";

export default function LargeReviewComponent() {
    return (
        <figure className="flex flex-col gap-5 font-quicksand mt-5">
            <div className="flex items-center gap-5">
                <div>
                    <img src={foto} className="w-10 h-10 rounded-full" alt="" />
                </div>
                <div>
                    <p>John</p>
                    <StarRatingComponent value={4.5} size={10} />
                </div>
            </div>
            <div>
                <p className="font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, illo repellat? Incidunt corporis vero molestiae cumque, deserunt, voluptas officiis suscipit quas corrupti non asperiores mollitia recusandae libero consectetur eum ratione.</p>
            </div>
            <div className="flex justify-between">
                <p className="text-sm text-main-dark/50">Hace una semana</p>
                <div className="flex gap-2">
                    <IconThumbUp className="text-main-dark" />
                    <IconThumbUp className="rotate-180 text-main-dark" />
                </div>
            </div>
            <div className="relative bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-main via-contrast-secondary to-contrast-main"></div>
        </figure>
    );
}
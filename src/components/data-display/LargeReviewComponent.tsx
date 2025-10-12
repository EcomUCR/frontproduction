// import { IconThumbUp } from "@tabler/icons-react";
import StarRatingComponent from "../ui/StarRatingComponent";

interface LargeReviewProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
}

export default function LargeReviewComponent({
  name,
  rating,
  comment,
  date,
  image,
}: LargeReviewProps) {
    console.log("Imagen del usuario:", image);

  return (
    <figure className="flex flex-col gap-5 font-quicksand mt-5">
      <div className="flex items-center gap-5">
        {/* ✅ Usa la imagen del usuario si existe, si no, muestra la predeterminada */}
        <img
          src={image}
          className="w-10 h-10 rounded-full object-contain border border-main/30"
          alt={`Foto de perfil de ${name}`}
        />

        <div>
          <p className="font-semibold">{name}</p>
          <StarRatingComponent value={rating} size={12} />
        </div>
      </div>

      <p className="font-medium">{comment}</p>

      <div className="flex justify-between items-center">
        <p className="text-sm text-main-dark/50">{date}</p>
        <div className="flex gap-2 items-center">{/* Espacio reservado */}</div>
      </div>

      <div className="relative bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-main via-contrast-secondary to-contrast-main"></div>
    </figure>
  );
}

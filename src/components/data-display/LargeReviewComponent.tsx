import { IconThumbUp } from "@tabler/icons-react";
import foto from "../../img/perfil.png";
import StarRatingComponent from "../ui/StarRatingComponent";

interface LargeReviewProps {
    name: string;
    rating: number;
    comment: string;
    date: string;
    likes: number;
    dislikes: number;
    onVote: (type: 'like' | 'dislike') => void;
}

export default function LargeReviewComponent({
    name,
    rating,
    comment,
    date,
    likes,
    dislikes,
    onVote
}: LargeReviewProps) {
    return (
        <figure className="flex flex-col gap-5 font-quicksand mt-5">
            <div className="flex items-center gap-5">
                <img src={foto} className="w-10 h-10 rounded-full" alt="foto de perfil" />
                <div>
                    <p className="font-semibold">{name}</p>
                    <StarRatingComponent value={rating} size={12} />
                </div>
            </div>

            <p className="font-medium">{comment}</p>

            <div className="flex justify-between items-center">
                <p className="text-sm text-main-dark/50">{date}</p>
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => onVote('like')}
                        className="flex items-center gap-1 text-main-dark hover:text-green-600 transition"
                    >
                        <IconThumbUp />
                        {likes}
                    </button>
                    <button
                        onClick={() => onVote('dislike')}
                        className="flex items-center gap-1 text-main-dark hover:text-red-600 transition"
                    >
                        <IconThumbUp className="rotate-180" />
                        {dislikes}
                    </button>
                </div>
            </div>

            <div className="relative bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-main via-contrast-secondary to-contrast-main"></div>
        </figure>
    );
}

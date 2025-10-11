import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import InteractiveRatingSummary from "../../../../components/ui/InteractiveRatingSummary";
import LargeReviewComponent from "../../../../components/data-display/LargeReviewComponent";

interface Review {
    id?: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
}

const BASE_URL = "https://ecomapi-kruj.onrender.com/api";

export default function SellerReviewsComponent() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentRating, setCurrentRating] = useState(0);
    const { id: storeId } = useParams(); // 👈 obtenemos el id de la tienda desde la URL

    // 🧩 Cargar reseñas desde el backend
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!storeId) return;

                const res = await axios.get(`${BASE_URL}/stores/${storeId}/reviews`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Convertimos la respuesta a nuestro formato
                const formatted = res.data.map((r: any) => ({
                    id: r.id,
                    name:
                        r.user?.first_name || r.user?.username || "Usuario desconocido",
                    rating: r.rating,
                    comment: r.comment || "",
                    date: new Date(r.created_at).toLocaleDateString(),
                }));

                setReviews(formatted);
            } catch (err: any) {
                console.error("Error al obtener reseñas:", err.response?.data || err);
            }
        };

        fetchReviews();
    }, [storeId]);

    // ⭐ Guardar reseña nueva (ya lo tienes conectado)
    const handleSaveReview = (newReview: Omit<Review, "date">) => {
        const reviewWithDate: Review = {
            ...newReview,
            date: new Date().toLocaleDateString(),
        };

        setReviews((prev) => [reviewWithDate, ...prev]);
        setCurrentRating(0);
    };

    const handleRatingChange = (newRating: number) => {
        setCurrentRating(newRating);
    };

    return (
        <section className="mx-10 my-5">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold font-quicksand">
                    Opiniones de clientes
                </h2>
            </div>

            <div className="flex w-full">
                <div className="flex border w-[35%] border-main rounded-2xl">
                    <InteractiveRatingSummary
                        initialValue={currentRating}
                        onRatingChange={handleRatingChange}
                        onSaveReview={handleSaveReview}
                        storeId={Number(storeId)}
                    />
                </div>

                <div className="flex flex-col w-[65%] pl-20">
                    <div className="flex items-center gap-2">
                        <h3>Opiniones</h3>
                        <p className="bg-main-dark/20 py-1 px-2 rounded-full text-xs">
                            {reviews.length}
                        </p>
                    </div>

                    {reviews.length > 0 ? (
                        reviews.map((r) => (
                            <LargeReviewComponent
                                key={r.id}
                                name={r.name}
                                rating={r.rating}
                                comment={r.comment}
                                date={r.date}
                            />
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 mt-5">
                            No hay opiniones aún. ¡Sé el primero en dejar una!
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

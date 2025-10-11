import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InteractiveRatingSummary from "../../../../components/ui/InteractiveRatingSummary";
import LargeReviewComponent from "../../../../components/data-display/LargeReviewComponent";
import { useRatings } from "../../infrastructure/useRatings"; // ⬅️ usamos el hook
import { SkeletonSellerReviews } from "../../../../components/ui/AllSkeletons";

interface Review {
  id?: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export default function SellerReviewsComponent() {
  const { id: storeId } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);

  // ✅ Hook centralizado para ratings
  const { loading, refreshSummary } = useRatings(Number(storeId));

  // 🧩 Cargar reseñas desde el backend
  useEffect(() => {
    const fetchReviews = async () => {
      if (!storeId) return;

      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(
          `https://ecomapi-kruj.onrender.com/api/stores/${storeId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Error al obtener reseñas");

        const data = await res.json();

        const formatted = data.map((r: any) => ({
          id: r.id,
          name: r.user?.first_name || r.user?.username || "Usuario desconocido",
          rating: r.rating,
          comment: r.comment || "",
          date: new Date(r.created_at).toLocaleDateString(),
        }));

        setReviews(formatted);
      } catch (err) {
        console.error("Error al obtener reseñas:", err);
      }
    };

    fetchReviews();
  }, [storeId]);

  // ⭐ Guardar reseña nueva y refrescar el resumen
  const handleSaveReview = async (newReview: Omit<Review, "date">) => {
    const reviewWithDate: Review = {
      ...newReview,
      date: new Date().toLocaleDateString(),
    };

    // 🧠 Añadir reseña nueva al listado
    setReviews((prev) => [reviewWithDate, ...prev]);

    // 🔁 Refrescar el resumen de estrellas
    await refreshSummary();
  };

  if (loading) return <SkeletonSellerReviews show />;
  return (
    <section className="mx-10 my-5">
      <div className="flex w-full items-start">
        {/* Columna izquierda: resumen y formulario */}
        <div className="w-[35%] border border-main rounded-2xl p-4 h-fit self-start">
          <InteractiveRatingSummary
            onSaveReview={handleSaveReview}
            storeId={Number(storeId)}
            barColor="#ff7e47"
          />
        </div>

        {/* Columna derecha: lista de reseñas */}
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

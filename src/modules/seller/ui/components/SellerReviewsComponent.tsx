import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InteractiveRatingSummary from "../../../../components/ui/InteractiveRatingSummary";
import LargeReviewComponent from "../../../../components/data-display/LargeReviewComponent";
import { useRatings } from "../../infrastructure/useRatings";
import { SkeletonSellerReviews } from "../../../../components/ui/AllSkeletons";
import { useAuth } from "../../../../hooks/context/AuthContext";
import { useAlert } from "../../../../hooks/context/AlertContext";

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
  const { token } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { loading, refreshSummary } = useRatings(Number(storeId));

  // ✅ Manejar guardar reseña
  const handleSaveReview = async (newReview: Omit<Review, "date">) => {
    if (!token) {
      showAlert({
        title: "Inicia sesión",
        message: "Debes iniciar sesión para dejar una reseña 📝",
        confirmText: "Ir al login",
        cancelText: "Cancelar",
        onConfirm: () => {
          navigate("/loginRegister");
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
      return;
    }

    try {
      const reviewWithDate: Review = {
        ...newReview,
        date: new Date().toLocaleDateString(),
      };

      setReviews((prev) => [reviewWithDate, ...prev]);
      await refreshSummary();
      showAlert({
        title: "Gracias por tu reseña",
        message: "Tu opinión ha sido guardada correctamente",
        type: "success",
      });
    } catch (error) {
      console.error(error);
      showAlert({
        title: "Error inesperado",
        message: "Hubo un problema al guardar la reseña",
        confirmText: "Ok",
        type: "error",
      });
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (!storeId) return;
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(
          `https://ecomapi-kruj.onrender.com/api/stores/${storeId}/reviews`,
          {
            headers: { Authorization: `Bearer ${token}` },
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

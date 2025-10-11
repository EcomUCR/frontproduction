import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useAuth } from "../../hooks/context/AuthContext";
import axios from "axios";

interface InteractiveRatingSummaryProps {
  initialValue?: number;
  maxStars?: number;
  barColor?: string;
  onRatingChange: (value: number) => void;
  onSaveReview: (review: { name: string; comment: string; rating: number }) => void;
  storeId: number; // 👈 id de la tienda que el usuario está viendo
}

export default function InteractiveRatingSummary({
  initialValue = 0,
  maxStars = 5,
  barColor = "#ff7e47",
  onRatingChange,
  onSaveReview,
  storeId,
}: InteractiveRatingSummaryProps) {
  const BASE_URL = "https://ecomapi-kruj.onrender.com/api";
  const { user } = useAuth();

  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");
  const [lastClickedStar, setLastClickedStar] = useState<number | null>(null);
  const [clickCount, setClickCount] = useState(0);

  const displayRating = hover || rating;
  const selectedFloorRating = Math.floor(displayRating);
  const isHalfBar = displayRating % 1 !== 0;

  const RatingBar = ({ star }: { star: number }) => {
    let width = "0%";
    if (star === selectedFloorRating + 1 && isHalfBar) width = "50%";
    else if (star <= selectedFloorRating) width = "100%";
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold text-gray-700 w-3">{star}★</span>
        <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width, backgroundColor: barColor }}
          ></div>
        </div>
      </div>
    );
  };

  const handleClick = (index: number) => {
    const starNumber = index + 1;

    if (lastClickedStar === index) {
      if (clickCount === 1) {
        setRating(starNumber);
        onRatingChange(starNumber);
        setClickCount(2);
      } else {
        setRating(starNumber - 1);
        onRatingChange(starNumber - 1);
        setClickCount(1);
      }
    } else {
      setRating(starNumber - 0.5);
      onRatingChange(starNumber - 0.5);
      setLastClickedStar(index);
      setClickCount(1);
    }
  };

  const handleSave = async () => {
    if (!storeId) {
      alert("No se pudo identificar la tienda para esta reseña.");
      return;
    }

    const userFullName = user
      ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim()
      : "";

    if (!userFullName || !comment.trim() || rating === 0) {
      alert("Por favor completa todos los campos y selecciona una calificación.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      const data = {
        store_id: storeId, // 👈 tienda que el usuario está viendo
        user_id: user?.id,
        rating: Math.round(rating),
        comment: comment.trim(),
        like: false,
        dislike: false,
      };

      const res = await axios.post(`${BASE_URL}/store-reviews`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Reseña guardada:", res.data);
      alert("¡Reseña enviada con éxito!");

      onSaveReview({ name: userFullName, comment: comment.trim(), rating });

      // Limpiar formulario
      setComment("");
      setShowForm(false);
      setRating(0);
      setLastClickedStar(null);
      setClickCount(0);
    } catch (err: any) {
      console.error("Error al guardar la reseña:", err.response?.data || err.message);
      alert("Ocurrió un error al enviar la reseña.");
    }
  };

  return (
    <div className="p-4 w-full font-quicksand">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col items-start w-1/3">
          <h2 className="text-5xl font-bold mb-1">{displayRating.toFixed(1)}</h2>
          <div className="flex">
            {Array.from({ length: maxStars }).map((_, i) => {
              const starSize = 20;
              const isFull = i + 1 <= Math.floor(displayRating);
              const isHalf = displayRating - i > 0 && displayRating - i < 1;

              return (
                <div
                  key={i}
                  className="relative cursor-pointer"
                  style={{ width: starSize, height: starSize }}
                  onClick={() => handleClick(i)}
                  onMouseEnter={() => setHover(i + 0.5)}
                  onMouseLeave={() => setHover(0)}
                >
                  <IconStar size={starSize} className="text-gray-300" />
                  {(isFull || isHalf) && (
                    <div
                      className="absolute left-0 top-0 overflow-hidden"
                      style={{
                        width: isFull ? "100%" : `${(displayRating - i) * 100}%`,
                        height: starSize,
                      }}
                    >
                      <IconStarFilled size={starSize} className="text-orange-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-sm text-gray-500 mt-1">Tu calificación</p>
        </div>

        <div className="flex flex-col w-1/2 space-y-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <RatingBar key={star} star={star} />
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          const token = localStorage.getItem("access_token");

          if (token) {
            setShowForm(!showForm);
          } else {
            window.location.href = "/loginRegister"; // 👈 redirige a login si no hay sesión
          }
        }}
        className="w-full py-3 text-white font-semibold rounded-lg transition duration-200"
        style={{ backgroundColor: barColor }}
        disabled={rating === 0}
      >
        Escribir opinión
      </button>

      {showForm && (
        <div className="mt-4 border border-main/40 rounded-lg p-3 bg-white shadow-sm">
          <label className="block mb-2 text-sm font-semibold">Nombre</label>
          <input
            type="text"
            value={
              user
                ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim()
                : ""
            }
            readOnly
            className="w-full border rounded p-2 mb-3 text-sm bg-gray-100 cursor-not-allowed"
          />

          <label className="block mb-2 text-sm font-semibold">Comentario</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2 h-20 text-sm resize-none"
            placeholder="Escribe tu opinión aquí..."
          />

          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded bg-gray-200 text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded text-white text-sm"
              style={{ backgroundColor: barColor }}
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

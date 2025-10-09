import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";

/* ============================================================
   💎 Skeleton con efecto de desvanecimiento (Fade-out global)
   ============================================================ */
function FadeWrapper({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(show);
  const [opacity, setOpacity] = useState(show ? "opacity-100" : "opacity-0");

  useEffect(() => {
    if (show) {
      setVisible(true);
      setOpacity("opacity-100");
    } else {
      setOpacity("opacity-0");
      const timer = setTimeout(() => setVisible(false), 600); // coincide con duration-700
      return () => clearTimeout(timer);
    }
  }, [show]);

  return visible ? (
    <div className={`transition-opacity duration-700 ease-in-out ${opacity}`}>
      {children}
    </div>
  ) : null;
}

/* ============================================================
   💎 Skeleton para productos normales (tarjetas verticales)
   ============================================================ */
export const SkeletonProduct = ({
  count = 5,
  show = true,
}: {
  count?: number;
  show?: boolean;
}) => (
  <FadeWrapper show={show}>
    <div className="grid grid-cols-5 my-10 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col h-[340px] w-full p-3 bg-light-gray rounded-2xl shadow-md"
        >
          <Skeleton className="w-full h-[180px] rounded-2xl mb-4 bg-gray-300/70" />
          <Skeleton className="w-4/5 h-[16px] mx-auto mb-2 rounded-md bg-gray-300/70" />
          <Skeleton className="w-1/2 h-[12px] mx-auto mb-3 rounded-md bg-gray-300/70" />
          <div className="flex flex-col items-center gap-1">
            <Skeleton className="w-1/2 h-[14px] rounded-md bg-gray-300/70" />
            <Skeleton className="w-2/3 h-[14px] rounded-md bg-gray-300/70" />
          </div>
        </div>
      ))}
    </div>
  </FadeWrapper>
);

/* ============================================================
   ⭐ Skeleton para productos destacados (tarjetas horizontales)
   ============================================================ */
export const SkeletonFeatured = ({
  count = 2,
  show = true,
}: {
  count?: number;
  show?: boolean;
}) => (
  <FadeWrapper show={show}>
    <div className="flex gap-8 overflow-hidden mt-6 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative w-[600px] p-5 bg-light-gray rounded-2xl shadow-md overflow-hidden flex font-quicksand"
        >
          <div className="w-1/2 flex items-center justify-center">
            <Skeleton className="w-[90%] h-[230px] rounded-2xl bg-gray-300/70" />
          </div>
          <div className="flex flex-col justify-between w-1/2 pl-6 py-1">
            <Skeleton className="w-2/3 h-[14px] mb-2 rounded-md bg-gray-300/70" />
            <Skeleton className="w-4/5 h-[20px] mb-4 rounded-md bg-gray-300/70" />
            <div className="flex gap-2 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton
                  key={j}
                  className="w-[12px] h-[12px] rounded-full bg-gray-300/70"
                />
              ))}
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <Skeleton className="w-1/2 h-[14px] rounded-md bg-gray-300/70" />
              <Skeleton className="w-2/3 h-[14px] rounded-md bg-gray-300/70" />
            </div>
            <div className="flex gap-2 w-full">
              <Skeleton className="w-full h-[38px] rounded-full bg-gray-300/70" />
              <Skeleton className="w-[45px] h-[38px] rounded-full bg-gray-300/70" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </FadeWrapper>
);

/* ============================================================
   🧭 Skeleton para categorías (CategoryCard)
   ============================================================ */
export const SkeletonCategory = ({
  count = 4,
  show = true,
}: {
  count?: number;
  show?: boolean;
}) => (
  <FadeWrapper show={show}>
    <div className="grid grid-cols-4 gap-6 my-10 justify-items-center">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative w-55 h-22 flex flex-col items-center justify-center rounded-2xl overflow-hidden shadow-md bg-light-gray"
        >
          <Skeleton className="absolute inset-0 w-full h-full rounded-2xl bg-gray-300/70" />
          <Skeleton className="w-[40px] h-[40px] rounded-full bg-gray-300/70 z-10 mb-2" />
          <Skeleton className="w-[80px] h-[14px] rounded-md bg-gray-300/70 z-10" />
        </div>
      ))}
    </div>
  </FadeWrapper>
);
/* ============================================================
   🧩 Skeleton de página de producto completo
   ============================================================ */
export const SkeletonProductPageMain = ({
  show = true,
}: {
  show?: boolean;
}) => (
  <FadeWrapper show={show}>
    <div className="flex px-10 pt-10 font-quicksand animate-pulse gap-10">
      {/* 🔹 Imagen principal + botones de acción */}
      <div className="w-3/12 flex flex-col gap-6">
        <Skeleton className="w-full h-[350px] rounded-2xl bg-gray-300/70" />
        <div className="border-t-2 border-main pt-6">
          <div className="flex justify-between gap-2">
            <Skeleton className="w-1/2 h-[40px] rounded-full bg-gray-300/70" />
            <Skeleton className="w-1/2 h-[40px] rounded-full bg-gray-300/70" />
          </div>
        </div>
      </div>

      {/* 🔹 Columna central (nombre, precio, tabs, descripción) */}
      <div className="w-6/12 px-10 border-r-2 border-main mr-5">
        <div className="flex flex-col gap-4">
          <Skeleton className="w-3/4 h-[28px] rounded-md bg-gray-300/70" />
          <Skeleton className="w-1/3 h-[18px] rounded-md bg-gray-300/70" />
          <Skeleton className="w-1/4 h-[16px] rounded-md bg-gray-300/70" />
          <Skeleton className="w-1/2 h-[32px] rounded-md bg-gray-300/70" />
        </div>

        {/* Tabs */}
        <div className="flex justify-between my-10">
          <Skeleton className="w-[120px] h-[40px] rounded-full bg-gray-300/70" />
          <Skeleton className="w-[120px] h-[40px] rounded-full bg-gray-300/70" />
          <Skeleton className="w-[120px] h-[40px] rounded-full bg-gray-300/70" />
        </div>

        {/* Descripción */}
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-full h-[14px] rounded-md bg-gray-300/70"
            />
          ))}
        </div>
      </div>

      {/* 🔹 Columna de compra (FormShopping) */}
      <div className="w-3/12 flex flex-col gap-4">
        <Skeleton className="w-full h-[260px] rounded-2xl bg-gray-300/70" />
        <Skeleton className="w-full h-[50px] rounded-full bg-gray-300/70" />
        <Skeleton className="w-full h-[50px] rounded-full bg-gray-300/70" />
      </div>
    </div>
  </FadeWrapper>
);

/* ============================================================
   🎠 Skeleton del slider de productos destacados
   ============================================================ */
export const SkeletonFeaturedSlider = ({ show = true }: { show?: boolean }) => (
  <FadeWrapper show={show}>
    <div className="flex gap-8 overflow-hidden mt-6 justify-center animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="relative w-[300px] p-3 bg-light-gray rounded-2xl shadow-md overflow-hidden flex flex-col"
        >
          <Skeleton className="w-full h-[160px] rounded-2xl mb-4 bg-gray-300/70" />
          <Skeleton className="w-4/5 h-[16px] mb-2 rounded-md bg-gray-300/70 mx-auto" />
          <Skeleton className="w-1/2 h-[14px] mb-2 rounded-md bg-gray-300/70 mx-auto" />
          <Skeleton className="w-2/3 h-[14px] mb-2 rounded-md bg-gray-300/70 mx-auto" />
        </div>
      ))}
    </div>
  </FadeWrapper>
);

/* ============================================================
   🛒 Skeleton de productos similares
   ============================================================ */
export const SkeletonSimilarProducts = ({
  show = true,
}: {
  show?: boolean;
}) => (
  <FadeWrapper show={show}>
    <div className="grid grid-cols-5 gap-5 my-10 animate-pulse">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col h-[320px] w-full p-3 bg-light-gray rounded-2xl shadow-md"
        >
          <Skeleton className="w-full h-[180px] rounded-2xl mb-4 bg-gray-300/70" />
          <Skeleton className="w-4/5 h-[16px] mx-auto mb-2 rounded-md bg-gray-300/70" />
          <Skeleton className="w-1/2 h-[12px] mx-auto mb-3 rounded-md bg-gray-300/70" />
          <Skeleton className="w-1/2 h-[14px] rounded-md mx-auto bg-gray-300/70" />
        </div>
      ))}
    </div>
  </FadeWrapper>
);

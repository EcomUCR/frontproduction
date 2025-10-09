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
    <div
      className={`transition-opacity duration-700 ease-in-out ${opacity}`}
    >
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

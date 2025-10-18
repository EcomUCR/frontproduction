import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import BannerComponent from "../data-display/BannerComponent";
import { useBanner } from "../../modules/admin/infrastructure/useBanner"; // ✅ usa el hook
import { useEffect } from "react";

export default function HeaderSlider() {
  const { banners, fetchBanners, loading } = useBanner();

  useEffect(() => {
    fetchBanners();
  }, []);

  // 🔹 Filtrar solo los banners tipo SLIDER activos
  const sliderBanners = banners.filter(
    (b) => b.type === "SLIDER" && b.is_active
  );

  return (
    <header>
      {loading ? (
        <p className="text-gray-500 text-center my-10">Cargando banners...</p>
      ) : sliderBanners.length > 0 ? (
        <Carousel className="mx-10">
          <CarouselContent className="h-[30rem]">
            {sliderBanners.map((b) => (
              <CarouselItem
                key={b.id}
                className="basis-full flex justify-center items-center"
              >
                <BannerComponent
                  {...b}
                  image={
                    typeof b.image === "string"
                      ? b.image
                      : URL.createObjectURL(b.image)
                  }
                  character={
                    b.character
                      ? typeof b.character === "string"
                        ? b.character
                        : URL.createObjectURL(b.character)
                      : undefined
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p className="text-gray-500 text-center my-10">
          No hay banners de tipo SLIDER activos
        </p>
      )}
    </header>
  );
}

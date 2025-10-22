import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import BannerComponent from "../data-display/BannerComponent";
import { useBanner } from "../../modules/admin/infrastructure/useBanner";
import { useEffect } from "react";
import { SkeletonHeaderSlider } from "../ui/AllSkeletons";

export default function HeaderSlider() {
  const { banners, fetchBanners, loading } = useBanner();

  useEffect(() => {
    fetchBanners();
  }, []);

  // Filtrar solo banners tipo SLIDER activos
  const sliderBanners = banners.filter(
    (b) => b.type === "SLIDER" && b.is_active
  );

  return (
    <header className="w-full">
      {loading ? (
        <SkeletonHeaderSlider />
      ) : sliderBanners.length > 0 ? (
        <Carousel className="mx-3 sm:mx-6 md:mx-10">
          <CarouselContent className="h-[10rem] sm:h-[22rem] md:h-[28rem] lg:h-[30rem]">
            {sliderBanners.map((b) => (
              <CarouselItem
                key={b.id}
                className="basis-full flex justify-center items-center"
              >
                <div className="w-full h-full flex justify-center items-center">
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
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Botones del carrusel */}
          <CarouselPrevious className="hidden sm:flex left-2 sm:left-4" />
          <CarouselNext className="hidden sm:flex right-2 sm:right-4" />
        </Carousel>
      ) : (
        <p className="text-gray-500 text-center my-10">
          No hay banners de tipo SLIDER activos
        </p>
      )}
    </header>
  );
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

import banner from "../../img/resources/banner1.jpg";
import banner6 from "../../img/resources/banner6.png";
import banner4 from "../../img/resources/banner4.png";
import banner5 from "../../img/resources/banner5.png";

export default function HeaderSlider() {
  return (
    <header>
      {/* 🧱 Mantiene margen original en PC */}
      <Carousel className="mx-10 sm:mx-10 xs:mx-0">
        {/* 🎯 Mantiene igual en escritorio, pero panorámico en móvil */}
        <CarouselContent
          className="
            h-[30rem] md:h-[28rem] sm:h-[22rem]
            xs:h-[10rem] xs:overflow-hidden
            will-change-transform
          "
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {[banner, banner5, banner6, banner4].map((img, index) => (
            <CarouselItem
              key={index}
              className="basis-full flex justify-center items-center"
            >
              <img
                src={img}
                alt={`banner-${index + 1}`}
                loading="lazy"
                decoding="async"
                className="
                  w-[90%] h-[80%] object-cover rounded-3xl select-none pointer-events-none
                  xs:w-full xs:h-full xs:rounded-none
                "
                style={{
                  aspectRatio: "16/6",
                  objectPosition: "center",
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 🖱️ Botones iguales en PC, ocultos en móvil */}
        <CarouselPrevious className="hidden sm:flex lg:flex" />
        <CarouselNext className="hidden sm:flex lg:flex" />
      </Carousel>
    </header>
  );
}

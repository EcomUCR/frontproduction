import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselStatus, } from "./carousel"

import audifonosImg from "../../img/audifonos.png";
import cacaoImg from "../../img/cacao.png";
import cuchillosImg from "../../img/cuchillos.png";
import parlanteImg from "../../img/parlante.png";
import React from "react";
import ProductCard from "./ProductCard";

const products = [
    { name: "Parlante bluetooth JBL dssadasda dasdasda dawed", brand: "JBL", discountPrice: "₡20.000", price: "₡24.500", img: parlanteImg },
    { name: "Audífonos Gamer Razer", brand: "Razer", price: "₡26.950", img: audifonosImg },
    { name: "Parlante bluetooth JBL", brand: "JBL", price: "₡24.500", img: parlanteImg },
    { name: "Chocolate amargo OKKO 200mg", brand: "OKKO", price: "₡44.950", img: cacaoImg },
    { name: "Audífonos Gamer Razer", brand: "Razer", price: "₡26.950", img: audifonosImg },
    { name: "Set cuchillos Telstar", brand: "Telstar", price: "₡15.750", img: cuchillosImg },
    { name: "Parlante bluetooth JBL", brand: "JBL", price: "₡24.500", img: parlanteImg },
    { name: "Chocolate amargo OKKO", brand: "OKKO", price: "₡44.950", img: cacaoImg },
];

/*
imageSrc: string;
  name: string;
  discount: string;
  brand: string;
  price: string;
*/

function useMediaQuery(query: string) {
    const [matches, setMatches] = React.useState(false)

    React.useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) {
            setMatches(media.matches)
        }
        const listener = () => setMatches(media.matches)
        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
    }, [matches, query])

    return matches
}

export default function ProductsSlider() {

    const isSmall = useMediaQuery("(max-width: 640px)")
    return (
        <div className="flex items-center justify-center overflow-hidden w-full">
            <div className="max-w-full">
                <Carousel opts={{ loop: isSmall /*true*/  }}>
                    <CarouselContent>
                        {products.map((p, i) => (
                            <CarouselItem className="h-95 w-10" key={i}>
                                <ProductCard
                                    imageSrc={p.img}
                                    name={p.name}
                                    brand={p.brand}
                                    price={p.price}
                                    discountPrice={p.discountPrice}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                    <CarouselStatus className="lg:hidden flex justify-center" />
                </Carousel>
            </div>
        </div>
    );
}
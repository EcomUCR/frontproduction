import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../navigation/carousel";
import FeaturedProductCard from "./FeaturedProductCard";

interface FeaturedProductsSliderProps {
  products: {
    id: number;
    shop: string;
    title: string;
    price: string;
    discountPrice: string;
    rating: number;
    img: string;
  }[];
}

export default function FeaturedProductsSlider(props: FeaturedProductsSliderProps) {
  return (
    <Carousel
      className="
        mx-0 xs:mx-2 sm:mx-6 md:mx-10
        transition-all duration-300
      "
    >
      <CarouselContent className="py-6">
        {props.products.map((product) => (
          <CarouselItem
            key={product.id}
            className="
              basis-[100%] sm:basis-[80%] md:basis-[50%]
              flex justify-center items-center
              px-0 xs:px-1 sm:px-2
              my-3 sm:my-6 md:my-8
              transition-all duration-300
            "
          >
            <FeaturedProductCard
              id={product.id}
              shop={product.shop}
              img={product.img}
              title={product.title}
              price={product.price}
              discountPrice={product.discountPrice}
              rating={product.rating}
              edit={false}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* ✅ Flechas solo en pantallas medianas en adelante */}
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}

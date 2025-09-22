import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../navigation/carousel";
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
        <Carousel className="mx-10">
            <CarouselContent>
                {props.products.map(product => (
                    <CarouselItem className="basis-[50%] flex justify-center items-center pl-0 my-8" key={product.id}>
                        <FeaturedProductCard
                            shop={product.shop}
                            img={product.img}
                            title={product.title}
                            price={product.price}
                            discountPrice={product.discountPrice}
                            rating={product.rating}
                            edit = {false}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
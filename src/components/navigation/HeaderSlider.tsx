import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import banner from "../../img/resources/banner1.jpg";
export default function HeaderSlider() {
    return (
        <header>
            <Carousel className="mx-10">
                <CarouselContent className="">
                    <CarouselItem className="basis-full flex justify-center items-center" ><img src={banner} alt="" className="w-[90%] h-[80%] object-cover rounded-3xl"/></CarouselItem>
                    <CarouselItem className="basis-full flex justify-center items-center"><img src={banner} alt="" className="w-[90%] h-[80%] object-cover rounded-3xl"/></CarouselItem>
                    <CarouselItem className="basis-full flex justify-center items-center"><img src={banner} alt="" className="w-[90%] h-[80%] object-cover rounded-3xl"/></CarouselItem>
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </header>
    );

}
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import banner from "../../img/resources/banner1.jpg";
import banner3 from "../../img/resources/banner3.png";
import banner4 from "../../img/resources/banner4.png";
import banner5 from "../../img/resources/banner5.png";

export default function HeaderSlider() {
    return (
        <header>
            <Carousel className="mx-10">
                <CarouselContent className="">
                    <CarouselItem className="basis-full flex justify-center items-center" ><img src={banner} alt="" className="w-[90%] h-[80%] object-cover rounded-3xl"/></CarouselItem>
                    <CarouselItem className="basis-full flex justify-center items-center" ><img src={banner3} alt="" className="w-[90%] h-[80%] object-cover rounded-3xl"/></CarouselItem>
                    <CarouselItem className="basis-full flex justify-center items-center"><img src={banner5} alt="" className="w-[90%] h-[80%] object-cover rounded-3xl"/></CarouselItem>
                    <CarouselItem className="basis-full flex justify-center items-center"><img src={banner4} alt="" className="w-[90%] h-[80%] object-cover rounded-3xl"/></CarouselItem>
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </header>
    );

}
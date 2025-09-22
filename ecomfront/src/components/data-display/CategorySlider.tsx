import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../navigation/carousel";
import CategoryCard from "./CategoryCard";
import { IconHeart } from "@tabler/icons-react";
import bg from '../../img/resources/Home.png';

export default function CategorySlider() {
    return (
        <Carousel className="mx-10">
            <CarouselContent className="">
                <CarouselItem className="basis-[22%] flex justify-center items-center pl-0 my-8 "><CategoryCard title="Categoria 1" img={bg} icon={IconHeart} url="#" /></CarouselItem>
                <CarouselItem className="basis-[22%] flex justify-center items-center pl-0 my-8"><CategoryCard title="Categoria 2" img={bg} icon={IconHeart} url="#" /></CarouselItem>
                <CarouselItem className="basis-[22%] flex justify-center items-center pl-0 my-8"><CategoryCard title="Categoria 3" img={bg} icon={IconHeart} url="#" /></CarouselItem>
                <CarouselItem className="basis-[22%] flex justify-center items-center pl-0 my-8"><CategoryCard title="Categoria 4" img={bg} icon={IconHeart} url="#" /></CarouselItem>
                <CarouselItem className="basis-[22%] flex justify-center items-center pl-0 my-8"><CategoryCard title="Categoria 5" img={bg} icon={IconHeart} url="#" /></CarouselItem>
                <CarouselItem className="basis-[22%] flex justify-center items-center pl-0 my-8"><CategoryCard title="Categoria 6" img={bg} icon={IconHeart} url="#" /></CarouselItem>
                <CarouselItem className="basis-[22%] flex justify-center items-center pl-0 my-8"><CategoryCard title="Categoria 7" img={bg} icon={IconHeart} url="#" /></CarouselItem>
                <CarouselItem className="basis-[22%] flex justify-center items-center pl-0 my-8"><CategoryCard title="Categoria 8" img={bg} icon={IconHeart} url="#" /></CarouselItem>
                <CarouselItem className="basis-[22%] flex justify-center items-center pl-0 my-8"><CategoryCard title="Categoria 9" img={bg} icon={IconHeart} url="#" /></CarouselItem>
                <CarouselItem className="basis-[22%] flex justify-center items-center pl-0 my-8"><CategoryCard title="Categoria 10" img={bg} icon={IconHeart} url="#" /></CarouselItem>
                <CarouselItem className="basis-[22%] flex justify-center items-center pl-0 my-8"><CategoryCard title="Categoria 11" img={bg} icon={IconHeart} url="#" /></CarouselItem>
                <CarouselItem className="basis-[22%] flex justify-center items-center pl-0 my-8"><CategoryCard title="Categoria 12" img={bg} icon={IconHeart} url="#" /></CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
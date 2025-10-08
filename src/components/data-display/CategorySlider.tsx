import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../navigation/carousel";
import CategoryCard from "./CategoryCard";
import { IconBrush, IconCar, IconPerfume, IconToolsKitchen3, IconClock, IconBallFootball, IconDeviceGamepad2, IconTool, IconArmchair2, IconLeaf, IconBrandAppleArcade, IconHorseToy, IconBook2, IconWashMachine, IconPaw, IconMusic, IconFileInvoice, IconHanger, IconFirstAidKit, IconBrandStackshare, IconDots } from "@tabler/icons-react";
import bg from '../../img/Home.png';
import { useProducts, type Category } from "../../modules/seller/infrastructure/useProducts";
import { useEffect, useState } from "react";

export default function CategorySlider() {
    const categoryIcons: Record<string, React.ElementType> = {
        "Arte": IconBrush,
        "Automotriz": IconCar,
        "Belleza": IconPerfume,
        "Comida": IconToolsKitchen3,
        "Decoracion": IconClock,
        "Deportes": IconBallFootball,
        "Gaming": IconDeviceGamepad2,
        "Herramientas": IconTool,
        "Hogar": IconArmchair2,
        "Jardinería": IconLeaf,
        "Juegos": IconBrandAppleArcade,
        "Juguetes": IconHorseToy,
        "Libros": IconBook2,
        "Limpieza": IconWashMachine,
        "Mascotas": IconPaw,
        "Musica": IconMusic,
        "Oficina": IconFileInvoice,
        "Ropa": IconHanger,
        "Salud": IconFirstAidKit,
        "Tecnología": IconBrandStackshare,
        "Otros": IconDots
    };

    const { getCategories } = useProducts();

    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                console.log("Categorías recibidas:", data);
                setCategories(data);
            } catch (err) {
                console.error("Error al cargar categorías", err);
            }
        };
        fetchCategories();
    }, []);

    return (
        <Carousel className="mx-10">
            <CarouselContent className="">
                {categories.map(category => {
                    const IconComponent = categoryIcons[category.name] || IconDots; // fallback
                    return (
                        <CarouselItem
                            className="basis-[22%] flex justify-center items-center pl-0 my-8"
                            key={category.id}>
                            <CategoryCard
                                title={category.name}
                                img={bg}
                                icon={IconComponent}
                                url="#"//Aquí debe ir el enlace a la categoría
                            />
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../navigation/carousel";
import CategoryCard from "./CategoryCard";
import {
  IconBrush,
  IconCar,
  IconPerfume,
  IconToolsKitchen3,
  IconClock,
  IconBallFootball,
  IconDeviceGamepad2,
  IconTool,
  IconArmchair2,
  IconLeaf,
  IconBrandAppleArcade,
  IconHorseToy,
  IconBook2,
  IconWashMachine,
  IconPaw,
  IconMusic,
  IconFileInvoice,
  IconHanger,
  IconFirstAidKit,
  IconBrandStackshare,
  IconDots,
} from "@tabler/icons-react";
import bg from "../../img/Home.png";
import {
  useProducts,
  type Category,
} from "../../modules/seller/infrastructure/useProducts";
import { useEffect, useState } from "react";

interface CategorySliderProps {
  onLoaded?: () => void; // 👈 nueva prop opcional
}

export default function CategorySlider({ onLoaded }: CategorySliderProps) {
  const categoryIcons: Record<string, React.ElementType> = {
    Arte: IconBrush,
    Automotriz: IconCar,
    Belleza: IconPerfume,
    Comida: IconToolsKitchen3,
    Decoración: IconClock,
    Deportes: IconBallFootball,
    Gaming: IconDeviceGamepad2,
    Herramientas: IconTool,
    Hogar: IconArmchair2,
    Jardinería: IconLeaf,
    Juegos: IconBrandAppleArcade,
    Juguetes: IconHorseToy,
    Libros: IconBook2,
    Limpieza: IconWashMachine,
    Mascotas: IconPaw,
    Música: IconMusic,
    Oficina: IconFileInvoice,
    Ropa: IconHanger,
    Salud: IconFirstAidKit,
    Tecnología: IconBrandStackshare,
    Otros: IconDots,
  };

  const { getCategories } = useProducts();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (mounted) {
          setCategories(data);
          onLoaded?.(); // 👈 Notifica al padre una sola vez
        }
      } catch (err) {
        console.error("Error al cargar categorías", err);
      }
    };
    fetchCategories();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Carousel className="mx-10">
      <CarouselContent>
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.name] || IconDots;
          return (
            <CarouselItem
              className="basis-[22%] flex justify-center items-center pl-0 my-8"
              key={category.id}
            >
              <CategoryCard
                title={category.name}
                img={bg}
                icon={IconComponent}
                url="#"
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

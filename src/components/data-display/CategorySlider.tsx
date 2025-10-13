import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../navigation/carousel";
import CategoryCard from "./CategoryCard";
import {
  useProducts,
  type Category,
} from "../../modules/seller/infrastructure/useProducts";
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

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

interface CategorySliderProps {
  onLoaded?: () => void;
}

export default function CategorySlider({ onLoaded }: CategorySliderProps) {
  const { getCategories } = useProducts();
  const [categories, setCategories] = useState<Category[]>([]);
  const isMobile = useIsMobile();

  // 🔹 lista de íconos (NO LA CAMBIAMOS)
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

  // 🔹 lista de imágenes (NO LA CAMBIAMOS)
  const categoryImages: Record<string, string> = {
    Arte: "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760226912/marketplace/products/c35plsyrpoghpyrvqgbn.jpg",
    Automotriz:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227077/marketplace/products/b18yobklckzl75e6hdth.webp",
    Belleza:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227250/marketplace/products/kmgd7sdobgkdgtmcegnr.jpg",
    Comida:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227684/healthy-breakfast-food-banner-bottom-border-table-scene-fruit-yogurt-smoothie-bowl-nutritious-toasts-cereal-egg-169539283_wsigzk.webp",
    Decoración:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227683/main-home-banner-img-1_w60hyl.jpg",
    Deportes:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227683/360_F_286767786_boXM75PDLYIsYWzabZ3fKcM3esv50TNS_oa1228.jpg",
    Gaming:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227683/game-console-joystick-glowing-neon-buttons-signs-bright-signboard-light-banner-easy-to-edit-illustration-vector_ytaz14.jpg",
    Herramientas:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227683/1000_F_221721790_zTZJlTtFV9CR3hTc6Csd3mhwvkKi0k7q_ufhjxa.jpg",
    Hogar:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227684/new-interior-living-room-comfortable-600nw-2587747311_hbop2d.webp",
    Jardinería:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227684/gardening-banner_1_ui2lkz.jpg",
    Juegos:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227684/1000_F_245698885_xyfD9x2sOW7vPPXjlC1XBELSBwSHLrl9_wb7seh.jpg",
    Juguetes:
      "https://cdn.punchng.com/wp-content/uploads/2025/06/08001354/How-to-Clean-and-Disinfect-Childrens-Toys-1024x575-1.jpg",
    Libros:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227683/old-books-quill-pen-vintage-600nw-2397543085_r9mozm.webp",
    Limpieza:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227683/bucket-cleaning-items-on-wooden-260nw-1159292470_xl268z.webp",
    Mascotas:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227683/various-breeds-of-dogs-peek-out-from-behind-a-wooden-fence-concept-for-pets-veterinary-clinic-or-nutrition-food-for-dogs-banner-with-space-for-text-photo_wysalo.jpg",
    Música:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    Oficina:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227683/360_F_247441003_zWguJzxDwzAx3DEY1vQKBeQItT4YAajz_kwaxzj.jpg",
    Ropa: "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227683/clothes-hanging-hanger-retro-fashion-boutique-banner-website-ai-generated-image-295710199_nijiav.webp",
    Salud:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227683/colorful-assortment-of-capsules-and-tablets-scattered-on-a-blue-background-portraying-various-shapes-sizes-and-colors-representing-pharmaceutical-products-and-health-care-concepts-free-photo_y4sjpj.jpg",
    Tecnología:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    Otros:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760227683/cardboard-boxes-warehouse-ready-transportation-delivery-copy-space-133015006_z3p4zu.webp",
  };

  useEffect(() => {
    let mounted = true;
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (mounted) {
          setCategories(data);
          onLoaded?.();
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

  // 📱 En móvil → 3x2 grid
  if (isMobile) {
    return (
      <div className="grid grid-cols-3 gap-3 px-4 mt-4">
        {categories.slice(0, 6).map((category) => {
          const IconComponent = categoryIcons[category.name] || IconDots;
          const img = categoryImages[category.name] || bg;

          return (
            <Link
              key={category.id}
              to={`/search/${category.id}`}
              className="aspect-square w-full flex"
            >
              <CategoryCard
                title={category.name}
                img={img}
                icon={IconComponent}
                url="#"
              />
            </Link>
          );
        })}
      </div>
    );
  }

  // 💻 En escritorio → carrusel original (no tocamos nada)
  return (
    <Carousel className="mx-10">
      <CarouselContent>
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.name] || IconDots;
          const img = categoryImages[category.name] || bg;
          return (
            <CarouselItem
              className="basis-[22%] flex justify-center items-center pl-0 my-8 transition-transform duration-300 hover:scale-105"
              key={category.id}
            >
              <Link to={`/search/${category.id}`}>
                <CategoryCard
                  title={category.name}
                  img={img}
                  icon={IconComponent}
                  url="#"
                />
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

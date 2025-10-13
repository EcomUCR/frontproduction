interface CategoryCardProps {
  title: string;
  img: string;
  icon: React.ElementType;
  url: string;
}

export default function CategoryCard(props: CategoryCardProps) {
  const Icon = props.icon;

  return (
    <div
      className="
        relative flex flex-col items-center justify-center text-white rounded-2xl
        overflow-hidden font-quicksand
        w-full h-full sm:w-55 sm:h-22
        transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer
      "
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-main/70 z-[1] rounded-2xl"></div>

      {/* Imagen */}
      <img
        src={props.img}
        alt={props.title}
        className="absolute inset-0 w-full h-full object-cover rounded-2xl z-0"
      />

      {/* Contenido */}
      <div className="relative z-[2] flex flex-col items-center justify-center">
        <Icon className="stroke-2 w-8 h-8 sm:w-10 sm:h-10" />
        <p className="hidden sm:block font-bold text-sm sm:text-base">
          {props.title}
        </p>
      </div>
    </div>
  );
}

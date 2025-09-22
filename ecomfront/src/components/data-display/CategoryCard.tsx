interface CategoryCardProps{
    title: string;
    img: string;
    icon: React.ElementType;
    url: string;
}

export default function CategoryCard(props: CategoryCardProps) {
    return(
        <a href={props.url} className="w-55 h-22 flex flex-col relative text-white rounded-2xl items-center justify-center hover:scale-110 hover:cursor-pointer transition-all duration-300">
            <div className="w-full h-full bg-main/70 absolute z-1 rounded-2xl"></div>
            <img src={props.img} alt="" className="w-full h-full object-cover rounded-2xl absolute z-0"/>
            <props.icon className="z-1 stroke-3"/>
            <p className="z-1 font-quicksand font-bold">{props.title}</p>
        </a>
    );
}

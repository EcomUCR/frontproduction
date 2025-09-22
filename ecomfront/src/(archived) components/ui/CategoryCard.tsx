interface CategoryCardProps{
    key: number
    name: string
    icon: React.ElementType
    bg: string
}
export default function CategoryCard(props: CategoryCardProps) {
    return (
                <div key={props.key} className="relative lg:flex lg:flex-col lg:flex-wrap lg:items-center lg:justify-center h-20 w-30 lg:h-40 lg:w-40 rounded-xl lg:rounded-4xl group overflow-hidden shadow-[2px_3px_3px_rgba(0,0,0,0.5)] cursor-pointer">
                    <div className="flex lg:flex-col justify-center lg:w-full h-full p-4 group-hover:scale-110 transition-all duration-500">
                        <div className="flex flex-col z-10 text-white items-center justify-center text:lg lg:text-2xl">
                            {<props.icon className="w-8 h-8" />}
                            <p className="font-quicksand">{props.name}</p>
                        </div>
                        <div className="absolute inset-0 w-full h-full z-1 bg-purple-main/60" />
                        <img src={props.bg} alt="" className="absolute z-0 inset-0 w-full h-full object-cover" />
                    </div>
                </div>
    );
}
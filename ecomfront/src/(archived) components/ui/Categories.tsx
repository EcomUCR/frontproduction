import CategoryCard from "./CategoryCard";

import { IconDeviceGamepad2, IconBallBaseball, IconHome, IconToolsKitchen2, IconHanger, IconTool, /*IconLamp*/ } from "@tabler/icons-react";

import bg1 from "../../img/gaming.jpg";
import bg2 from "../../img/deportes.jpg";
import bg3 from "../../img/Home.png";
import bg4 from "../../img/comida.jpg";
import bg5 from "../../img/ropa.jpeg";
import bg6 from "../../img/herramientas.jpg";
//import bg7 from "../../img/decor.jpeg";
import ButtonComponent from "./ButtonComponent";

type Category = {
  name: string
  icon: React.ElementType
  bg: string
}

const categories: Category[] = [
  { name: "Gaming", icon: IconDeviceGamepad2, bg: bg1 },
  { name: "Deporte", icon: IconBallBaseball, bg: bg2 },
  { name: "Hogar", icon: IconHome, bg: bg3 },
  { name: "Comida", icon: IconToolsKitchen2, bg: bg4 },
  { name: "Ropa", icon: IconHanger, bg: bg5 },
  { name: "Herramientas", icon: IconTool, bg: bg6 },
//  { name: "Decoración", icon: IconLamp, bg: bg7 },

]

export default function Categories() {
  return (

    <section className="my-10 px-4 lg:px-20">
              <div className="grid lg:grid-cols-6 grid-cols-2 gap-10 mb-6 justify-items-center">
                {categories.map((c, i) => (
                  <CategoryCard key={i} name={c.name} icon={c.icon} bg={c.bg} />
                ))}
              </div>
              <div className="flex justify-center">
                <ButtonComponent 
                        style="bg-yellow-main font-quicksand px-25 py-3 rounded-lg font-bold text-lg text-white shadow-[1px_2px_5px_rgba(0,0,0,0.2)] hover:bg-blue-main transition cursor-pointer duration-500"
                        text="Ver más"/>
              </div>
        </section>
  );
}

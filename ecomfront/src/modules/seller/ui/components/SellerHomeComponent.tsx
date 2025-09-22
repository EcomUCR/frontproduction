import { IconChevronRight } from "@tabler/icons-react";
import ProductCard from "../../../../components/data-display/ProductCard";
import ButtonComponent from "../../../../components/ui/ButtonComponent";

import audifonos from '../../img/resources/audifonos.jpg';
import img1 from '../../img/resources/foto1.png';
import img2 from '../../img/resources/foto2.png';
import FeaturedProductsSlider from "../../../../components/data-display/FeaturedProductsSlider";

const featuredProducts = [
    {
        id: 1,
        shop: "Razer",
        title: "Audifonos Razer x Pokemon | Edición Gengar",
        price: "100.000",
        discountPrice: "50.000",
        rating: 4.5,
        img: audifonos
    },
    {
        id: 1,
        shop: "Razer",
        title: "Audifonos Razer x Pokemon | Edición Gengar",
        price: "100.000",
        discountPrice: "50.000",
        rating: 4.5,
        img: audifonos
    },
    {
        id: 1,
        shop: "Razer",
        title: "Audifonos Razer x Pokemon | Edición Gengar",
        price: "100.000",
        discountPrice: "50.000",
        rating: 4.5,
        img: audifonos
    },
    {
        id: 1,
        shop: "Razer",
        title: "Audifonos Razer x Pokemon | Edición Gengar",
        price: "100.000",
        discountPrice: "50.000",
        rating: 2.7,
        img: audifonos
    },
    {
        id: 1,
        shop: "Razer",
        title: "Audifonos Razer x Pokemon | Edición Gengar",
        price: "100.000",
        discountPrice: "50.000",
        rating: 4.5,
        img: audifonos
    },
];
export default function HomeSeller(){
    return(
        <div>{/*Section de ofertas */}
            <section className="mx-10 my-5">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold font-quicksand">Ofertas</h2>
                    <div>
                        <a href="#" className="font-semibold"> Ver todo</a>
                        <IconChevronRight className="inline" />
                    </div>
                </div>
                {/*Aquí debe de ir un arreglo de productos cards que se van a mostrar */}
                <div className="flex justify-between my-5">
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} />
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} />
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} />
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} />
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} />
                </div>
            </section>
            {/* Termina section de ofertas */}
            {/*Section para imagenes de la tienda (Esto debe ser opcional)*/}
            <section className="px-10 my-5 flex justify-between items-center w-full h-[45vh] gap-5">
                <div className="flex w-1/2 h-full">
                    <img className="w-full h-auto object-cover rounded-2xl" src={img1} alt="Imagen 1" />
                </div>
                <div className="flex w-1/2 h-full">
                    <img className="w-full h-auto object-cover rounded-2xl" src={img2} alt="Imagen 2" />
                </div>
            </section>
            {/*Termina section para imagenes de la tienda */}
            {/* Section de productos destacados */}
            <section className="mx-10 my-5">
                <h2 className="text-2xl font-semibold font-quicksand">Productos destacados</h2>
                <div>
                    <FeaturedProductsSlider products={featuredProducts} />
                </div>
                <div className="flex justify-between my-5">
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                    {/* Cuando este botón se presione se deben renderizar más productos hacia abajo */}
                    <ButtonComponent text="Ver más" style="bg-contrast-secondary text-white px-5 py-2 rounded-full hover:bg-contrast-main transition-all duration-300 ease-in-out cursor-pointer w-[30%]" />
                </div>
            </section>
            {/* Termina Section de productos */}</div>
    );
}
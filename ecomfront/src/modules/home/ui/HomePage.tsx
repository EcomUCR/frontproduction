import HeaderSlider from "../../../components/navigation/HeaderSlider";
import NavBar from "../../../components/layout/NavBar"

import audifonos from "../../../img/resources/audifonos.jpg";
import smallBanner1 from "../../../img/resources/SmallBanner1.png";
import smallBanner2 from "../../../img/resources/SmallBanner2.png";
import FeaturedProductsSlider from "../../../components/data-display/FeaturedProductsSlider";

import CategorySlider from "../../../components/data-display/CategorySlider";
import ProductCard from "../../../components/data-display/ProductCard";;
import { IconChevronRight } from "@tabler/icons-react";
import Footer from "../../../components/layout/Footer";

/* Esto es para probar como se visualizan los items en el slider */ 
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
export default function HomePage() {
    return (
        <div>
            <NavBar />
            {/* Header con slider */}
            <header>
                <HeaderSlider />
            </header>
            {/* Section productos destacados */}
            <section className=" mx-10">
                <h2 className="text-2xl font-semibold font-quicksand">Productos destacados</h2>
                <div>
                    <FeaturedProductsSlider products={featuredProducts} />
                </div>
            </section>
            {/* Section Categorías */}
            <section className="mx-10 my-10">
                <h2 className="text-2xl font-semibold font-quicksand">Categorías</h2>
                <CategorySlider />
            </section>
            {/*Section de ofertas */}
            <section className="mx-10 my-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold font-quicksand">Ofertas</h2>
                    <div>
                        <a href="#" className="font-semibold"> Ver todo</a>
                        <IconChevronRight className="inline" />
                    </div>
                </div>
                {/*Aquí debe de ir un arreglo de productos cards que se van a mostrar */}
                <div className="grid grid-cols-5 my-10 space-y-5">
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}  />
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false} />
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false} />
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false} />
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false} />
                </div>
            </section>
            {/*Section para imágenes*/}
            <section className="flex justify-center gap-10 items-end mx-10 my-10">
                <img className="w-full h-full" src={smallBanner1} alt="Banner 1" />
                <img className="w-full h-full" src={smallBanner2} alt="Banner 2" />
            </section>
            {/*Section de explorar */}
            <section className="mx-10 my-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold font-quicksand">Explorar</h2>
                    <div>
                        <a href="#" className="font-semibold cursor-pointer"> Ver todo</a>
                        <IconChevronRight className="inline" />
                    </div>
                </div>
                {/*Aquí debe de ir un arreglo de productos cards que se van a mostrar */}
                <div className="grid grid-cols-5 my-10 space-y-5">
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false}/>
                </div>
            </section>
            {/* Footer */}
            <Footer />
        </div>
    );
}
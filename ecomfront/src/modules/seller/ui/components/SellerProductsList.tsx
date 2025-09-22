import { IconSearch } from "@tabler/icons-react";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import ProductCard from "../../../../components/data-display/ProductCard";

import audifonos from "../../../../img/resources/audifonos.jpg";
import FeaturedProductCard from "../../../../components/data-display/FeaturedProductCard";;

export default function SellerProductsList() {
    return (
        <div className="mx-10  border-l-2 border-main-dark/20 pl-4">
            <section className="flex justify-between font-quicksand items-center px-10">
                <h1 className="text-2xl font-semibold">Lista de productos</h1>
                <div className="bg-main-dark/10 flex items-center gap-2 px-1 py-1 rounded-full">
                    <input type="text" name="" id="" />
                    <ButtonComponent icon={<IconSearch />} iconStyle="text-white" style="bg-gradient-to-br to-contrast-main from-contrast-secondary rounded-full w-12 h-8 flex items-center justify-center"/>
                </div>
                <ButtonComponent text="Registrar nuevo producto" style="bg-contrast-secondary rounded-full px-4 py-2 text-white font-semibold hover:bg-gradient-to-br from-contrast-main via-contrast-secondary to-main transition-all duration-400"/>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-items-center py-10 border-b-2 border-main">
                {/* Aquí debe de ir un arreglo de productos que se van a mostrar */}
                <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit/>
                <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit/>
                <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit/>
                <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit/>
                <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit/>
                <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit/>
            </section>
            <section className="my-10" >
                <h2 className="text-2xl font-semibold font-quicksand">Productos destacados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 justify-items-center py-10">
                    {/*Aquí debe de ir un arreglo de productos destacados que se van a mostrar */}
                <FeaturedProductCard shop="Razer" img={audifonos} title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" rating={4.5} edit/>
                <FeaturedProductCard shop="Razer" img={audifonos} title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" rating={4.5} edit/>
                <FeaturedProductCard shop="Razer" img={audifonos} title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" rating={4.5} edit/>
                <FeaturedProductCard shop="Razer" img={audifonos} title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" rating={4.5} edit/>
                </div>
            </section>
        </div>
    );
}
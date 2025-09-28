import { IconArrowBackUp } from "@tabler/icons-react";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import ProductCard from "../../../components/data-display/ProductCard";

import audifonos from "../../../img/resources/audifonos.jpg";

export default function CrudProductPage() {
    return (
        <div>
            <NavBar />
            <section className="flex flex-col font-quicksand gap-5 my-10 mx-auto max-w-[80rem]">
                <div className="flex items-center gap-3">
                    <ButtonComponent icon={<IconArrowBackUp />} text="Volver" style="flex text-sm ml-5 px-2 items-center gap-2 rounded-full" /*onClick={() => window.history.back()}*/ />{/*Creo que esto se puede utilizar para volver a la ultima ventana, pero no estoy seguro*/}
                    <h1 className="text-3xl font-bold border-b-3 border-main">Nuevo Producto</h1>
                    <p className="text-2xl">-</p>
                    <p className="text-xl"> Unstable Games</p>
                </div>
                <form action="">
                    <div className="mx-30 flex flex-col gap-10 py-10">
                        <div className="w-full flex gap-5">
                            <label htmlFor="" className="flex flex-col w-6/12 gap-2">
                                <p className="font-semibold">Nombre del producto <span className="text-red-500">*</span> </p>
                                <textarea cols={35} rows={2} name="" id="" placeholder="Nombre" className="bg-main-dark/20 rounded-2xl p-2 w-2/3" />
                            </label>
                            <div className="flex w-6/12 gap-5">
                                <label htmlFor="" className="flex flex-col w-full gap-2">
                                    <p className="font-semibold">Precio <span className="text-red-500">*</span> </p>
                                    <input type="text" name="" id="" placeholder="Precio" className="bg-main-dark/20 rounded-2xl p-2" />
                                </label>
                                <label htmlFor="" className="flex flex-col w-full gap-2">
                                    <p className="font-semibold">Precio de oferta</p>
                                    <input type="text" name="" id="" placeholder="Precio de oferta" className="bg-main-dark/20 rounded-2xl p-2" />
                                </label>
                            </div>
                        </div>
                        <div className="w-full flex gap-5">
                            <label htmlFor="" className="flex flex-col w-6/12 gap-2">
                                <p className="font-semibold">Categoría <span className="text-red-500">*</span></p>
                                {/*Aquí lo que se debería de agregar son las categorías pero no sé como realizar ese formulario */}
                                <input placeholder="Categoria" type="text" name="" id="" className="bg-main-dark/20 rounded-2xl p-2 w-2/3" />
                            </label>
                            <div className="flex w-6/12 gap-5">
                                <label htmlFor="" className="flex flex-col w-full gap-2">
                                    <p className="font-semibold">Stock <span className="text-red-500">*</span></p>
                                    <input type="number" name="" id="" placeholder="Stock" className="bg-main-dark/20 rounded-2xl p-2 w-full" />
                                </label>
                                <label htmlFor="" className="flex flex-col w-full gap-2">
                                    <p className="font-semibold">Estado <span className="text-red-500">*</span></p>
                                    {/*Este estado tiene que ser un select en las que las opciones son Activo, Inactivo, No disponible */}
                                    <input type="text" placeholder="Estado" id="" className="bg-main-dark/20 rounded-2xl p-2 w-full" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full px-30">
                        <div className="flex flex-col w-1/2 gap-6">
                            <label htmlFor="" className="w-full">
                                <p className="font-semibold">Sobre este producto</p>
                                <textarea placeholder="Sobre este producto" name="" id="" cols={40} rows={5} className="bg-main-dark/20 rounded-xl px-3 py-2" />
                            </label>
                            <label htmlFor="" >
                                <p className="font-semibold">Agregar imágenes</p>
                                <input type="image" name="" id="" placeholder="Imagen" className="bg-main-dark/20 rounded-2xl p-2" />
                            </label>
                        </div>
                        <div className="flex flex-col items-center justify-center w-1/2 gap-2">
                            <label htmlFor="" className="flex items-center gap-2">
                                <p className="font-semibold">Destacar producto</p>
                                <input placeholder="" type="checkbox" name="" id="" />
                            </label>
                            <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false} />
                            <div className="flex flex-col items-center gap-5 py-10 w-full">
                                <ButtonComponent text="Guardar" style="text-white text-lg p-2 items-center rounded-full bg-contrast-main w-2/3" />
                                <ButtonComponent text="Eliminar producto" style="text-white text-lg p-2 items-center rounded-full bg-contrast-secondary w-2/3" />
                                <ButtonComponent text="Cancelar" style="text-white text-lg p-2 items-center rounded-full bg-main-dark w-2/3" />

                            </div>
                        </div>
                    </div>
                </form>
            </section >
            <Footer />
        </div >
    )
}
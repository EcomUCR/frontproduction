import { IconChevronLeft, IconEdit, IconUser } from "@tabler/icons-react";
import { Switch } from "../../../../components/ui/switch";

import audifonos from "../../img/audifonos.png";
import foto from "../../img/perfil.png";
import ProductCard from "../../../../components/data-display/ProductCard";
import ButtonComponent from "../../../../components/ui/ButtonComponent";

export default function UserModal(){
    return(
         <section className="border-2 mx-20 mb-30 p-5 font-quicksand rounded-2xl">
                <div className=" py-5 px-10">
                    <div className="flex items-center">
                        <ButtonComponent icon={<IconChevronLeft />} style="bg-contrast-secondary text-white py-1 px-3 rounded-full flex items-center" text="Volver" />
                        <div className="flex justify-center w-full">
                        <h1 className="text-3xl font-semibold">Modificar Usuario</h1>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-30 py-10">
                        <div className="flex flex-col items-center">
                            <p>UUID</p>
                            <p>[ID]</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p>Tipo</p>
                            <p className="flex gap-2 items-center">[User]<IconUser size={20} /></p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p>Ultima conexión</p>
                            <p>[12/10/2023]</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p>Status</p>
                            <Switch />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="border-main-dark/10 flex gap-5 px-10">
                        <div className="flex flex-col items-center justify-between w-1/3 py-10 bg-main-dark/10 rounded-2xl">
                            <div className="flex items-end gap-2">
                                <img src={foto} alt="" className="h-40" />
                                <ButtonComponent text="" style="bg-contrast-secondary text-white py-1 px-3 rounded-full" icon={<IconEdit size={20} />} />
                            </div>
                            <div className="flex flex-col items-center gap-5 border-b-2 border-main pb-5 pt-10 w-full">
                                <label htmlFor="" className="flex flex-col gap-2 w-full px-5">
                                    <p>Nombre completo</p>
                                    <div className="flex">
                                        <input type="text" name="" id="" className="bg-main-dark/10 rounded-full p-2 h-full w-full font-semibold" placeholder="John Jairo Solano Carranza" />
                                    </div>
                                </label>
                                <label htmlFor="" className="flex flex-col gap-2 w-full px-5">
                                    <p>Nombre de usuario</p>
                                    <div className="flex">
                                        <input type="text" name="" id="" className="bg-main-dark/10 rounded-full p-2 h-full w-full font-semibold" placeholder="jhonito" />
                                    </div>
                                </label>
                                <label htmlFor="" className="flex flex-col gap-2 w-full px-5">
                                    <p>Correo</p>
                                    <div className="flex">
                                        <input type="text" name="" id="" className="bg-main-dark/10 rounded-full p-2 h-full w-full font-semibold" placeholder="john@gmail.com" disabled />
                                    </div>
                                </label>
                            </div>
                            <div className="flex flex-col items-center gap-2 pt-5">
                                <ButtonComponent text="Cambiar Contraseña" style="bg-contrast-secondary py-2 px-6 rounded-full text-white w-full" />
                                <ButtonComponent text="Eliminar cuenta" style="bg-main py-2 px-6 rounded-full text-white w-full" />
                            </div>
                        </div>
                        <div className="flex flex-col w-2/3 py-10 bg-main-dark/10 justify-between rounded-2xl">
                            <div className="flex w-full ">
                                <div className="flex flex-col gap-10 w-1/2 items-center">
                                    <div>
                                        <h2 className="text-2xl font-semibold">Usuario - Activo</h2>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <div>
                                            <p>Ultima Compra</p>
                                            <p>[12/10/2023]</p>
                                        </div>
                                        <div>
                                            <p>Articulos Comprados</p>
                                            <p>12</p>
                                        </div>
                                        <div>
                                            <p>Total gastado</p>
                                            <p>$200000</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-col items-center gap-10">
                                    <p>Ultima compra</p>
                                    <ProductCard shop="Razer" title="Audifonos Razer x Pokemon | Edición Gengar" price="100.000" discountPrice="50.000" img={audifonos} edit={false} id={0} />
                                </div>
                            </div>
                            <div className="flex items-center justify-center pt-5">
                                <ButtonComponent text="Ver historial" style="bg-contrast-secondary py-2 px-6 rounded-full text-white w-1/2" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center pt-10 gap-4">
                        <p className="text-red-500">Todos los cambios serán notidicados al dueño de la cuenta</p>
                        <div className="flex gap-5 w-full items-center justify-center">
                            <ButtonComponent text="Cancelar cambios" style="bg-main-dark py-2 px-6 rounded-full text-white w-1/3" />
                            <ButtonComponent text="Guardar cambios" style="bg-contrast-secondary py-2 rounded-full text-white w-1/3" />
                        </div>
                    </div>
                </div>
            </section>
    );
}
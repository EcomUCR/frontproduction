import { IconBuildingStore, IconChevronLeft } from "@tabler/icons-react";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import { Switch } from "../../../components/ui/switch";

export default function SellerModal() {
    return (
        <section className="border-2 mx-20 mb-30 p-5 font-quicksand rounded-2xl">
            <div className=" py-5 px-10">
                <div className="flex items-center">
                    <ButtonComponent icon={<IconChevronLeft />} style="bg-contrast-secondary text-white py-1 px-3 rounded-full flex items-center" text="Volver" />
                    <div className="flex justify-center w-full">
                        <h1 className="text-3xl font-semibold">Modificar Vendedor</h1>
                    </div>
                </div>
                <div className="flex items-center justify-between px-30 py-10">
                    <div className="flex flex-col items-center">
                        <p>UUID</p>
                        <p>[ID]</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p>Tipo</p>
                        <p className="flex gap-2 items-center">[Seller]<IconBuildingStore size={20} /></p>
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
            <div className="px-10 border-t pt-10">
                <form action="" className="">
                    <h2 className="text-xl font-semibold">Información del vendedor</h2>
                    <div className="flex gap-5 pt-5">
                        <label htmlFor="" className="w-1/3">
                            <p>Nombre</p>
                            <input placeholder="Example" type="text" name="" id="" className="bg-main-dark/10 w-full rounded-full p-2" />
                        </label>
                        <label htmlFor="" className="w-1/3">
                            <p>Tipo</p>
                            <input placeholder="Sociedad" type="text" name="" id="" className="bg-main-dark/10 w-full rounded-full p-2" />
                        </label>
                        <label htmlFor="" className="w-1/3">
                            <p>Correo</p>
                            <input placeholder="Correo" type="text" name="" id="" className="bg-main-dark/10 w-full rounded-full p-2" disabled />
                        </label>
                    </div>
                    <div className="flex gap-5 pt-10">
                        <label htmlFor="" className="w-2/3">
                            <p>Dirección</p>
                            <textarea className="bg-main-dark/10 w-full rounded-full p-2" name="" id=""></textarea>
                        </label>
                        <label htmlFor="" className="w-1/3">
                            <p>Número de contacto</p>
                            <input className="bg-main-dark/10 w-full rounded-full p-2" name="" id=""></input>
                        </label>
                    </div>
                    <h2 className="text-xl font-semibold pt-10">Identificación y verificación</h2>
                    <div className="flex gap-5 pt-5">
                        <label htmlFor="" className="w-1/3">
                            <p>Documento de identidad</p>
                            <input type="file" name="" id="" className="bg-main-dark/10 w-full rounded-full p-2" />
                        </label>
                        <label htmlFor="" className="w-1/3">
                            <p>Comprobante de domicilio</p>
                            <input type="file" name="" id="" className="bg-main-dark/10 w-full rounded-full p-2" />
                        </label>
                    </div>
                    <h2 className="text-xl font-semibold pt-10">Datos Fiscales y bancarios</h2>
                    <div className="flex gap-5 pt-5">
                        <label htmlFor="" className="w-1/3">
                            <p>Identificación fiscal</p>
                            <input type="file" className="bg-main-dark/10 w-full rounded-full p-2" name="" id="" />
                        </label>
                        <label htmlFor="" className="w-1/3">
                            <p>Cuenta bancaria</p>
                            <input type="text" placeholder="CR1701520200100000000000" className="bg-main-dark/10 w-full rounded-full p-2" name="" id="" />
                        </label>
                        <label htmlFor="" className="w-1/3">
                            <p>Tarjeta de crédito válida</p>
                            <input type="text" placeholder="0000-0000-0000-0000" className="bg-main-dark/10 w-full rounded-full p-2" name="" id="" />
                        </label>
                    </div>
                    <h2 className="text-xl font-semibold pt-10">Perfil público</h2>
                    <div className="flex gap-5 pt-5">
                        <label htmlFor="" className="w-1/3">
                            <p>Nombre de la tienda</p>
                            <input placeholder="Example" type="text" name="" id="" className="bg-main-dark/10 w-full rounded-full p-2" />
                        </label>
                        <label htmlFor="" className="w-1/3">
                            <p>Logo / Imágen de marca</p>
                            <input type="file" name="" id="" className="bg-main-dark/10 w-full rounded-full p-2" />
                        </label>
                        <label htmlFor="" className="w-1/3">
                            <p>Banner de portada</p>
                            <input type="file" name="" id="" className="bg-main-dark/10 w-full rounded-full p-2" disabled />
                        </label>
                    </div>
                    <div className="flex gap-5 pt-10">
                        <label htmlFor="" className="w-2/3">
                            <p>Descripción del negocio</p>
                            <textarea className="bg-main-dark/10 w-full rounded-full p-2" name="" id=""></textarea>
                        </label>
                        <label htmlFor="" className="w-1/3">
                            <p>Categoría</p>
                            <select className="bg-main-dark/10 w-full rounded-full p-2" name="" id="">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </label>
                    </div>
                    <h2 className="text-xl font-semibold pt-10">Publicaciones creadas</h2>
                    <div className="flex gap-5 pt-5">
                        <ButtonComponent text="Ver productos" style="w-1/3 p-2 rounded-full text-white bg-contrast-secondary gap-2 flex items-center justify-center" />
                    </div>
                </form>
                <div className="flex flex-col items-center justify-center pt-15 gap-5">
                    <p className="text-sm text-red-500">Todos los cambios serán notificados al dueño de la cuenta</p>
                    <div className="flex gap-5 w-full justify-center">
                        <ButtonComponent text="Cancelar" style="w-1/3 p-2 rounded-full text-white bg-main gap-2 flex items-center justify-center" />
                        <ButtonComponent text="Guardar" style="w-1/3 p-2 rounded-full text-white bg-contrast-secondary gap-2 flex items-center justify-center" />
                    </div>
                </div>
            </div>
        </section>
    );
}






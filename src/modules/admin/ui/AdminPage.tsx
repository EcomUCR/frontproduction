import { IconSearch } from "@tabler/icons-react";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import NavBar from "../../../components/layout/NavBar";
import AdminProfileCard from "./components/AdminProfileCard";


export default function AdminPage() {
    return (
        <div>
            <NavBar />
            <section className="font-quicksand my-10 mx-auto max-w-[80rem] flex">
                <div className="w-3/12 h-screen">
                    
                </div>
                <div className="w-9/12 bg-amber-800 h-screen">
                
                </div>
                {/*
                    <>
                        <h1 className="text-2xl font-semibold pl-10">Lista de usuarios</h1>
                        <div className="flex justify-between px-20 pt-10">
                            <div className="flex bg-main-dark/10 items-center rounded-full px-1">
                                <input placeholder="Buscar" type="text" name="" id="" className="rounded-full py-1 px-2" />
                                <ButtonComponent icon={<IconSearch />} style="bg-contrast-secondary text-white py-1 px-3 rounded-full" />
                            </div>
                            <div>
                                Este no debe ser un input, deve ser un select con las opciones de User, Seller y Admin 
                                <input type="text" placeholder="Filtrar" name="" id="" className="bg-main-dark/10 rounded-full px-2 h-full" />
                            </div>
                            <div>
                                <ButtonComponent style="bg-main py-2 px-6 rounded-full text-white" text="Crear usuario" />
                            </div>
                        </div>
                        <div className="pt-8 space-y-4">
                            <div className="flex w-full text-lg font-semibold bg-main-dark/40 rounded-full px-10 py-4 justify-between">
                                <p className="w-1/12">UUID</p>
                                <p className="w-2/12">Username</p>
                                <p className="w-3/12">Email</p>
                                <p className="w-2/12">Type</p>
                                <p className="w-2/12">Last Connection</p>
                                <p className="w-1/12">Status</p>
                                <p className="w-1/12"></p>
                            </div>
                           //////////////////Aquí debe de haber un array de perfiles
                            <AdminProfileCard />
                            <AdminProfileCard />
                            <AdminProfileCard />
                            
                            ////////////////Aquí abajo debería estar la sección para cambiar de pagina de perfiles pero no se ha
                    implementado aún 
                        </div>
                    </>
                */}
            </section>
        </div>
    );
} 
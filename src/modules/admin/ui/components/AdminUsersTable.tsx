import { IconSearch } from "@tabler/icons-react";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import AdminProfileCard from "./AdminProfileCard";

export default function AdminUsersTable() {
    return (
        <div>
            <h1 className="text-2xl font-semibold pl-10">Lista de usuarios</h1>
            <div className="flex justify-between px-20 pt-10">
                <div className="flex bg-main-dark/10 items-center rounded-full px-1">
                    <input placeholder="Buscar" type="text" name="" id="" className="rounded-full py-1 px-2" />
                    <ButtonComponent icon={<IconSearch />} style="bg-contrast-secondary text-white py-1 px-3 rounded-full" />
                </div>
                <div>
                    {/*Este no debe ser un input, deve ser un select con las opciones de User, Seller y Admin*/}
                    <input type="text" placeholder="Filtrar" name="" id="" className="bg-main-dark/10 rounded-full px-2 h-full" />
                </div>
                <div>
                    <ButtonComponent style="bg-main py-2 px-6 rounded-full text-white" text="Crear usuario" />
                </div>
            </div>
            <div className="pt-8 space-y-4">
                <div className="flex w-full text-lg font-semibold bg-main-dark/40 rounded-full px-10 py-4 justify-between">
                    <p className="">UUID</p>
                    <p className="">Username</p>
                    <p className="">Email</p>
                    <p className="">Type</p>
                    <p className="">Last Connection</p>
                    <p className="">Status</p>
                    <p className=""></p>
                </div>
                {/*Aquí debe de haber un array de perfile*/}
                <AdminProfileCard />
                <AdminProfileCard />
                <AdminProfileCard />
                {/*Aquí abajo debería estar la sección para cambiar de pagina de perfiles pero no se ha implementado aún*/}
            </div>
        </div>
    )
}
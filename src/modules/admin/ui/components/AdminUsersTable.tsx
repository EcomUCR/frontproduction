import { IconSearch } from "@tabler/icons-react";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import AdminProfileCard from "./AdminProfileCard";

export default function AdminUsersTable() {
    return (
        <div className="mx-10 border-l-2 border-main-dark/20 pl-4">
            <div className="pl-10">
                <h1 className="text-2xl font-semibold font-quicksand">Lista de usuarios</h1>
                <div className="flex justify-between pt-10">
                    <div className="flex bg-main-dark/10 items-center rounded-full px-1">
                        <input placeholder="Buscar" type="text" name="" id="" className="rounded-full py-1 px-2" />
                        <ButtonComponent icon={<IconSearch />} style="bg-contrast-secondary text-white py-1 px-3 rounded-full" />
                    </div>
                    <div>
                        {/*Este no debe ser un input, debe ser un select con las opciones de User, Seller y Admin*/}
                        <input type="text" placeholder="Filtrar" name="" id="" className="bg-main-dark/10 rounded-full px-2 h-full" />
                    </div>
                    <div>
                        <ButtonComponent style="bg-main py-2 px-6 rounded-full text-white font-quicksand" text="Crear usuario" />
                    </div>
                </div>
                <div className="pt-8 space-y-4">
                    <div className="flex items-center w-full font-semibold bg-main-dark/40 rounded-full px-5 py-4">
                        <p className="w-22">UUID</p>
                        <p className="w-38">Username</p>
                        <p className="w-55">Email</p>
                        <p className="w-32">Type</p>
                        <p className="">Status</p>
                        <p className=""></p>
                    </div>
                    <AdminProfileCard />
                    <AdminProfileCard />
                    <AdminProfileCard />

                    {/* Aquí va la paginación */}
                </div>

            </div>
        </div>
    )
}
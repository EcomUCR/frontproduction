import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import AdminProfileCard from "./AdminProfileCard";
import useAdmin from "../../../admin/infrastructure/useAdmin";

export default function AdminUsersTable() {
    const { getUsers, loading, error } = useAdmin();
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
            const data = await getUsers();
            setUsers(data);
        };
        loadUsers();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500 py-10">Cargando usuarios...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 py-10">{error}</p>;
    }

    return (
        <div className="mx-10 border-l-2 border-main-dark/20 pl-4">
            <div className="pl-10">
                <h1 className="text-2xl font-semibold font-quicksand">Lista de usuarios</h1>

                {/* 🔍 Búsqueda y Filtros */}
                <div className="flex justify-between pt-10">
                    {/* Buscar */}
                    <div className="flex bg-main-dark/10 items-center rounded-full px-1">
                        <input
                            placeholder="Buscar"
                            type="text"
                            className="rounded-full py-1 px-2 bg-transparent outline-none"
                        />
                        <ButtonComponent
                            icon={<IconSearch />}
                            style="bg-contrast-secondary text-white py-1 px-3 rounded-full"
                        />
                    </div>

                    {/* Filtro (futuro: select de roles) */}
                    <div>
                        <input
                            type="text"
                            placeholder="Filtrar"
                            className="bg-main-dark/10 rounded-full px-2 h-full"
                        />
                    </div>

                    {/* Botón crear usuario */}
                    <div>
                        <ButtonComponent
                            style="bg-main py-2 px-6 rounded-full text-white font-quicksand"
                            text="Crear usuario"
                        />
                    </div>
                </div>

                {/* 🧱 Tabla */}
                <div className="pt-8 space-y-4">
                    {/* Encabezado */}
                    <div className="flex items-center w-full font-semibold bg-main-dark/40 rounded-full px-5 py-4">
                        <p className="w-22">UUID</p>
                        <p className="w-38">Username</p>
                        <p className="w-55">Email</p>
                        <p className="w-32">Rol</p>
                        <p>Status</p>
                        <p></p>
                    </div>

                    {/* Lista dinámica */}
                    {users.length > 0 ? (
                        users.map((user) => (
                            <AdminProfileCard
                                key={user.id}
                                id={user.id}
                                username={user.username || `${user.first_name} ${user.last_name}`}
                                email={user.email}
                                role={user.role}
                                status={user.status}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No hay usuarios</p>
                    )}
                </div>
            </div>
        </div>
    );
}

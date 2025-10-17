import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import AdminProfileCard from "./AdminProfileCard";
import useAdmin from "../../../admin/infrastructure/useAdmin";
import AdminUserEditModal from "../components/UserEditModal";

export default function AdminUsersTable() {
    const { getUsers, updateUserStatus, updateUserData, loading, error } = useAdmin();
    const [users, setUsers] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"ALL" | "CUSTOMER" | "SELLER" | "ADMIN">("ALL");

    // 🧩 Estados para el modal de edición
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [showModal, setShowModal] = useState(false);

    // 🔹 Cargar usuarios una sola vez al montar
    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            const data = await getUsers();
            const sortedUsers = data.sort((a, b) => a.id - b.id); // 🔼 de menor a mayor
            if (isMounted) setUsers(sortedUsers);
        };
        load();
        return () => {
            isMounted = false;
        };
    }, []); // 👈 solo una vez

    // 🧩 Abrir modal para editar
    const handleEditUser = (user: any) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    // 🧩 Guardar cambios del usuario (PUT)
    const handleSaveUser = async (updatedData: any) => {
        // 🧹 Limpiar campos innecesarios o vacíos
        const cleanedData = { ...updatedData };
        delete cleanedData.id;
        delete cleanedData.total_spent;
        delete cleanedData.total_items;
        delete cleanedData.last_connection;
        if (!cleanedData.password) delete cleanedData.password;

        console.log("📤 Enviando datos limpios:", cleanedData);

        const updatedUser = await updateUserData(selectedUser.id, cleanedData);
        if (updatedUser) {
            setUsers((prev) =>
                prev.map((u) => (u.id === selectedUser.id ? { ...u, ...updatedUser } : u))
            );
            setShowModal(false);
        }
    };



    // 🔍 Filtros y búsqueda
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.username?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name?.toLowerCase().includes(search.toLowerCase());

        const matchesRole = filter === "ALL" || user.role === filter;
        return matchesSearch && matchesRole;
    });

    // 🌀 Loading
    if (loading) {
        return <p className="text-center text-gray-500 py-10">Cargando usuarios...</p>;
    }

    // ❌ Error
    if (error) {
        return <p className="text-center text-red-500 py-10">{error}</p>;
    }

    // ✅ Render principal
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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-full py-1 px-2 bg-transparent outline-none"
                        />
                        <ButtonComponent
                            icon={<IconSearch />}
                            style="bg-contrast-secondary text-white py-1 px-3 rounded-full"
                        />
                    </div>

                    {/* Filtrar por rol */}
                    <div>
                        <select
                            value={filter}
                            onChange={(e) =>
                                setFilter(e.target.value as "ALL" | "CUSTOMER" | "SELLER" | "ADMIN")
                            }
                            className="bg-main-dark/10 rounded-full px-2 py-1"
                        >
                            <option value="ALL">Todos</option>
                            <option value="CUSTOMER">Customer</option>
                            <option value="SELLER">Seller</option>
                            <option value="ADMIN">Admin</option>
                        </select>
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
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <AdminProfileCard
                                key={user.id}
                                id={user.id}
                                username={
                                    user.username || `${user.first_name ?? ""} ${user.last_name ?? ""}`
                                }
                                email={user.email}
                                role={user.role}
                                status={user.status}
                                onStatusChange={async (newStatus) => {
                                    const success = await updateUserStatus(user.id, newStatus);
                                    if (success) {
                                        setUsers((prev) =>
                                            prev.map((u) =>
                                                u.id === user.id ? { ...u, status: newStatus } : u
                                            )
                                        );
                                    }
                                }}
                                onEdit={() => handleEditUser(user)} // 🧩 botón ⚙️ abre modal
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No hay usuarios</p>
                    )}
                </div>
            </div>

            {/* 🧩 Modal de edición */}
            {showModal && selectedUser && (
                <AdminUserEditModal
                    user={selectedUser}
                    onClose={() => setShowModal(false)}
                    onSave={handleSaveUser}
                />
            )}
        </div>
    );
}

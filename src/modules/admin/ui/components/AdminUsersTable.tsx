import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import AdminProfileCard from "./AdminProfileCard";
import useAdmin from "../../../admin/infrastructure/useAdmin";
import UserEditModal from "../components/UserEditModal";
import StoreEditModal from "../components/StoreEditModal";
import { AnimatePresence, motion } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../../components/ui/pagination";
import { useNotificationContext } from "../../../../hooks/context/NotificationContext";

export default function AdminUsersTable() {
  const {
    getUsers,
    updateUserStatus,
    updateUserData,
    getStoreByUserId,
    updateStoreData,
    loading,
    error,
  } = useAdmin();

  const { storeToOpen, clearStoreToOpen } = useNotificationContext();

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "CUSTOMER" | "SELLER" | "ADMIN">(
    "ALL"
  );

  const [selectedStore, setSelectedStore] = useState<any | null>(null);
  const [showStoreModal, setShowStoreModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 🔹 Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Estado para controlar que solo se abra una vez
  const [hasOpenedStore, setHasOpenedStore] = useState(false);

  // 🔹 Cargar usuarios y abrir tienda si aplica
  // 🔹 Cargar usuarios una sola vez al montar
// 🔹 1️⃣ Cargar usuarios una sola vez
useEffect(() => {
  (async () => {
    try {
      const data = await getUsers();
      if (Array.isArray(data)) {
        setUsers(data.sort((a, b) => a.id - b.id));
      } else {
        console.error("⚠️ getUsers() no devolvió un array:", data);
      }
    } catch (err) {
      console.error("❌ Error cargando usuarios:", err);
    }
  })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

// 🔹 2️⃣ Observar cuando haya usuarios + storeToOpen (desde notificación)
useEffect(() => {
  if (!storeToOpen || users.length === 0) return; // espera a que ambos estén listos

  const userWithStore = users.find(
    (u) => u.store && u.store.id === storeToOpen
  );

  if (userWithStore) {
    console.log("✅ Abriendo modal automáticamente:", storeToOpen);
    // pequeño delay para asegurar render estable
    setTimeout(() => {
      handleEditStore(userWithStore);
      clearStoreToOpen();
    }, 300);
  } else {
    console.warn("⚠️ No se encontró tienda con ID:", storeToOpen);
  }
}, [storeToOpen, users]); // 👈 dependencias combinadas



  // 🔹 Editar usuario
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // 🔹 Guardar usuario
  const handleSaveUser = async (updatedData: any) => {
    const cleanedData = { ...updatedData };
    delete cleanedData.id;
    delete cleanedData.total_spent;
    delete cleanedData.total_items;
    delete cleanedData.last_connection;
    if (!cleanedData.password) delete cleanedData.password;

    const updatedUser = await updateUserData(selectedUser.id, cleanedData);
    if (updatedUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, ...updatedUser } : u
        )
      );
      setShowModal(false);
    }
  };

  // 🔹 Editar tienda
  const handleEditStore = async (user: any) => {
    const storeData = await getStoreByUserId(user.id);
    if (storeData) {
      setSelectedStore(storeData);
      setShowStoreModal(true);
    } else {
      console.warn(
        "⚠️ No se encontró una tienda asociada al usuario:",
        user.id
      );
    }
  };

  // 🔹 Guardar tienda
  const handleSaveStore = async (updatedStore: any) => {
    const cleanedData = { ...updatedStore };
    delete cleanedData.user;
    delete cleanedData.store_socials;
    delete cleanedData.banners;
    delete cleanedData.products;
    delete cleanedData.reviews;

    const updated = await updateStoreData(updatedStore.id, cleanedData);
    if (updated) {
      setSelectedStore(updated);
      setShowStoreModal(false);
    }
  };

  // 🔹 Filtrar y paginar
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filter === "ALL" || user.role === filter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 py-10">Cargando usuarios...</p>
    );
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  // ✅ Render principal
  return (
    <div className="pl-4">
      <div className="pl-10">
        <div className="w-50">
          <h1 className="text-2xl font-semibold font-quicksand border-b-3 border-main">
            Lista de usuarios
          </h1>
        </div>

        {/* 🔍 Búsqueda y filtros */}
        <div className="flex justify-between pt-10">
          <div className="flex items-center bg-white border border-main-dark/10 rounded-full shadow-sm px-2 py-1.5">
            <input
              placeholder="Buscar usuario..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-full px-2 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-44"
            />
            <ButtonComponent
              icon={<IconSearch size={20} />}
              style="bg-main px-5 text-white py-2 rounded-full hover:bg-contrast-secondary transition-all duration-300"
            />
          </div>

          {/* Filtro */}
          <div className="flex items-center bg-white border border-main-dark/10 rounded-full shadow-sm px-3 py-1.5">
            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value as "ALL" | "CUSTOMER" | "SELLER" | "ADMIN"
                )
              }
              className="bg-transparent outline-none text-sm text-gray-700 font-medium cursor-pointer"
            >
              <option value="ALL">Todos</option>
              <option value="CUSTOMER">Customer</option>
              <option value="SELLER">Seller</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Crear usuario */}
          <ButtonComponent
            text="Agregar usuario"
            style="bg-main text-white rounded-full py-3 px-4 font-quicksand hover:bg-contrast-secondary transition-all duration-400"
          />
        </div>

        {/* Tabla */}
        <div className="pt-8 space-y-4">
          <div className="flex items-center justify-between w-full bg-main text-white font-quicksand font-semibold rounded-2xl px-6 py-4 shadow-md">
            <p className="w-24 text-sm tracking-wide uppercase opacity-90">
              UUID
            </p>
            <p className="w-40 text-sm tracking-wide uppercase opacity-90">
              Username
            </p>
            <p className="w-56 text-sm tracking-wide uppercase opacity-90">
              Email
            </p>
            <p className="w-32 text-sm tracking-wide uppercase opacity-90">
              Rol
            </p>
            <p className="w-28 text-sm tracking-wide uppercase opacity-90">
              Status
            </p>
            <p className="w-10"></p>
          </div>

          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <AdminProfileCard
                key={user.id}
                id={user.id}
                username={
                  user.username ||
                  `${user.first_name ?? ""} ${user.last_name ?? ""}`
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
                onEdit={() => handleEditUser(user)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No hay usuarios</p>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <Pagination className="mt-10">
            <PaginationContent className="flex items-center justify-center gap-1 font-quicksand">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`${
                    currentPage === 1
                      ? "opacity-50 pointer-events-none bg-gray-200 text-gray-500"
                      : "hover:bg-main-dark/10 hover:text-main-dark"
                  } rounded-full px-3 py-2 transition-all duration-300`}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={isActive}
                      className={`rounded-full w-9 h-9 flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-contrast-secondary text-white shadow-md scale-105"
                          : "bg-main-dark/10 text-main-dark hover:bg-main-dark/20"
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`${
                    currentPage === totalPages
                      ? "opacity-50 pointer-events-none bg-gray-200 text-gray-500"
                      : "hover:bg-main-dark/10 hover:text-main-dark"
                  } rounded-full px-3 py-2 transition-all duration-300`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      {/* Modales */}
      <AnimatePresence>
        {showModal && selectedUser && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
            <UserEditModal
              user={selectedUser}
              onClose={() => setShowModal(false)}
              onSave={handleSaveUser}
              onEditStore={handleEditStore}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showStoreModal && selectedStore && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
            <StoreEditModal
              store={selectedStore}
              onClose={() => setShowStoreModal(false)}
              onSave={handleSaveStore}
              onViewProducts={(storeId) =>
                console.log("🛒 Ver productos de la tienda:", storeId)
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

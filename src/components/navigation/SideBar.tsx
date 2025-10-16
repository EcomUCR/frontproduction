import { IconBuildingStore, IconClipboardText, IconFileCheck, IconLogout2, IconMailOpened, IconTag, IconUser } from "@tabler/icons-react";
import { useAuth } from "../../hooks/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
    type: "SELLER" | "CUSTOMER" | "ADMIN" | null | undefined; // tipo de usuario
    onSelect: (section: string) => void;
    selected: string; // sección seleccionada
}

export default function SideBar({ type, onSelect, selected }: SideBarProps) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/loginRegister", { replace: true });
    };
    return (
        <div className="flex flex-col items-start p-4 font-quicksand h-full">
            {(type === "CUSTOMER" || type === "SELLER") && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Mi Cuenta</h2>
                    <ul className="space-y-10 flex flex-col h-full w-full">
                        <div className="space-y-3">
                            <li
                                className={`flex items-center gap-2 cursor-pointer px-3 py-3 rounded-full 
                                    ${selected === "profile" ? "bg-contrast-secondary text-white translate-x-4 transition-all duration-300" : "text-sm"}`}
                                onClick={() => onSelect("profile")}
                            >
                                <IconUser /><p>Información de la cuenta</p>
                            </li>
                            <li
                                className={`flex items-center gap-2 cursor-pointer px-3 py-3 rounded-full  
                                    ${selected === "transactions" ? "bg-contrast-secondary text-white translate-x-4 transition-all duration-300" : "text-sm"}`}
                                onClick={() => onSelect("transactions")}
                            >
                                <IconClipboardText /><p>Historial de transacciones</p>
                            </li>
                            {type === "SELLER" && (
                                <>
                                    <li
                                        className={`flex items-center gap-2 cursor-pointer px-3 py-3 rounded-full    
                                            ${selected === "products" ? "bg-contrast-secondary text-white translate-x-4 transition-all duration-300" : "text-sm"}`}
                                        onClick={() => onSelect("products")}
                                    >
                                        <IconBuildingStore /><p>Mis productos</p>
                                    </li>
                                    <li
                                        className={`flex items-center gap-2 cursor-pointer px-3 py-3 rounded-full    
                                            ${selected === "orderStatus" ? "bg-contrast-secondary text-white translate-x-4 transition-all duration-300" : "text-sm"}`}
                                        onClick={() => onSelect("orderStatus")}
                                    >
                                        <IconFileCheck /><p>Estado de pedidos</p>
                                    </li>
                                </>
                            )}
                        </div>
                        <li>
                            <button className="flex items-center gap-2 cursor-pointer w-full px-3 py-3 rounded-full text-sm text-main-dark hover:text-contrast-secondary hover:translate-x-2 transition-all duration-300"
                                onClick={handleLogout}
                            >
                                <IconLogout2 className="transition-transform duration-300" />
                                <p>Cerrar sesión</p>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
            {type === "ADMIN" && (
                <div className="space-y-10">
                    <h1 className="text-center pt-5 text-3xl">Administración</h1>
                    <div className="">
                        <ul className="space-y-15 flex flex-col h-full w-full">
                            <div className="space-y-3">
                                <li
                                    className={`flex items-center gap-2 cursor-pointer px-3 py-3 rounded-full    
                                    ${selected === "users" ? "bg-contrast-secondary text-white translate-x-4 transition-all duration-300" : "text-sm"}`}
                                    onClick={() => onSelect("users")}
                                >
                                    <IconUser />
                                    Usuarios
                                </li>
                                <li
                                    className={`flex items-center gap-2 cursor-pointer px-3 py-3 rounded-full    
                                    ${selected === "coupons" ? "bg-contrast-secondary text-white translate-x-4 transition-all duration-300" : "text-sm"}`}
                                    onClick={() => onSelect("coupons")}
                                >
                                    <IconTag />
                                    Cupones
                                </li>
                                <li
                                    className={`flex items-center gap-2 cursor-pointer px-3 py-3 rounded-full    
                                    ${selected === "mailbox" ? "bg-contrast-secondary text-white translate-x-4 transition-all duration-300" : "text-sm"}`}
                                    onClick={() => onSelect("mailbox")}
                                >
                                    <IconMailOpened />
                                    Buzón
                                </li>
                            </div>
                            <button className="flex items-center gap-2 cursor-pointer w-full px-3 py-3 rounded-full text-sm text-main-dark hover:text-contrast-secondary hover:translate-x-2 transition-all duration-300"
                                onClick={handleLogout}
                            >
                                <IconLogout2 className="transition-transform duration-300" />
                                <p>Cerrar sesión</p>
                            </button>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
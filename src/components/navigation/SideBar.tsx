import { IconBuildingStore, IconClipboardText, IconFileCheck, IconUser } from "@tabler/icons-react";

interface SideBarProps {
    type: "SELLER" | "CUSTOMER"| "ADMIN" | null | undefined; // tipo de usuario
    onSelect: (section: string) => void;
    selected: string; // sección seleccionada
}

export default function SideBar({ type, onSelect, selected }: SideBarProps) {
    return (
        <div className="flex flex-col items-start p-4 font-quicksand">
            <h2 className="text-2xl font-semibold mb-4">Mi Cuenta</h2>
            <ul className="space-y-3 w-full">
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
            </ul>
        </div>
    );
}
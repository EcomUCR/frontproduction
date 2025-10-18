import { useEffect, useRef, useState } from "react";
import { IconX, IconBell } from "@tabler/icons-react";


export default function NotificationDropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Ejemplo temporal de notificaciones (mock)
    const notifications = [
        { id: 1, title: "Nuevo producto publicado", time: "Hace 5 min" },
        { id: 2, title: "Tu tienda fue verificada", time: "Hace 1 hora" },
        { id: 3, title: "Pedido #482 entregado", time: "Ayer" },
        { id: 3, title: "Pedido #482 entregado", time: "Ayer" },
        { id: 3, title: "Pedido #482 entregado", time: "Ayer" },
        { id: 3, title: "Pedido #482 entregado", time: "Ayer" },
        { id: 3, title: "Pedido #482 entregado", time: "Ayer" },
        { id: 3, title: "Pedido #482 entregado", time: "Ayer" },
        { id: 3, title: "Pedido #482 entregado", time: "Ayer" },
        { id: 3, title: "Pedido #482 entregado", time: "Ayer" },
        { id: 3, title: "Pedido #482 entregado", time: "Ayer" },
        { id: 3, title: "Pedido #482 entregado", time: "Ayer" },
    ];

    // Cierra el menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Botón campana */}
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 rounded-full transition cursor-pointer"
            >
                <IconBell size={22} className="text-white" />
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-contrast-secondary text-white text-[10px] font-bold rounded-full px-1.5">
                        {notifications.length}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-main/10 shadow-2xl rounded-2xl overflow-hidden z-50 animate-fadeIn">
                    {/* Header */}
                    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
                        <h3 className="text-main font-semibold">Notificaciones</h3>
                        <button onClick={() => setOpen(false)}>
                            <IconX size={18} className="text-gray-500 hover:text-main transition" />
                        </button>
                    </div>

                    {/* Lista */}
                    <ul className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-main/40 scrollbar-track-transparent">
                        {notifications.length > 0 ? (
                            notifications.map((n) => (
                                <li
                                    key={n.id}
                                    className="px-4 py-3 hover:bg-main/5 cursor-pointer border-b border-gray-100 transition"
                                >
                                    <p className="text-sm text-gray-800 font-medium">{n.title}</p>
                                    <span className="text-xs text-gray-500">{n.time}</span>
                                </li>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-6 text-sm">
                                No hay notificaciones
                            </p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

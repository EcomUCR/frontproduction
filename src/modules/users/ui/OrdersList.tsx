import { useState } from "react";
import OrderCard from "./components/OrderCard";
import OrderModal from "./components/OrderModal";

export default function OrdersList() {
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

    const orders = [
        {
            id: 142,
            status: "Completed",
            subtotal: 25000,
            shipping: 2500,
            taxes: 3250,
            total: 30750,
            address_id: 5,
            street: "Avenida Central 123",
            city: "San José",
            state: "San José",
            zip_code: "10101",
            country: "Costa Rica",
            payment_method: "tarjeta",
            payment_id: "PAY-82736",
            created_at: "2025-10-18T10:30:00Z",
        },
    ];

    return (
        <div className="px-5 py-8 max-w-[80rem] mx-auto font-quicksand">
            {/* 🔹 Header */}
            <div className="flex flex-col mb-8">
                <h1 className="text-3xl font-bold border-b-4 border-main pb-2 w-fit">
                    Mis pedidos
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Aquí puedes revisar el estado y los detalles de tus compras recientes.
                </p>
            </div>

            {/* 🔹 Lista de pedidos */}
            <div className="flex flex-col gap-6">
                {orders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        onViewOrder={(order) => setSelectedOrder(order)} // 👈 Abre modal
                    />
                ))}
            </div>

            {/* 🔹 Modal: se muestra cuando hay una orden seleccionada */}
            {selectedOrder && (
                <OrderModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)} // 👈 Cierra modal
                />
            )}
        </div>
    );
}

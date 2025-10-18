import { useState } from "react";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import CouponCard from "./CouponCard";
import CouponModal from "./CouponModal";

export default function AdminCoupons() {
    const [showModal, setShowModal] = useState(false);
    const [coupons, setCoupons] = useState<any[]>([]); // simulación de lista
    const [selectedCoupon, setSelectedCoupon] = useState<any | null>(null);

    // 🧠 Abrir modal (crear)
    const handleCreateCoupon = () => {
        setSelectedCoupon(null);
        setShowModal(true);
    };

    // 💾 Guardar cupón (crear o editar)
    const handleSaveCoupon = (couponData: any) => {
        console.log("🧾 Cupón guardado:", couponData);

        // Si es nuevo
        if (!selectedCoupon) {
            setCoupons((prev) => [...prev, { ...couponData, id: Date.now() }]);
        } else {
            // Si era edición
            setCoupons((prev) =>
                prev.map((c) =>
                    c.id === selectedCoupon.id ? { ...c, ...couponData } : c
                )
            );
        }

        setShowModal(false);
    };

    return (
        <section className="pl-4 font-quicksand">
            <div className="pl-5">
                {/* Header */}
                <div className="pb-10 flex items-center justify-between">
                    <h1 className="text-2xl border-b-3 border-main">Administración de cupones</h1>
                    <ButtonComponent
                        text="Crear cupón"
                        style="bg-main-dark text-white rounded-full py-2 px-4 font-quicksand hover:bg-main transition-all duration-400"
                        onClick={handleCreateCoupon}
                    />
                </div>

                {/* Lista de cupones */}
                <div>
                    <h2 className="text-xl font-quicksand mb-4">Cupones</h2>
                    <div className="flex flex-col gap-4">
                        {coupons.length > 0 ? (
                            coupons.map((coupon) => (
                                <CouponCard
                                    key={coupon.id}
                                    coupon={coupon}
                                    onEdit={(coupon) => {
                                        setSelectedCoupon(coupon);
                                        setShowModal(true);
                                    }}
                                    onDelete={(id) => {
                                        if (confirm("¿Eliminar este cupón?")) {
                                            setCoupons((prev) => prev.filter((c) => c.id !== id));
                                        }
                                    }}
                                />

                            ))
                        ) : (
                            <div>

                                <p className="text-gray-500 italic">No hay cupones creados todavía.(HAY UN COUPON QUEMADO PARA LA PREVISUALIZACIÓN DEL COMPONENTE)</p>
                                <CouponCard
                                    coupon={{
                                        id: 1,
                                        code: "TUKI20",
                                        description: "20% de descuento en toda la tienda",
                                        type: "PERCENTAGE",
                                        value: 20,
                                        active: true,
                                        expires_at: "2025-12-31",
                                    }}
                                    onEdit={(coupon) => {
                                        setSelectedCoupon(coupon);
                                        setShowModal(true);
                                    }}
                                    onDelete={/*handleDelete*/ () => { }}
                                />
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <CouponModal
                    coupon={selectedCoupon}
                    onClose={() => setShowModal(false)}
                    onSave={handleSaveCoupon}
                />
            )}
        </section>
    );
}

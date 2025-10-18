import { useState } from "react";
import BannerComponent from "../../../../components/data-display/BannerComponent";
import banner from "../../../../img/resources/banner5.png";
import banner6 from "../../../../img/resources/fondo_negro.png";
import banner4 from "../../../../img/resources/banner4.png";
import banner1 from "../../../../img/resources/sala.png";
import banner2 from "../../../../img/resources/bodega.png";
import trabajador from "../../../../img/resources/trabajador.png";
import perro from "../../../../img/resources/perro.png";
import caja from "../../../../img/resources/caja.png";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import BannerModal from "../components/BannerModal";

type Banner = {
    id: number;
    title?: string;
    image: string;
    type: "large" | "short";
    is_active?: boolean;
    orientation?: "1" | "2";
    subtitle?: string;
    character?: string;
    link?: string;
    btn_text?: string;
    btn_color?: "MORADO" | "AMARILLO" | "NARANJA" | "GRADIENTE";
};

export default function CrudBanners() {
    const [showModal, setShowModal] = useState(false);
    const [newBanner, setNewBanner] = useState<Banner>({
        id: Date.now(),
        title: "",
        subtitle: "",
        image: "",
        character: "",
        type: "short",
        orientation: "1",
        btn_text: "",
        btn_color: "NARANJA",
        link: "",
        is_active: true,
    });

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewBanner((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setNewBanner((prev) => ({ ...prev, [name]: checked }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "image" | "character") => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewBanner((prev) => ({ ...prev, [field]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (!newBanner.image) {
            alert("La imagen principal es obligatoria.");
            return;
        }
        console.log("✅ Nuevo banner creado:", newBanner);
        setShowModal(false);
    };

    // Banners existentes
    const largeBanners: Banner[] = [
        { id: 1, image: banner, type: "large", orientation: "1" },
        { id: 2, image: banner6, type: "large", orientation: "2", character: caja, title: "Crea una cuenta de vendedor en TukiShop", link: "#" },
        { id: 3, image: banner4, type: "large", orientation: "1" },
    ];

    const shortBanners: Banner[] = [
        { id: 4, image: banner1, type: "short", orientation: "1", subtitle: "Alimentos, juguetes, premios y más para su bienestar.", btn_text: "Ver productos", character: perro, title: "Encuentra todo para tu perro." },
        { id: 5, image: banner2, type: "short", orientation: "2", subtitle: "Explora la gran cantidad de productos de tiendas nacionales.", btn_text: "Explorar", character: trabajador, title: "Todo, a un click de distancia", btn_color: "NARANJA" },
    ];

    return (
        <section className="border-l-2 border-main-dark/20 pl-4 font-quicksand">
            <div className="pl-5">
                {/* Header */}
                <div className="pb-10 flex items-center justify-between">
                    <h1 className="text-2xl">Administración de banners</h1>
                    <ButtonComponent
                        text="Agregar banner"
                        style="bg-main-dark text-white rounded-full py-2 px-4 font-quicksand hover:bg-main transition-all duration-400"
                        onClick={() => setShowModal(true)}
                    />
                </div>

                {/*Modal del crud*/}
                {showModal && (
                    <BannerModal
                        newBanner={newBanner}
                        setNewBanner={setNewBanner}
                        onClose={() => setShowModal(false)}
                        onSave={handleSave}
                        handleInputChange={handleInputChange}
                        handleCheckboxChange={handleCheckboxChange}
                        handleFileChange={handleFileChange}
                    />
                )}

                {/* Banners existentes */}
                <div className="space-y-10">
                    <div>
                        <h2 className="text-xl font-quicksand mb-4">Large Banners</h2>
                        <div className="grid grid-cols-2 auto-rows-[10rem] place-items-center gap-6">
                            {largeBanners.map((b) => (
                                <div key={b.id} className="w-full h-full">
                                    <BannerComponent {...b} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-quicksand mb-4">Short Banners</h2>
                        <div className="grid grid-cols-2 auto-rows-[12rem] place-items-center gap-6">
                            {shortBanners.map((b) => (
                                <div key={b.id} className="scale-[0.7] origin-center w-fit">
                                    <BannerComponent {...b} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

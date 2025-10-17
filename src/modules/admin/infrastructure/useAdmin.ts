import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../hooks/context/AuthContext"; // 👈 importamos el contexto

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    image: string;
    status: boolean;
    phone_number: string;
    role: "ADMIN" | "SELLER" | "CUSTOMER";
    store?: Store | null;
}

export interface Store {
    store_socials: any;
    registered_address: any;
    address: any;
    image: string;
    banner: string;
    id: number;
    name: string;
    slug: string;
    description?: string;
    category_id?: number | null;
    business_name?: string | null;
    tax_id?: string | null;
    legal_type?: string | null;
    support_email?: string | null;
    support_phone?: string | null;
    status?: string;
}

export type Product = {
    store_id?: number;
    id?: number;
    name: string;
    description?: string;
    price: number;
    discount_price?: number;
    stock: number;
    status: "ACTIVE" | "INACTIVE" | "ARCHIVED";
    categories: number[];
    rating?: number;
    image: File | string | null;
    image_1_url?: string;
    is_featured: boolean;
    store?: {
        id: number;
        name: string;
    };
};

export default function useAdmin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth(); // 👈 usamos el token directamente del contexto

    const getUsers = async (): Promise<User[]> => {
        setLoading(true);
        setError(null);

        if (!token) {
            console.warn("⚠️ No hay token disponible (usuario no logueado)");
            setLoading(false);
            return [];
        }

        try {
            console.log("🔑 Token actual:", token);
            const res = await axios.get(`${BASE_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ token del contexto
                },
            });

            return res.data;
        } catch (e: any) {
            setError("No se pudieron cargar los usuarios");
            console.error("❌ Error al obtener usuarios:", e);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { getUsers, loading, error };
}

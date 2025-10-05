import { useState } from "react";
import axios from "axios";

// ⚠️ Usamos el proxy de Vite en dev: en producción se debe usar VITE_API_URL
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

// src/infrastructure/useProducts.ts
export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id?: number;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  stock: number;
  status: boolean;
  categories: number[]; // array de IDs
  image: File | string | null; // Puede ser un archivo o la URL ya subida
};

export function useProducts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Obtener categorías
  const getCategories = async (): Promise<Category[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/categories`);
      return res.data;
    } catch (e: any) {
      setError("No se pudieron cargar las categorías");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Subir imagen y obtener URL de cloudinary
  const uploadImage = async (imageFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await axios.post(`${BASE_URL}/upload-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.url as string;
  };

  // Crear producto
  const createProduct = async (product: Product) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      let imageUrl = "";

      // Subir la imagen si es un File
      if (product.image && product.image instanceof File) {
        imageUrl = await uploadImage(product.image);
      }

      // Ajustar los payload
      const payload: any = {
        // store_id: ... (debes obtenerlo de la sesión o contexto!)
        store_id: 1, // 🔴 Cambia esto por el store real!
        sku: product.name.substring(0, 30) + Date.now(), // Generas uno temporal
        name: product.name,
        description: product.description || "",
        price: product.price,
        discount_price: product.discount || null,
        stock: product.stock,
        status: product.status ? 1 : 0,
        is_featured: false,
        image_url: imageUrl,
        // Agrega más si tu tabla productos lo requiere.
      };

      // Enviar producto
      await axios.post(`${BASE_URL}/products`, payload);

      setSuccess("¡Producto creado con éxito!");
    } catch (e: any) {
      setError("Error al crear el producto: " + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  };

  // Editar producto
  const updateProduct = async (id: number, product: Product) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      let imageUrl = typeof product.image === "string" ? product.image : undefined;

      if (product.image && product.image instanceof File) {
        imageUrl = await uploadImage(product.image);
      }

      const payload: any = {
        name: product.name,
        description: product.description,
        price: product.price,
        discount_price: product.discount,
        stock: product.stock,
        status: product.status ? 1 : 0,
        is_featured: false,
        image_url: imageUrl,
      };

      await axios.put(`${BASE_URL}/products/${id}`, payload);
      setSuccess("¡Producto editado con éxito!");
    } catch (e: any) {
      setError("Error al editar el producto: " + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  };

  return { getCategories, createProduct, updateProduct, loading, error, success };
}
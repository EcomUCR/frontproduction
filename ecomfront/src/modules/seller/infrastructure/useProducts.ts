import { useState } from "react";
import axios from "axios";
import { getStoreByUser } from "../..//users/infrastructure/storeService";
import { useAuth } from "../../../hooks/context/AuthContext";

// ⚠️ Usamos el proxy de Vite en dev: en producción se debe usar VITE_API_URL
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

// src/infrastructure/useProducts.ts
export type Category = {
  id: number;
  name: string;
};

export type Product = {
  store_id?: number;
  id?: number;
  name: string;
  description?: string;
  price: number;
  discount_price?: number;
  stock: number;
  status: boolean;
  categories: number[];
  image: File | string | null;
  image_url?: string;
  is_featured: boolean;
  store?: {
    id: number;
    name: string;
  };
};

export function useProducts() {
  const { user } = useAuth();
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
  const getFeaturedProducts = async (): Promise<Product[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/products/featured`);
      return res.data;
    } catch (e: any) {
      setError("No se pudieron cargar los productos destacados");
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
      const store = await getStoreByUser(user?.id ?? 0);

      if (!store || !store.id) {
        throw new Error("No se encontró la tienda asociada al usuario");
      }

      const store_id = store.id;


      // ⚠️ Validar si se subió imagen antes de continuar
      if (!product.image || !(product.image instanceof File)) {
        setError("Debes subir una imagen antes de crear el producto");
        setLoading(false);
        return;
      }

      // Subir la imagen
      const imageUrl = await uploadImage(product.image);

      // Payload del producto
      const payload: any = {
        store_id: store_id,
        sku: product.name,
        name: product.name,
        description: product.description || "",
        price: product.price,
        discount_price: product.discount_price || null,
        stock: product.stock,
        status: product.status ? 1 : 0,
        is_featured: product.is_featured,
        image_url: imageUrl,
        
      };

      // Enviar producto al backend
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
        discount_price: product.discount_price,
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
  const getProducts = async (): Promise<Product[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      return res.data; // Ajusta esto según el formato de tu backend
    } catch (e: any) {
      setError("No se pudieron cargar los productos");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: number): Promise<Product | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/products/${id}`);
      return res.data;
    } catch (e: any) {
      setError("No se pudo cargar el producto");
      return null;
    } finally {
      setLoading(false);
    }
  };


  const getProductsByStore = async (store_id: number): Promise<Product[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/stores/${store_id}/products`);
      return res.data;
    } catch (e: any) {
      setError("No se pudieron cargar los productos");
      return [];
    } finally {
      setLoading(false);
    }
  };


  return { getProductById, getProductsByStore, getProducts, getFeaturedProducts, getCategories, createProduct, updateProduct, loading, error, success };
}
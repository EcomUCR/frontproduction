import { useState } from "react";
import axios from "axios";
import { getStoreByUser } from "./storeService";
import { useAuth } from "../../../hooks/context/AuthContext";


const BASE_URL = import.meta.env.VITE_API_URL || "/api";


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
  status: "ACTIVE" | "INACTIVE" | "DRAFT" | "ARCHIVED";
  categories: number[];
  rating?: number;
  
  image_1?: File | string | null;
  image_2?: File | string | null;
  image_3?: File | string | null;
  image_1_url?: string;
  image_2_url?: string;
  image_3_url?: string;
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
  const normalizeProduct = (p: any): Product => ({
    ...p,
    store: p.store || (p.store_name ? { id: p.store_id, name: p.store_name } : undefined),
  });

 
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
      return res.data.map(normalizeProduct);
    } catch (e: any) {
      setError("No se pudieron cargar los productos destacados");
      return [];
    } finally {
      setLoading(false);
    }
  };

 
  const uploadImage = async (imageFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await axios.post(`${BASE_URL}/upload-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.url as string;
  };

 
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

      
      const uploadedImages: (string | null)[] = [];
      for (let i = 0; i < 3; i++) {
        const img = (product as any)[`image_${i + 1}`];
        if (img && img instanceof File) uploadedImages[i] = await uploadImage(img);
        else uploadedImages[i] = null;
      }

     
      const payload: any = {
        store_id: store_id,
        sku: `SKU-${Date.now()}`,
        name: product.name,
        description: product.description || "",
        price: product.price,
        discount_price: product.discount_price ?? product.price, 
        stock: product.stock,
        status:
          product.status === "INACTIVE"
            ? "INACTIVE"
            : product.status === "ARCHIVED"
            ? "ARCHIVED"
            : "ACTIVE",
        is_featured: product.is_featured,
        category_ids: product.categories,
        image_1_url: uploadedImages[0],
        image_2_url: uploadedImages[1],
        image_3_url: uploadedImages[2],
      };

      await axios.post(`${BASE_URL}/products`, payload);
      setSuccess("¡Producto creado con éxito!");
    } catch (e: any) {
      setError("Error al crear el producto: " + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  };


  const updateProduct = async (id: number, product: Product) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const uploadedImages: (string | null)[] = [];

      for (let i = 0; i < 3; i++) {
        const img = (product as any)[`image_${i + 1}`];
        if (img && img instanceof File) uploadedImages[i] = await uploadImage(img);
        else if (typeof img === "string") uploadedImages[i] = img;
        else uploadedImages[i] = null;
      }

      const payload: any = {
        name: product.name,
        description: product.description,
        price: product.price,
        discount_price: product.discount_price,
        stock: product.stock,
        is_featured: product.is_featured ?? false,
        status: product.status,
        category_ids: product.categories,
        image_1_url: uploadedImages[0],
        image_2_url: uploadedImages[1],
        image_3_url: uploadedImages[2],
      };

      await axios.put(`${BASE_URL}/products/${id}`, payload);
      setSuccess("¡Producto editado con éxito!");
    } catch (e: any) {
      setError("Error al editar el producto: " + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  };

 
  const getProductsForOwner = async (store_id: number): Promise<Product[]> => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get(`${BASE_URL}/store/${store_id}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.map(normalizeProduct);
    } catch (e: any) {
      console.error("❌ Error al cargar productos del dueño:", e);
      setError("No se pudieron cargar tus productos");
      return [];
    } finally {
      setLoading(false);
    }
  };

  
  const getOffersByStore = async (store_id: number): Promise<Product[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/store/${store_id}/offers`);
      return res.data.map(normalizeProduct);
    } catch (e: any) {
      setError("No se pudieron cargar las ofertas de esta tienda");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/categories/${categoryId}/products`);
      return res.data.map(normalizeProduct);
    } catch (e: any) {
      setError("No se pudieron cargar los productos de esta categoría");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedProductsByStore = async (store_id: number): Promise<Product[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/stores/${store_id}/featured`);
      return res.data.map(normalizeProduct);
    } catch (e: any) {
      setError("No se pudieron cargar los productos destacados de la tienda");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async (): Promise<Product[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      return res.data.map(normalizeProduct);
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
      return normalizeProduct(res.data);
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
      return res.data.map(normalizeProduct);
    } catch (e: any) {
      setError("No se pudieron cargar los productos");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    getProductById,
    getProductsByStore,
    getFeaturedProductsByStore,
    getProducts,
    getFeaturedProducts,
    getCategories,
    getProductsByCategory,
    createProduct,
    updateProduct,
    getProductsForOwner,
    getOffersByStore,
    loading,
    error,
    success,
  };
}

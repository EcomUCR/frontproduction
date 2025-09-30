import { useState } from "react";
import axios from "axios";

// ⚠️ Usamos el proxy de Vite en dev: en producción se debe usar VITE_API_URL
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

// 📌 Tipos que vienen del backend Laravel
export interface ProductImage {
  id: number;
  url: string;
  order: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Vendor {
  id: number;
  name: string;
}

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  stock: number;
  status: boolean;
  categories: number[];
  images?: ProductImage[];
  vendor?: Vendor;
  image?: File | null; // archivo temporal a subir tras guardar
}

export function useProducts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // =========================
  // Helpers de imágenes
  // =========================
  const uploadProductImage = async (productId: number, file: File) => {
    const form = new FormData();
    form.append("product_id", String(productId));
    form.append("image", file);
    await axios.post(`${BASE_URL}/product-images`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const getProductImages = async (productId: number): Promise<ProductImage[]> => {
    const res = await axios.get(`${BASE_URL}/products/${productId}/images`);
    return res.data?.images ?? [];
  };

  const deleteProductImage = async (imageId: number) => {
    await axios.delete(`${BASE_URL}/product-images/${imageId}`);
  };

  // =========================
  // Productos
  // =========================
  const getProducts = async (): Promise<Product[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      return res.data;
    } catch (e: any) {
      setError("No se pudieron cargar los productos");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: Product) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description || "");
      formData.append("price", String(Number(product.price) || 0));
      formData.append("discount", String(Number(product.price) || 0));
      formData.append("stock", String(Number(product.price) || 0));
      formData.append("status", product.status ? "1" : "0");

      if (product.categories) {
        product.categories.forEach((cat) =>
          formData.append("categories[]", cat.toString())
        );
      }

      const res = await axios.post(`${BASE_URL}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const created = res.data;
      if (product.image && created?.id) {
       // await uploadProductImage(created.id, product.image);
      }

      setSuccess("Producto creado correctamente");
      return created;
    } catch (e: any) {
      console.error("Error backend:", e.response.data);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: number, product: Product) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description || "");
      formData.append("price", product.price.toString());
      formData.append("discount", product.discount?.toString() || "0");
      formData.append("stock", product.stock.toString());
      formData.append("status", product.status ? "1" : "0");

      if (product.categories) {
        product.categories.forEach((cat) =>
          formData.append("categories[]", cat.toString())
        );
      }

      const res = await axios.post(`${BASE_URL}/products/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (product.image) {
       // await uploadProductImage(id, product.image);
      }

      setSuccess("Producto actualizado correctamente");
      return res.data;
    } catch (e: any) {
      setError("No se pudo actualizar el producto");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await axios.delete(`${BASE_URL}/products/${id}`);
      setSuccess("Producto eliminado correctamente");
      return res.data;
    } catch (e: any) {
      setError("No se pudo eliminar el producto");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async (): Promise<Category[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/categories`);
      return res.data;
    } catch (e: any) {
      setError("No se pudieron cargar las categorías");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    // productos
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    // categorías
    getCategories,
    // imágenes
    uploadProductImage,
    getProductImages,
    deleteProductImage,
    // ui state
    loading,
    error,
    success,
  };
}

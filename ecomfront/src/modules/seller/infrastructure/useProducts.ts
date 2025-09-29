import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

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
  categories: number[]; // 👈 solo IDs
  images?: ProductImage[];
  vendor?: Vendor;
  image?: File | null;
}

export function useProducts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 📌 Obtener todos los productos
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

  // 📌 Crear producto
  const createProduct = async (product: Product) => {
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
          formData.append("categories[]", cat.id.toString())
        );
      }
      if (product.image) {
        formData.append("image", product.image);
      }

      const res = await axios.post(`${BASE_URL}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Producto creado correctamente");
      return res.data;
    } catch (e: any) {
      setError("No se pudo crear el producto");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // 📌 Actualizar producto
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
          formData.append("categories[]", cat.id.toString())
        );
      }
      if (product.image) {
        formData.append("image", product.image);
      }

      const res = await axios.post(`${BASE_URL}/products/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Producto actualizado correctamente");
      return res.data;
    } catch (e: any) {
      setError("No se pudo actualizar el producto");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // 📌 Eliminar producto
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

  // 📌 Obtener categorías
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
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    loading,
    error,
    success,
  };
}

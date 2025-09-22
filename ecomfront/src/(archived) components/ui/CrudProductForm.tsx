import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./button";
import backArrowIcon from "../../img/backArrow.png";
import uploadIcon from "../../img/UploadIcon.png";
import mainProductImage from "../../img/sombrasClaro.png";
import React from "react";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id?: number;
  name: string;
  description: string;
  price: string;
  discount: string;
  stock: string;
  status: string;
  categories: string[];
  image: File | null;
}

const CrudProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    status: "active",
    categories: [],
    image: null,
  });

  const token = localStorage.getItem("token");

  // 🔹 Cargar categorías
  useEffect(() => {
    fetch("/api/categories", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error cargando categorías:", err));
  }, [token]);

  // 🔹 Si hay id → cargar producto
  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setForm({
            name: data.name,
            description: data.description || "",
            price: String(data.price),
            discount: String(data.discount),
            stock: String(data.stock),
            status: data.status ? "active" : "inactive",
            categories: data.categories?.map((c: any) => String(c.id)) || [],
            image: null,
          });
        })
        .catch((err) => console.error("Error cargando producto:", err));
    }
  }, [id, token]);

  // 🔹 Manejo de inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Manejo de categorías múltiples
  const handleCategoriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setForm((prev) => ({ ...prev, categories: values }));
  };

  // 🔹 Guardar producto
  const handleSave = async () => {
    const body = new FormData();
    body.append("name", form.name);
    body.append("description", form.description);
    body.append("price", form.price);
    body.append("stock", form.stock);
    body.append("discount", form.discount || "0");
    body.append("status", form.status === "active" ? "1" : "0");
    form.categories.forEach((catId) =>
      body.append("categories[]", catId.toString())
    );
    if (form.image) body.append("image", form.image);

    // 👇 Hack para que Laravel acepte PUT
    if (id) body.append("_method", "PUT");

    const url = id ? `/api/products/${id}` : "/api/products";
    const method = "POST"; // siempre POST

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body,
      });

      if (res.ok) {
        alert(id ? "Producto actualizado ✅" : "Producto creado 🚀");
        navigate("/profile-seller-products-page");
      } else {
        const error = await res.json().catch(() => ({}));
        console.error("❌ Error del backend:", error);
        alert("Error al guardar producto ❌");
      }
    } catch (err) {
      console.error("❌ Error de red:", err);
      alert("No se pudo conectar al servidor");
    }
  };

  // 🔹 Eliminar producto
  const handleDelete = async () => {
    if (!id) return alert("No hay producto para eliminar");

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert("Producto eliminado ❌");
      navigate("/profile-seller-products-page");
    } else {
      alert("Error al eliminar producto");
    }
  };

  return (
    <div className="p-8">
      {/* 🔹 Header */}
      <div className="flex items-center space-x-2 text-gray-700 mb-6">
        <Button
          onClick={() => navigate(-1)}
          className="flex items-center bg-white border px-3 py-2 rounded-md shadow-sm text-black"
        >
          <img src={backArrowIcon} alt="Volver" className="w-4 h-4 mr-2" />
          <span className="text-black">Volver</span>
        </Button>

        <h1 className="text-4xl font-semibold border-b-2 border-purple-main">
          {id ? "Editar Producto" : "Nuevo Producto"}
        </h1>
        <span className="text-black text-2xl"> - Administrador de Productos</span>
      </div>

      <div className="flex justify-between">
        {/* 🔹 Lado izquierdo */}
        <div className="w-1/2 pr-12 flex flex-col space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre*
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre del producto"
              className="w-full px-4 py-3 border rounded-md text-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Categorías*
            </label>
            <select
              multiple
              value={form.categories}
              onChange={handleCategoriesChange}
              className="w-2/3 px-3 py-2 border rounded-md text-gray-700"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Usa Ctrl/Cmd + clic para seleccionar varias categorías
            </p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sobre este producto*
            </label>
            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-gray-700"
              placeholder="Descripción del producto..."
            />
          </div>

          {/* 🔹 Subir imagen */}
          <div className="flex flex-col w-full mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 self-start">
              Imagen*
            </label>

            <label
              htmlFor="file-upload"
              className="bg-gray-100 rounded-md p-20 flex flex-col items-center justify-center cursor-pointer w-full"
            >
              <img src={uploadIcon} alt="Subir imagen" className="w-8 h-8 mb-2" />
              <span className="text-gray-500 text-sm border border-blue-main rounded-md px-2 py-1">
                Subir imagen
              </span>
            </label>

            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  image: e.target.files ? e.target.files[0] : null,
                }))
              }
            />

            {form.image && (
              <p className="mt-2 text-sm text-green-600">
                Archivo seleccionado: {form.image.name}
              </p>
            )}
          </div>
        </div>

        {/* 🔹 Lado derecho */}
        <div className="w-1/2 pl-12 flex flex-col items-center">
          <div className="grid grid-cols-2 gap-6 mb-8 w-full">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Precio*
              </label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Descuento (%)
              </label>
              <input
                type="text"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Cantidad disponible*
              </label>
              <input
                type="text"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Estado*
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md text-gray-700"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
          </div>

          {/* 🔹 Vista previa */}
          <div className="flex flex-col items-center w-64">
            <h2 className="text-xl font-bold mb-2 self-start ml-2">Vista previa</h2>
            <div className="bg-gray-100 p-6 rounded-md shadow-inner flex flex-col items-center text-center w-full">
              <img
                src={form.image ? URL.createObjectURL(form.image) : mainProductImage}
                alt="Preview"
                className="w-40 h-auto mb-4 rounded-md"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {form.name || "Nombre del producto"}
              </h3>
              <p className="text-gray-500 text-sm mb-2">Unstable Games</p>
              {form.discount ? (
                <>
                  <p className="text-gray-300 text-sm line-through mb-1">
                    ${form.price}
                  </p>
                  <p className="text-purple-main text-xl font-bold">
                    $
                    {(
                      parseFloat(form.price || "0") *
                      (1 - parseFloat(form.discount) / 100)
                    ).toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-purple-main text-xl font-bold">
                  ${form.price || "0"}
                </p>
              )}
            </div>
          </div>

          {/* 🔹 Botones */}
          <div className="mt-8 space-y-4 flex flex-col items-center w-full">
            <Button
              onClick={handleSave}
              className="w-3/4 bg-yellow-main text-white font-bold py-2 px-6 rounded-md"
            >
              {id ? "Actualizar" : "Guardar y Publicar"}
            </Button>

            {id && (
              <Button
                onClick={handleDelete}
                className="w-3/4 bg-red-400 text-white font-bold py-2 px-6 rounded-md"
              >
                Eliminar producto
              </Button>
            )}

            <Button
              onClick={() => navigate("/profile-seller-products-page")}
              className="w-3/4 bg-gray-800 text-white font-bold py-2 px-6 rounded-md"
            >
              Cancelar cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudProductForm;

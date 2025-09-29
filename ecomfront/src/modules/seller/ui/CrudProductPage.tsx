import { useEffect, useState } from "react";
import { useProducts, Product, Category } from "../infrastructure/useProducts";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import ProductCard from "../../../components/data-display/ProductCard";
import { IconArrowBackUp } from "@tabler/icons-react";

export default function CrudProductPage() {
  const { createProduct, updateProduct, getCategories, loading, error, success } =
    useProducts();

  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    discount: 0,
    stock: 0,
    status: true,
    categories: [], // ahora es array de IDs
    image: null,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  // 📌 Cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error al cargar categorías", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateProduct(form.id, form);
      } else {
        await createProduct(form);
      }
    } catch (err) {
      console.error("Error al guardar producto", err);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(e.target.selectedOptions, (option) =>
      Number(option.value)
    );
    setForm({ ...form, categories: selectedIds });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <NavBar />
      <section className="flex flex-col font-quicksand gap-5 my-10 mx-auto max-w-[80rem]">
        {/* Encabezado */}
        <div className="flex items-center gap-3">
          <ButtonComponent
            icon={<IconArrowBackUp />}
            text="Volver"
            style="flex text-sm ml-5 px-2 items-center gap-2 rounded-full"
            onClick={() => window.history.back()}
          />
          <h1 className="text-3xl font-bold border-b-3 border-main">Nuevo Producto</h1>
          <p className="text-2xl">-</p>
          <p className="text-xl"> Unstable Games</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="mx-30 flex flex-col gap-10 py-10">
            <div className="w-full flex gap-5">
              {/* Nombre */}
              <label className="flex flex-col w-6/12 gap-2">
                <p className="font-semibold">
                  Nombre del producto <span className="text-red-500">*</span>
                </p>
                <textarea
                  cols={35}
                  rows={2}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nombre"
                  className="bg-main-dark/20 rounded-2xl p-2 w-2/3"
                />
              </label>

              {/* Precio y descuento */}
              <div className="flex w-6/12 gap-5">
                <label className="flex flex-col w-full gap-2">
                  <p className="font-semibold">
                    Precio <span className="text-red-500">*</span>
                  </p>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: parseFloat(e.target.value) })
                    }
                    placeholder="Precio"
                    className="bg-main-dark/20 rounded-2xl p-2"
                  />
                </label>
                <label className="flex flex-col w-full gap-2">
                  <p className="font-semibold">Precio de oferta</p>
                  <input
                    type="number"
                    value={form.discount}
                    onChange={(e) =>
                      setForm({ ...form, discount: parseFloat(e.target.value) })
                    }
                    placeholder="Precio de oferta"
                    className="bg-main-dark/20 rounded-2xl p-2"
                  />
                </label>
              </div>
            </div>

            <div className="w-full flex gap-5">
              {/* Categoría */}
              <label className="flex flex-col w-6/12 gap-2">
                <p className="font-semibold">
                  Categoría <span className="text-red-500">*</span>
                </p>
                <select
                  multiple
                  value={form.categories.map((id) => id.toString())} // 👈 casteo a string
                  onChange={handleCategoryChange}
                  className="bg-main-dark/20 rounded-2xl p-2 w-2/3"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <small className="text-gray-500">
                  Mantén presionado CTRL o CMD para seleccionar varias
                </small>
              </label>

              {/* Stock y Estado */}
              <div className="flex w-6/12 gap-5">
                <label className="flex flex-col w-full gap-2">
                  <p className="font-semibold">
                    Stock <span className="text-red-500">*</span>
                  </p>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: parseInt(e.target.value) })
                    }
                    placeholder="Stock"
                    className="bg-main-dark/20 rounded-2xl p-2 w-full"
                  />
                </label>
                <label className="flex flex-col w-full gap-2">
                  <p className="font-semibold">
                    Estado <span className="text-red-500">*</span>
                  </p>
                  <select
                    value={form.status ? "1" : "0"}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value === "1" })
                    }
                    className="bg-main-dark/20 rounded-2xl p-2 w-full"
                  >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full px-30">
            {/* Columna izquierda */}
            <div className="flex flex-col w-1/2 gap-6">
              <label className="w-full">
                <p className="font-semibold">Sobre este producto</p>
                <textarea
                  placeholder="Sobre este producto"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  cols={40}
                  rows={5}
                  className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                />
              </label>
              <label>
                <p className="font-semibold">Agregar imágenes</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-main-dark/20 rounded-2xl p-2 w-full"
                />
              </label>
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col items-center justify-center w-1/2 gap-2">
              <label className="flex items-center gap-2">
                <p className="font-semibold">Destacar producto</p>
                <input type="checkbox" />
              </label>
              <ProductCard
                shop="Preview"
                title={form.name || "Nombre del producto"}
                price={form.price ? form.price.toString() : "0"}
                discountPrice={form.discount ? form.discount.toString() : undefined}
                img={preview || undefined}
                edit={false}
              />
              <div className="flex flex-col items-center gap-5 py-10 w-full">
                <ButtonComponent
                  text={loading ? "Guardando..." : "Guardar"}
                  style="text-white text-lg p-2 items-center rounded-full bg-contrast-main w-2/3"
                />
                <ButtonComponent
                  text="Eliminar producto"
                  style="text-white text-lg p-2 items-center rounded-full bg-contrast-secondary w-2/3"
                />
                <ButtonComponent
                  text="Cancelar"
                  style="text-white text-lg p-2 items-center rounded-full bg-main-dark w-2/3"
                  onClick={() => window.history.back()}
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </form>
      </section>
      <Footer />
    </div>
  );
}

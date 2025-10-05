import React, { useEffect, useState } from "react";
import { useProducts } from "../infrastructure/useProducts";
import type { Product, Category } from "../infrastructure/useProducts";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import ProductCard from "../../../components/data-display/ProductCard";
import { IconArrowBackUp } from "@tabler/icons-react";
import FeaturedProductCard from "../../../components/data-display/FeaturedProductCard";
import CategorySelector from "../../../components/ui/CategorySelector";

export default function CrudProductPage() {
  const {
    createProduct,
    updateProduct,
    getCategories,
    loading,
    error,
    success,
  } = useProducts();

  const [isFeatured, setIsFeatured] = useState(false);

  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    discount: 0,
    stock: 0,
    status: true,
    categories: [],
    image: null,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result);
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
        setForm({
          name: "",
          description: "",
          price: 0,
          discount: 0,
          stock: 0,
          status: true,
          categories: [],
          image: null,
        });
        setPreview(null);
      }
    } catch (err) {
      // El error se muestra en el hook
    }
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
        <div className="flex items-center gap-3">
          <ButtonComponent
            icon={<IconArrowBackUp />}
            text="Volver"
            style="flex text-sm ml-5 px-2 items-center gap-2 rounded-full"
            onClick={() => window.history.back()}
          />
          <h1 className="text-3xl font-bold border-b-3 border-main">
            Nuevo Producto
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mx-30 flex flex-col gap-10 py-10">
            <div className="w-full flex gap-5">
              <label className="flex flex-col w-6/12 gap-2">
                <p className="font-semibold">
                  Nombre del producto <span className="text-red-500">*</span>
                </p>
                <textarea
                  maxLength={54}
                  cols={35}
                  rows={2}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nombre"
                  className="bg-main-dark/20 rounded-2xl p-2 w-2/3"
                />
              </label>
              <div className="flex w-6/12 gap-5">
                <label className="flex flex-col w-full gap-2">
                  <p className="font-semibold">
                    Precio <span className="text-red-500">*</span>
                  </p>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: Number(e.target.value) })
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
                      setForm({ ...form, discount: Number(e.target.value) })
                    }
                    placeholder="Precio de oferta"
                    className="bg-main-dark/20 rounded-2xl p-2"
                  />
                </label>
              </div>
            </div>
            <div className="w-full flex gap-5">
              <div className="flex flex-col w-6/12 gap-2">
                <p className="font-semibold">
                  Categorías <span className="text-red-500">*</span>
                </p>
                <CategorySelector
                  categories={categories}
                  selected={form.categories}
                  setSelected={(ids) => setForm({ ...form, categories: ids })}
                />
              </div>
              <div className="flex w-6/12 gap-5">
                <label className="flex flex-col w-full gap-2">
                  <p className="font-semibold">
                    Stock <span className="text-red-500">*</span>
                  </p>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: Number(e.target.value) })
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
          {/* Imagen y preview */}
          <div className="flex gap-2 w-full px-30">
            <div className="flex flex-col w-1/2 gap-6">
              <label className="w-full">
                <p className="font-semibold">Sobre este producto</p>
                <textarea
                  placeholder="Sobre este producto"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  cols={50}
                  rows={5}
                  className="bg-main-dark/20 rounded-xl px-3 py-2 w-auto"
                />
              </label>
              <label>
                <p className="font-semibold">Agregar imágenes</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-main-dark/20 rounded-2xl p-2 w-auto"
                />
              </label>
            </div>
            <div className="flex flex-col items-center justify-center w-1/2 gap-2">
              <label className="flex items-center gap-2">
                <p className="font-semibold">Destacar producto</p>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
              </label>
              {/* Preview */}
              {isFeatured ? (
                <FeaturedProductCard
                  shop="Preview"
                  title={form.name || "Nombre del producto"}
                  price={form.price ? form.price.toString() : "0"}
                  discountPrice={
                    form.discount ? form.discount.toString() : undefined
                  }
                  img={preview || undefined}
                  rating={5}
                  edit={false}
                />
              ) : (
                <ProductCard
                  shop="Preview"
                  title={form.name || "Nombre del producto"}
                  price={form.price ? form.price.toString() : "0"}
                  discountPrice={
                    form.discount ? form.discount.toString() : undefined
                  }
                  img={preview || undefined}
                  edit={false}
                />
              )}
              <div className="flex flex-col items-center gap-5 py-10 w-full">
                <ButtonComponent
                  text={loading ? "Guardando..." : "Guardar"}
                  style="text-white text-lg p-2 items-center rounded-full bg-contrast-main w-2/3"
                  type="submit"
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

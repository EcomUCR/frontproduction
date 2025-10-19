import React, { useEffect, useState } from "react";
import { useProducts } from "../infrastructure/useProducts";
import { useOpenAI } from "../infrastructure/useOpenAI";
import type { Product, Category } from "../infrastructure/useProducts";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import ProductCard from "../../../components/data-display/ProductCard";
import { IconArrowBackUp, IconWand } from "@tabler/icons-react";
import FeaturedProductCard from "../../../components/data-display/FeaturedProductCard";
import CategorySelector from "../../../components/ui/CategorySelector";
import { useAuth } from "../../../hooks/context/AuthContext";
import { useParams } from "react-router-dom";

type ProductForm = Omit<
  Product,
  "price" | "discount_price" | "image_1_url" | "image_2_url" | "image_3_url"
> & {
  price: string | number;
  discount_price: string | number;
  images: (File | string | null)[];
};

type ProductPayload = Omit<ProductForm, "images"> & {
  image_1?: File | string | null;
  image_2?: File | string | null;
  image_3?: File | string | null;
};

export default function CrudProductPage() {
  const {
    createProduct,
    updateProduct,
    getCategories,
    getProductById,
    loading,
    error,
    success,
  } = useProducts();

  const { id } = useParams();
  const { user } = useAuth();
  const {
    getDescription,
    loading: loadingDescription,
    error: errorDescription,
  } = useOpenAI();

  const fileInputRefs = [
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
  ];

  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    discount_price: 0,
    stock: 0,
    status: "ACTIVE",
    categories: [],
    images: [null, null, null],
    is_featured: false,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [previews, setPreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const [errorPrice, setErrorPrice] = useState<string | null>(null);
  const [errorDiscount, setErrorDiscount] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const result = await getCategories();
      setCategories(result);
    })();
  }, []);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const product = await getProductById(Number(id));
      if (product) {
        const loadedImages: (string | null)[] = [
          product.image_1_url || null,
          product.image_2_url || null,
          product.image_3_url || null,
        ];

        setForm({
          ...(product as any),
          images: loadedImages,
          price: product.price.toString(),
          discount_price: product.discount_price?.toString() || "0",
          categories: Array.isArray(product.categories)
            ? product.categories.map((cat: any) => cat.id)
            : [],
          status: product.status || "ACTIVE",
        });
        setPreviews(loadedImages);
      }
    })();
  }, [id]);

  const handleGenerateDescription = async () => {
    const description = await getDescription(form.name);
    if (description) setForm({ ...form, description });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const storeId = user?.store?.id;
    if (!storeId) {
      alert("No se encontró la tienda asociada al usuario");
      return;
    }

    const payload: ProductPayload = {
      store_id: storeId,
      price: Number(form.price),
      discount_price: Number(form.discount_price),
      name: form.name,
      description: form.description,
      stock: form.stock,
      status: form.status,
      categories: form.categories,
      is_featured: form.is_featured,
      image_1: form.images[0],
      image_2: form.images[1],
      image_3: form.images[2],
    };

    try {
      if (id) {
        await updateProduct(Number(id), payload as any);
      } else {
        await createProduct(payload as any);

        setForm({
          name: "",
          description: "",
          price: 0,
          discount_price: 0,
          stock: 0,
          status: "ACTIVE",
          categories: [],
          images: [null, null, null],
          is_featured: false,
        });
        setPreviews([null, null, null]);
        fileInputRefs.forEach((ref) => {
          if (ref.current) ref.current.value = "";
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      setForm((prevForm) => {
        const newImages = [...prevForm.images];
        newImages[index] = file;
        return { ...prevForm, images: newImages };
      });

      setPreviews((prevPreviews) => {
        const newPreviews = [...prevPreviews];
        newPreviews[index] = fileURL;
        return newPreviews;
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    if (fileInputRefs[index].current) {
      fileInputRefs[index].current!.value = "";
    }

    if (previews[index] && form.images[index] instanceof File) {
      URL.revokeObjectURL(previews[index]!);
    }

    setForm((prevForm) => {
      const newImages = [...prevForm.images];
      newImages[index] = null;
      return { ...prevForm, images: newImages };
    });
    setPreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews[index] = null;
      return newPreviews;
    });
  };

  const mainPreview =
    previews[0] ||
    (typeof form.images[0] === "string"
      ? form.images[0]
      : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg");

  return (
    <div>
      <NavBar />
      <section className="flex flex-col font-quicksand gap-5 my-10 mx-auto max-w-[80rem]">
        <div className="flex items-center gap-3">
          <ButtonComponent
            icon={<IconArrowBackUp />}
            text="Volver"
            style="flex text-sm ml-5 px-2 items-center gap-2 rounded-full cursor-pointer"
            onClick={() => window.history.back()}
          />
          <h1 className="text-3xl font-bold border-b-3 border-main">
            {id ? "Editar Producto" : "Nuevo Producto"}
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mx-30 flex flex-col gap-10 py-10">
            <div className="w-full flex justify-between">
              <label className="flex flex-col w-5/12 gap-2">
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
                  className="bg-main-dark/20 rounded-2xl p-2 w-auto"
                />
              </label>

              <div className="flex w-6/12 gap-5">
                <label className="flex flex-col w-full gap-2">
                  <p className="font-semibold">
                    Precio <span className="text-red-500">*</span>
                  </p>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value) || value === "") {
                        if (/^0+\d/.test(value))
                          value = value.replace(/^0+/, "");
                        setForm({ ...form, price: value });
                        setErrorPrice(null);
                      } else {
                        setErrorPrice("Solo se permiten valores numéricos");
                      }
                    }}
                    onBlur={() => {
                      setForm({ ...form, price: Number(form.price) || 0 });
                    }}
                    placeholder="Precio"
                    className={`bg-main-dark/20 rounded-2xl p-2 ${
                      errorPrice ? "border border-red-500" : ""
                    }`}
                  />
                  {errorPrice && (
                    <p className="text-red-500 text-sm">{errorPrice}</p>
                  )}
                </label>

                <label className="flex flex-col w-full gap-2">
                  <p className="font-semibold">Precio de oferta</p>
                  <input
                    type="text"
                    value={form.discount_price}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value) || value === "") {
                        if (/^0+\d/.test(value))
                          value = value.replace(/^0+/, "");
                        setForm({ ...form, discount_price: value });
                        setErrorDiscount(null);
                      } else {
                        setErrorDiscount("Solo se permiten valores numéricos");
                      }
                    }}
                    onBlur={() => {
                      setForm({
                        ...form,
                        discount_price: Number(form.discount_price) || 0,
                      });
                    }}
                    placeholder="Precio de oferta"
                    className={`bg-main-dark/20 rounded-2xl p-2 ${
                      errorDiscount ? "border border-red-500" : ""
                    }`}
                  />
                  {errorDiscount && (
                    <p className="text-red-500 text-sm">{errorDiscount}</p>
                  )}
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
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as
                          | "ACTIVE"
                          | "INACTIVE"
                          | "DRAFT",
                      })
                    }
                    className="bg-main-dark/20 rounded-2xl p-2 w-full"
                  >
                    <option value="ACTIVE">Activo</option>
                    <option value="INACTIVE">Inactivo</option>
                    <option value="DRAFT">Archivado</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

       
          <div className="flex gap-2 w-full justify-between px-30">
            <div className="flex flex-col w-5/12 gap-6">
              <label className="flex flex-col w-full gap-2">
                <p className="font-semibold">Sobre este producto</p>
                <div className="flex flex-col gap-2">
                  <textarea
                    placeholder="Sobre este producto"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    cols={30}
                    rows={5}
                    className="bg-main-dark/20 rounded-xl px-3 py-2 w-auto"
                  />
                  <div className="flex flex-col w-full items-center">
                    <ButtonComponent
                      type="button"
                      text={
                        loadingDescription
                          ? "Cargando..."
                          : "Autogenerar descripción"
                      }
                      onClick={handleGenerateDescription}
                      icon={<IconWand />}
                      style="flex justify-center text-sm w-[50%] px-2 py-2 items-center gap-2 rounded-full bg-main text-white cursor-pointer hover:bg-contrast-secondary transition-colors duration-300 ease-in-out"
                    />
                    {errorDescription && (
                      <p className="text-red-500 text-sm text-center">
                        {errorDescription}
                      </p>
                    )}
                  </div>
                </div>
              </label>

              <div className="flex flex-col gap-4">
                <p className="font-semibold">Agregar imágenes </p>
                {previews.map((previewUrl, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 p-2 border border-gray-300 rounded-lg"
                  >
                    <label className="font-medium text-sm">
                      {`Imagen ${index + 1}`}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRefs[index]}
                      onChange={(e) => handleImageChange(e, index)}
                      className="bg-main-dark/20 rounded-2xl p-2 w-full cursor-pointer text-sm "
                    />
                    {previewUrl && (
                      <div className="flex flex-col items-center gap-2 mt-2">
                        <img
                          src={previewUrl}
                          alt={`Previsualización ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-md border border-gray-400"
                        />
                        <ButtonComponent
                          type="button"
                          text="Quitar imagen"
                          onClick={() => handleRemoveImage(index)}
                          style="text-xs text-red-600 hover:text-red-800 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-6/12 gap-2">
              <label className="flex items-center gap-2">
                <p className="font-semibold">Destacar producto</p>
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) =>
                    setForm({ ...form, is_featured: e.target.checked })
                  }
                  className="cursor-pointer"
                />
              </label>

              {form.is_featured ? (
                <FeaturedProductCard
                  shop="Preview"
                  title={form.name || "Nombre del producto"}
                  price={form.price ? form.price.toString() : "0"}
                  discountPrice={
                    form.discount_price
                      ? form.discount_price.toString()
                      : undefined
                  }
                  img={mainPreview}
                  rating={0}
                  edit={false}
                  id={0}
                />
              ) : (
                <ProductCard
                  shop="Preview"
                  title={form.name || "Nombre del producto"}
                  price={form.price ? form.price.toString() : "0"}
                  discountPrice={
                    form.discount_price
                      ? form.discount_price.toString()
                      : undefined
                  }
                  img={mainPreview}
                  edit={false}
                  id={0}
                />
              )}

              <div className="flex flex-col items-center gap-5 py-10 w-full">
                <ButtonComponent
                  text={loading ? "Guardando..." : "Guardar"}
                  style="text-white text-lg p-2 items-center rounded-full bg-contrast-main w-2/3 hover:bg-contrast-secondary transition-all duration-400 cursor-pointer"
                  type="submit"
                />
                <ButtonComponent
                  text="Cancelar"
                  style="text-white text-lg p-2 items-center rounded-full bg-main-dark w-2/3 hover:bg-main transition-all duration-400 cursor-pointer"
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

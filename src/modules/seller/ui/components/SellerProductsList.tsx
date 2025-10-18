import { useEffect, useState } from "react";
import { IconBrandWhatsapp, IconExclamationCircle, IconSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import ProductCard from "../../../../components/data-display/ProductCard";
//import FeaturedProductCard from "../../../../components/data-display/FeaturedProductCard";
import { useProducts, type Product } from "../../infrastructure/useProducts";
import { useAuth } from "../../../../hooks/context/AuthContext";
import { getStoreByUser } from "../../infrastructure/storeService";
import audifonos from "../../../../img/resources/audifonos.jpg";
import FeaturedProductCard from "../../../../components/data-display/FeaturedProductCard";

interface Store {
  id: number;
  user_id?: number;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  banner?: string | null;
  category_id?: number | null;
  business_name?: string | null;
  tax_id?: string | null;
  legal_type?: string | null;
  registered_address?: string | null;
  support_email?: string | null;
  support_phone?: string | null;
  is_verified?: boolean | string | null;
  verification_date?: string | null;
  status?: "ACTIVE" | "SUSPENDED" | "CLOSED" | null | string;
}

export default function SellerProductsList() {
  const { user } = useAuth();
  const { getProductsByStore, loading, error } = useProducts();
  const [store, setStore] = useState<Store | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user?.id) {
          const store = await getStoreByUser(user.id);
          setStore(store);
          if (store?.id) {
            const data = await getProductsByStore(store.id);
            console.log("🛍️ store:", store);
            console.log("📦 productos recibidos:", data);
            setProducts(data);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchProducts();
  }, [user]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" pl-4">
      {/* Header */}
      {store?.is_verified === false && (
        <div className="flex flex-col gap-6 justify-center items-center bg-white rounded-2xl py-10 px-12 ml-10 shadow-lg border border-main/20">
          <div className="flex items-center justify-center w-14 h-14 bg-contrast-secondary/20 rounded-full">
            <IconExclamationCircle size={30} className="text-contrast-secondary" />
          </div>

          <p className="text-xl font-semibold text-main">
            Tu tienda está en verificación
          </p>
          <p className="text-center text-main-dark/70 max-w-md">
            El equipo de TukiShop se pondrá en contacto contigo para verificar tu tienda. Si tienes dudas, contacta con soporte.
          </p>
          <a
            href="https://wa.me/50687355629"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2 bg-contrast-secondary text-white rounded-full hover:scale-105 transition-all duration-300 shadow-sm"
          >
            <IconBrandWhatsapp size={20} />
            Contactar soporte
          </a>
        </div>
      )}
      {store?.is_verified === true && (
        <>
          <section className="flex justify-between font-quicksand items-center px-10">
            <h1 className="text-2xl font-semibold border-b-3 border-main">Lista de productos</h1>
            <div className="bg-main-dark/10 flex items-center gap-2 px-1 py-1 rounded-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar..."
                className="bg-transparent outline-none px-2"
              />
              <ButtonComponent
                icon={<IconSearch />}
                iconStyle="text-white cursor-pointer"
                style="bg-gradient-to-br to-contrast-main from-contrast-secondary rounded-full w-12 h-8 flex items-center justify-center"
              />
            </div>
            <Link to="/crudProduct">
              <ButtonComponent
                text="Registrar nuevo producto"
                style="bg-contrast-secondary cursor-pointer rounded-full px-4 py-2 text-white font-semibold hover:bg-gradient-to-br from-contrast-main via-contrast-secondary to-main transition-all duration-400"
              />
            </Link>
          </section>

          {/* Lista de productos */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center py-10 border-b-2 border-main space-y-3">
            {loading && (
              <p className="col-span-3 text-gray-500">Cargando productos...</p>
            )}
            {error && <p className="col-span-3 text-red-500">{error}</p>}
            {filteredProducts.length > 0
              ? filteredProducts
                .filter((p) => !p.is_featured)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    shop={store?.name || product.store?.name || "Sin vendedor"}
                    title={product.name}
                    price={product.price.toString()}
                    discountPrice={
                      product.discount_price?.toString() || undefined
                    }
                    img={product.image_1_url ? product.image_1_url : audifonos}
                    edit
                    id={product.id ?? 0}
                  />
                ))
              : !loading && (
                <p className="col-span-3 text-gray-500">No hay productos</p>
              )}
          </section>

          {/* Productos destacados */}
          <section className="my-10">
            <h2 className="text-2xl font-semibold font-quicksand">
              Productos destacados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 justify-items-center py-10">
              {filteredProducts
                .filter((p) => p.is_featured)
                .slice(0, 4)
                .map((product) => (
                  <FeaturedProductCard
                    key={product.id}
                    shop={store?.name || product.store?.name || "Sin vendedor"}
                    img={
                      product.image_1_url
                        ? product.image_1_url
                        : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                    }
                    title={product.name}
                    price={product.price.toString()}
                    discountPrice={
                      product.discount_price
                        ? product.discount_price.toString()
                        : undefined
                    }
                    rating={4.5}
                    edit
                    id={product.id ?? 0}
                  />
                ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

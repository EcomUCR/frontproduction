import { useEffect, useState } from "react";
import { Button } from "./button";
import editIcon from "../../img/editIconw.png";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  status: boolean;
  images: { url: string }[];
  categories: { id: number; name: string }[];
  vendor_id: number;
}

export default function SellerProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const token = localStorage.getItem("token");
  const vendorId = localStorage.getItem("vendorId"); // ⚡️ asumimos que lo guardaste en el login

  // 🔹 Traer productos del vendor
  useEffect(() => {
    if (!vendorId) {
      console.error("No se encontró vendorId en localStorage");
      return;
    }

    fetch(`/api/products/vendor/${vendorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al traer productos");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, [vendorId, token]);

  return (
    <section className="my-10 px-4 lg:px-20">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-xl font-bold text-black">
          Mi lista de productos
        </h2>
        <Button className="bg-purple-main text-white px-4 py-2 rounded-lg font-medium hover:opacity-90">
          <Link to="/crud-products-page">Registrar nuevo producto</Link>
        </Button>
      </div>

      {/* Grid de productos */}
      {products.length > 0 ? (
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="relative flex flex-col items-center text-center rounded-lg shadow-md p-2 lg:p-3 bg-white"
            >
              {/* Botón editar */}
              <Link
                to={`/crud-products-page/${p.id}`}
                className="absolute top-2 right-2 w-8 h-8 bg-yellow-main rounded-full flex items-center justify-center shadow-sm"
              >
                <img src={editIcon} alt="Editar" className="w-4 h-4" />
              </Link>

              {/* Imagen */}
              <div className="w-full h-40 mb-2 flex items-center justify-center rounded-lg overflow-hidden shadow-sm">
                <img
                  src={p.images?.[0]?.url || "/placeholder.png"}
                  alt={p.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Info */}
              <h3 className="text-xs lg:text-sm font-medium">{p.name}</h3>
              <p className="text-gray-400 text-xs">
                {p.categories.map((c) => c.name).join(", ")}
              </p>
              {p.discount > 0 ? (
                <>
                  <p className="text-gray-300 text-xs line-through">
                    ₡{p.price.toLocaleString()}
                  </p>
                  <p className="text-purple-main font-bold text-sm lg:text-lg">
                    ₡
                    {(
                      p.price *
                      (1 - p.discount / 100)
                    ).toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="text-purple-main font-bold text-sm lg:text-lg">
                  ₡{p.price.toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-6">
          No tienes productos registrados todavía.
        </p>
      )}
    </section>
  );
}

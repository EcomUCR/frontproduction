import { IconTrash, IconShoppingBag } from "@tabler/icons-react";
import StarRatingComponent from "../ui/StarRatingComponent";
import { Link } from "react-router-dom";

interface ProductCardWishListProps {
    product: {
        id: number;
        name: string;
        price: number;
        discount_price?: number | null;
        stock: number;
        image_1_url?: string | null;
        store_name?: string;
        rating?: number;
    };
    onDelete?: (id: number) => void;
    onAddToCart?: (product: any) => void;
}

export default function ProductCardWishList({
    product,
    onDelete,
    onAddToCart,
}: ProductCardWishListProps) {
    return (
        <figure
            className="relative flex items-center justify-between w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 shadow-md border border-gray-100 
      hover:border-contrast-secondary/40 transition-all duration-500 overflow-hidden mb-5"
        >
            {/*Imagen */}
            <div className="flex-shrink-0 flex items-center justify-center w-32 h-32 rounded-2xl overflow-hidden bg-white shadow-inner">
                <Link to={`/product/${product.id}`}>
                    <img
                        src={
                            product.image_1_url ||
                            'https://electrogenpro.com/wp-content/themes/estore/images/placeholder-shop.jpg'
                        }
                        alt={product.name}
                        className="object-contain w-full h-full transition-transform duration-500 cursor-pointer"
                    />
                </Link>
            </div>

            {/* Información principal */}
            <div className="flex flex-col justify-center flex-grow px-6 font-quicksand">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <Link to={`/product/${product.id}`}>
                            <h3 className="font-bold text-lg text-gray-main cursor-pointer hover:text-main transition-colors duration-200">
                                {product.name}
                            </h3>
                        </Link>
                        <span
                            className={`text-xs ${product.stock > 0
                                    ? 'text-green-600'
                                    : 'text-red-500 font-semibold'
                                }`}
                        >
                            {product.stock > 0 ? 'Disponible' : 'Agotado'}
                        </span>
                    </div>

                    <p className="text-xs text-gray-500">
                        Tienda:{' '}
                        <span className="font-medium">
                            {product.store_name ?? 'Desconocida'}
                        </span>
                    </p>

                    <div className="pt-1">
                        <StarRatingComponent value={product.rating ?? 4} size={12} />
                    </div>
                </div>
            </div>

            {/* Precio y acciones */}
            <div className="flex flex-col justify-center items-end h-full gap-2 pr-2">
                <div className="text-right leading-tight">
                    {product.discount_price && product.discount_price > 0 ? (
                        <>
                            <p className="text-xs line-through text-gray-400">
                                ₡{product.price.toLocaleString()}
                            </p>
                            <p className="text-xl font-bold text-main bg-clip-text">
                                ₡{product.discount_price.toLocaleString()}
                            </p>
                        </>
                    ) : (
                        <p className="text-xl font-bold text-main">
                            ₡{product.price.toLocaleString()}
                        </p>
                    )}
                </div>

                {/* Acciones */}
                <div className="flex gap-3 mt-2 text-main">
                    {/* Agregar al carrito */}
                    <button
                        onClick={() => onAddToCart?.(product)}
                        disabled={product.stock <= 0}
                        className={`flex items-center gap-1 px-3 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm hover:scale-105 ${product.stock > 0
                                ? 'bg-main text-white hover:bg-contrast-secondary'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        title="Agregar al carrito"
                    >
                        <IconShoppingBag size={16} />
                        <span>Añadir al carrito</span>
                    </button>

                    {/* Eliminar */}
                    <button
                        onClick={() => onDelete?.(product.id)}
                        className="p-2 rounded-full bg-gray-200 transition-all duration-300 shadow-sm hover:scale-110"
                        title="Eliminar de la lista"
                    >
                        <IconTrash size={18} />
                    </button>
                </div>
            </div>
        </figure>
    );
}

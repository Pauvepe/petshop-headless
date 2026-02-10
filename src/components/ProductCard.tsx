"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { WCProduct } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: WCProduct;
}

function formatPrice(price: string): string {
  const num = parseFloat(price);
  if (isNaN(num)) return "0,00 €";
  return num.toFixed(2).replace(".", ",") + " €";
}

function getSizeOptions(product: WCProduct): string[] {
  const sizeAttr = product.attributes.find((attr) =>
    attr.slug.includes("tamano")
  );
  if (!sizeAttr) return [];

  return [...sizeAttr.options].sort((a, b) => {
    const numA = parseFloat(a.replace(/[^0-9.,]/g, "")) || 0;
    const numB = parseFloat(b.replace(/[^0-9.,]/g, "")) || 0;
    return numA - numB;
  });
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const mainImage = product.images[0] ?? null;
  const sizes = getSizeOptions(product);
  const categoryName = product.categories[0]?.name ?? null;

  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  }

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group block p-4 rounded-2xl bg-white shadow-xl shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/50"
    >
      {/* Image container */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 mb-4">
        {mainImage ? (
          <Image
            src={mainImage.src}
            alt={mainImage.alt || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-slate-300 text-sm">Sin imagen</span>
          </div>
        )}

        {/* Sale badge */}
        {product.on_sale && (
          <span className="absolute top-3 left-3 bg-[#86b049] text-white text-xs font-bold rounded-full px-3 py-1 uppercase tracking-widest">
            Oferta
          </span>
        )}

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 cursor-pointer"
        >
          <Heart className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5">
        {/* Category */}
        {categoryName && (
          <span className="text-xs text-slate-400 font-bold uppercase">
            {categoryName}
          </span>
        )}

        {/* Product name */}
        <h3 className="font-bold text-slate-900 line-clamp-2 leading-snug transition-colors duration-300 group-hover:text-[#ee9d2b]">
          {product.name}
        </h3>

        {/* Size pills */}
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {sizes.map((size) => (
              <span
                key={size}
                className="text-[11px] text-slate-500 bg-slate-100 rounded-full px-2 py-0.5"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          {product.on_sale ? (
            <>
              <span className="text-lg font-extrabold text-[#ee9d2b]">
                {formatPrice(product.sale_price)}
              </span>
              <span className="text-sm text-slate-400 line-through">
                {formatPrice(product.regular_price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-extrabold text-[#ee9d2b]">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 py-2 mt-2 rounded-full font-bold text-sm bg-[#ee9d2b]/10 text-[#ee9d2b] transition-colors duration-300 group-hover:bg-[#ee9d2b] group-hover:text-white cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" />
          Añadir al carrito
        </button>
      </div>
    </Link>
  );
}

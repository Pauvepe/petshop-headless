"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
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

function getDiscountPercent(regularPrice: string, salePrice: string): number {
  const regular = parseFloat(regularPrice);
  const sale = parseFloat(salePrice);
  if (!regular || !sale || regular <= 0) return 0;
  return Math.round((1 - sale / regular) * 100);
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
  const discount = product.on_sale
    ? getDiscountPercent(product.regular_price, product.sale_price)
    : 0;

  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  }

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group block rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage.src}
            alt={mainImage.alt || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-xl">
            <span className="text-gray-400 text-sm">Sin imagen</span>
          </div>
        )}

        {/* Discount badge */}
        {product.on_sale && discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2">
        {/* Size tags */}
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {sizes.map((size) => (
              <span
                key={size}
                className="text-[11px] text-gray-500 bg-gray-100 rounded-full px-2 py-0.5"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          {product.on_sale ? (
            <>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.regular_price)}
              </span>
              <span className="text-base font-bold text-red-500">
                {formatPrice(product.sale_price)}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-gray-800">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-sm font-medium text-gray-700 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Add to cart button - visible on hover */}
        <div className="overflow-hidden">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2 rounded-lg transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            Añadir al carrito
          </button>
        </div>
      </div>
    </Link>
  );
}

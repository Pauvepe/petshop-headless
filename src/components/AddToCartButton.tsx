"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { WCProduct } from "@/lib/types";

export default function AddToCartButton({ product }: { product: WCProduct }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-3 hover:bg-gray-100 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 font-medium min-w-[40px] text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="p-3 hover:bg-gray-100 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={() => addItem(product, quantity)}
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          <ShoppingCart size={20} />
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

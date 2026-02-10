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
        <div className="flex items-center border border-slate-200 rounded-full overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-3 hover:bg-[#ee9d2b]/10 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 font-medium min-w-[40px] text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="p-3 hover:bg-[#ee9d2b]/10 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={() => addItem(product, quantity)}
          className="flex-1 flex items-center justify-center gap-2 bg-[#ee9d2b] hover:bg-[#d68a1e] text-white font-bold py-3 px-6 rounded-full transition-colors shadow-lg shadow-[#ee9d2b]/20"
        >
          <ShoppingCart size={20} />
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

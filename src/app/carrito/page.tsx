"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-6">Añade productos para empezar tu compra</p>
        <Link href="/" className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors">
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 p-4 bg-white rounded-xl border">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {item.product.images[0] ? (
                  <Image src={item.product.images[0].src} alt={item.product.name} fill className="object-cover" sizes="96px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Sin img</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/producto/${item.product.slug}`} className="font-medium hover:text-emerald-600 line-clamp-2">
                  {item.product.name}
                </Link>
                <p className="text-lg font-bold mt-1">{parseFloat(item.product.price).toFixed(2)} €</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded border hover:bg-gray-100">
                    <Minus size={14} />
                  </button>
                  <span className="min-w-[30px] text-center font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded border hover:bg-gray-100">
                    <Plus size={14} />
                  </button>
                  <button onClick={() => removeItem(item.product.id)} className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-xl p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{totalPrice.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Envío</span>
              <span>{totalPrice >= 39 ? "Gratis" : "4,99 €"}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{(totalPrice + (totalPrice >= 39 ? 0 : 4.99)).toFixed(2)} €</span>
            </div>
          </div>
          <Link
            href="/pago"
            className="block w-full text-center bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
          >
            Finalizar Compra
          </Link>
          <Link href="/" className="block w-full text-center mt-3 text-emerald-600 hover:underline text-sm">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}

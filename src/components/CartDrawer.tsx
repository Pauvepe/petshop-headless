"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const {
    isOpen,
    setIsOpen,
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">Tu Carrito</h2>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
              {totalItems} {totalItems === 1 ? "artículo" : "artículos"}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
            <p className="text-lg font-medium text-gray-500">Tu carrito está vacío</p>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-emerald-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => {
                  const img = item.product.images?.[0]?.src;
                  const price = parseFloat(item.product.price || "0");
                  return (
                    <li key={item.product.id} className="flex gap-3 rounded-lg border p-3">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                        {img ? (
                          <Image src={img} alt={item.product.name} fill sizes="80px" className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">Sin img</div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-medium leading-tight text-gray-900 line-clamp-2">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="rounded-md border p-1 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="rounded-md border p-1 text-gray-600 transition-colors hover:bg-gray-100"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">
                            {(price * item.quantity).toFixed(2)} &euro;
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t px-4 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-gray-600">Total</span>
                <span className="text-lg font-bold text-gray-900">{totalPrice.toFixed(2)} &euro;</span>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="/carrito"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-lg border-2 border-emerald-500 py-2.5 text-center text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
                >
                  Ver Carrito
                </Link>
                <Link
                  href="/pago"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-lg bg-emerald-500 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-600"
                >
                  Finalizar Compra
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

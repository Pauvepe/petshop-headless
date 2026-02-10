"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import { Lock, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">No hay productos en tu carrito</h1>
        <Link href="/" className="inline-block bg-[#ee9d2b] text-white px-8 py-3 rounded-full font-bold hover:bg-[#d68a1e] transition-colors mt-4 shadow-lg shadow-[#ee9d2b]/20">
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout form */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-lg font-extrabold mb-4">Datos de contacto</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                  <input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ee9d2b]/30 focus:border-[#ee9d2b] outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Apellidos</label>
                  <input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ee9d2b]/30 focus:border-[#ee9d2b] outline-none transition-shadow" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ee9d2b]/30 focus:border-[#ee9d2b] outline-none transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                <input type="tel" className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ee9d2b]/30 focus:border-[#ee9d2b] outline-none transition-shadow" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-lg font-extrabold mb-4">Dirección de envío</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dirección</label>
                <input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ee9d2b]/30 focus:border-[#ee9d2b] outline-none transition-shadow" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ciudad</label>
                  <input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ee9d2b]/30 focus:border-[#ee9d2b] outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Código Postal</label>
                  <input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ee9d2b]/30 focus:border-[#ee9d2b] outline-none transition-shadow" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Provincia</label>
                <input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ee9d2b]/30 focus:border-[#ee9d2b] outline-none transition-shadow" />
              </div>
            </div>
          </div>

          <div className="bg-[#ee9d2b]/5 border border-[#ee9d2b]/20 rounded-2xl p-4 flex items-start gap-3">
            <Lock size={20} className="text-[#ee9d2b] mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-900">Página de pago en desarrollo</p>
              <p className="text-sm text-slate-600 mt-1">
                La pasarela de pago aún no está disponible. Esta es una vista previa del proceso de compra.
              </p>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 h-fit sticky top-24 shadow-sm">
          <h2 className="text-lg font-extrabold mb-4">Tu pedido</h2>
          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                  {item.product.images[0] ? (
                    <Image src={item.product.images[0].src} alt={item.product.name} fill className="object-cover" sizes="64px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Sin img</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-slate-500">Cantidad: {item.quantity}</p>
                  <p className="text-sm font-extrabold text-[#ee9d2b]">{(parseFloat(item.product.price) * item.quantity).toFixed(2)} €</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>{totalPrice.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Envío</span>
              <span className={totalPrice >= 39 ? "text-[#86b049] font-medium" : ""}>{totalPrice >= 39 ? "Gratis" : "4,99 €"}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-extrabold">
              <span>Total</span>
              <span className="text-[#ee9d2b]">{(totalPrice + (totalPrice >= 39 ? 0 : 4.99)).toFixed(2)} €</span>
            </div>
          </div>
          <button
            disabled
            className="w-full mt-6 bg-slate-200 text-slate-400 py-3 rounded-full font-bold cursor-not-allowed"
          >
            Pago no disponible
          </button>
        </div>
      </div>
    </div>
  );
}

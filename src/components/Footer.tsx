"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Dog,
  Cat,
  Bird,
  Rabbit,
  Turtle,
  Fish,
  PawPrint,
  Facebook,
  Camera,
  Play,
  Send,
} from "lucide-react";

const petOptions = [
  { id: "perro", label: "Perro", icon: Dog },
  { id: "gato", label: "Gato", icon: Cat },
  { id: "ave", label: "Ave", icon: Bird },
  { id: "roedor", label: "Roedor", icon: Rabbit },
  { id: "tortuga", label: "Tortuga", icon: Turtle },
  { id: "pez", label: "Pez", icon: Fish },
] as const;

const categorias = [
  { label: "Perros", slug: "perros" },
  { label: "Gatos", slug: "gatos" },
  { label: "Aves", slug: "aves" },
  { label: "Roedores", slug: "roedores" },
  { label: "Peces & Tortugas", slug: "peces-y-tortugas" },
];

const servicioCliente = [
  { label: "Envíos", href: "/envios" },
  { label: "Seguimiento de pedido", href: "/seguimiento" },
  { label: "Devoluciones", href: "/devoluciones" },
  { label: "Preguntas frecuentes", href: "/faq" },
  { label: "Contacto", href: "/contacto" },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Play, label: "YouTube", href: "#" },
];

export default function Footer() {
  const [selectedPets, setSelectedPets] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  function togglePet(petId: string) {
    setSelectedPets((prev) =>
      prev.includes(petId)
        ? prev.filter((id) => id !== petId)
        : [...prev, petId]
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email) return;

    console.log({ email, selectedPets });

    setEnviado(true);
    setEmail("");
    setSelectedPets([]);

    setTimeout(() => setEnviado(false), 4000);
  }

  return (
    <footer className="bg-[#0f4c5c] text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Col 1 - Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ee9d2b]">
                <PawPrint size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">PetShop</h2>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Tu tienda de confianza para el cuidado de tus mascotas. Ofrecemos
              los mejores productos de alimentación, higiene, accesorios y mucho
              más para que tus compañeros estén siempre felices y sanos.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#ee9d2b]"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2 - Categorias */}
          <div>
            <h3 className="text-lg font-semibold">Categorías</h3>
            <ul className="mt-4 space-y-3">
              {categorias.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-[#ee9d2b]"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Servicio al Cliente */}
          <div>
            <h3 className="text-lg font-semibold">Servicio al Cliente</h3>
            <ul className="mt-4 space-y-3">
              {servicioCliente.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-[#ee9d2b]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="mt-4 text-sm text-white/60">
              Únete para recibir ofertas exclusivas
            </p>

            {/* Pet icon selector */}
            <div className="mt-4 flex flex-wrap gap-2">
              {petOptions.map((pet) => {
                const Icon = pet.icon;
                const isSelected = selectedPets.includes(pet.id);

                return (
                  <button
                    key={pet.id}
                    type="button"
                    onClick={() => togglePet(pet.id)}
                    title={pet.label}
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 ${
                      isSelected
                        ? "bg-white/40 ring-2 ring-[#ee9d2b]"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                  >
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 rounded-full bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition-colors focus:ring-2 focus:ring-[#ee9d2b]"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ee9d2b] transition-colors hover:bg-[#d68a1e]"
                >
                  <Send size={16} />
                </button>
              </div>

              {/* Success message */}
              {enviado && (
                <p className="mt-3 text-center text-sm text-emerald-400">
                  ¡Gracias por suscribirte!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; 2026 PetShop. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terminos-y-condiciones"
              className="text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Términos y Condiciones
            </Link>
            <Link
              href="/politica-de-cookies"
              className="text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

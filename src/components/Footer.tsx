"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Dog, Cat, Bird, Rabbit, Turtle, Fish } from "lucide-react";

const petOptions = [
  { id: "perro", label: "Perro", icon: Dog },
  { id: "gato", label: "Gato", icon: Cat },
  { id: "ave", label: "Ave", icon: Bird },
  { id: "roedor", label: "Roedor", icon: Rabbit },
  { id: "tortuga", label: "Tortuga", icon: Turtle },
  { id: "pez", label: "Pez", icon: Fish },
] as const;

const categorias = [
  { label: "Perro", slug: "perro" },
  { label: "Gato", slug: "gato" },
  { label: "Aves", slug: "aves" },
  { label: "Roedores", slug: "roedores" },
  { label: "Peces y tortugas", slug: "peces-y-tortugas" },
];

const informacion = [
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "Contacto", href: "/contacto" },
  { label: "Envíos", href: "/envios" },
  { label: "Devoluciones", href: "/devoluciones" },
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
];

export default function Footer() {
  const [selectedPets, setSelectedPets] = useState<string[]>([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
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

    if (selectedPets.length === 0 || !nombre || !email || !aceptaPrivacidad) {
      return;
    }

    // Here you would send the data to your API
    console.log({ nombre, email, selectedPets, aceptaPrivacidad });

    setEnviado(true);
    setNombre("");
    setEmail("");
    setSelectedPets([]);
    setAceptaPrivacidad(false);

    setTimeout(() => setEnviado(false), 4000);
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - Brand */}
          <div>
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold tracking-tight">
                <span className="text-amber-400">Pet</span>Shop
              </h2>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Tu tienda de confianza para el cuidado de tus mascotas. Ofrecemos
              los mejores productos de alimentación, higiene, accesorios y mucho
              más para que tus compañeros peludos, emplumados y escamosos estén
              siempre felices y sanos.
            </p>
          </div>

          {/* Column 2 - Categorías */}
          <div>
            <h3 className="text-lg font-semibold text-white">Categorías</h3>
            <ul className="mt-4 space-y-2.5">
              {categorias.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="text-sm text-gray-400 transition-colors hover:text-amber-400"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Información */}
          <div>
            <h3 className="text-lg font-semibold text-white">Información</h3>
            <ul className="mt-4 space-y-2.5">
              {informacion.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-amber-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="mt-4 text-sm text-gray-400">
              Selecciona tu(s) mascota(s) y recibe ofertas personalizadas.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Pet selection icons */}
              <div className="flex flex-wrap gap-2">
                {petOptions.map((pet) => {
                  const Icon = pet.icon;
                  const isSelected = selectedPets.includes(pet.id);

                  return (
                    <button
                      key={pet.id}
                      type="button"
                      onClick={() => togglePet(pet.id)}
                      title={pet.label}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-amber-400 bg-amber-400/20 text-amber-400"
                          : "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300"
                      }`}
                    >
                      <Icon size={18} />
                    </button>
                  );
                })}
              </div>

              {/* Nombre */}
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />

              {/* Privacy checkbox */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={aceptaPrivacidad}
                  onChange={(e) => setAceptaPrivacidad(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-amber-400 rounded"
                />
                <span className="text-xs text-gray-400">
                  Acepto la{" "}
                  <Link
                    href="/politica-de-privacidad"
                    className="text-amber-400 underline hover:text-amber-300"
                  >
                    política de privacidad
                  </Link>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  !nombre ||
                  !email ||
                  !aceptaPrivacidad ||
                  selectedPets.length === 0
                }
              >
                Suscribirse
              </button>

              {/* Success message */}
              {enviado && (
                <p className="text-center text-sm text-emerald-400">
                  ¡Gracias por suscribirte!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; 2026 PetShop. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

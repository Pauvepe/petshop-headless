"use client";

import Link from "next/link";
import { Utensils, Gamepad2, Heart, Droplets, Shirt } from "lucide-react";

const categories = [
  {
    name: "Alimentación",
    icon: Utensils,
    bg: "bg-[#ee9d2b]/10",
    hoverBg: "hover:bg-[#ee9d2b]",
    link: "/categoria/perro",
  },
  {
    name: "Juguetes",
    icon: Gamepad2,
    bg: "bg-[#86b049]/10",
    hoverBg: "hover:bg-[#86b049]",
    link: "/categoria/gato",
  },
  {
    name: "Salud",
    icon: Heart,
    bg: "bg-[#7c59a3]/10",
    hoverBg: "hover:bg-[#7c59a3]",
    link: "/categoria/aves",
  },
  {
    name: "Higiene",
    icon: Droplets,
    bg: "bg-blue-100",
    hoverBg: "hover:bg-blue-500",
    link: "/categoria/roedores",
  },
  {
    name: "Accesorios",
    icon: Shirt,
    bg: "bg-pink-100",
    hoverBg: "hover:bg-pink-500",
    link: "/categoria/peces-tortugas",
  },
];

export default function BannerGrid() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">
        Categorías más buscadas
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              href={cat.link}
              className="flex flex-col items-center group"
            >
              <div
                className={`aspect-square rounded-full w-full flex items-center justify-center ${cat.bg} ${cat.hoverBg} transition-all duration-300 hover:scale-110 mb-4`}
              >
                <Icon className="w-12 h-12 text-slate-700 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="font-bold text-slate-700">{cat.name}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

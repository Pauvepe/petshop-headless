"use client";

import { useState, useEffect } from "react";
import ProductCarousel from "./ProductCarousel";
import { WCProduct } from "@/lib/types";

const PET_CATEGORIES: Record<string, string> = {
  perro: "374",
  gato: "465",
};

const filterOptions = [
  { label: "Perro", value: "perro" },
  { label: "Gato", value: "gato" },
];

export default function HomeSaleSection() {
  const [activeFilter, setActiveFilter] = useState("perro");
  const [products, setProducts] = useState<WCProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const catId = PET_CATEGORIES[activeFilter] || "374";
    fetch(`/api/products?on_sale=true&category=${catId}&per_page=10`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeFilter]);

  return (
    <ProductCarousel
      title="Productos en Oferta"
      products={products}
      filterOptions={filterOptions}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      loading={loading}
    />
  );
}

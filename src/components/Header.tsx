"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Dog,
  Cat,
  Bird,
  Rabbit,
  Fish,
  Menu,
  X,
  Search,
  User,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { CategoryTree } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

/* ------------------------------------------------------------------ */
/*  Icon mapping for top-level categories                              */
/* ------------------------------------------------------------------ */
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  perro: Dog,
  gato: Cat,
  aves: Bird,
  roedores: Rabbit,
  "peces-y-tortugas": Fish,
  peces: Fish,
};

function getCategoryIcon(slug: string) {
  const key = Object.keys(CATEGORY_ICONS).find((k) => slug.includes(k));
  return key ? CATEGORY_ICONS[key] : null;
}

/* ------------------------------------------------------------------ */
/*  Mega-menu (desktop)                                                */
/* ------------------------------------------------------------------ */
function MegaMenu({ category }: { category: CategoryTree }) {
  if (!category.children || category.children.length === 0) return null;

  return (
    <div className="max-h-[70vh] overflow-y-auto p-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {category.children.map((sub) => (
          <div key={sub.id}>
            <Link
              href={`/categoria/${sub.slug}`}
              className="mb-3 block text-sm font-bold text-slate-900 hover:text-[#ee9d2b] transition-colors"
            >
              {sub.name}
            </Link>

            {sub.children && sub.children.length > 0 && (
              <ul className="space-y-1.5">
                {sub.children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={`/categoria/${child.slug}`}
                      className="block text-sm text-slate-500 hover:text-[#ee9d2b] transition-colors"
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile sub-tree (recursive)                                        */
/* ------------------------------------------------------------------ */
function MobileSubMenu({
  children,
  onClose,
  depth = 0,
}: {
  children: CategoryTree[];
  onClose: () => void;
  depth?: number;
}) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <ul className={depth > 0 ? "ml-4 border-l border-[#ee9d2b]/20 pl-3" : ""}>
      {children.map((cat) => {
        const hasChildren = cat.children && cat.children.length > 0;
        const isOpen = openId === cat.id;

        return (
          <li key={cat.id}>
            <div className="flex items-center justify-between">
              <Link
                href={`/categoria/${cat.slug}`}
                onClick={onClose}
                className={`block py-2 text-sm ${
                  depth === 0
                    ? "font-semibold text-slate-900"
                    : "text-slate-600"
                } hover:text-[#ee9d2b] transition-colors`}
              >
                {cat.name}
              </Link>

              {hasChildren && (
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : cat.id)}
                  className="p-1 text-slate-400 hover:text-[#ee9d2b] transition-colors"
                  aria-label={
                    isOpen ? "Cerrar subcategorías" : "Ver subcategorías"
                  }
                >
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>

            {hasChildren && isOpen && (
              <MobileSubMenu
                children={cat.children}
                onClose={onClose}
                depth={depth + 1}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */
export default function Header({
  categories,
}: {
  categories: CategoryTree[];
}) {
  const { totalItems, setIsOpen } = useCart();

  /* Desktop mega-menu state */
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback((id: number) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setActiveCategory(id);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimeout.current = setTimeout(() => {
      setActiveCategory(null);
    }, 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }, []);

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  /* Mobile nav state */
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Search state */
  const [searchQuery, setSearchQuery] = useState("");

  /* Prevent body scroll while mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Derived active category data */
  const activeCat = categories.find((c) => c.id === activeCategory) ?? null;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#ee9d2b]/10">
      {/* ---- Top bar ---- */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-8">
        {/* Hamburger (mobile) */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 transition-colors lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ee9d2b]">
            <Dog className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-slate-900">Pet</span>
            <span className="text-[#ee9d2b]">Shop</span>
          </span>
        </Link>

        {/* Search bar (desktop) */}
        <div className="hidden flex-1 max-w-xl mx-auto lg:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full rounded-full bg-slate-100 py-2.5 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#ee9d2b]/30 transition-shadow"
            />
          </div>
        </div>

        {/* Spacer for mobile */}
        <div className="flex-1 lg:hidden" />

        {/* Right icons */}
        <div className="flex items-center gap-1">
          {/* Search icon (mobile) */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors lg:hidden"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* User icon */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Mi cuenta"
          >
            <User className="h-5 w-5" />
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#ee9d2b] text-[10px] font-bold text-white ring-2 ring-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ---- Desktop category nav ---- */}
      <nav className="hidden border-t border-[#ee9d2b]/10 lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-0 px-4 lg:px-8 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.slug);
            const isActive = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                className="relative shrink-0"
                onMouseEnter={() => openMenu(cat.id)}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={`/categoria/${cat.slug}`}
                  className={`flex items-center gap-1.5 px-5 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-[#ee9d2b] border-b-2 border-[#ee9d2b]"
                      : "text-slate-500 hover:text-[#ee9d2b] border-b-2 border-transparent"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {cat.name}
                </Link>
              </div>
            );
          })}

          {/* Ofertas link */}
          <div className="ml-auto shrink-0">
            <Link
              href="/ofertas"
              className="flex items-center px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#86b049] hover:text-[#6e9a38] border-b-2 border-transparent hover:border-[#86b049] transition-colors"
            >
              Ofertas
            </Link>
          </div>
        </div>

        {/* Mega menu dropdown */}
        <div
          className={`absolute left-0 right-0 z-40 transition-all duration-200 ease-in-out ${
            activeCat && activeCat.children.length > 0
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2 pointer-events-none"
          }`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="mx-4 mt-2 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/60 lg:mx-8">
            {activeCat && <MegaMenu category={activeCat} />}
          </div>
        </div>
      </nav>

      {/* ---- Mobile drawer overlay ---- */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ---- Mobile drawer ---- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[#ee9d2b]/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ee9d2b]">
              <Dog className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-extrabold">
              <span className="text-slate-900">Pet</span>
              <span className="text-[#ee9d2b]">Shop</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile search */}
        <div className="px-4 py-3 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full rounded-full bg-slate-100 py-2 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#ee9d2b]/30"
            />
          </div>
        </div>

        {/* Drawer body */}
        <div className="h-[calc(100%-130px)] overflow-y-auto px-4 py-4">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.slug);

            return (
              <div key={cat.id} className="mb-4">
                <div className="flex items-center gap-2.5 mb-1">
                  {Icon && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ee9d2b]/10">
                      <Icon className="h-3.5 w-3.5 text-[#ee9d2b]" />
                    </div>
                  )}
                  <Link
                    href={`/categoria/${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-bold uppercase tracking-wider text-slate-900 hover:text-[#ee9d2b] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </div>

                {cat.children && cat.children.length > 0 && (
                  <MobileSubMenu
                    children={cat.children}
                    onClose={() => setMobileOpen(false)}
                  />
                )}
              </div>
            );
          })}

          {/* Ofertas in mobile */}
          <div className="mt-2 pt-4 border-t border-slate-100">
            <Link
              href="/ofertas"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#86b049] hover:text-[#6e9a38] transition-colors"
            >
              Ofertas
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
}

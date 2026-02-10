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
    <div className="max-h-[70vh] overflow-y-auto p-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
        {category.children.map((sub) => (
          <div key={sub.id}>
            <Link
              href={`/categoria/${sub.slug}`}
              className="mb-2 block text-sm font-bold text-gray-900 hover:text-amber-600 transition-colors"
            >
              {sub.name}
            </Link>

            {sub.children && sub.children.length > 0 && (
              <ul className="space-y-1">
                {sub.children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={`/categoria/${child.slug}`}
                      className="block text-sm text-gray-600 hover:text-amber-600 transition-colors"
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
    <ul className={depth > 0 ? "ml-4 border-l border-gray-200 pl-3" : ""}>
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
                    ? "font-semibold text-gray-900"
                    : "text-gray-700"
                } hover:text-amber-600 transition-colors`}
              >
                {cat.name}
              </Link>

              {hasChildren && (
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : cat.id)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  aria-label={isOpen ? "Cerrar subcategorías" : "Ver subcategorías"}
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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* ---- Top bar ---- */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Hamburger (mobile) */}
        <button
          type="button"
          className="mr-3 inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Dog className="h-7 w-7 text-amber-500" />
          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            PetShop
          </span>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Cart */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Abrir carrito"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[11px] font-bold text-white">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </button>
      </div>

      {/* ---- Desktop category nav ---- */}
      <nav className="hidden border-t border-gray-100 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-1 px-4 lg:px-8">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.slug);
            const isActive = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => openMenu(cat.id)}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={`/categoria/${cat.slug}`}
                  className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-amber-600 border-b-2 border-amber-500"
                      : "text-gray-700 hover:text-amber-600 border-b-2 border-transparent"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {cat.name}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Mega menu dropdown */}
        <div
          className={`absolute left-0 right-0 z-40 bg-white shadow-lg border-t border-gray-100 transition-all duration-200 ease-in-out ${
            activeCat && activeCat.children.length > 0
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2 pointer-events-none"
          }`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {activeCat && <MegaMenu category={activeCat} />}
        </div>
      </nav>

      {/* ---- Mobile drawer overlay ---- */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ---- Mobile drawer ---- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <span className="text-lg font-bold text-gray-900">Menú</span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer body */}
        <div className="h-[calc(100%-57px)] overflow-y-auto px-4 py-4">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.slug);

            return (
              <div key={cat.id} className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  {Icon && <Icon className="h-4 w-4 text-amber-500" />}
                  <Link
                    href={`/categoria/${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-bold text-gray-900 hover:text-amber-600 transition-colors"
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
        </div>
      </aside>
    </header>
  );
}

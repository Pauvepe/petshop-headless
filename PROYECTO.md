# PetShop Headless - Proyecto WooCommerce + Next.js + Vercel

## Resumen del Proyecto
Tienda online de mascotas con WordPress/WooCommerce como backend (headless CMS) y Next.js como frontend desplegado en Vercel. WordPress solo se usa como panel de administración para gestionar productos, categorías, atributos, etc. El frontend es completamente personalizado con diseño propio.

## URLs
- **Frontend Vercel**: https://petshop-headless-pauvepe05-gmailcoms-projects.vercel.app
- **Backend WP Admin**: https://ejemplo2.pauvepe.com/wp-admin
- **API WooCommerce**: https://ejemplo2.pauvepe.com/wp-json/wc/v3/
- **Repo GitHub**: https://github.com/Pauvepe/petshop-headless

## Stack Tecnológico
- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS 4
- **Backend/CMS**: WordPress + WooCommerce (headless)
- **Hosting Frontend**: Vercel (auto-deploy desde GitHub)
- **Hosting Backend**: Hostinger (ejemplo2.pauvepe.com)
- **Carruseles**: Embla Carousel
- **Iconos**: Lucide React

## Estructura de Archivos
```
src/
├── app/
│   ├── api/products/route.ts    # API proxy para WooCommerce (protege keys)
│   ├── carrito/page.tsx          # Página del carrito
│   ├── categoria/[slug]/page.tsx # Página de categoría con productos
│   ├── pago/page.tsx             # Página de checkout (no funcional aún)
│   ├── producto/[slug]/page.tsx  # Página de detalle de producto
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal con Header/Footer/Cart
│   └── page.tsx                  # Homepage
├── components/
│   ├── AddToCartButton.tsx       # Botón añadir al carrito con cantidad
│   ├── BannerGrid.tsx            # Grid de 3 banners (2 cuadrados + 1 rectangular)
│   ├── CartDrawer.tsx            # Drawer lateral del carrito
│   ├── Footer.tsx                # Footer con form de newsletter + selección mascotas
│   ├── Header.tsx                # Header con mega menu de categorías
│   ├── HeaderWrapper.tsx         # Server component que carga categorías para Header
│   ├── HeroBanner.tsx            # Banner hero con carrusel de 3 slides
│   ├── HomeSaleSection.tsx       # Sección ofertas con filtro Perro/Gato
│   ├── ProductCard.tsx           # Tarjeta de producto con hover effects
│   └── ProductCarousel.tsx       # Carrusel de productos reutilizable
└── lib/
    ├── cart-context.tsx          # Context del carrito (estado global)
    ├── types.ts                  # Tipos TypeScript para WooCommerce
    └── woocommerce.ts            # Cliente API de WooCommerce
```

## Credenciales (en .env.local y Vercel)
- WooCommerce Consumer Key/Secret
- Vercel Token
- GitHub Token

## Categorías Principales WooCommerce
| Categoría | ID | Slug | Productos |
|---|---|---|---|
| Perro | 374 | perro | 328 |
| Gato | 465 | gato | 302 |
| Aves | 541 | aves | 30 |
| Roedores | 524 | roedores | 55 |
| Peces y tortugas | 550 | peces-tortugas | 1 |

## Datos Configurados en WooCommerce
### Productos Destacados (featured=true)
IDs: 6898, 6890, 6889, 6880, 6879, 6986, 6897, 6896, 6895, 6894
- Mix de productos de Perro y Gato con imágenes

### Productos en Oferta (on_sale=true)
**Perro**: 6888, 6887, 6886, 6885, 6884, 6883, 6882, 6881, 6877, 6876
**Gato**: 6893, 6892, 6891, 6643, 6642, 6629, 6628, 6627, 6616, 6613

### Más Vendidos (total_sales configurado)
IDs: 6898 (50), 6890 (45), 6889 (40), 6986 (38), 6897 (35), 6880 (33), 6879 (30), 6878 (28), 6629 (25), 6616 (22)

## Funcionalidades Implementadas
### Homepage
- [x] Banner hero con carrusel de 3 imágenes (autoplay)
- [x] Carrusel "Productos Destacados" (10 productos, 4.5 visibles, fade derecho)
- [x] Grid de 3 banners (2 cuadrados + 1 rectangular)
- [x] Carrusel "Productos en Oferta" con filtro Perro/Gato
- [x] Banner intermedio de promoción
- [x] Carrusel "Más Vendidos"
- [x] Footer con form newsletter + selección de mascotas con iconos

### Navigation
- [x] Header sticky con logo y carrito
- [x] Categorías principales con iconos (Perro, Gato, Aves, Roedores, Peces)
- [x] Mega menu con subcategorías al hacer hover
- [x] Menu móvil hamburguesa

### Producto
- [x] Tarjeta de producto con:
  - Badge de descuento rojo si está en oferta
  - Atributo tamaño/peso ordenado
  - Precio (tachado + precio oferta si aplica)
  - Nombre del producto
  - Hover: borde emerald + botón "Añadir al carrito"
- [x] Página de detalle con imagen, precio, atributos, descripción
- [x] Selector de cantidad
- [x] Productos relacionados

### Categorías
- [x] Página de categoría con grid de productos
- [x] Subcategorías como pills/tags
- [x] Breadcrumb de navegación

### Carrito
- [x] Drawer lateral con items, cantidades, eliminar
- [x] Página de carrito completa
- [x] Página de checkout (sin pasarela de pago)

## Concepto Headless WP
- WordPress/WooCommerce es SOLO el backend administrativo
- El frontend en Vercel consume la API REST de WooCommerce
- Si editas un producto en WP, se refleja en la web de Vercel (revalidación cada 60s)
- Las keys del API se guardan en variables de entorno del servidor (nunca expuestas al cliente)
- El API route `/api/products` actúa como proxy para proteger las credenciales

## Cómo hacer que el dominio apunte a Vercel
Para que ejemplo2.pauvepe.com muestre el frontend de Vercel en vez de WP:
1. En Vercel: Settings > Domains > Añadir ejemplo2.pauvepe.com
2. En Hostinger DNS: Crear CNAME record apuntando a cname.vercel-dns.com
3. O usar un subdominio: tienda.pauvepe.com para el frontend y ejemplo2.pauvepe.com solo para admin

**Alternativa recomendada**: Mantener WP en ejemplo2.pauvepe.com y poner un dominio diferente o subdominio para el frontend de Vercel.

## Errores y Soluciones
- CartDrawer: Agente usó estructura plana (`item.id`) en vez de `item.product.id` del tipo CartItem → Se reescribió manualmente
- ProductCarousel: Error de cierre JSX al añadir condicional de loading → Se reestructuró con Fragment (`<>...</>`)
- Git: No tenía user.email/name configurado → Se configuró por repo
- WC API: El parámetro `parent=0` no funciona con pipe a python directo (problemas encoding) → Se usa archivo temporal

## Próximos Pasos / Mejoras Pendientes
- [ ] Búsqueda de productos
- [ ] Filtros por precio, atributos en páginas de categoría
- [ ] Paginación en páginas de categoría
- [ ] Pasarela de pago funcional
- [ ] Persistencia del carrito en localStorage
- [ ] SEO: meta tags dinámicos por producto/categoría
- [ ] Imágenes reales en banners hero en vez de picsum
- [ ] Página "Sobre nosotros" y otras páginas estáticas
- [ ] Formulario de newsletter funcional (conectar con Resend API)
- [ ] Dominio personalizado en Vercel
- [ ] Optimización de imágenes (blur placeholder)

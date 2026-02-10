export interface WCImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  image: WCImage | null;
  count: number;
  menu_order: number;
}

export interface WCAttribute {
  id: number;
  name: string;
  slug: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  status: string;
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  total_sales: number;
  stock_status: string;
  categories: { id: number; name: string; slug: string }[];
  images: WCImage[];
  attributes: WCAttribute[];
  variations: number[];
  average_rating: string;
  rating_count: number;
}

export interface CartItem {
  product: WCProduct;
  quantity: number;
}

export interface CategoryTree extends WCCategory {
  children: CategoryTree[];
}

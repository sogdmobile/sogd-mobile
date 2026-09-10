export type PhoneBrand =
  | "Apple"
  | "Samsung"
  | "Xiaomi"
  | "Redmi"
  | "Honor"
  | "Huawei"
  | "Tecno"
  | "Infinix"
  | "Oppo"
  | "Vivo";

export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  productCount?: number;
}

export interface ProductDTO {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  currency: string;
  images: string[];
  categoryId: string;
  category?: CategoryDTO;
  brand: string;
  compatibleModels: string[];
  sku: string;
  stock: number;
  isNew: boolean;
  isPopular: boolean;
  isSale: boolean;
  color?: string | null;
  specifications?: Record<string, string> | null;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  sku: string;
  quantity: number;
  stock: number;
  brand: string;
  categoryName?: string;
}

export type DeliveryType = "DELIVERY" | "PICKUP";

export type OrderStatus =
  | "NEW"
  | "CONFIRMED"
  | "PROCESSING"
  | "DELIVERING"
  | "COMPLETED"
  | "CANCELLED";

export interface OrderItemDTO {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface OrderDTO {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  messenger?: string | null;
  deliveryType: DeliveryType;
  city?: string | null;
  address?: string | null;
  comment?: string | null;
  paymentMethod: string;
  status: OrderStatus;
  subtotal: number;
  deliveryCost: number;
  total: number;
  createdAt: string;
  items: OrderItemDTO[];
}

export type SortOption = "popular" | "new" | "price_asc" | "price_desc";

export interface CatalogFilterParams {
  category?: string;
  brand?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sort?: SortOption;
  search?: string;
}

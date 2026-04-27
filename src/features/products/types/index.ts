import { User } from "@/features/auth/types";

export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number | null; // original price before discount
  stock: number;
  images: string[];
  category: Category;
  seller: Omit<User, "id"> & {
    _id: string;
  };
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductFilters = {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sort?: "price_asc" | "price_desc" | "newest" | "rating";
};

// export type ProductsResponse = {
//   results: Product[];
//   total: number;
//   pages: number;
//   currentPage: number;
// };

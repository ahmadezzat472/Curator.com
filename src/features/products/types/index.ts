export type Category = {
  id: string;
  name: string;
  slug: string;
  image?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number; // original price before discount
  stock: number;
  images: string[];
  category: Category;
  seller: {
    id: string;
    name: string;
    avatar?: string;
  };
  rating: number;
  reviewCount: number;
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

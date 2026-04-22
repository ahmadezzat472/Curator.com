export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
  slug: string;
};

export type Cart = {
  items: CartItem[];
  total: number;
};

export type AddToCartPayload = {
  productId: string;
  quantity: number;
};

export type UpdateCartItemPayload = {
  itemId: string;
  quantity: number;
};

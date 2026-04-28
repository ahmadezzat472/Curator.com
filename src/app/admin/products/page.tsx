"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/services/api";
import type { Product, Category } from "@/features/products/types";

type PaginatedResponse<T> = {
  data?: T[];
  results?: T[];
  meta?: { total?: number; totalPages?: number };
  total?: number;
  pages?: number;
};

type CreateProductForm = {
  name: string;
  slug: string;
  description: string;
  price: string;
  comparePrice: string;
  stock: string;
  category: string;
  seller: string;
  images: string;
};

const initialForm: CreateProductForm = {
  name: "",
  slug: "",
  description: "",
  price: "",
  comparePrice: "",
  stock: "",
  category: "",
  seller: "",
  images: "",
};

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [form, setForm] = useState<CreateProductForm>(initialForm);

  const productsQuery = useApiQuery(["admin-products", page], () =>
    api<PaginatedResponse<Product>>(`products?page=${page}&pageSize=12`),
  );
  const categoriesQuery = useApiQuery(["admin-categories"], () =>
    api<{ data?: Category[]; results?: Category[] }>("categories"),
  );

  const createProduct = useApiMutation({
    mutationFn: (payload: CreateProductForm) => {
      const images = payload.images
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean);

      return api<Product>("products", {
        method: "POST",
        body: JSON.stringify({
          name: payload.name,
          slug: payload.slug,
          description: payload.description,
          price: Number(payload.price),
          comparePrice: payload.comparePrice
            ? Number(payload.comparePrice)
            : undefined,
          stock: payload.stock ? Number(payload.stock) : 0,
          category: payload.category,
          seller: payload.seller,
          images,
        }),
      });
    },
    onSuccess: () => {
      toast.success("Product created");
      setForm(initialForm);
      productsQuery.refetch();
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to create product");
    },
  });

  const deleteProduct = useApiMutation({
    mutationFn: (id: string) => api<void>(`products/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Product deleted");
      productsQuery.refetch();
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to delete product");
    },
  });

  const products = productsQuery.data?.data ?? productsQuery.data?.results ?? [];
  const categories =
    categoriesQuery.data?.data ?? categoriesQuery.data?.results ?? [];
  const totalPages =
    productsQuery.data?.pages ?? productsQuery.data?.meta?.totalPages ?? 1;

  const canSubmit = useMemo(() => {
    return (
      form.name &&
      form.slug &&
      form.description &&
      form.price &&
      form.category &&
      form.seller
    );
  }, [form]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold">Products</h1>
        <p className="text-sm text-muted-foreground">
          Create, review, and remove products.
        </p>
      </div>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Create product
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="wireless-headphones"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="comparePrice">Compare price</Label>
            <Input
              id="comparePrice"
              type="number"
              value={form.comparePrice}
              onChange={(e) =>
                setForm({ ...form, comparePrice: e.target.value })
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="seller">Seller ID</Label>
            <Input
              id="seller"
              value={form.seller}
              onChange={(e) => setForm({ ...form, seller: e.target.value })}
              placeholder="Vendor user id"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="images">Images (comma separated)</Label>
            <Input
              id="images"
              value={form.images}
              onChange={(e) => setForm({ ...form, images: e.target.value })}
              placeholder="https://... , https://..."
            />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="min-h-[120px] w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
        <Button
          onClick={() => createProduct.mutate(form)}
          disabled={!canSubmit || createProduct.isPending}
        >
          {createProduct.isPending ? "Creating..." : "Create product"}
        </Button>
      </section>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Product list
        </h2>

        {productsQuery.isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-sm text-muted-foreground">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground">
                <tr className="border-b">
                  <th className="py-2 text-left">Product</th>
                  <th className="py-2 text-left">Price</th>
                  <th className="py-2 text-left">Stock</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b last:border-0">
                    <td className="py-3 pr-3">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {product.category?.name ?? "Uncategorized"}
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="py-3 pr-3">{product.stock}</td>
                    <td className="py-3 text-right">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteProduct.mutate(product._id)}
                        disabled={deleteProduct.isPending}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

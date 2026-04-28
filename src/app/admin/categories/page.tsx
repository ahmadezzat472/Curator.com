"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/services/api";
import type { Category } from "@/features/products/types";

type CategoryForm = {
  name: string;
  slug: string;
  image: string;
};

const initialForm: CategoryForm = {
  name: "",
  slug: "",
  image: "",
};

export default function AdminCategoriesPage() {
  const [form, setForm] = useState<CategoryForm>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<CategoryForm>(initialForm);

  const categoriesQuery = useApiQuery(["admin-categories"], () =>
    api<{ data?: Category[]; results?: Category[] }>("categories"),
  );

  const createCategory = useApiMutation({
    mutationFn: (payload: CategoryForm) =>
      api<Category>("categories", {
        method: "POST",
        body: JSON.stringify({
          name: payload.name,
          slug: payload.slug,
          image: payload.image || undefined,
        }),
      }),
    onSuccess: () => {
      toast.success("Category created");
      setForm(initialForm);
      categoriesQuery.refetch();
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to create category");
    },
  });

  const updateCategory = useApiMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CategoryForm }) =>
      api<Category>(`categories/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: payload.name,
          slug: payload.slug,
          image: payload.image || undefined,
        }),
      }),
    onSuccess: () => {
      toast.success("Category updated");
      setEditingId(null);
      categoriesQuery.refetch();
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to update category");
    },
  });

  const deleteCategory = useApiMutation({
    mutationFn: (id: string) => api<void>(`categories/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Category deleted");
      categoriesQuery.refetch();
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to delete category");
    },
  });

  const categories =
    categoriesQuery.data?.data ?? categoriesQuery.data?.results ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold">Categories</h1>
        <p className="text-sm text-muted-foreground">
          Manage product categories and their metadata.
        </p>
      </div>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Create category
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
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
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>
        </div>
        <Button
          onClick={() => createCategory.mutate(form)}
          disabled={createCategory.isPending}
        >
          {createCategory.isPending ? "Creating..." : "Create category"}
        </Button>
      </section>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Category list
        </h2>

        {categoriesQuery.isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-sm text-muted-foreground">No categories found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground">
                <tr className="border-b">
                  <th className="py-2 text-left">Name</th>
                  <th className="py-2 text-left">Slug</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => {
                  const isEditing = editingId === category._id;

                  return (
                    <tr key={category._id} className="border-b last:border-0">
                      <td className="py-3 pr-3">
                        {isEditing ? (
                          <Input
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                          />
                        ) : (
                          category.name
                        )}
                      </td>
                      <td className="py-3 pr-3">
                        {isEditing ? (
                          <Input
                            value={editForm.slug}
                            onChange={(e) =>
                              setEditForm({ ...editForm, slug: e.target.value })
                            }
                          />
                        ) : (
                          <span className="text-muted-foreground">
                            {category.slug}
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-right space-x-2">
                        {isEditing ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() =>
                                updateCategory.mutate({
                                  id: category._id,
                                  payload: editForm,
                                })
                              }
                              disabled={updateCategory.isPending}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingId(category._id);
                                setEditForm({
                                  name: category.name,
                                  slug: category.slug,
                                  image: category.image ?? "",
                                });
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteCategory.mutate(category._id)}
                              disabled={deleteCategory.isPending}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/services/api";
import type { UserRole } from "@/features/auth/types";

type AdminUser = {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
};

type PaginatedResponse<T> = {
  data?: T[];
  results?: T[];
  meta?: { total?: number; totalPages?: number };
  total?: number;
  pages?: number;
};

type CreateUserForm = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

const ROLE_OPTIONS: UserRole[] = ["customer", "vendor", "admin"];

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [form, setForm] = useState<CreateUserForm>({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [roleEdits, setRoleEdits] = useState<Record<string, UserRole>>({});

  const usersQuery = useApiQuery(["admin-users", page], () =>
    api<PaginatedResponse<AdminUser>>(`users?page=${page}&pageSize=10`),
  );

  const createUser = useApiMutation({
    mutationFn: (payload: CreateUserForm) =>
      api<AdminUser>("users", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      toast.success("User created successfully");
      setForm({ name: "", email: "", password: "", role: "customer" });
      usersQuery.refetch();
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to create user");
    },
  });

  const updateUser = useApiMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      api<AdminUser>(`users/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      }),
    onSuccess: () => {
      toast.success("User updated");
      usersQuery.refetch();
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to update user");
    },
  });

  const deleteUser = useApiMutation({
    mutationFn: (id: string) => api<void>(`users/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("User removed");
      usersQuery.refetch();
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to delete user");
    },
  });

  const users = usersQuery.data?.data ?? usersQuery.data?.results ?? [];
  const totalPages =
    usersQuery.data?.pages ?? usersQuery.data?.meta?.totalPages ?? 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold">Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage customers, vendors, and admins.
        </p>
      </div>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Create user
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as UserRole })
              }
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            >
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button
          onClick={() => createUser.mutate(form)}
          disabled={createUser.isPending}
        >
          {createUser.isPending ? "Creating..." : "Create user"}
        </Button>
      </section>

      <section className="rounded-xl border bg-card p-6 space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          User list
        </h2>

        {usersQuery.isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : users.length === 0 ? (
          <p className="text-sm text-muted-foreground">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground">
                <tr className="border-b">
                  <th className="py-2 text-left">Name</th>
                  <th className="py-2 text-left">Email</th>
                  <th className="py-2 text-left">Role</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const id = user.id ?? user._id ?? "";
                  const role = roleEdits[id] ?? user.role;

                  return (
                    <tr key={id} className="border-b last:border-0">
                      <td className="py-3 pr-3">{user.name}</td>
                      <td className="py-3 pr-3 text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="py-3 pr-3">
                        <select
                          value={role}
                          onChange={(e) =>
                            setRoleEdits({
                              ...roleEdits,
                              [id]: e.target.value as UserRole,
                            })
                          }
                          className="rounded-md border bg-background px-2 py-1 text-xs"
                        >
                          {ROLE_OPTIONS.map((roleOption) => (
                            <option key={roleOption} value={roleOption}>
                              {roleOption}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 text-right space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateUser.mutate({ id, role })}
                          disabled={updateUser.isPending || !id}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteUser.mutate(id)}
                          disabled={deleteUser.isPending || !id}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
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

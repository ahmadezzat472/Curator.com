"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiMutation } from "@/hooks/useApiMutation";
import { authService } from "@/features/auth/services";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { QUERY_KEYS } from "@/constants/Querykeys";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useProfile();

  const { mutate: updateProfile, isPending } = useApiMutation({
    mutationFn: (values: ProfileFormValues) => {
      const { street, city, state, zip, country, phone, ...rest } = values;
      return authService.updateProfile({
        ...rest,
        phone,
        address: street
          ? { street, city: city!, state: state!, zip: zip!, country: country! }
          : undefined,
      });
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(QUERY_KEYS.auth.profile, updated);
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to update profile");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  // Populate form once user data loads
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.phone ?? "",
        street: user.address?.street ?? "",
        city: user.address?.city ?? "",
        state: user.address?.state ?? "",
        zip: user.address?.zip ?? "",
        country: user.address?.country ?? "",
      });
    }
  }, [user, reset]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-xl font-semibold">My Profile</h1>

      <form
        onSubmit={handleSubmit((v) => updateProfile(v))}
        className="space-y-6"
        noValidate
      >
        {/* Personal info */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Personal information
          </h2>

          <div className="space-y-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              value={user?.email ?? ""}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+20 10 0000 0000"
              {...register("phone")}
            />
          </div>
        </section>

        {/* Address */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Default shipping address
          </h2>

          <div className="space-y-1.5">
            <Label htmlFor="street">Street address</Label>
            <Input
              id="street"
              placeholder="123 Main St"
              {...register("street")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Cairo" {...register("city")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="Cairo" {...register("state")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="zip">ZIP code</Label>
              <Input id="zip" placeholder="11511" {...register("zip")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Egypt"
                {...register("country")}
              />
            </div>
          </div>
        </section>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </div>
  );
}

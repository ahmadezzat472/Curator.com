"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "../hooks/useRegister";
import { RegisterFormValues, registerSchema } from "../validation";
import InputError from "@/components/shared/Feedback/InputError";
import { REGISTER_DEFAULT_VALUE } from "../constants/default-values";

const RegisterForm = () => {
  const { mutate: register_, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: REGISTER_DEFAULT_VALUE,
  });

  const onSubmit = (values: RegisterFormValues) => {
    // Remove confirmPassword before sending to API
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
    };
    register_(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name">Full name</Label>
        <div className="relative">
          <FaUser
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            className="pl-9"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </div>
        {errors.name && <InputError error={errors.name.message} />}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email">Email address</Label>
        <div className="relative">
          <FaEnvelope
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="pl-9"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </div>
        {errors.email && <InputError error={errors.email.message} />}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <FaLock
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="password"
            type="password"
            placeholder="Min. 6 characters"
            autoComplete="new-password"
            className="pl-9"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
        </div>
        {errors.password && <InputError error={errors.password.message} />}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <div className="relative">
          <FaLock
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            autoComplete="new-password"
            className="pl-9"
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && (
          <InputError error={errors.confirmPassword.message} />
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-primary hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;

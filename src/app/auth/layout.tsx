import AuthCardWrapper from "@/features/auth/components/AuthCardWrapper";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthCardWrapper>{children}</AuthCardWrapper>;
}

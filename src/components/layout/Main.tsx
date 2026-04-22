import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: ClassNameValue;
}

export default function Main({ children, className = "" }: Props) {
  return (
    <main className={cn("container mx-auto pt-8 pb-14 px-4", className)}>
      {children}
    </main>
  );
}

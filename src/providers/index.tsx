"use client";

import { ReactNode } from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

type ProvidersProps = {
  children: ReactNode;
};

function Providers({ children }: ProvidersProps) {
  return (
    <ReactQueryProvider>
      <Toaster
        richColors
        position="top-right"
        toastOptions={{ duration: 3000 }}
      />
      {children}
    </ReactQueryProvider>
  );
}

export default Providers;

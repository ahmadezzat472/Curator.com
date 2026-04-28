import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="h-full">{children}</main>
      <Footer />
    </div>
  );
}

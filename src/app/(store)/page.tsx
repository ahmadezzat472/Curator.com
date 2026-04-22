import FeaturedProducts from "@/features/products/components/FeaturedProducts";
import Main from "@/components/layout/Main";
import HeroSection from "@/features/Home/components/HeroSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Main className="space-y-16">
        <FeaturedProducts />
      </Main>
    </>
  );
}

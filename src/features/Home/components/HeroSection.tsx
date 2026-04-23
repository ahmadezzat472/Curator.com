import { Button } from "@/components/ui/button";
import Link from "next/link";


function HeroSection() {
  return (
    <section className="bg-muted/50 border-b">
      <div className="custom-container py-16 flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
          Shop smarter, live better
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg">
          Discover thousands of products from trusted sellers across Egypt and
          beyond.
        </p>
        <div className="flex gap-3">
          <Button size="lg" asChild>
            <Link href="/products">Shop now</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/register">Join free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

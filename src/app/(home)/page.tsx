import { Suspense } from "react";
import Hero from "./components/Hero";
import MainProducts from "./components/MainProducts";
import { getTenants } from "./js";
import MainProductSkeleton from "./components/MainProductSkeleton";

export default function Home() {
  return (
    <main>
      <section>
        <Hero />
      </section>
      <Suspense fallback={<MainProductSkeleton />}>
        <section className="container my-5">
          <MainProducts />
        </section>
      </Suspense>
    </main>
  );
}

import Hero from "./components/Hero";
import MainProducts from "./components/MainProducts";

export default function Home() {
  return (
    <main>
      <section>
        <Hero />
      </section>
      <section>
        <MainProducts />
      </section>
    </main>
  );
}

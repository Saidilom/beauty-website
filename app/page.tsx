import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { AboutProduct } from "@/components/about-product"
import { AdditionalProducts } from "@/components/additional-products"
import { PriceBundle } from "@/components/price-bundle"
import { FAQ } from "@/components/faq"
import { ContactOrder } from "@/components/contact-order"
import { Footer } from "@/components/footer"
import { getSiteContent } from "@/lib/firebase-admin-service";
import { getProducts } from "@/lib/firebase-admin-service";
import { getFAQs } from "@/lib/firebase-admin-service";

// Отключаем кэширование для этой страницы
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  // Отключаем кэширование для динамических данных
  const content = await getSiteContent();
  const heroContent = content.find((item) => item.section === "hero");
  const aboutContent = content.find((item) => item.section === "about-product");
  const productsSection = content.find((item) => item.section === "products");
  const products = await getProducts();
  const priceBundleContent = content.find((item) => item.section === "price-bundle");
  const faqSection = content.find((item) => item.section === "faq");
  const faqQuestions = await getFAQs();
  const orderSection = content.find((item) => item.section === "order");

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero content={heroContent} />
      <AboutProduct content={aboutContent} />
      <AdditionalProducts section={productsSection} products={products} />
      <PriceBundle content={priceBundleContent} />
      <FAQ section={{
        title: faqSection?.title || "",
        description: faqSection?.description || "",
        questions: faqQuestions || []
      }} />
      <ContactOrder section={orderSection} />
      <Footer />
    </main>
  );
}

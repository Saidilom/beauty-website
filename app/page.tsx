import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { AboutProduct } from "@/components/about-product"
import { AdditionalProducts } from "@/components/additional-products"
import { PriceBundle } from "@/components/price-bundle"
import { FAQ } from "@/components/faq"
import { ContactOrder } from "@/components/contact-order"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <AboutProduct />
      <AdditionalProducts />
      <PriceBundle />
      <FAQ />
      <ContactOrder />
      <Footer />
    </main>
  )
}

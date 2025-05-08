import Hero from "@/components/hero"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import AboutUs from "@/components/about-us"
import Blog from "@/components/blog"
import FutureFeatures from "@/components/future-features"
import ForBusinesses from "@/components/for-businesses"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AboutUs />
        <Blog />
        <FutureFeatures />
        <ForBusinesses />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

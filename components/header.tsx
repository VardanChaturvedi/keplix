"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">
            Kep<span className="text-red-600">lix</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-white hover:text-red-600 transition-colors">
            Home
          </Link>
          <Link href="/#about" className="text-white hover:text-red-600 transition-colors">
            About Us
          </Link>
          <Link href="/#blog" className="text-white hover:text-red-600 transition-colors">
            Blog
          </Link>
          <Link href="/#business" className="text-white hover:text-red-600 transition-colors">
            For Businesses
          </Link>
          <Link href="/#contact" className="text-white hover:text-red-600 transition-colors">
            Contact
          </Link>
          <Button className="bg-red-600 hover:bg-red-700 text-white" asChild>
            <Link href="/join-beta">Join Beta</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-white hover:text-red-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="text-white hover:text-red-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/#blog"
              className="text-white hover:text-red-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/#business"
              className="text-white hover:text-red-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              For Businesses
            </Link>
            <Link
              href="/#contact"
              className="text-white hover:text-red-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white w-full"
              onClick={() => setIsMenuOpen(false)}
              asChild
            >
              <Link href="/join-beta">Join Beta</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

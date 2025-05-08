import Link from "next/link"
import { Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white">
                Kep<span className="text-red-600">lix</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4">Revolutionizing car care in India with technology and transparency.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-red-600 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white hover:text-red-600 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white hover:text-red-600 transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-red-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-400 hover:text-red-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-gray-400 hover:text-red-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-red-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Car Repairs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Modifications
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Emergency Services
                </Link>
              </li>
              <li>
                <Link href="#business" className="text-gray-400 hover:text-red-600 transition-colors">
                  Fleet Management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Keplix. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">Designed with ❤️ in Delhi, India</p>
        </div>
      </div>
    </footer>
  )
}

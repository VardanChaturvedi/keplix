"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const BlogCard = ({ title, excerpt, image, date, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-gray-900 rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>
      <div className="p-6">
        <div className="text-sm text-gray-400 mb-2">{date}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{excerpt}</p>
        <Link href="#" className="inline-flex items-center text-red-600 hover:text-red-400 transition-colors">
          Read More <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </motion.div>
  )
}

export default function Blog() {
  const blogPosts = [
    {
      title: "Top 5 Car Maintenance Tips for Delhi Drivers",
      excerpt:
        "Learn how to keep your vehicle in top condition despite Delhi's challenging road and weather conditions.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 15, 2025",
    },
    {
      title: "How to Spot Overcharging at Workshops",
      excerpt: "Discover the common tactics used by dishonest workshops and how Keplix helps you avoid them.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 10, 2025",
    },
    {
      title: "The Future of Electric Vehicles in Delhi",
      excerpt: "Explore how Delhi's infrastructure is evolving to support the growing number of electric vehicles.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 5, 2025",
    },
    {
      title: "Understanding Your Car's Service Schedule",
      excerpt: "A comprehensive guide to maintaining your vehicle according to manufacturer recommendations.",
      image: "/placeholder.svg?height=400&width=600",
      date: "February 28, 2025",
    },
  ]

  return (
    <section className="py-20 bg-gray-950" id="blog">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Keplix <span className="text-red-600">Insights</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert advice and industry insights to help you make informed decisions about your vehicle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
              date={post.date}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

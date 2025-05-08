"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const Step = ({ number, title, description, image }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, -20])

  return (
    <motion.div ref={ref} style={{ opacity, scale, x }} className="flex flex-col md:flex-row items-center gap-8 mb-16">
      <div className="flex-1 order-2 md:order-1">
        <div className="flex items-center mb-4">
          <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4">
            {number}
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-400 mb-4">{description}</p>
      </div>
      <div className="flex-1 order-1 md:order-2 relative">
        <div className="bg-gradient-to-r from-red-600/20 to-transparent p-1 rounded-xl">
          <div className="bg-gray-900 rounded-lg overflow-hidden relative h-[300px] w-full">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Download Keplix",
      description:
        "Get the app from App Store or Google Play. Installation takes less than a minute, and you'll be ready to revolutionize your car care experience.",
      image: "/placeholder.svg?height=600&width=400",
    },
    {
      number: 2,
      title: "Choose Your Service",
      description:
        "Select repairs, modifications, or maintenance from our comprehensive list of automotive services tailored to your vehicle's make and model.",
      image: "/placeholder.svg?height=600&width=400",
    },
    {
      number: 3,
      title: "Compare & Book",
      description:
        "Pick the best provider by comparing prices, ratings, and availability. Book your appointment with just a few taps and secure your slot instantly.",
      image: "/placeholder.svg?height=600&width=400",
    },
    {
      number: 4,
      title: "Track in Real-Time",
      description:
        "Monitor your service from anywhere with live updates, estimated completion times, and direct communication with your service provider.",
      image: "/placeholder.svg?height=600&width=400",
    },
  ]

  return (
    <section className="py-20 bg-gray-950" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Car Care, <span className="text-red-600">Redefined</span> in 4 Steps
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Keplix simplifies the entire process of finding, booking, and managing automotive services.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step) => (
            <Step
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              image={step.image}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
            asChild
          >
            <Link href="/join-beta">Get Started Today</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

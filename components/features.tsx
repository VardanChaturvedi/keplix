"use client"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Wrench, Calendar, Star, Car, FileText, PhoneCall } from "lucide-react"

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="bg-gray-900 border border-gray-800 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-red-600/50 hover:shadow-[0_0_15px_rgba(255,0,0,0.2)]"
    >
      <div className="mb-4 text-red-600 flex justify-center">
        <div className="p-3 bg-red-600/10 rounded-full">{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-gray-400 text-center">{description}</p>
    </motion.div>
  )
}

export default function Features() {
  const features = [
    {
      icon: <Wrench size={32} />,
      title: "Price Comparison",
      description: "Save big by comparing real-time quotes from top providers.",
    },
    {
      icon: <Calendar size={32} />,
      title: "Instant Booking",
      description: "Book your service slot in seconds, hassle-free.",
    },
    {
      icon: <Star size={32} />,
      title: "Verified Reviews",
      description: "Choose trusted workshops with authentic user ratings.",
    },
    {
      icon: <Car size={32} />,
      title: "Home Pickup/Drop",
      description: "Get door-to-door service for ultimate convenience.",
    },
    {
      icon: <FileText size={32} />,
      title: "Service History",
      description: "Access your car's full maintenance record anytime.",
    },
    {
      icon: <PhoneCall size={32} />,
      title: "Emergency Help",
      description: "Instant roadside assistance when you need it most.",
    },
  ]

  return (
    <section className="py-20 bg-black" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Your Ultimate Marketplace for Car Care <span className="text-red-600">Solution</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Keplix addresses all your automotive service needs with cutting-edge technology and a network of trusted
            providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

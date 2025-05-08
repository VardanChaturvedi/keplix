"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { motion } from "framer-motion"
import { Activity, Zap, MapPin } from "lucide-react"
import * as THREE from "three"

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-red-600 animate-pulse">Loading 3D experience...</div>
    </div>
  )
}

function Dashboard() {
  const groupRef = useRef<THREE.Group>(null)
  const gaugeRef = useRef<THREE.Mesh>(null)
  const alertRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }

    if (gaugeRef.current) {
      // Animate gauge
      gaugeRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.5
    }

    if (alertRef.current) {
      // Pulse alert
      alertRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      alertRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      alertRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Dashboard base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5, 2.5, 0.2]} />
        <meshStandardMaterial color="#222222" />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.11]}>
        <boxGeometry args={[4.8, 2.3, 0.01]} />
        <meshStandardMaterial color="#000000" emissive="#000033" emissiveIntensity={0.2} />
      </mesh>

      {/* Gauge */}
      <group position={[-1.5, 0, 0.15]}>
        <mesh>
          <ringGeometry args={[0.5, 0.6, 32]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh ref={gaugeRef} position={[0, 0, 0.05]}>
          <boxGeometry args={[0.05, 0.4, 0.05]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Alert */}
      <mesh ref={alertRef} position={[1.5, 0, 0.15]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>

      {/* Status bars */}
      <mesh position={[0, -0.8, 0.15]}>
        <boxGeometry args={[4, 0.3, 0.05]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[-1.5, -0.8, 0.17]}>
        <boxGeometry args={[1, 0.25, 0.05]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.5, -0.8, 0.17]}>
        <boxGeometry args={[1, 0.25, 0.05]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

export default function FutureFeatures() {
  const features = [
    {
      icon: <Activity size={32} />,
      title: "AI-Powered Diagnostics",
      description: "Predict potential issues before they become major problems with our advanced AI system.",
    },
    {
      icon: <Zap size={32} />,
      title: "Electric Vehicle Services",
      description: "Specialized maintenance and charging solutions for the growing EV market in India.",
    },
    {
      icon: <MapPin size={32} />,
      title: "Pan-India Expansion",
      description: "We're growing beyond Delhi to serve car owners across major Indian cities.",
    },
  ]

  return (
    <section className="py-20 bg-black" id="future">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              The <span className="text-red-600">Future</span> of Car Care
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Get ready for AI-powered diagnostics to predict issues, electric vehicle services, and expansion to more
              cities across India.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4 text-red-600">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex-1 h-[400px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <Dashboard />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

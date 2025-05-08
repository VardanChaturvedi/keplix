"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { motion } from "framer-motion"

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-red-600 animate-pulse">Loading 3D experience...</div>
    </div>
  )
}

function DelhiSkyline() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle movement of the skyline
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Simple skyline representation using basic shapes */}
      <mesh position={[-4, 0, 0]}>
        <boxGeometry args={[1, 3, 1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[-2, 0, 0]}>
        <boxGeometry args={[1, 5, 1]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 7, 1]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[1, 4, 1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[4, 0, 0]}>
        <boxGeometry args={[1, 6, 1]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* Roads with moving cars */}
      <mesh position={[0, -4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 2]} />
        <meshStandardMaterial color="#222222" />
      </mesh>

      {/* Cars */}
      <MovingCar position={[-3, -3.5, 0]} direction={1} speed={0.02} />
      <MovingCar position={[2, -3.5, 0]} direction={-1} speed={0.015} />
    </group>
  )
}

function MovingCar({ position, direction, speed }) {
  const carRef = useRef()
  const [x, y, z] = position

  useFrame((state) => {
    if (carRef.current) {
      // Move car along the x-axis
      carRef.current.position.x += speed * direction

      // Reset position when car goes off-screen
      if (direction > 0 && carRef.current.position.x > 6) {
        carRef.current.position.x = -6
      } else if (direction < 0 && carRef.current.position.x < -6) {
        carRef.current.position.x = 6
      }
    }
  })

  return (
    <mesh ref={carRef} position={[x, y, z]}>
      <boxGeometry args={[0.5, 0.2, 0.3]} />
      <meshStandardMaterial color={direction > 0 ? "#ffffff" : "#ff0000"} />
    </mesh>
  )
}

export default function AboutUs() {
  return (
    <section className="py-20 bg-black" id="about">
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
              Who <span className="text-red-600">We Are</span>
            </h2>
            <p className="text-xl text-gray-400 mb-6">
              Founded in 2024, Keplix is transforming car care in India with a tech-driven platform that prioritizes
              transparency and convenience. Based in New Delhi, our team is passionate about making car ownership
              stress-free, starting with Delhi in 2025.
            </p>
            <p className="text-xl text-gray-400 mb-6">
              Our mission is to eliminate the common frustrations of car maintenance—opaque pricing, questionable
              quality, and inconvenient scheduling—by connecting you directly with verified service providers.
            </p>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-gray-400">
                To create a future where car maintenance is transparent, convenient, and stress-free for every vehicle
                owner in India.
              </p>
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
              <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <DelhiSkyline />
                <Environment preset="night" />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  enableRotate={true}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

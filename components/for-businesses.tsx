"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-red-600 animate-pulse">Loading 3D experience...</div>
    </div>
  )
}

function FleetVans() {
  const groupRef = useRef(null)
  // Create an array of refs at the top level
  const van1Ref = useRef(null)
  const van2Ref = useRef(null)
  const van3Ref = useRef(null)
  const van4Ref = useRef(null)
  const van5Ref = useRef(null)

  // Store refs in an array for easier access
  const vanRefs = [van1Ref, van2Ref, van3Ref, van4Ref, van5Ref]

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }

    // Animate each van
    vanRefs.forEach((van, i) => {
      if (van.current) {
        // Move vans in a circle
        const angle = state.clock.elapsedTime * 0.2 + (i * Math.PI * 2) / vanRefs.length
        van.current.position.x = Math.cos(angle) * 3
        van.current.position.z = Math.sin(angle) * 3

        // Rotate vans to face the direction of travel
        van.current.rotation.y = -angle + Math.PI / 2
      }
    })
  })

  return (
    <group ref={groupRef}>
      {vanRefs.map((vanRef, i) => (
        <mesh key={i} ref={vanRef} position={[0, 0, 0]}>
          {/* Van body */}
          <boxGeometry args={[1.2, 0.8, 0.7]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#ffffff" : "#dddddd"} />

          {/* Van cabin */}
          <mesh position={[-0.4, 0.1, 0]}>
            <boxGeometry args={[0.4, 0.6, 0.7]} />
            <meshStandardMaterial color="#333333" />
          </mesh>

          {/* Wheels */}
          <mesh position={[0.4, -0.4, 0.35]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          <mesh position={[0.4, -0.4, -0.35]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          <mesh position={[-0.4, -0.4, 0.35]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          <mesh position={[-0.4, -0.4, -0.35]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#111111" />
          </mesh>

          {/* Keplix branding */}
          <mesh position={[0, 0, 0.351]}>
            <planeGeometry args={[1, 0.3]} />
            <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
          </mesh>
        </mesh>
      ))}

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  )
}

export default function ForBusinesses() {
  return (
    <section className="py-20 bg-gray-950" id="business">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="flex-1 h-[400px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <FleetVans />
                <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate={false} />
              </Canvas>
            </Suspense>
          </motion.div>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Power Your <span className="text-red-600">Fleet</span> with Keplix
            </h2>
            <p className="text-xl text-gray-400 mb-6">
              Simplify fleet maintenance with our all-in-one platform. Contact us for tailored solutions that reduce
              downtime and optimize your operations.
            </p>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Business Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-red-600/20 p-1 rounded-full">
                    <div className="h-2 w-2 rounded-full bg-red-600"></div>
                  </div>
                  <span className="text-gray-300">Centralized management of all vehicles</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-red-600/20 p-1 rounded-full">
                    <div className="h-2 w-2 rounded-full bg-red-600"></div>
                  </div>
                  <span className="text-gray-300">Reduced maintenance costs through competitive pricing</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-red-600/20 p-1 rounded-full">
                    <div className="h-2 w-2 rounded-full bg-red-600"></div>
                  </div>
                  <span className="text-gray-300">Comprehensive service history and analytics</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-red-600/20 p-1 rounded-full">
                    <div className="h-2 w-2 rounded-full bg-red-600"></div>
                  </div>
                  <span className="text-gray-300">Priority scheduling and dedicated account manager</span>
                </li>
              </ul>
            </div>

            <Button
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
              asChild
            >
              <Link href="/join-beta">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

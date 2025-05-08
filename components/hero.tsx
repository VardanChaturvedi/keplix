"use client"

import { useRef, useEffect, Suspense, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, Stars } from "@react-three/drei"

// Lazy load the 3D model to prevent errors
function CarModel() {
  const carRef = useRef<THREE.Group>(null)
  // Using a simple box as a fallback model
  const modelRef = useRef(new THREE.Group())

  // Use proper frame management with delta time
  useFrame((state, delta) => {
    if (carRef.current) {
      carRef.current.rotation.y += 0.5 * delta // Use delta for consistent speed across devices
    }
  })

  // Create a simple car shape using basic geometries
  useEffect(() => {
    // Cleanup the group on unmount
    return () => {
      if (modelRef.current) {
        modelRef.current.clear()
      }
    }
  }, [])

  // Create car model in memo to prevent recreation
  useMemo(() => {
    if (modelRef.current) {
      // Car body
      const bodyGeometry = new THREE.BoxGeometry(1.5, 0.5, 3)
      const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 })
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)

      // Car cabin
      const cabinGeometry = new THREE.BoxGeometry(1.2, 0.4, 1.5)
      const cabinMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 })
      const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial)
      cabin.position.set(0, 0.45, 0)

      // Wheels
      const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16)
      const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 })

      const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial)
      wheel1.position.set(0.7, -0.25, 0.8)
      wheel1.rotation.z = Math.PI / 2

      const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial)
      wheel2.position.set(-0.7, -0.25, 0.8)
      wheel2.rotation.z = Math.PI / 2

      const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial)
      wheel3.position.set(0.7, -0.25, -0.8)
      wheel3.rotation.z = Math.PI / 2

      const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial)
      wheel4.position.set(-0.7, -0.25, -0.8)
      wheel4.rotation.z = Math.PI / 2

      // Headlights
      const headlightGeometry = new THREE.SphereGeometry(0.1, 16, 16)
      const headlightMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 2,
      })

      const headlight1 = new THREE.Mesh(headlightGeometry, headlightMaterial)
      headlight1.position.set(0.5, 0, 1.5)

      const headlight2 = new THREE.Mesh(headlightGeometry, headlightMaterial)
      headlight2.position.set(-0.5, 0, 1.5)

      // Add all parts to the car model
      modelRef.current.add(body)
      modelRef.current.add(cabin)
      modelRef.current.add(wheel1)
      modelRef.current.add(wheel2)
      modelRef.current.add(wheel3)
      modelRef.current.add(wheel4)
      modelRef.current.add(headlight1)
      modelRef.current.add(headlight2)
    }
  }, [])

  return <primitive ref={carRef} object={modelRef.current} scale={[0.7, 0.7, 0.7]} position={[0, -1, 0]} />
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  const particlesArray = useMemo(() => {
    const array = new Float32Array(500 * 3)
    for (let i = 0; i < array.length; i += 3) {
      array[i] = (Math.random() - 0.5) * 10
      array[i + 1] = (Math.random() - 0.5) * 10
      array[i + 2] = (Math.random() - 0.5) * 10
    }
    return array
  }, [])

  // Use proper frame management with delta time
  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.1 * delta
      particlesRef.current.rotation.x += 0.05 * delta
    }
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[particlesArray, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ff0000" sizeAttenuation transparent opacity={0.8} />
    </points>
  )
}

// Add this custom clock management to ensure animation continues
function AnimationManager() {
  const { invalidate, gl, scene, camera } = useThree();
  
  useEffect(() => {
    let animationId: number;
    let previousTime = 0;
    
    const animate = (time: number) => {
      const delta = (time - previousTime) / 1000;
      previousTime = time;
      
      gl.render(scene, camera);
      invalidate();
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationId);
  }, [invalidate, gl, scene, camera]);
  
  return null;
}

// Fallback component for when 3D content is loading
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-red-600 animate-pulse">Loading 3D experience...</div>
    </div>
  )
}

export default function Hero() {
  // Track whether component is visible in viewport
  const [isVisible, setIsVisible] = useState(true);
  
  // Use intersection observer to track visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    const section = document.querySelector('.hero-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16 hero-section">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }}>
        <Suspense fallback={<LoadingFallback />}>
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            dpr={[1, 2]} // Adjust pixel ratio for performance
            frameloop="demand" // Only render when needed
            gl={{ 
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true
            }}
          >
            <AnimationManager />
            <color attach="background" args={['#000000']} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            {isVisible && (
              <>
                <CarModel />
                <Particles />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Environment preset="night" />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  enableRotate={false} 
                  autoRotate 
                  autoRotateSpeed={0.5} 
                />
              </>
            )}
          </Canvas>
        </Suspense>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center relative">
        <div className="max-w-3xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Revolutionize Your Car Care with <span className="text-red-600">Keplix</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Compare, book, and track trusted automotive services in one cutting-edge app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,0,0,0.7)]"
              asChild
            >
              <Link href="/join-beta">Join the Beta Now</Link>
            </Button>
          </div>
          <p className="mt-4 text-gray-400">Be among the first to transform car care in Delhi.</p>

          {/* Countdown Timer */}
          <div className="mt-8 inline-block bg-black/50 backdrop-blur-md px-6 py-3 rounded-full">
            <p className="text-sm text-gray-300">
              Only <span className="text-red-600 font-bold">50</span> beta spots left! Join by April 30, 2025.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

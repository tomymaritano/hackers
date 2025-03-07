"use client";

import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function HomePage() {
  const glitchRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (glitchRef.current) {
        glitchRef.current.style.transform = `skew(${Math.random() * 10 - 5}deg)`;
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center font-mono relative overflow-hidden text-center">
      {/* Fondo Espacial con Movimiento */}
      <Canvas className="absolute inset-0 z-0">
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
      </Canvas>
      
      <div className="absolute flex flex-col items-center justify-center z-10">
        {/* Texto Principal con Glitch y Efecto de Entrada */}
        <motion.h1
          ref={glitchRef}
          className="text-6xl mb-12 text-green-400 font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          SELECT YOUR DESTINY
        </motion.h1>
        
        <div className="flex gap-12 items-center justify-center">
          {/* Mr. Robot - fsociety Terminal */}
          <Link href="/fsociety" passHref>
            <motion.div
              className="relative flex items-center justify-center border-4 border-red-600 px-12 py-6 text-lg text-red-600 bg-black hover:bg-red-600 hover:text-black transition duration-300 shadow-2xl transform hover:scale-110"
              whileHover={{ scale: 1.1, rotate: 2 }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover opacity-20">
                <source src="/fsociety-glitch.mp4" type="video/mp4" />
              </video>
              <span className="relative font-bold tracking-widest">ENTER FSOCIETY</span>
            </motion.div>
          </Link>
          
          {/* Hackers 1995 - Cyberpunk UI */}
          <Link href="/hackers" passHref>
            <motion.div
              className="relative flex items-center justify-center border-4 border-cyan-400 px-12 py-6 text-lg text-cyan-400 bg-black hover:bg-cyan-400 hover:text-black transition duration-300 shadow-2xl transform hover:scale-110"
              whileHover={{ scale: 1.1, rotate: -2 }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover opacity-20">
                <source src="/hackers-tunnel.mp4" type="video/mp4" />
              </video>
              <span className="relative font-bold tracking-widest">ENTER HACKERS 1995</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-dark text-basic px-6 text-center select-none overflow-hidden">
      {/* Background Decorative Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10"
      >
        <span className="text-[40vw] font-black leading-none opacity-20">404</span>
      </motion.div>

      <div className="max-w-md w-full relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-8xl md:text-9xl font-black mb-4 tracking-tighter text-primary">
            404
          </h1>
          <div className="w-20 h-1 bg-accent mx-auto mb-8 rounded-full" />

          <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
            Lost in the threads?
          </h2>
          <p className="text-muted text-lg mb-10 leading-relaxed max-w-sm mx-auto">
            The page you&apos;re looking for seems to have been misplaced or never existed. Let&apos;s get you back to where the style happens.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/20 group h-14 min-w-[200px] justify-center"
            >
              <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" />
              <span>Back to Home</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-background-light text-basic px-8 py-4 rounded-full font-bold hover:bg-background transition-colors border border-background-dark/10 h-14 min-w-[200px] justify-center"
            >
              <ArrowLeft size={20} />
              <span>Go Back</span>
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 text-muted/40 text-sm font-medium uppercase tracking-[0.2em]"
      >
        Geenah&apos;s Stitches &copy; {new Date().getFullYear()}
      </motion.div>
    </div>
  )
}

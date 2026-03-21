"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { LayoutDashboard, FileQuestion } from "lucide-react"

export default function StaffNotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-10 bg-background-dark text-basic min-h-[calc(100vh-80px)]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full bg-background rounded-3xl p-12 shadow-2xl shadow-black/5 flex flex-col items-center text-center border border-background-light/20"
      >
        <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 animate-pulse">
            <FileQuestion size={48} strokeWidth={1.5} />
        </div>

        <h1 className="text-4xl font-black mb-3 tracking-tight">Staff Page Not Found</h1>
        <p className="text-muted text-lg mb-10 leading-relaxed">
          The dashboard resource you requested is unavailable or has been moved. Check the URL or return to the overview.
        </p>

        <div className="w-full flex flex-col gap-3">
            <Link 
              href="/staff/dashboard"
              className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 justify-center h-16 w-full"
            >
              <LayoutDashboard size={20} />
              <span>Back to Dashboard</span>
            </Link>
            
            <Link 
              href="/"
              className="text-muted hover:text-basic transition-colors font-semibold py-3"
            >
              Back to Main Website
            </Link>
        </div>
      </motion.div>
    </div>
  )
}

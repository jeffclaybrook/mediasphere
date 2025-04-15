"use client"

import CategoriesList from "./(components)/categories-list"
import { motion } from "framer-motion"
import { Filter, More, Search } from "@/components/global/icons"

const containerVariants = {
 hidden: {
  opacity: 0,
  y: 20
 },
 visible: {
  opacity: 1,
  y: 0,
  transition: {
   duration: 1,
   ease: "easeInOut"
  }
 }
}

export default function Categories() {
 return (
  <motion.main
   initial="hidden"
   animate="visible"
   variants={containerVariants}
  >
   <section className="lg:py-4">
    <div className="flex items-center justify-end gap-2 px-4 border-b border-slate-200">
     <button aria-label="Search" className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer">
      <Search />
     </button>
     <button aria-label="Filter" className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer">
      <Filter />
     </button>
     <button aria-label="More" className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer">
      <More />
     </button>
    </div>
    <CategoriesList />
   </section>
  </motion.main>
 )
}
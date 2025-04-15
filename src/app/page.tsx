"use client"

import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/channel/navbar"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { whatsNew, mostPopular, recommended, professionalDevelopment } from "@/data"
import { ChevronDown, Filter, More, Sort } from "@/components/global/icons"

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

const sections = [
 { label: "What's New", key: "whatsNew", content: whatsNew },
 { label: "Most Popular", key: "mostPopular", content: mostPopular },
 { label: "Recommended", key: "recommended", content: recommended },
 { label: "Professional Development", key: "professionalDeveloment", content: professionalDevelopment }
]

const chunkSize = 5

export default function Home() {
 const [image, setImage] = useState("/banner-desktop.png")
 
 const [visibleMap, setVisibleMap] = useState<Record<string, number>>(
  Object.fromEntries(sections.map((s) => [s.key, chunkSize]))
 )

 const [lastRevealStart, setLastRevealStart] = useState<Record<string, number>>(
  Object.fromEntries(sections.map((s) => [s.key, 0]))
 )

 const handleLoadMore = (key: string, total: number) => {
  setVisibleMap((prev) => ({
   ...prev,
   [key]: Math.min(prev[key] + chunkSize, total)
  }))

  setLastRevealStart((prev) => ({
   ...prev,
   [key]: visibleMap[key]
  }))
 }

 useEffect(() => {
  const updateImage = () => {
   const width = window.innerWidth
   if (width < 640) {
    setImage("/banner-mobile.png")
   } else if (width < 1024) {
    setImage("/banner-tablet.png")
   } else {
    setImage("/banner-desktop.png")
   }
  }

  updateImage()
  window.addEventListener("resize", updateImage)
  return () => window.removeEventListener("resize", updateImage)
 }, [])

 return (
  <>
   <Navbar />
   <motion.header
    initial="hidden"
    animate="visible"
    variants={containerVariants}
    className="flex flex-col items-end"
   >
    <div className="relative">
     <Image
      src={image}
      alt="UT Health San Antonio banner"
      width={1500}
      height={250}
      priority
     />
     <Image
      src="/shield-logo.png"
      alt="UT Health San Antonio logo"
      width={80}
      height={80}
      priority
      className="absolute -bottom-10 left-20 border border-white rounded-full shadow-md hidden md:block"
     />
    </div>
    <ul className="hidden md:flex items-center gap-2 px-4 py-2">
     <li>
      <button aria-label="Sort" className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer">
       <Sort />
      </button>
     </li>
     <li>
      <button aria-label="Filter" className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer">
       <Filter />
      </button>
     </li>
     <li>
      <button aria-label="More" className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer">
       <More />
      </button>
     </li>
    </ul>
   </motion.header>
   <main className="p-4">
    {sections.map((section) => {
     const visibleCount = visibleMap[section.key]
     const lastStart = lastRevealStart[section.key]
     const visibleItems = section.content.slice(0, visibleCount)
     const total = section.content.length

     return (
      <motion.section
       key={section.key}
       initial="hidden"
       animate="visible"
       variants={containerVariants}
       className="flex flex-col gap-4 mb-8"
      >
       <h2 className="flex items-center gap-2 text-slate-700">
        <span className="flex w-12 h-[2px] bg-orange-700 rounded-full" />
        {section.label}
       </h2>
       <ul className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 gap-y-8 mb-4">
        <AnimatePresence initial={false}>
         {visibleItems.map((item, i) => {
          const isNew = i >= lastStart && i < lastStart + chunkSize
          const Card = (
           <Link href={item.href} className="flex flex-col gap-2 lg:hover:scale-105 hover:scale-102 transform duration-150">
            <div className="relative">
             <Image
              src={item.image}
              alt={item.title}
              width={800}
              height={250}
              className="rounded-md"
             />
             <span className="absolute bottom-2 right-2 bg-black/70 text-white/90 text-xs text-center font-medium px-2 py-[2px] rounded-sm">{item.duration}</span>
            </div>
            <div className="flex flex-col">
             <div className="flex items-start justify-between gap-4 mb-1">
              <h3 className="text-slate-700 text-base/5 font-medium line-clamp-2">{item.title}</h3>
              <button aria-label="More" className="text-slate-700 rounded-full hover:bg-slate-100 transition cursor-pointer">
               <More />
              </button>
             </div>
             <p className="text-slate-500 text-sm">1.1k views | 5 days ago</p>
            </div>
           </Link>
          )

          return isNew ? (
           <motion.li
            key={i}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
           >
            {Card}
           </motion.li>
          ) : (
           <li key={i}>{Card}</li>
          )
         })}
        </AnimatePresence>
       </ul>
       {visibleCount < total && (
        <motion.div
         initial="hidden"
         animate="visible"
         variants={containerVariants}
         className="flex items-center justify-center"
        >
         <span className="flex w-full h-[1px] bg-slate-200" />
         <button
          onClick={() => handleLoadMore(section.key, total)}
          aria-label={`Show more ${section.label}`}
          className="flex items-center justify-center gap-1 w-3xl border border-slate-200 rounded-full transition cursor-pointer text-slate-700 py-2 hover:bg-slate-100"
         >
          Show more
          <ChevronDown />
         </button>
         <span className="flex w-full h-[1px] bg-slate-200" />
        </motion.div>
       )}
      </motion.section>
     )
    })}
   </main>
  </>
 )
}
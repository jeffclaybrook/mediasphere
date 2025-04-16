"use client"

import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/channel/navbar"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { shows, Show } from "@/data/data"
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

const chunkSize = 4

type ShowsByCategory = Record<string, Show[]>

function groupShowsByCategory(shows: Show[]): ShowsByCategory {
 const map: ShowsByCategory = {}

 for (const show of shows) {
  show.categories.forEach((category) => {
   if (!map[category]) map[category] = []
   map[category].push(show)
  })
 }

 return map
}

export default function Home() {
 const [image, setImage] = useState("/banner-desktop.png")
 const showsByCategory = groupShowsByCategory(shows)

 const [visibleMap, setVisibleMap] = useState<Record<string, number>>(
  Object.keys(showsByCategory).reduce((acc, cat) => {
   acc[cat] = 4
   return acc
  }, {} as Record<string, number>)
 )

 const handleShowMore = (category: string) => {
  setVisibleMap((prev) => ({
   ...prev,
   [category]: prev[category] + 4
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
    <div className="hidden md:flex items-center gap-2 px-4 py-2">
     <button aria-label="Sort" className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer">
      <Sort />
     </button>
     <button aria-label="Filter" className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer">
      <Filter />
     </button>
     <button aria-label="More" className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer">
      <More />
     </button>
    </div>
   </motion.header>
   <main className="p-4">
    {Object.entries(showsByCategory).map(([category, shows]) => {
     const visible = visibleMap[category] ?? 4
     const showLoadMore = visible < shows.length

     return (
      <motion.section
       key={category}
       initial="hidden"
       animate="visible"
       variants={containerVariants}
       className="flex flex-col gap-4 mb-8"
      >
       <h2 className="flex items-center gap-2 text-slate-700">
        <span className="w-12 h-[2px] bg-orange-700 rounded-full" />
        {category}
       </h2>
       <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8 mb-4">
        <AnimatePresence initial={false}>
         {shows.slice(0, visible).map((show) => (
          <motion.li
           key={show.id}
           initial="hidden"
           animate="visible"
           variants={containerVariants}
          >
           <Link href={`/show/${show.id}`} className="flex flex-col gap-2 group lg:hover:scale-105 hover:scale-102 transform duration-150">
            <div className="relative">
             <Image
              src={show.thumbnail}
              alt={show.title}
              width={800}
              height={250}
              className="rounded-md"
             />
             <span className="absolute bottom-2 right-2 bg-black/70 text-white/90 text-xs text-center font-medium px-1 py-[2px] rounded-sm">{show.duration}</span>
            </div>
            <div className="flex flex-col">
             <div className="flex items-start justify-between gap-4 mb-1">
              <h3 className="text-slate-700 text-base/5 font-medium line-clamp-2">{show.title}</h3>
              <button aria-label="More" className="text-slate-700 rounded-full hover:bg-slate-100 transition cursor-pointer">
               <More />
              </button>
             </div>
             <p className="text-slate-500 text-sm">1.1k views | 5 days ago</p>
            </div>
           </Link>
          </motion.li>
         ))}
        </AnimatePresence>
       </ul>
       {showLoadMore && (
        <motion.div
         initial="hidden"
         animate="visible"
         variants={containerVariants}
         className="flex items-center justify-center"
        >
         <span className="w-full h-[1px] bg-slate-200" />
         <button
          onClick={() => handleShowMore(category)}
          aria-label={`Show more ${category}`}
          className="flex items-center justify-center gap-1 w-3xl border border-slate-200 rounded-full transition cursor-pointer text-slate-700 py-2 hover:bg-slate-100"
         >
          Show more
          <ChevronDown />
         </button>
         <span className="w-full h-[1px] bg-slate-200" />
        </motion.div>
       )}
      </motion.section>
     )
    })}
   </main>
  </>
 )
}
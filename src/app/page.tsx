"use client"

import Image from "next/image"
import Navbar from "@/components/channel/navbar"
import Card from "@/components/channel/card"
import Footer from "@/components/global/footer"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
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

export default function Home() {
 const [image, setImage] = useState("/banner-desktop.png")

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
    <motion.section
     initial="hidden"
     animate="visible"
     variants={containerVariants}
     className="flex flex-col gap-4 mb-8"
    >
     <h2 className="flex items-center gap-2 text-slate-700">
      <span className="flex w-12 h-[2px] bg-orange-700 rounded-full" />
      What&apos; New
     </h2>
     <ul className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
      {whatsNew.map((item, i) => (
       <Card
        key={i}
        title={item.title}
        image={item.image}
        href={item.href}
        duration={item.duration}
       />
      ))}
     </ul>
     <div className="flex items-center justify-center">
      <span className="flex w-full h-[1px] bg-slate-200" />
      <button aria-label="Show more" className="flex items-center justify-center gap-1 w-3xl border border-slate-200 rounded-full transition cursor-pointer text-slate-700 py-2 hover:bg-slate-100">
       Show more
       <ChevronDown />
      </button>
      <span className="flex w-full h-[1px] bg-slate-200" />
     </div>
    </motion.section>
    <motion.section
     initial="hidden"
     animate="visible"
     variants={containerVariants}
     className="flex flex-col gap-4 mb-8"
    >
     <h2 className="flex items-center gap-2 text-slate-700">
      <span className="flex w-12 h-[2px] bg-orange-700 rounded-full" />
      Most Popular
     </h2>
     <ul className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
      {mostPopular.map((item, i) => (
       <Card
        key={i}
        title={item.title}
        image={item.image}
        href={item.href}
        duration={item.duration}
       />
      ))}
     </ul>
     <div className="flex items-center justify-center">
      <span className="flex w-full h-[1px] bg-slate-200" />
      <button aria-label="Show more" className="flex items-center justify-center gap-1 w-3xl border border-slate-200 rounded-full transition cursor-pointer text-slate-700 py-2 hover:bg-slate-100">
       Show more
       <ChevronDown />
      </button>
      <span className="flex w-full h-[1px] bg-slate-200" />
     </div>
    </motion.section>
    <motion.section
     initial="hidden"
     animate="visible"
     variants={containerVariants}
     className="flex flex-col gap-4 mb-8"
    >
     <h2 className="flex items-center gap-2 text-slate-700">
      <span className="flex w-12 h-[2px] bg-orange-700 rounded-full" />
      Recommended
     </h2>
     <ul className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
      {recommended.map((item, i) => (
       <Card
        key={i}
        title={item.title}
        image={item.image}
        href={item.href}
        duration={item.duration}
       />
      ))}
     </ul>
     <div className="flex items-center justify-center">
      <span className="flex w-full h-[1px] bg-slate-200" />
      <button aria-label="Show more" className="flex items-center justify-center gap-1 w-3xl border border-slate-200 rounded-full transition cursor-pointer text-slate-700 py-2 hover:bg-slate-100">
       Show more
       <ChevronDown />
      </button>
      <span className="flex w-full h-[1px] bg-slate-200" />
     </div>
    </motion.section>
    <motion.section
     initial="hidden"
     animate="visible"
     variants={containerVariants}
     className="flex flex-col gap-4 mb-8"
    >
     <h2 className="flex items-center gap-2 text-slate-700">
      <span className="flex w-12 h-[2px] bg-orange-700 rounded-full" />
      Professional Development
     </h2>
     <ul className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
      {professionalDevelopment.map((item, i) => (
       <Card
        key={i}
        title={item.title}
        image={item.image}
        href={item.href}
        duration={item.duration}
       />
      ))}
     </ul>
     <div className="flex items-center justify-center">
      <span className="flex w-full h-[1px] bg-slate-200" />
      <button aria-label="Show more" className="flex items-center justify-center gap-1 w-3xl border border-slate-200 rounded-full transition cursor-pointer text-slate-700 py-2 hover:bg-slate-100">
       Show more
       <ChevronDown />
      </button>
      <span className="flex w-full h-[1px] bg-slate-200" />
     </div>
    </motion.section>
   </main>
  </>
 )
}
"use client"

import Image from "next/image"
import { motion } from "framer-motion"

type SlideProps = {
 slides: string[]
 alt: string
}

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

export default function Slides({ slides = [], alt }: SlideProps) {
 return (
  <motion.div
   initial="hidden"
   animate="visible"
   variants={containerVariants}
   className="flex flex-col gap-2 col-span-5"
  >
   <Image
    src={slides[0]}
    alt={alt}
    width={600}
    height={458}
    className="rounded-lg h-[458.242px] object-cover"
   />
   <ul className="flex items-center gap-2">
    {slides.map((slide, i) => (
     <li key={i}>
      <Image
       key={i}
       src={slide}
       alt={alt}
       width={200}
       height={100}
       className="rounded-lg"
      />
     </li>
    ))}
   </ul>
  </motion.div>
 )
}
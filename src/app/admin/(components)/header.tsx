"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

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

export default function Header() {
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
   <motion.header
    initial="hidden"
    animate="visible"
    variants={containerVariants}
    className="px-4"
   >
    <Image
     src={image}
     alt="UT Health San Antonio banner"
     width={1500}
     height={250}
     priority
     className="rounded-2xl"
    />
   </motion.header>
  )
}
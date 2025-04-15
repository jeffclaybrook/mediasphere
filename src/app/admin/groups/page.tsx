"use client"

import { motion } from "framer-motion"

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

export default function Groups() {
 return (
  <motion.main
   initial="hidden"
   animate="visible"
   variants={containerVariants}
  >
   <section className="p-4">Groups</section>
  </motion.main>
 )
}
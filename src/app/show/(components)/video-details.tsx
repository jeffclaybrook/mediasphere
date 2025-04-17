"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Download, MoreHorizontal, Share } from "@/components/global/icons"

type DetailsProps = {
 title: string
 description: string
 tags: string[]
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

export default function VideoDetails({ title, description, tags = [] }: DetailsProps) {
 return (
  <motion.div
   initial="hidden"
   animate="visible"
   variants={containerVariants}
   className="flex flex-col gap-2 col-span-7"
  >
   <h1 className="text-slate-700 text-lg font-medium">{title}</h1>
   <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
     <Image
      src="/shield-logo.png"
      alt="UT Health San Antonio logo"
      width={40}
      height={40}
      className="rounded-full"
     />
     <div className="flex flex-col">
      <h2 className="text-slate-700 font-medium">UT Healthier TV</h2>
      <p className="text-slate-500 text-sm">1.1k views | 5 days ago</p>
     </div>
    </div>
    <div className="flex items-center gap-2">
     <button aria-label="Share" className="flex items-center justify-center gap-1 text-slate-700 rounded-full p-2 px-3 bg-gray-100 hover:bg-slate-100 transition cursor-pointer">
      <Share />
      Share
     </button>
     <button aria-label="Download" className="flex items-center justify-center gap-1 text-slate-700 rounded-full p-2 px-3 bg-gray-100 hover:bg-slate-100 transition cursor-pointer">
      <Download />
      Download
     </button>
     <button aria-label="More" className="flex items-center justify-center text-slate-700 p-2 rounded-full bg-gray-100 hover:bg-slate-100 transition cursor-pointer">
      <MoreHorizontal />
     </button>
    </div>
   </div>
   <div className="flex flex-col gap-3 bg-gray-100 rounded-lg p-3">
    <p className="text-slate-700 text-sm">{description}</p>
    <ul className="flex items-center gap-2">
     {tags.map((tag, i) => (
      <li key={i} className="text-slate-700 text-sm">{tag}</li>
     ))}
    </ul>
   </div>
  </motion.div>
 )
}
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, More, Search } from "@/components/global/icons"
import GroupsList from "./(components)/groups-list"

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

const tabs = [
 { label: "Group", content: <GroupsList /> },
 { label: "Archive", content: "Archive" },
 { label: "Trash", content: "Trash" }
]

export default function Groups() {
 const [activeTab, setActiveTab] = useState(0)

 return (
  <motion.main
   initial="hidden"
   animate="visible"
   variants={containerVariants}
  >
   <section className="py-4">
    <div className="flex items-center justify-between px-4 border-b border-slate-200">
     <div className="flex">
      {tabs.map((tab, i) => (
       <button
        key={i}
        onClick={() => setActiveTab(i)}
        aria-label={tab.label}
        className={`px-4 py-2 transition-colors font-medium duration-200 cursor-pointer ${activeTab === i ? "text-slate-700 border-b border-slate-700" : "text-slate-400"}`}
       >
        {tab.label}
       </button>
      ))}
     </div>
     <div className="flex items-center gap-2">
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
    </div>
    {tabs[activeTab].content}
   </section>
  </motion.main>
 )
}
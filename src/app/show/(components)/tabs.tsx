"use client"

import { useState } from "react"
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

const tabs = [
 { label: "Chapters", content: "Chapters" },
 { label: "Comments", content: "Comments" },
 { label: "Files", content: "Files" },
 { label: "Polls", content: "Polls" },
 { label: "Quizzes", content: "Quizzes" }
]

export default function Tabs() {
 const [activeTab, setActiveTab] = useState(0)

 return (
  <div className="flex flex-col col-span-12">
   <div className="flex items-center border-b border-slate-200">
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
   <div className="flex flex-col p-4">
    {tabs[activeTab].content}
   </div>
  </div>
 )
}
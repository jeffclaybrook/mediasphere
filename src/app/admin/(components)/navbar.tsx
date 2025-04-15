"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Menu, Notifications } from "@/components/global/icons"

const dropdownLinks = [
 { label: "Profile", href: "/" },
 { label: "Admin", href: "/admin/content" },
 { label: "Logout", href: "/" }
]

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

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
 const [dropdownOpen, setDropdownOpen] = useState(false)

 const dropdownRef = useRef<HTMLDivElement>(null)

 const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

 useEffect(() => {
  const handleClick = (e: MouseEvent) => {
   if (
    dropdownRef.current &&
    !dropdownRef.current.contains(e.target as Node)
   ) {
    setDropdownOpen(false)
   }
  }

  document.addEventListener("mousedown", handleClick)
  return () => document.removeEventListener("mousedown", handleClick)
 }, [])

 return (
  <motion.nav
   initial="hidden"
   animate="visible"
   variants={containerVariants}
  >
   <div className="flex items-center justify-center gap-4 px-4 py-2">
    <div className="flex items-center gap-2 flex-1">
     <button
      onClick={onMenuClick}
      aria-label="Toggle navrail"
      className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
     >
      <Menu />
     </button>
     <Link href={"/"} className="flex items-center gap-2">
      <Image
       src="/shield-logo.png"
       alt="UT Health San Antonio logo"
       width={40}
       height={40}
       priority
       className="rounded-full"
      />
      <span className="text-slate-700 hidden lg:block">UT Health San Antonio</span>
     </Link>
    </div>
    <div></div>
    <div className="flex items-center justify-end gap-4 flex-1">
     <button aria-label="Toggle notifications" className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer hidden lg:flex relative">
      <Notifications />
      <span className="flex items-center justify-center text-white text-xs w-4 h-4 bg-orange-700 absolute top-0 right-0 rounded-full">3</span>
     </button>
     <div className="flex text-start relative" ref={dropdownRef}>
      <button
       onClick={toggleDropdown}
       aria-label="Toggle dropdown"
       className="rounded-full cursor-pointer"
      >
       <Image
        src="/avatar.png"
        alt="Avatar"
        width={30}
        height={30}
        priority
        className="rounded-full"
       />
      </button>
      {dropdownOpen && (
       <div className="absolute right-0 top-8 mt-2 w-40 bg-white rounded-xl shadow-lg z-50">
        <ul>
         {dropdownLinks.map((link, i) => (
          <li key={i}>
           <Link href={link.href} className="text-slate-700 text-sm block px-4 py-2 rounded-xl hover:bg-slate-100">{link.label}</Link>
          </li>
         ))}
        </ul>
       </div>
      )}
     </div>
    </div>
   </div>
  </motion.nav>
 )
}
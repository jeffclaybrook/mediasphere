"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { clsx } from "clsx"
import { motion } from "framer-motion"
import { Close, Menu, Notifications, Search } from "../global/icons"

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

export default function Navbar() {
 const [sidebarOpen, setSidebarOpen] = useState(false)
 const [dropdownOpen, setDropdownOpen] = useState(false)
 const [searchOpen, setSearchOpen] = useState(false)

 const dropdownRef = useRef<HTMLDivElement>(null)
 const inputRef = useRef<HTMLInputElement>(null)

 const toggleDropdown = () => setDropdownOpen(!dropdownOpen)
 const toggleSearch = () => setSearchOpen(!searchOpen)

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

 useEffect(() => {
  if (
   searchOpen &&
   inputRef.current
  ) {
   inputRef.current.focus()
  }
 }, [searchOpen])

 return (
  <motion.nav
   initial="hidden"
   animate="visible"
   variants={containerVariants}
  >
   <div className="flex items-center justify-center gap-4 lg:px-5 px-4 py-2">
    <div className="flex items-center gap-2 lg:flex-1">
     <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      aria-label="Toggle sidebar"
      className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
     >
      <Menu />
     </button>
     <Link href={"/"} className="flex items-center gap-2 shrink-0">
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
    <div className="hidden lg:flex max-w-lg w-full relative">
     <input
      type="text"
      placeholder="Search"
      className="w-full border border-slate-200 rounded-md px-4 pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
     />
     <Search className="text-slate-500 absolute inset-y-[9px] left-2 pointer-events-none" />
    </div>
    <div className="flex items-center justify-end gap-4 flex-1">
     <div className="flex items-center justify-center gap-2 w-full lg:hidden">
      <input
       type="text"
       placeholder="Search"
       ref={inputRef}
       className={`transition-all duration-300 ease-in-out border border-slate-200 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-slate-500 ${
        searchOpen ? "w-full opacity-100" : "w-0 opacity-0"
       }`}
      />
      <button
       onClick={toggleSearch}
       aria-label="Toggle search bar"
       className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
      >
       <Search />
      </button>
     </div>
     <button
      aria-label="Toggle notifications"
      className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer hidden lg:flex relative"
     >
      <Notifications />
      <span className="flex items-center justify-center text-white text-xs w-4 h-4 bg-orange-700 absolute top-0 right-0 rounded-full">3</span>
     </button>
     <div className="flex text-start relative" ref={dropdownRef}>
      <button
       onClick={toggleDropdown}
       aria-label="Toggle dropdown"
       className="rounded-full cursor-pointer shrink-0"
      >
       <Image
        src="/avatar.png"
        alt="Avatar"
        width={30}
        height={30}
        priority
        className="rounded-full flex"
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
   <div
    className={clsx(
     "fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 z-40",
     sidebarOpen ? "translate-x-0" : "-translate-x-full"
    )}
   >
    <div className="flex items-center justify-end p-2">
     <button
      onClick={() => setSidebarOpen(false)}
      aria-label="Close sidebar"
      className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
     >
      <Close />
     </button>
    </div>
    <ul className="p-2">
     <li className="text-slate-700 text-sm">Still trying to figure out what goes here LMAO</li>
    </ul>
   </div>
   {sidebarOpen && (
    <div
     onClick={() => setSidebarOpen(false)}
     className="fixed inset-0 bg-black opacity-60 z-30"
    />
   )}
  </motion.nav>
 )
}
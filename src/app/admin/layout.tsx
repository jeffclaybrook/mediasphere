"use client"

import { Mulish } from "next/font/google"
import { ReactNode, useState } from "react"
import Navbar from "./(components)/navbar"
import Navrail from "./(components)/navrail"
import "../globals.css"

const mulish = Mulish({
 variable: "--font-mulish",
 subsets: [ "latin" ]
})

export default function RootLayout({
 children
}: Readonly<{
 children: ReactNode
}>) {
 const [navExpanded, setNavExpanded] = useState(false)

 return (
  <html lang="en">
   <body className={`${mulish.variable} antialiased`}>
    <Navbar onMenuClick={() => setNavExpanded((prev) => !prev)} />
    <div className="flex flex-1 overflow-hidden">
     <Navrail expanded={navExpanded} />
     <main className="flex-1 overflow-auto">{children}</main>
    </div>
   </body>
  </html>
 )
}
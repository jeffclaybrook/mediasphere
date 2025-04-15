"use client"

import { Mulish } from "next/font/google"
import { ReactNode, useState } from "react"
import BottomAppBar from "./(components)/bottom-app-bar"
import Header from "./(components)/header"
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
 const [navExpanded, setNavExpanded] = useState(true)

 return (
  <html lang="en">
   <body className={`${mulish.variable} antialiased`}>
    <Navbar onMenuClick={() => setNavExpanded((prev) => !prev)} />
    <div className="flex flex-1 overflow-hidden pb-12 lg:pb-0">
     <Navrail expanded={navExpanded} />
     <main className="flex-1 overflow-auto">
      <Header />
      {children}
     </main>
    </div>
    <BottomAppBar />
   </body>
  </html>
 )
}
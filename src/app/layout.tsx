import type { Metadata } from "next"
import { Mulish } from "next/font/google"
import { ReactNode } from "react"
import Footer from "@/components/global/footer"
import "./globals.css"

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Media Sphere",
  description: "Media Sphere is an easy-to-use multimedia platform that enables you to create and deliver engaging content across your organization."
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
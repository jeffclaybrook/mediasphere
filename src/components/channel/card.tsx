import Image from "next/image"
import Link from "next/link"
import { More } from "../global/icons"

interface CardProps {
 title: string
 image: string
 href: string
 duration: string
}

export default function Card({ title, image, href, duration }: CardProps) {
 return (
  <li>
   <Link href={href} className="flex flex-col gap-2 lg:hover:scale-105 hover:scale-102 transform duration-150">
    <div className="relative">
     <Image
      src={image}
      alt={title}
      width={800}
      height={250}
      className="rounded-md"
     />
     <span className="absolute bottom-2 right-2 bg-black/70 text-white/90 text-xs text-center font-medium px-2 py-[2px] rounded-sm">{duration}</span>
    </div>
    <div className="flex flex-col">
     <div className="flex items-start justify-between gap-4 mb-2">
      <h3 className="text-slate-700 font-medium line-clamp-2">{title}</h3>
      <button aria-label="More" className="text-slate-700 rounded-full hover:bg-slate-100 transition cursor-pointer">
       <More />
      </button>
     </div>
     <p className="text-slate-500 text-sm">1.1k views | 5 days ago</p>
    </div>
   </Link>
  </li>
 )
}
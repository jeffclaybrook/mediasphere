"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowDown, ArrowUp, Draft, More, Published } from "@/components/global/icons"
import Image from "next/image"
import Checkbox from "./checkbox"

type VideoData = {
 id: string
 title: string
 description: string
 image: string
 duration: string
 visibility: "Published" | "Draft"
 date: string
 views: number
 comments: number
}

const videoData: VideoData[] = [
 {
  id: "1",
  title: "A Tribute to Nursing: To the Community with Love",
  description: "Lorem ipsum dolor sit amet, consecetur adipsicing elit, sed do eisumod tempor incididunt ut labore et dolore magna",
  image: "/thumbnail-1.png",
  duration: "6:58",
  visibility: "Published",
  date: "Mar 28, 2025",
  views: 1124,
  comments: 25
 },
 {
  id: "2",
  title: "COVID-19 Testing: What you should know",
  description: "Lorem ipsum dolor sit amet, consecetur adipsicing elit, sed do eisumod tempor incididunt ut labore et dolore magna",
  image: "/thumbnail-2.png",
  duration: "5:38",
  visibility: "Published",
  date: "Mar 25, 2025",
  views: 1124,
  comments: 25
 },
 {
  id: "3",
  title: "International Association of Latino Nurse Faculty is founded by UT Health San Antonio School of Nursing",
  description: "Lorem ipsum dolor sit amet, consecetur adipsicing elit, sed do eisumod tempor incididunt ut labore et dolore magna",
  image: "/thumbnail-3.png",
  duration: "10:07",
  visibility: "Draft",
  date: "Mar 22, 2025",
  views: 1124,
  comments: 25
 },
 {
  id: "4",
  title: "Patient health and safety is our priority and passion",
  description: "Lorem ipsum dolor sit amet, consecetur adipsicing elit, sed do eisumod tempor incididunt ut labore et dolore magna",
  image: "/thumbnail-4.png",
  duration: "7:15",
  visibility: "Draft",
  date: "Mar 22, 2025",
  views: 1124,
  comments: 25
 },
 {
  id: "5",
  title: "UT Health San Antonio alumna tells how her nursing education and mentor relationships lead to her career in academic nursing",
  description: "Lorem ipsum dolor sit amet, consecetur adipsicing elit, sed do eisumod tempor incididunt ut labore et dolore magna",
  image: "/thumbnail-5.png",
  duration: "6:03",
  visibility: "Draft",
  date: "Mar 22, 2025",
  views: 1124,
  comments: 25
 },
 {
  id: "6",
  title: "President's Gala 2018: A tribute to courage in the fight against cancer",
  description: "Lorem ipsum dolor sit amet, consecetur adipsicing elit, sed do eisumod tempor incididunt ut labore et dolore magna",
  image: "/thumbnail-6.png",
  duration: "6:58",
  visibility: "Published",
  date: "Mar 22, 2025",
  views: 1124,
  comments: 25
 },
 {
  id: "7",
  title: "Significant Operating Changes During the COVID-19 Pandemic",
  description: "Lorem ipsum dolor sit amet, consecetur adipsicing elit, sed do eisumod tempor incididunt ut labore et dolore magna",
  image: "/thumbnail-7.png",
  duration: "5:38",
  visibility: "Published",
  date: "Mar 22, 2025",
  views: 1124,
  comments: 25
 },
 {
  id: "8",
  title: "The Opioid Crisis in America: What you need to know",
  description: "Lorem ipsum dolor sit amet, consecetur adipsicing elit, sed do eisumod tempor incididunt ut labore et dolore magna",
  image: "/thumbnail-8.png",
  duration: "15:43",
  visibility: "Published",
  date: "Mar 22, 2025",
  views: 1124,
  comments: 25
 }
]

type SortKey = keyof Pick<VideoData, "title" | "date" | "views" | "comments">

export default function Shows() {
 const [selected, setSelected] = useState<string[]>([])
 const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" } | null>(null)
 const [data, setData] = useState<VideoData[]>(videoData)

 const toggleSelectAll = () => {
  if (selected.length === data.length) {
   setSelected([])
  } else {
   setSelected(data.map((d) => d.id))
  }
 }

 const toggleSelect = (id: string) => {
  setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
 }

 const sortBy = (key: SortKey) => {
  let direction: "asc" | "desc" = "asc"

  if (
   sortConfig?.key === key &&
   sortConfig.direction === "asc"
  ) {
   direction = "desc"
  }

  const sorted = [...data].sort((a, b) => {
   if (key === "date") {
    return direction === "asc"
     ? new Date(a.date).getTime() - new Date(b.date).getTime()
     : new Date(b.date).getTime() - new Date(a.date).getTime()
   } else if (typeof a[key] === "number") {
    return direction === "asc" ? (a[key] as number) - (b[key] as number) : (b[key] as number) - (a[key] as number)
   } else {
    return direction === "asc"
     ? (a[key] as string).localeCompare(b[key] as string)
     : (b[key] as string).localeCompare(a[key] as string)
   }
  })

  setData(sorted)
  setSortConfig({ key, direction })
 }

 const renderSortIcon = (key: SortKey) => {
  if (sortConfig?.key !== key) return null
  return sortConfig.direction === "asc" ? <ArrowUp className="inline" /> : <ArrowDown className="inline" />
 }

 return (
  <table className="w-full">
   <thead className="border-b border-slate-200 w-full">
    <tr>
     <th className="p-3 text-start">
      <Checkbox
       checked={selected.length === data.length}
       onChange={toggleSelectAll}
      />
     </th>
     <th
      onClick={() => sortBy("title")}
      className="py-3 text-start cursor-pointer text-slate-500 text-sm font-medium"
     >
      Video {renderSortIcon("title")}
     </th>
     <th className="py-3 text-start text-slate-500 text-sm font-medium">Visibility</th>
     <th
      onClick={() => sortBy("date")}
      className="py-3 text-start cursor-pointer text-slate-500 text-sm font-medium"
     >
      Date {renderSortIcon("date")}
     </th>
     <th
      onClick={() => sortBy("views")}
      className="py-3 text-start cursor-pointer text-slate-500 text-sm font-medium"
     >
      Views {renderSortIcon("views")}
     </th>
     <th
      onClick={() => sortBy("comments")}
      className="py-3 text-start cursor-pointer text-slate-500 text-sm font-medium"
     >
      Comments {renderSortIcon("comments")}
     </th>
     <th className="py-3 text-start text-slate-500 text-sm font-medium">Actions</th>
    </tr>
   </thead>
   <tbody className="divide-y divide-slate-200">
    {data.map((item) => (
     <tr key={item.id} className="hover:bg-slate-100">
      <td className="p-3">
       <Checkbox
        checked={selected.includes(item.id)}
        onChange={() => toggleSelect(item.id)}
       />
      </td>
      <td className="py-3 flex items-center gap-4">
       <div className="relative">
        <Image
         src={item.image}
         alt={item.title}
         width={150}
         height={100}
         className="rounded-md"
        />
        <span className="absolute bottom-1 left-25 bg-black/70 text-white/90 text-xs text-center font-medium px-2 py-[2px] rounded-sm">{item.duration}</span>
       </div>
       <div>
        <h3 className="text-slate-700 font-medium text-sm line-clamp-1 max-w-sm">{item.title}</h3>
        <p className="text-slate-500 text-xs line-clamp-2 max-w-sm">{item.description}</p>
       </div>
      </td>
      <td className="py-3 text-slate-700">
       {item.visibility === "Published" ? <Published className="inline align-middle mr-1" /> : <Draft className="inline align-middle mr-1" />}
       <span className="text-sm">{item.visibility}</span>
      </td>
      <td className="py-3 text-slate-700 text-sm">{format(new Date(item.date), "MMM dd, yyyy")}</td>
      <td className="py-3 text-slate-700 text-sm">{item.views.toLocaleString()}</td>
      <td className="py-3 text-slate-700 text-sm">{item.comments}</td>
      <td className="py-3 text-slate-700 text-sm">
       <button
        aria-label="More"
        className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
       >
        <More />
       </button>
      </td>
     </tr>
    ))}
   </tbody>
  </table>
 )
}
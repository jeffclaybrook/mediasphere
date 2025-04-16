"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowUp, ArrowDown, Category, ChevronLeft, ChevronRight, More, Private, Public } from "@/components/global/icons"
import Image from "next/image"
import Checkbox from "../../(components)/checkbox"

type CategoryData = {
 id: string
 category: string
 image: string
 shows: number
 visibility: "Public" | "Private"
 lastUpdated: string
 views: number
}

const categoryData: CategoryData[] = [
 {
  id: "1",
  category: "Marketing",
  image: "/thumbnail-1.png",
  shows: 11,
  visibility: "Public",
  lastUpdated: "Mar 28, 2025",
  views: 1675
 },
 {
  id: "2",
  category: "Professional Development",
  image: "/thumbnail-2.png",
  shows: 27,
  visibility: "Private",
  lastUpdated: "Mar 25, 2025",
  views: 4164
 },
 {
  id: "3",
  category: "Community Engagement",
  image: "/thumbnail-3.png",
  shows: 18,
  visibility: "Public",
  lastUpdated: "Mar 22, 2025",
  views: 2174
 },
 {
  id: "4",
  category: "Communications",
  image: "/thumbnail-4.png",
  shows: 7,
  visibility: "Private",
  lastUpdated: "Mar 18, 2025",
  views: 837
 },
 {
  id: "5",
  category: "Nursing",
  image: "/thumbnail-5.png",
  shows: 41,
  visibility: "Private",
  lastUpdated: "Mar 11, 2025",
  views: 5282
 },
 {
  id: "6",
  category: "Research",
  image: "/thumbnail-6.png",
  shows: 32,
  visibility: "Public",
  lastUpdated: "Mar 5, 2025",
  views: 3074
 },
 {
  id: "7",
  category: "Philanthropy",
  image: "/thumbnail-7.png",
  shows: 11,
  visibility: "Public",
  lastUpdated: "Mar 1, 2025",
  views: 1675
 },
 {
  id: "8",
  category: "Orthopedic",
  image: "/thumbnail-8.png",
  shows: 21,
  visibility: "Public",
  lastUpdated: "Feb 28, 2025",
  views: 2317
 },
 {
  id: "9",
  category: "Dentistry",
  image: "/thumbnail-1.png",
  shows: 11,
  visibility: "Public",
  lastUpdated: "Mar 28, 2025",
  views: 1675
 },
 {
  id: "10",
  category: "Physicians",
  image: "/thumbnail-2.png",
  shows: 27,
  visibility: "Private",
  lastUpdated: "Mar 25, 2025",
  views: 4164
 },
 {
  id: "11",
  category: "Academics",
  image: "/thumbnail-3.png",
  shows: 18,
  visibility: "Public",
  lastUpdated: "Mar 22, 2025",
  views: 2174
 },
 {
  id: "12",
  category: "Patient Care",
  image: "/thumbnail-4.png",
  shows: 7,
  visibility: "Private",
  lastUpdated: "Mar 18, 2025",
  views: 837
 },
 {
  id: "13",
  category: "Certificate Programs",
  image: "/thumbnail-5.png",
  shows: 41,
  visibility: "Private",
  lastUpdated: "Mar 11, 2025",
  views: 5282
 },
 {
  id: "14",
  category: "Physical Therapy",
  image: "/thumbnail-6.png",
  shows: 32,
  visibility: "Public",
  lastUpdated: "Mar 5, 2025",
  views: 3074
 },
 {
  id: "15",
  category: "Veterans Portal",
  image: "/thumbnail-7.png",
  shows: 11,
  visibility: "Public",
  lastUpdated: "Mar 1, 2025",
  views: 1675
 },
 {
  id: "16",
  category: "Biomedical Sciences",
  image: "/thumbnail-8.png",
  shows: 21,
  visibility: "Public",
  lastUpdated: "Feb 28, 2025",
  views: 2317
 }
]

type SortKey = keyof Pick<CategoryData, "category" | "lastUpdated" | "views" | "shows">

export default function CategoriesList() {
 const [selected, setSelected] = useState<string[]>([])
 const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" } | null>(null)
 const [currentPage, setCurrentPage] = useState(1)
 const [data, setData] = useState<CategoryData[]>(categoryData)

 const itemsPerPage = 10

 const totalPages = Math.ceil(data.length / itemsPerPage)

 const paginatedData = data.slice(
  (currentPage -1) * itemsPerPage,
  currentPage * itemsPerPage
 )

 const toggleSelectAll = () => {
  setSelected(selected.length === data.length ? [] : data.map((d) => d.id))
 }

 const toggleSelect = (id: string) => {
  setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
 }

 const sortBy = (key: SortKey) => {
  let direction: "asc" | "desc" = "asc"
  if (
   sortConfig?.key === key &&
   sortConfig.direction === "asc"
  ) direction = "desc"

  const sorted = [...data].sort((a, b) => {
   if (key === "lastUpdated") {
    return direction === "asc"
     ? new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
     : new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
   } else if (typeof a[key] === "number") {
    return direction === "asc"
     ? (a[key] as number) - (b[key] as number)
     : (b[key] as number) - (a[key] as number)
   } else {
    return direction === "asc"
     ? (a[key] as string).localeCompare(b[key] as string)
     : (b[key] as string).localeCompare(a[key] as string)
   }
  })

  setData(sorted)
  setSortConfig({ key, direction })
  setCurrentPage(1)
 }

 const renderSortIcon = (key: SortKey) => {
  if (sortConfig?.key !== key) return <ArrowUp />
  return sortConfig.direction === "asc"
   ? <ArrowUp className="text-slate-700" />
   : <ArrowDown className="text-slate-700" />
 }

 const columns = [
  { label: "Category", className: "w-full max-w-md", key: "category" as SortKey },
  { label: "Visibility", className: "hidden lg:flex flex-1 w-32" },
  { label: "Last updated", className: "hidden lg:flex flex-1 w-32", key: "lastUpdated" as SortKey },
  { label: "Shows", className: "hidden lg:flex flex-1 w-24", key: "shows" as SortKey },
  { label: "Views", className: "hidden lg:flex flex-1 w-24", key: "views" as SortKey },
  { label: "Actions", className: "hidden lg:flex flex-1 w-24" }
 ]

 return (
  <div className="w-full pb-8">
   <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-200">
    <div className="px-2">
     <Checkbox
      checked={selected.length === data.length}
      onChange={toggleSelectAll}
     />
    </div>
    {columns.map((column, i) => (
     <div
      key={i}
      onClick={() => column.key && sortBy(column.key)}
      className={`flex items-center gap-1 px-2 text-slate-500 text-sm font-medium ${column.className} ${column.key ? "cursor-pointer select-none" : ""}`}
     >
      {column.label}
      {column.key && renderSortIcon(column.key)}
     </div>
    ))}
   </div>
   {paginatedData.map((category) => (
    <div
     key={category.id}
     className={`flex items-center gap-2 px-4 py-2 hover:bg-slate-100 border-b border-slate-200 ${
      selected.includes(category.id) ? "bg-slate-100" : "bg-white"
     }`}
    >
     <div className="px-2 w-[40px]">
      <Checkbox
       checked={selected.includes(category.id)}
       onChange={() => toggleSelect(category.id)}
      />
     </div>
     <div className="flex items-start gap-4 max-w-md w-full px-2">
      <div className="relative shrink-0">
       <Image
        src={category.image}
        alt={category.category}
        width={125}
        height={75}
        className="rounded-md"
       />
       <div className="flex flex-col items-center justify-center w-1/2 h-full absolute top-0 right-0 bg-black/70 text-white/90 rounded-r-md">
        <span>{category.shows}</span>
        <Category />
       </div>
      </div>
      <div>
       <h3 className="text-slate-700 font-medium text-sm line-clamp-1 max-w-md">{category.category}</h3>
      </div>
     </div>
     <div className="hidden lg:flex items-center gap-2 flex-1 px-2 w-32 text-slate-700 text-sm">
      {category.visibility === "Public" ? <Public /> : <Private />}
      {category.visibility}
     </div>
     <div className="hidden lg:flex px-2 w-32 text-slate-700 text-sm flex-1">{format(new Date(category.lastUpdated), "MMM dd, yyyy")}</div>
     <div className="hidden lg:flex px-2 w-24 text-slate-700 text-sm flex-1">{category.shows}</div>
     <div className="hidden lg:flex px-2 w-24 text-slate-700 text-sm flex-1">{category.views.toLocaleString()}</div>
     <div className="hidden lg:flex px-2 w-24 flex-1">
      <button
       aria-label="More"
       className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer"
      >
       <More />
      </button>
     </div>
    </div>
   ))}
   <div className="flex items-center justify-center gap-4 mt-4">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-default"
    >
      <ChevronLeft />
    </button>
    <span className="text-slate-700 text-sm">Page {currentPage} of {totalPages}</span>
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-default"
    >
      <ChevronRight />
    </button>
   </div>
  </div>
 )
}
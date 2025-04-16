"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowUp, ArrowDown, ChevronLeft, ChevronRight, More } from "@/components/global/icons"
import Checkbox from "../../(components)/checkbox"

type UsersData = {
 id: string
 name: string
 role: "Administrator" | "Viewer"
 email: string
 lastActivity: string
}

const usersData: UsersData[] = [
 {
  id: "1",
  name: "Adam Ampaipitkwang",
  role: "Administrator",
  email: "adam@mediasphere.com",
  lastActivity: "Mar 28, 2025"
 },
 {
  id: "2",
  name: "Alan Clayton",
  role: "Viewer",
  email: "alan@mediasphere.com",
  lastActivity: "Mar 18, 2025"
 },
 {
  id: "3",
  name: "Aleigha Troutman",
  role: "Viewer",
  email: "aleigha@mediasphere.com",
  lastActivity: "Mar 7, 2025"
 },
 {
  id: "4",
  name: "Alexis Perlman",
  role: "Administrator",
  email: "alexis@mediasphere.com",
  lastActivity: "Mar 15, 2025"
 },
 {
  id: "5",
  name: "Amanda Hathaway",
  role: "Administrator",
  email: "amanda@mediasphere.com",
  lastActivity: "Mar 23, 2025"
 },
 {
  id: "6",
  name: "Andrew Argubright",
  role: "Viewer",
  email: "andrew@mediasphere.com",
  lastActivity: "Mar 28, 2025"
 },
 {
  id: "7",
  name: "Anne Snow",
  role: "Administrator",
  email: "anne@mediasphere.com",
  lastActivity: "Mar 28, 2025"
 },
 {
  id: "8",
  name: "Ben Gassaway",
  role: "Viewer",
  email: "ben@mediasphere.com",
  lastActivity: "Mar 28, 2025"
 },
 {
  id: "9",
  name: "Bethany Joseph",
  role: "Viewer",
  email: "bethany@mediasphere.com",
  lastActivity: "Mar 18, 2025"
 },
 {
  id: "10",
  name: "Bindu Thota",
  role: "Administrator",
  email: "bindu@mediasphere.com",
  lastActivity: "Mar 7, 2025"
 },
 {
  id: "11",
  name: "Blaine Balliett",
  role: "Viewer",
  email: "blaine@mediasphere.com",
  lastActivity: "Mar 15, 2025"
 },
 {
  id: "12",
  name: "Blake Atwell",
  role: "Administrator",
  email: "blake@mediasphere.com",
  lastActivity: "Mar 23, 2025"
 }
]

const getInitials = (name: string) => {
 return name
  .split(" ")
  .map((part) => part[0])
  .join("")
  .toUpperCase()
}

const getRandomColor = (seed: string) => {
 const colors = ["#544847", "#746569", "#a3989c", "#9c9195", "#005e81", "#017195", "#a1d1e6", "#3d5c50", "#607e71", "#bccd98", "#3c3057", "#3c3057"]
 let hash = 0
 for (let i = 0; i < seed.length; i++) {
  hash = seed.charCodeAt(i) + ((hash << 5) - hash)
 }
 return colors[Math.abs(hash) % colors.length]
}

type SortKey = keyof Pick<UsersData, "name" | "role" | "email" | "lastActivity">

export default function UsersList() {
 const [selected, setSelected] = useState<string[]>([])
 const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" } | null>(null)
 const [currentPage, setCurrentPage] = useState(1)
 const [data, setData] = useState<UsersData[]>(usersData)

 const itemsPerPage = 10

 const totalPages = Math.ceil(data.length / itemsPerPage)

 const paginatedData = data.slice(
  (currentPage - 1) * itemsPerPage,
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
   if (key === "lastActivity") {
    return direction === "asc"
     ? new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime()
     : new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
   } else if (typeof a[key] === "number") {
    return direction === "asc"
     ? (a[key] as number) - (b[key] as unknown as number)
     : (b[key] as unknown as number) - (a[key] as number)
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
  { label: "Name", className: "w-full max-w-sm", key: "name" as SortKey },
  { label: "Role", className: "hidden lg:flex flex-1 w-24", key: "role" as SortKey },
  { label: "Email", className: "hidden lg:flex flex-1 w-24", key: "email" as SortKey },
  { label: "Last activity", className: "hidden lg:flex flex-1 w-32", key: "lastActivity" as SortKey },
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
   {paginatedData.map((user) => {
    const initials = getInitials(user.name)
    const avatarColor = getRandomColor(user.name)
    return (
     <div
      key={user.id}
      className={`flex items-center gap-2 px-4 py-2 hover:bg-slate-100 border-b border-slate-200 ${
       selected.includes(user.id) ? "bg-slate-100" : "bg-white"
      }`}
     >
      <div className="px-2 w-[40px]">
       <Checkbox
        checked={selected.includes(user.id)}
        onChange={() => toggleSelect(user.id)}
       />
      </div>
      <div className="flex items-center gap-4 max-w-sm w-full px-2">
       <span className="flex items-center justify-center shrink-0 h-10 w-10 rounded-full text-white text-sm" style={{ backgroundColor: avatarColor }}>{initials}</span>
       <h3 className="text-slate-700 text-sm font-medium">{user.name}</h3>
      </div>
      <div className="hidden lg:flex px-2 flex-1 w-24 text-slate-700 text-sm">{user.role}</div>
      <div className="hidden lg:flex px-2 flex-1 w-24 text-slate-700 text-sm">{user.email}</div>
      <div className="hidden lg:flex px-2 flex-1 w-32 text-slate-700 text-sm">{format(new Date(user.lastActivity), "MMM dd, yyyy")}</div>
      <div className="hidden lg:flex px-2 flex-1 w-24">
       <button className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer">
        <More />
       </button>
      </div>
     </div>
    )
   })}
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
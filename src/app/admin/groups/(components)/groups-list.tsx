"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowUp, ArrowDown, ChevronLeft, ChevronRight, More } from "@/components/global/icons"
import Checkbox from "../../(components)/checkbox"

type GroupsData = {
 id: string
 group: string
 members: number
 views: number
 lastActivity: string
}

const groupsData: GroupsData[] = [
 {
  id: "1",
  group: "First Year Nursing",
  members: 40,
  views: 867,
  lastActivity: "Mar 28, 2025"
 },
 {
  id: "2",
  group: "Doctoral Candidates",
  members: 24,
  views: 561,
  lastActivity: "Mar 18, 2025"
 },
 {
  id: "3",
  group: "Exective",
  members: 21,
  views: 507,
  lastActivity: "Mar 21, 2025"
 },
 {
  id: "4",
  group: "Medical Physiology",
  members: 55,
  views: 1125,
  lastActivity: "Mar 29, 2025"
 },
 {
  id: "5",
  group: "Physicians",
  members: 18,
  views: 674,
  lastActivity: "Mar 15, 2025"
 },
 {
  id: "6",
  group: "Dentistry",
  members: 24,
  views: 968,
  lastActivity: "Mar 20, 2025"
 },
 {
  id: "7",
  group: "Biomedical Science",
  members: 21,
  views: 489,
  lastActivity: "Mar 16, 2025"
 },
 {
  id: "8",
  group: "Public Health",
  members: 55,
  views: 2152,
  lastActivity: "Mar 16, 2025"
 },
 {
  id: "9",
  group: "Physician Assistants",
  members: 35,
  views: 912,
  lastActivity: "Mar 28, 2025"
 },
 {
  id: "10",
  group: "Nurses",
  members: 85,
  views: 3127,
  lastActivity: "Mar 24, 2025"
 },
 {
  id: "11",
  group: "Orthopedic",
  members: 38,
  views: 1367,
  lastActivity: "Mar 21, 2025"
 },
 {
  id: "12",
  group: "Veterans",
  members: 42,
  views: 1527,
  lastActivity: "Mar 19, 2025"
 }
]

type SortKey = keyof Pick<GroupsData, "group" | "members" | "views" | "lastActivity">

const colors = ["#544847", "#746569", "#a3989c", "#9c9195", "#005e81", "#017195", "#a1d1e6", "#3d5c50", "#607e71", "#bccd98", "#3c3057", "#3c3057"]

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

const getRandomInitials = () => {
 const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
 const one = letters[Math.floor(Math.random() * letters.length)]
 const two = letters[Math.floor(Math.random() * letters.length)]
 return one + two
}

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1

const Avatar = ({ content, bgColor, zIndex }: { content: string, bgColor: string, zIndex: number }) => (
 <span
  className="flex items-center justify-center shrink-0 relative h-10 w-10 rounded-full text-white text-sm border border-white"
  style={{ backgroundColor: bgColor, zIndex, marginLeft: zIndex !== 0 ? -16 : 0}}
 >
  {content}
 </span>
)

const AvatarGroup = () => {
 const avatars = Array.from({ length: 3 }, (_, i) => ({
  content: getRandomInitials(),
  bgColor: getRandomColor(),
  zIndex: i
 }))

 const lastAvatar = {
  content: `+${getRandomNumber().toString()}`,
  bgColor: getRandomColor(),
  zIndex: 3
 }

 return (
  <div className="flex items-center">
   {[...avatars, lastAvatar].map((avatar, i) => (
    <Avatar key={i} {...avatar} />
   ))}
  </div>
 )
}

export default function GroupsList() {
 const [selected, setSelected] = useState<string[]>([])
 const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" } | null>(null)
 const [currentPage, setCurrentPage] = useState(1)
 const [data, setData] = useState<GroupsData[]>(groupsData)

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
  { label: "Group", className: "w-full max-w-sm", key: "group" as SortKey },
  { label: "Members", className: "hidden lg:flex flex-1 w-24", key: "members" as SortKey },
  { label: "Views", className: "hidden lg:flex flex-1 w-24", key: "views" as SortKey },
  { label: "Last activity", className: "hidden lg:flex flex-1 w-32", key: "lastActivity" as SortKey },
  { label: "Actions", className: "hidden lg:flex flex-1 w-24" }
 ]

 return (
  <div className="w-full">
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
   {paginatedData.map((group) => (
    <div
     key={group.id}
     className={`flex items-center gap-2 px-4 py-2 hover:bg-slate-100 border-b border-slate-200 ${
      selected.includes(group.id) ? "bg-slate-100" : "bg-white"
     }`}
    >
     <div className="px-2 w-[40px]">
      <Checkbox
       checked={selected.includes(group.id)}
       onChange={() => toggleSelect(group.id)}
      />
     </div>
     <div className="flex items-center gap-4 max-w-sm w-full px-2">
      <AvatarGroup />
      <h3 className="text-slate-700 text-sm font-medium">{group.group}</h3>
     </div>
     <div className="hidden lg:flex px-2 flex-1 w-24 text-slate-700 text-sm">{group.members}</div>
     <div className="hidden lg:flex px-2 flex-1 w-24 text-slate-700 text-sm">{group.views.toLocaleString()}</div>
     <div className="hidden lg:flex px-2 flex-1 w-24 text-slate-700 text-sm">{format(new Date(group.lastActivity), "MMM dd, yyyy")}</div>
     <div className="hidden lg:flex px-2 flex-1 w-24">
      <button className="text-slate-700 p-2 rounded-full hover:bg-slate-100 transition cursor-pointer">
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
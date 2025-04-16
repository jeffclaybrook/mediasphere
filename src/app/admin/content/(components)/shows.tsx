"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Draft, More, Published } from "@/components/global/icons"
import Image from "next/image"
import Checkbox from "../../(components)/checkbox"

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
  },
  {
    id: "9",
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
    id: "10",
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
    id: "11",
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
    id: "12",
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
    id: "13",
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
    id: "14",
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
    id: "15",
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
    id: "16",
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
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<VideoData[]>(videoData)

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
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [ ...prev, id ])
  }

  const sortBy = (key: SortKey) => {
    let direction: "asc" | "desc" = "asc"
    if (
      sortConfig?.key === key &&
      sortConfig.direction === "asc"
    ) direction = "desc"

    const sorted = [...data].sort((a, b) => {
      if (key === "date") {
        return direction === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
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
    { label: "Video", className: "max-w-lg w-full", key: "title" as SortKey },
    { label: "Visibility", className: "hidden lg:flex flex-1 w-32" },
    { label: "Date", className: "hidden lg:flex flex-1 w-32", key: "date" as SortKey },
    { label: "Views", className: "hidden lg:flex flex-1 w-24", key: "views" as SortKey },
    { label: "Comments", className: "hidden lg:flex flex-1 w-24", key: "comments" as SortKey },
    { label: "Actions", className: "hidden lg:flex flex-1 w-24" }
  ]

  return (
    <div className="w-full pb-8">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-200 overflow-x-auto">
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
      {paginatedData.map((video) => (
        <div
          key={video.id}
          className={`flex items-center gap-2 px-4 py-2 hover:bg-slate-100 border-b border-slate-200 ${selected.includes(video.id) ? "bg-slate-100" : "bg-white"
            }`}
        >
          <div className="px-2 w-[40px]">
            <Checkbox
              checked={selected.includes(video.id)}
              onChange={() => toggleSelect(video.id)}
            />
          </div>
          <div className="flex items-center gap-4 max-w-lg w-full px-2">
            <div className="relative shrink-0">
              <Image
                src={video.image}
                alt={video.title}
                width={125}
                height={75}
                className="rounded-md"
              />
              <span className="absolute bottom-1 right-1 bg-black/70 text-white/90 text-xs text-center font-medium px-1 py-[2px] rounded-sm">{video.duration}</span>
            </div>
            <div>
              <h3 className="text-slate-700 font-medium text-sm line-clamp-1 max-w-md">{video.title}</h3>
              <p className="text-slate-500 text-xs line-clamp-2 max-w-md">{video.description}</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2 flex-1 px-2 w-32 text-slate-700 text-sm">
            {video.visibility === "Published" ? <Published /> : <Draft />}
            {video.visibility}
          </div>
          <div className="hidden lg:flex px-2 w-32 text-slate-700 text-sm flex-1">{format(new Date(video.date), "MMM dd, yyyy")}</div>
          <div className="hidden lg:flex px-2 w-24 text-slate-700 text-sm flex-1">{video.views.toLocaleString()}</div>
          <div className="hidden lg:flex px-2 w-24 text-sm text-slate-700 flex-1">{video.comments}</div>
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
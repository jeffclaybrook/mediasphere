"use client"

import Link from "next/link"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { Analytics, AnalyticsFilled, Categories, CategoriesFilled, Content, ContentFilled, Groups, GroupsFilled, Settings, SettingsFilled, Users, UsersFilled } from "@/components/global/icons"

const navrailLinks = [
 { label: "Content", href: "/admin/content", icon: Content, activeIcon: ContentFilled },
 { label: "Categories", href: "/admin/categories", icon: Categories, activeIcon: CategoriesFilled },
 { label: "Users", href: "/admin/users", icon: Users, activeIcon: UsersFilled },
 { label: "Groups", href: "/admin/groups", icon: Groups, activeIcon: GroupsFilled },
 { label: "Analytics", href: "/admin/analytics", icon: Analytics, activeIcon: AnalyticsFilled },
 { label: "Settings", href: "/admin/settings", icon: Settings, activeIcon: SettingsFilled }
]

export default function Navrail({ expanded }: { expanded: boolean }) {
 const pathname = usePathname()
 
 return (
  <div
   className={`h-full relative left-0 bg-white transition-all duration-300 ease-in-out p-2 ${
    expanded ? "w-40" : "w-20"
   }`}
  >
   <ul className="flex flex-col gap-2">
    {navrailLinks.map((link, i) => {
     const isActive = pathname === link.href
     return (
      <li key={i}>
       <Link
        href={link.href}
        aria-label={link.label}
        className={`flex text-slate-700 hover:bg-slate-100 rounded-lg p-2 transition-all ${
         expanded ? "flex-row gap-3 items-center pl-3" : "flex-col items-center justify-center w-full"
        }`}
       >
        {isActive ? <link.activeIcon /> : <link.icon />}
        <span className={`${expanded ? "text-sm" : "text-[10px] mt-1"}`}>{link.label}</span>
       </Link>
      </li>
     )
    })}
   </ul>
  </div>
 )
}
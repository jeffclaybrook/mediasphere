"use client"

import Link from "next/link"
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
  <nav className={`bg-white lg:flex hidden overflow-hidden relative left-0 transition-all duration-300 ease-in-out ${
   expanded ? "w-20" : "w-0"
  }`}>
   <ul className="flex flex-col p-2">
    {navrailLinks.map((link, i) => {
     const isActive = pathname === link.href
     return (
      <li key={i}>
       <Link href={link.href} className="flex flex-col items-center justify-center text-slate-700 text-[10px] rounded-lg hover:bg-slate-100 p-2 transition-all">
        {isActive ? <link.activeIcon /> : <link.icon />}
        <span>{link.label}</span>
       </Link>
      </li>
     )
    })}
   </ul>
  </nav>
 )
}
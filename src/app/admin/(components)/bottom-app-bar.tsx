import Link from "next/link"
import { usePathname } from "next/navigation"
import { Analytics, AnalyticsFilled, Categories, CategoriesFilled, Content, ContentFilled, Groups, GroupsFilled, Settings, SettingsFilled, Users, UsersFilled } from "@/components/global/icons"

const links = [
 { label: "Content", href: "/admin/content", icon: Content, activeIcon: ContentFilled },
 { label: "Categories", href: "/admin/categories", icon: Categories, activeIcon: CategoriesFilled },
 { label: "Users", href: "/admin/users", icon: Users, activeIcon: UsersFilled },
 { label: "Groups", href: "/admin/groups", icon: Groups, activeIcon: GroupsFilled },
 { label: "Analytics", href: "/admin/analytics", icon: Analytics, activeIcon: AnalyticsFilled },
 { label: "Settings", href: "/admin/settings", icon: Settings, activeIcon: SettingsFilled }
]

export default function BottomAppBar() {
 const pathname = usePathname()

 return (
  <nav className="fixed bottom-0 left-0 w-full block lg:hidden bg-white z-40 border-t border-slate-100">
   <ul className="flex items-center justify-between gap-2">
    {links.map((link, i) => {
     const isActive = pathname === link.href
     return (
      <li key={i} className="flex-1">
       <Link href={link.href} className="flex flex-col items-center justify-center gap-1 text-slate-700 hover:bg-slate-100 rounded-lg transition-all py-2">
        {isActive ? <link.activeIcon /> : <link.icon />}
        <span className="text-[10px]">{link.label}</span>
       </Link>
      </li>
     )
    })}
   </ul>
  </nav>
 )
}
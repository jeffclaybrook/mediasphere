import Image from "next/image"
import Link from "next/link"

const links = [
 { label: "Privacy Policy", href: "/" },
 { label: "Terms of Service", href: "/" }
]

export default function Footer() {
 return (
  <footer className="hidden lg:flex flex-col items-center justify-center gap-2 py-8 border-t border-slate-200">
   <Link href={"/"} className="mb-2">
    <Image
     src="/logo.png"
     alt="Media Sphere logo"
     width={80}
     height={80}
     className="rounded-full"
    />
   </Link>
   <p className="text-slate-700 text-xs text-center">&copy; 2025 Media Sphere. All rights reserved.</p>
   <ul className="flex items-center justify-center gap-4">
    {links.map((link, i) => (
     <li key={i}>
      <Link href={link.href} className="text-slate-700 text-xs hover:underline">{link.label}</Link>
     </li>
    ))}
   </ul>
  </footer>
 )
}
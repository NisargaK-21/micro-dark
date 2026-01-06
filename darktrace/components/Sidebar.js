// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { LayoutDashboard, Users, Network, Home, Shield } from "lucide-react";

// const navItems = [
//   { href: "/", label: "Overview", icon: Home },
//   { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { href: "/vendors", label: "Vendors", icon: Users },
//   { href: "/campaigns", label: "Campaigns", icon: Network },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
//       <div className="p-6 border-b border-zinc-800">
//         <div className="flex items-center gap-2">
//           <Shield className="w-6 h-6 text-red-500" />
//           <h1 className="text-xl font-bold text-white">DarkTrace</h1>
//         </div>
//         <p className="text-xs text-zinc-400 mt-1">Cybersecurity Intelligence</p>
//       </div>
      
//       <nav className="flex-1 p-4">
//         <ul className="space-y-2">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = pathname === item.href;
            
//             return (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//                     isActive
//                       ? "bg-red-600 text-white"
//                       : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className="font-medium">{item.label}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       <div className="p-4 border-t border-zinc-800">
//         <div className="px-4 py-2 bg-zinc-800 rounded-lg">
//           <p className="text-xs text-zinc-400">Status</p>
//           <div className="flex items-center gap-2 mt-1">
//             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//             <span className="text-sm text-zinc-300">Monitoring Active</span>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Network, Home, Shield, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Overview", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vendors", label: "Vendors", icon: Users },
  { href: "/campaigns", label: "Campaigns", icon: Network },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-900 text-white rounded-lg border border-zinc-800"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`fixed left-0 top-0 h-screen w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col z-40 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}>
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-500" />
            <h1 className="text-xl font-bold text-white">DarkTrace</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">Cybersecurity Intelligence</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="px-4 py-2 bg-zinc-800 rounded-lg">
            <p className="text-xs text-zinc-400">Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-zinc-300">Monitoring Active</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

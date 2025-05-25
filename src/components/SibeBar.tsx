// components/sidebar/SideBar.tsx
"use client";

import Link from "next/link";
import { Home, UserPlus, Terminal, Users, Info } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Register", href: "/register", icon: UserPlus },
  { name: "Query", href: "/query", icon: Terminal },
  { name: "Patients", href: "/patients", icon: Users },
  // { name: "About", href: "/about", icon: Info },
];

const SideBar = () => {
  return (
    <aside className="bg-gray-800 text-white w-1/6 p-4">
      <h1 className="text-xl font-bold mb-6">Patient App</h1>
      <nav className="flex flex-col space-y-2">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors">
            <Icon className="w-5 h-5" />
            <span>{name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;

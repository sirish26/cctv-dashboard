"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Video, LayoutGrid, AlertTriangle, Users } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-2 border-b flex items-center justify-between bg-gradient-to-r from-black via-gray-900 to-yellow-900 text-white">
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold tracking-wide">MANDLACX</span>
      </div>

      <div className="flex items-center gap-8">
        <NavItem icon={<Home size={16} />} label="Dashboard" />
        <NavItem icon={<Video size={16} />} label="Cameras" />
        <NavItem icon={<LayoutGrid size={16} />} label="Scenes" />
        <NavItem icon={<AlertTriangle size={16} />} label="Incidents" />
        <NavItem icon={<Users size={16} />} label="Users" />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
        </div>
        <div className="flex flex-col leading-tight text-sm">
          <span className="font-semibold">Sirish</span>
          <span className="text-gray-300 text-xs">sirish@api.com</span>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-2 text-sm hover:text-yellow-400 transition-colors">
      {icon}
      {label}
    </button>
  );
}

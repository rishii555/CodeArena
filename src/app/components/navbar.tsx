
"use client";

import { useState } from "react";
import { Search, Flame, Bell, Menu } from "lucide-react";

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <nav className="sticky top-0 z-50 flex h-16 w-full items-center
      gap-4 border-b border-slate-800 bg-[#070b16]/95
      px-4 text-white backdrop-blur-xl sm:gap-6 sm:px-6">

      {/* Logo */}
      <a href="/" className="flex shrink-0 items-center">
        <img
          src="/codearena-logo.svg"
          alt="CodeArena"
          className="h-9 w-auto object-contain sm:h-10"
        />
      </a>

      {/* Search bar */}
      <div className="mx-auto hidden w-full max-w-xl items-center
        gap-3 rounded-xl border border-slate-800 bg-[#0d1424]
        px-4 py-2.5 transition
        focus-within:border-violet-500
        focus-within:ring-1 focus-within:ring-violet-500/40 md:flex">

        <Search className="shrink-0 text-slate-400" size={19} />

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="w-full bg-transparent text-sm text-white
            outline-none placeholder:text-slate-500"
        />
      </div>

      {/* Right section */}
      <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">

        {/* Mobile search */}
        <button
          aria-label="Search"
          onClick={() =>
            document.getElementById("mobile-search")?.focus()
          }
          className="text-slate-300 hover:text-violet-400 md:hidden"
        >
          <Search size={20} />
        </button>

        {/* Streak */}
        <div className="flex items-center gap-1.5">
          <Flame className="text-orange-400" size={21} />
          <span className="text-sm font-semibold">0</span>
        </div>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative text-slate-300 transition
            hover:text-violet-400"
        >
          <Bell size={21} />
          <span className="absolute -right-1 -top-1 h-2 w-2
            rounded-full bg-violet-500 ring-2 ring-[#070b16]" />
        </button>

        {/* Profile */}
        <button
          className="flex items-center gap-2 border-l
            border-slate-800 pl-3 transition hover:opacity-80 sm:gap-3 sm:pl-4"
        >
          <img
            src="/profile.png"
            alt="Profile"
            className="h-9 w-9 rounded-full border-2
              border-violet-500 object-cover"
          />

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold">Rishi Kumar</p>
            <p className="text-xs text-slate-400">@rishi_dev</p>
          </div>
        </button>
      </div>
    </nav>
  );
}


"use client";

import {
  LayoutDashboard,
  Code2,
  Trophy,
  Medal,
  MessageSquare,
  History,
  BookOpen,
  Award,
  Flame,
  Target,
  TrendingUp,
  ChevronRight,
  Zap,
  CalendarDays,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Contests", icon: Trophy },
  { name: "Leaderboard", icon: Medal },
  { name: "Discuss", icon: MessageSquare },
  { name: "Submissions", icon: History },
  { name: "Learning", icon: BookOpen },
  { name: "Achievements", icon: Award },
];

const stats = [
  { label: "Achievement", value: "0", icon: Code2, color: "text-violet-400" },
  { label: "Contests Participated", value: "0", icon: Trophy, color: "text-cyan-400" },
  { label: "Global Rank", value: "—", icon: Medal, color: "text-amber-400" },
];

const difficulties = [
  { name: "Easy", solved: 0, total: 200, color: "bg-emerald-400", text: "text-emerald-400" },
  { name: "Medium", solved: 0, total: 300, color: "bg-amber-400", text: "text-amber-400" },
  { name: "Hard", solved: 0, total: 100, color: "bg-rose-400", text: "text-rose-400" },
];

const heatmap = Array.from({ length: 91 }, (_, i) => ({
  id: i,
  level: 0,
}));

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#070b16] text-white">
      <div className="flex">

        {/* LEFT SIDEBAR */}
        <aside className="hidden min-h-screen w-60 shrink-0 border-r
          border-slate-800/80 bg-[#090e1b] p-4 lg:block">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase
            tracking-[0.2em] text-slate-500">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.name}
                  href={
                    item.name === "Dashboard"
                      ? "/dashboard"
                      : `/${item.name.toLowerCase()}`
                  }
                  className={`group flex items-center gap-3 rounded-xl
                    px-3 py-3 text-sm transition ${
                    item.active
                      ? "border border-violet-500/20 bg-violet-500/10 font-semibold text-violet-300"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <Icon size={19} />
                  {item.name}

                  {item.active && (
                    <span className="ml-auto h-5 w-1 rounded-full
                      bg-violet-400" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* SIDEBAR BOTTOM CARD */}
          <div className="mt-12 rounded-2xl border border-violet-500/20
            bg-gradient-to-br from-violet-500/10 to-cyan-500/5 p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center
              rounded-lg bg-violet-500/15">
              <Zap size={20} className="text-violet-400" />
            </div>

            <h3 className="font-semibold">Level up your skills</h3>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Practice daily and climb the CodeArena leaderboard.
            </p>

            <a
              href="/problems"
              className="mt-4 flex items-center justify-center gap-2
                rounded-lg bg-violet-600 px-3 py-2.5 text-xs
                font-semibold transition hover:bg-violet-500"
            >
              Start practicing <ChevronRight size={15} />
            </a>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">

          {/* PAGE HEADING */}
          <div className="mb-8 flex flex-wrap items-center
            justify-between gap-4">
            <div>
              <p className="mb-2 text-sm text-slate-400">
                Welcome back, developer 👋
              </p>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Your Dashboard
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Track your progress. Keep pushing your limits.
              </p>
            </div>

            <a
              href="/problems"
              className="flex items-center gap-2 rounded-xl
                bg-violet-600 px-4 py-3 text-sm font-semibold
                transition hover:bg-violet-500"
            >
              <Code2 size={17} />
              Solve Problems
            </a>
          </div>

          {/* PROFILE + STATS */}
          <section className="mb-6 grid gap-4 xl:grid-cols-[1.1fr_2fr]">

            {/* PROFILE CARD */}
            <div className="relative overflow-hidden rounded-2xl border
              border-slate-800 bg-[#0c1222] p-5 sm:p-6">
              <div className="pointer-events-none absolute -right-12
                -top-12 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl" />

              <div className="relative flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center
                  justify-center rounded-2xl border border-violet-400/30
                  bg-gradient-to-br from-violet-500/30 to-cyan-500/10
                  text-2xl font-bold text-violet-200">
                  R
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold">
                    Your Name
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    @your_username
                  </p>

                  <span className="mt-2 inline-flex items-center gap-1.5
                    rounded-full border border-violet-500/20
                    bg-violet-500/10 px-2.5 py-1 text-xs
                    font-medium text-violet-300">
                    <Zap size={12} /> Beginner
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-800 pt-4">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-slate-400">Next level</span>
                  <span className="text-slate-300">0 / 100 XP</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-0 rounded-full bg-gradient-to-r
                    from-violet-500 to-cyan-400" />
                </div>
              </div>
            </div>

            {/* STAT CARDS */}
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-800
                    bg-[#0c1222] p-5 transition
                    hover:border-violet-500/30 sm:p-6"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className={`rounded-xl bg-slate-800/70 p-3 ${stat.color}`}>
                      <Icon size={21} />
                    </div>

                    <TrendingUp size={17} className="text-slate-600" />
                  </div>

                  <p className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </section>

          {/* STREAK + DIFFICULTY */}
          <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">

            {/* STREAK HEATMAP */}
            <div className="min-w-0 rounded-2xl border border-slate-800
              bg-[#0c1222] p-5 sm:p-6">

              <div className="mb-6 flex flex-wrap items-start
                justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Flame className="text-orange-400" size={22} />
                    <h2 className="text-lg font-bold">
                      Problem Solving Streak
                    </h2>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Every problem solved moves you forward.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl
                  border border-orange-400/20 bg-orange-400/5
                  px-3 py-2">
                  <Flame size={20} className="text-orange-400" />
                  <div>
                    <p className="text-lg font-bold leading-none">0</p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      DAY STREAK
                    </p>
                  </div>
                </div>
              </div>

              {/* HEATMAP */}
              <div className="overflow-x-auto pb-3">
                <div className="min-w-[440px]">
                  <div className="mb-3 flex justify-between text-[10px]
                    text-slate-500">
                    {["Mon", "Wed", "Fri", "Sun"].map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>

                  <div className="grid grid-cols-13 gap-1.5"
                    style={{ gridTemplateColumns: "repeat(13, minmax(0, 1fr))" }}>
                    {heatmap.map((day) => (
                      <div
                        key={day.id}
                        title="No problems solved"
                        className="aspect-square rounded-[3px]
                          border border-slate-700/30 bg-slate-800/80
                          transition hover:ring-1 hover:ring-violet-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center
                justify-between gap-3">
                <p className="text-xs text-slate-500">
                  Your last 13 weeks of activity
                </p>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-500">Less</span>
                  {[
                    "bg-slate-800",
                    "bg-violet-900",
                    "bg-violet-700",
                    "bg-violet-500",
                    "bg-cyan-400",
                  ].map((color) => (
                    <span
                      key={color}
                      className={`h-3 w-3 rounded-[3px] ${color}`}
                    />
                  ))}
                  <span className="text-[10px] text-slate-500">More</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-800
                  bg-[#080e1b] p-4">
                  <p className="text-xs text-slate-400">Total active days</p>
                  <p className="mt-2 text-xl font-bold">0</p>
                </div>

                <div className="rounded-xl border border-slate-800
                  bg-[#080e1b] p-4">
                  <p className="text-xs text-slate-400">Longest streak</p>
                  <p className="mt-2 text-xl font-bold">0 days</p>
                </div>
              </div>
            </div>

            {/* DIFFICULTY BREAKDOWN */}
            <div className="rounded-2xl border border-slate-800
              bg-[#0c1222] p-5 sm:p-6">

              <div className="mb-6 flex items-center gap-2">
                <Target size={21} className="text-violet-400" />
                <h2 className="text-lg font-bold">
                  Solved by Difficulty
                </h2>
              </div>

              <div className="mb-6 flex items-center gap-5">
                <div className="flex h-28 w-28 shrink-0 items-center
                  justify-center rounded-full border-[8px] border-slate-800">
                  <div className="text-center">
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-[10px] text-slate-500">SOLVED</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold">Keep going!</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Start solving problems to build your stats.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {difficulties.map((item) => (
                  <div key={item.name}>
                    <div className="mb-2 flex items-center
                      justify-between text-sm">
                      <span className={item.text}>{item.name}</span>

                      <span className="text-slate-400">
                        {item.solved}
                        <span className="text-slate-600">
                          {" / "}{item.total}
                        </span>
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full
                      bg-slate-800">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{
                          width: `${(item.solved / item.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="/problems"
                className="mt-8 flex w-full items-center
                  justify-center gap-2 rounded-xl border
                  border-slate-700 py-3 text-sm font-medium
                  text-slate-300 transition hover:border-violet-500/50
                  hover:text-white"
              >
                Explore all problems <ChevronRight size={17} />
              </a>
            </div>
          </section>

          {/* BOTTOM BANNER */}
          <section className="relative mt-6 overflow-hidden rounded-2xl
            border border-violet-500/20 bg-gradient-to-r
            from-violet-950/50 via-[#10142a] to-cyan-950/30 p-5 sm:p-7">
            <div className="pointer-events-none absolute -right-10
              -top-16 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative flex flex-wrap items-center
              justify-between gap-5">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <CalendarDays size={18} className="text-cyan-400" />
                  <p className="text-xs font-semibold uppercase
                    tracking-widest text-cyan-300">
                    Your next challenge
                  </p>
                </div>

                <h2 className="text-xl font-bold">
                  One problem a day. Better every day.
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Build consistency and climb the ranks.
                </p>
              </div>

              <a
                href="/problems"
                className="rounded-xl bg-white px-5 py-3
                  text-sm font-bold text-slate-950 transition
                  hover:bg-violet-100"
              >
                Start a challenge →
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

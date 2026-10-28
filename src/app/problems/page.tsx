
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Code2,
  ChevronRight,
  CheckCircle2,
  Target,
  Layers,
} from "lucide-react";

const topics = [
  { id: 1, name: "Arrays", category: "Fundamentals", solved: 12, total: 20 },
  { id: 2, name: "Two Pointers", category: "Techniques", solved: 18, total: 25 },
  { id: 3, name: "Sliding Window", category: "Techniques", solved: 8, total: 15 },
  { id: 4, name: "Binary Search", category: "Algorithms", solved: 5, total: 15 },
  { id: 5, name: "Strings", category: "Fundamentals", solved: 7, total: 20 },
  { id: 6, name: "Linked Lists", category: "Data Structures", solved: 0, total: 15 },
  { id: 7, name: "Stacks & Queues", category: "Data Structures", solved: 0, total: 15 },
  { id: 8, name: "Trees", category: "Data Structures", solved: 0, total: 25 },
  { id: 9, name: "Graphs", category: "Algorithms", solved: 0, total: 20 },
  { id: 10, name: "Dynamic Programming", category: "Algorithms", solved: 0, total: 30 },
  { id: 11, name: "Recursion & Backtracking", category: "Techniques", solved: 0, total: 20 },
  { id: 12, name: "Hashing", category: "Fundamentals", solved: 0, total: 15 },
];

export default function ProblemsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const totalSolved = topics.reduce((sum, topic) => sum + topic.solved, 0);
  const totalProblems = topics.reduce((sum, topic) => sum + topic.total, 0);

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      const matchesSearch = topic.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Completed" && topic.solved === topic.total) ||
        (filter === "In Progress" &&
          topic.solved > 0 &&
          topic.solved < topic.total) ||
        (filter === "Not Started" && topic.solved === 0);

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <main className="min-h-screen bg-[#070b16] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-violet-400">
            YOUR LEARNING PATH
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Problems
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Master data structures and algorithms, one topic at a time.
            Track your progress and keep improving.
          </p>
        </div>

        {/* Summary cards */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-[#0c1222] p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <Code2 size={21} />
            </div>
            <p className="text-3xl font-bold">{totalProblems}</p>
            <p className="mt-1 text-sm text-slate-400">Total Problems</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0c1222] p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 size={21} />
            </div>
            <p className="text-3xl font-bold">{totalSolved}</p>
            <p className="mt-1 text-sm text-slate-400">Problems Solved</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0c1222] p-5">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Target size={21} />
            </div>
            <p className="text-3xl font-bold">
              {Math.round((totalSolved / totalProblems) * 100)}%
            </p>
            <p className="mt-1 text-sm text-slate-400">Overall Progress</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-violet-500 transition-all"
                style={{ width: `${(totalSolved / totalProblems) * 100}%` }}
              />
            </div>
          </div>
        </section>

        {/* Topics heading and search */}
        <section>
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">Explore Topics</h2>
              <p className="mt-1 text-sm text-slate-400">
                Choose a topic and continue practicing.
              </p>
            </div>

            <div className="flex w-full items-center gap-3 rounded-xl border border-slate-800 bg-[#0c1222] px-4 py-3 focus-within:border-violet-500 md:max-w-sm">
              <Search size={18} className="shrink-0 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search topics..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {["All", "In Progress", "Not Started", "Completed"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-4 py-2 text-sm transition ${
                  filter === item
                    ? "bg-violet-600 font-semibold text-white"
                    : "border border-slate-800 bg-[#0c1222] text-slate-400 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Topic cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTopics.map((topic) => {
              const progress = Math.round(
                (topic.solved / topic.total) * 100
              );

              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    window.location.href = `/problems/topic/${topic.id}`;
                  }}
                  className="group rounded-2xl border border-slate-800 bg-[#0c1222] p-5 text-left transition hover:-translate-y-0.5 hover:border-violet-500/50 hover:bg-[#10172a]"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
                      <Layers size={21} />
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-violet-400"
                    />
                  </div>

                  <h3 className="text-lg font-semibold">{topic.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {topic.category}
                  </p>

                  <div className="mt-6 mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="font-medium text-white">
                      {topic.solved}/{topic.total}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-violet-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      {topic.total - topic.solved} remaining
                    </span>
                    <span className="font-medium text-violet-400">
                      {progress}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredTopics.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-[#0c1222] px-4 py-12 text-center">
              <p className="font-semibold">No topics found</p>
              <p className="mt-2 text-sm text-slate-400">
                Try another search or change the filter.
              </p>
            </div>
          )}
        </section>

        
      </div>
    </main>
  );
}

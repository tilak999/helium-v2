"use client";

import * as React from "react";

// Status badge component for K8s resource statuses
export function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    Running: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Bound: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Available: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Ready: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Succeeded: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Complete: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Deployed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Suspended: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Failed: "bg-red-500/10 text-red-500 border-red-500/20",
    Error: "bg-red-500/10 text-red-500 border-red-500/20",
    CrashLoopBackOff: "bg-red-500/10 text-red-500 border-red-500/20",
    Terminating: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    Unknown: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };

  const style = statusStyles[status] || statusStyles["Unknown"];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border ${style}`}
    >
      <span
        className={`size-1.5 rounded-full ${
          style.includes("emerald")
            ? "bg-emerald-500"
            : style.includes("amber")
              ? "bg-amber-500"
              : style.includes("red")
                ? "bg-red-500"
                : "bg-zinc-400"
        }`}
      />
      {status}
    </span>
  );
}

import { useTitle } from "@/hooks/use-title";

// Resource page wrapper — compact layout: title sits inline with the toolbar
export function ResourcePage({
  title,
  description,
  count,
  children,
}: {
  title: string;
  description?: string;
  count?: number;
  children: React.ReactNode;
}) {
  const { setTitle, setDescription, setCount } = useTitle();

  React.useEffect(() => {
    setTitle(title);
    setDescription(description);
    setCount(count);

    return () => {
      setTitle("");
      setDescription(undefined);
      setCount(undefined);
    };
  }, [title, description, count, setTitle, setDescription, setCount]);

  return (
    <div className="flex flex-col gap-3 p-4 h-full overflow-hidden">
      <div className="flex-1 min-h-0 min-w-0">{children}</div>
    </div>
  );
}

// Age formatter
export function formatAge(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 0) return `${diffDays}d`;
  if (diffHours > 0) return `${diffHours}h`;
  if (diffMinutes > 0) return `${diffMinutes}m`;
  return "<1m";
}

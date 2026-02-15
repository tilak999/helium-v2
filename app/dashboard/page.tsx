"use client";

import * as React from "react";
import { useTitle } from "@/hooks/use-title";
import {
  ServerIcon,
  CpuIcon,
  MemoryStickIcon,
  HardDriveIcon,
  ContainerIcon,
  ActivityIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
} from "lucide-react";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  trend?: "up" | "down" | "neutral";
}) {
  return (
    <div className="bg-card border border-border/50 rounded-xl p-5 flex flex-col gap-3 hover:border-border transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          {title}
        </span>
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function StatusBadge({
  status,
  count,
}: {
  status: "healthy" | "warning" | "error";
  count: number;
}) {
  const colors = {
    healthy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    error: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${colors[status]}`}
    >
      <span
        className={`size-1.5 rounded-full ${
          status === "healthy"
            ? "bg-emerald-500"
            : status === "warning"
              ? "bg-amber-500"
              : "bg-red-500"
        }`}
      />
      {count}
    </span>
  );
}

export default function DashboardPage() {
  const { setTitle, setDescription } = useTitle();

  React.useEffect(() => {
    setTitle("Cluster Overview");
    setDescription("Monitor your Kubernetes cluster health and resources");

    return () => {
      setTitle("");
      setDescription(undefined);
    };
  }, [setTitle, setDescription]);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Nodes"
          value="12"
          subtitle="3 control plane, 9 worker"
          icon={ServerIcon}
        />
        <StatCard
          title="CPU Usage"
          value="67%"
          subtitle="48 / 72 cores allocated"
          icon={CpuIcon}
        />
        <StatCard
          title="Memory"
          value="54%"
          subtitle="172 / 320 GiB allocated"
          icon={MemoryStickIcon}
        />
        <StatCard
          title="Storage"
          value="38%"
          subtitle="1.2 / 3.2 TiB used"
          icon={HardDriveIcon}
        />
      </div>

      {/* Workload Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            Workload Status
          </h2>
          <div className="space-y-3">
            {[
              {
                name: "Deployments",
                healthy: 24,
                warning: 2,
                error: 1,
                total: 27,
              },
              {
                name: "StatefulSets",
                healthy: 8,
                warning: 0,
                error: 0,
                total: 8,
              },
              {
                name: "DaemonSets",
                healthy: 5,
                warning: 1,
                error: 0,
                total: 6,
              },
              {
                name: "Jobs",
                healthy: 12,
                warning: 0,
                error: 2,
                total: 14,
              },
              {
                name: "CronJobs",
                healthy: 6,
                warning: 0,
                error: 0,
                total: 6,
              },
            ].map((workload) => (
              <div
                key={workload.name}
                className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <ContainerIcon className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{workload.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {workload.healthy > 0 && (
                    <StatusBadge status="healthy" count={workload.healthy} />
                  )}
                  {workload.warning > 0 && (
                    <StatusBadge status="warning" count={workload.warning} />
                  )}
                  {workload.error > 0 && (
                    <StatusBadge status="error" count={workload.error} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-xl p-5">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            Recent Events
          </h2>
          <div className="space-y-3">
            {[
              {
                type: "warning" as const,
                message: "Pod nginx-deployment-abc123 exceeded memory limit",
                time: "2m ago",
                namespace: "production",
              },
              {
                type: "normal" as const,
                message: "Deployment api-server scaled to 3 replicas",
                time: "5m ago",
                namespace: "production",
              },
              {
                type: "warning" as const,
                message: "Node worker-04 disk pressure detected",
                time: "12m ago",
                namespace: "kube-system",
              },
              {
                type: "normal" as const,
                message: "ConfigMap app-config updated",
                time: "18m ago",
                namespace: "staging",
              },
              {
                type: "error" as const,
                message: "CrashLoopBackOff: redis-cache-0",
                time: "23m ago",
                namespace: "production",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2 border-b border-border/30 last:border-0"
              >
                {event.type === "warning" ? (
                  <AlertTriangleIcon className="size-4 text-amber-500 mt-0.5 shrink-0" />
                ) : event.type === "error" ? (
                  <AlertTriangleIcon className="size-4 text-red-500 mt-0.5 shrink-0" />
                ) : (
                  <CheckCircle2Icon className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{event.message}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">
                      {event.namespace}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">
                      {event.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Namespace Summary */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <h2 className="text-sm font-medium text-muted-foreground mb-4">
          Namespace Summary
        </h2>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
          {[
            { name: "production", pods: 45, status: "healthy" as const },
            { name: "staging", pods: 23, status: "healthy" as const },
            { name: "development", pods: 18, status: "warning" as const },
            { name: "kube-system", pods: 14, status: "healthy" as const },
            { name: "monitoring", pods: 8, status: "healthy" as const },
          ].map((ns) => (
            <div
              key={ns.name}
              className="flex items-center gap-3 rounded-lg border border-border/30 p-3 hover:border-border transition-colors"
            >
              <span
                className={`size-2 rounded-full shrink-0 ${
                  ns.status === "healthy" ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{ns.name}</p>
                <p className="text-xs text-muted-foreground">{ns.pods} pods</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

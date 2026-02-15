"use client";

import { DataTable, Column } from "@/components/data-table";
import { ResourcePage, formatAge } from "@/components/resource-page";

interface K8sEvent {
  type: string;
  reason: string;
  object: string;
  message: string;
  namespace: string;
  count: number;
  age: string;
  [key: string]: unknown;
}

const events: K8sEvent[] = [
  {
    type: "Warning",
    reason: "OOMKilling",
    object: "Pod/redis-cache-0",
    message: "Memory limit exceeded, container killed",
    namespace: "production",
    count: 42,
    age: "2025-02-14T12:30:00Z",
  },
  {
    type: "Normal",
    reason: "Scheduled",
    object: "Pod/frontend-app-uvw90",
    message: "Successfully assigned staging/frontend-app-uvw90 to worker-01",
    namespace: "staging",
    count: 1,
    age: "2025-02-14T12:00:00Z",
  },
  {
    type: "Normal",
    reason: "ScalingReplicaSet",
    object: "Deployment/api-server",
    message: "Scaled up replica set api-server-5d8f9c7b6 to 2",
    namespace: "production",
    count: 1,
    age: "2025-02-14T11:30:00Z",
  },
  {
    type: "Warning",
    reason: "NodeNotReady",
    object: "Node/worker-06",
    message: "Node worker-06 status is now: NodeNotReady",
    namespace: "kube-system",
    count: 3,
    age: "2025-02-14T11:00:00Z",
  },
  {
    type: "Normal",
    reason: "Pulled",
    object: "Pod/batch-job-runner-klm56",
    message: 'Container image "batch-runner:v2.1" already present',
    namespace: "development",
    count: 1,
    age: "2025-02-14T10:30:00Z",
  },
  {
    type: "Warning",
    reason: "FailedScheduling",
    object: "Pod/frontend-app-uvw90",
    message: "0/12 nodes are available: insufficient memory",
    namespace: "staging",
    count: 5,
    age: "2025-02-14T10:00:00Z",
  },
  {
    type: "Normal",
    reason: "Created",
    object: "Pod/metrics-server-7b9c8d6e5f-xyz",
    message: "Created container metrics-server",
    namespace: "monitoring",
    count: 1,
    age: "2025-02-14T09:00:00Z",
  },
  {
    type: "Normal",
    reason: "Started",
    object: "Pod/metrics-server-7b9c8d6e5f-xyz",
    message: "Started container metrics-server",
    namespace: "monitoring",
    count: 1,
    age: "2025-02-14T09:00:00Z",
  },
  {
    type: "Warning",
    reason: "BackOff",
    object: "Pod/redis-cache-0",
    message: "Back-off restarting failed container",
    namespace: "production",
    count: 42,
    age: "2025-02-14T08:00:00Z",
  },
  {
    type: "Normal",
    reason: "SuccessfulCreate",
    object: "Job/backup-daily-1707920400",
    message: "Created pod: backup-daily-1707920400-abc12",
    namespace: "production",
    count: 1,
    age: "2025-02-14T06:00:00Z",
  },
  {
    type: "Normal",
    reason: "Completed",
    object: "Job/backup-daily-1707920400",
    message: "Job completed",
    namespace: "production",
    count: 1,
    age: "2025-02-14T06:15:00Z",
  },
  {
    type: "Normal",
    reason: "LeaderElection",
    object: "ConfigMap/kube-scheduler",
    message: "control-plane-01 became leader",
    namespace: "kube-system",
    count: 1,
    age: "2025-02-13T00:00:00Z",
  },
  {
    type: "Warning",
    reason: "Unhealthy",
    object: "Pod/worker-processor-abc12",
    message: "Liveness probe failed: HTTP probe failed with status 503",
    namespace: "production",
    count: 8,
    age: "2025-02-13T18:00:00Z",
  },
  {
    type: "Normal",
    reason: "Killing",
    object: "Pod/worker-processor-abc12",
    message: "Stopping container worker",
    namespace: "production",
    count: 3,
    age: "2025-02-13T18:05:00Z",
  },
  {
    type: "Normal",
    reason: "ConfigMapUpdated",
    object: "ConfigMap/app-config",
    message: "ConfigMap app-config updated in namespace staging",
    namespace: "staging",
    count: 1,
    age: "2025-02-13T15:00:00Z",
  },
];

const columns: Column<K8sEvent>[] = [
  {
    key: "type",
    header: "Type",
    sortable: true,
    render: (e) => {
      const color =
        e.type === "Warning"
          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
          : "bg-blue-500/10 text-blue-400 border-blue-500/20";
      return (
        <span
          className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium border ${color}`}
        >
          {e.type}
        </span>
      );
    },
  },
  {
    key: "reason",
    header: "Reason",
    sortable: true,
    render: (e) => (
      <span className="font-medium text-foreground">{e.reason}</span>
    ),
  },
  {
    key: "object",
    header: "Object",
    sortable: true,
    render: (e) => (
      <span className="font-mono text-xs text-muted-foreground">
        {e.object}
      </span>
    ),
  },
  {
    key: "message",
    header: "Message",
    render: (e) => (
      <span className="text-sm text-muted-foreground max-w-md truncate block">
        {e.message}
      </span>
    ),
  },
  {
    key: "namespace",
    header: "Namespace",
    sortable: true,
    render: (e) => <span className="text-muted-foreground">{e.namespace}</span>,
  },
  { key: "count", header: "Count", sortable: true },
  {
    key: "age",
    header: "Age",
    sortable: true,
    render: (e) => (
      <span className="text-muted-foreground">{formatAge(e.age)}</span>
    ),
  },
];

export default function EventsPage() {
  return (
    <ResourcePage
      title="Events"
      description="View cluster events across all namespaces"
      count={events.length}
    >
      <DataTable
        columns={columns}
        data={events}
        searchKey="reason"
        searchPlaceholder="Search events..."
        pageSize={15}
        onRefresh={() => {}}
      />
    </ResourcePage>
  );
}

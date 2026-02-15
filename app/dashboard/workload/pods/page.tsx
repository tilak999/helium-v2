"use client";

import { DataTable, Column } from "@/components/data-table";
import {
  ResourcePage,
  StatusBadge,
  formatAge,
} from "@/components/resource-page";

interface Pod {
  name: string;
  namespace: string;
  status: string;
  ready: string;
  restarts: number;
  node: string;
  ip: string;
  age: string;
  [key: string]: unknown;
}

const pods: Pod[] = [
  {
    name: "nginx-deployment-7fb96c846b-4xmpl",
    namespace: "production",
    status: "Running",
    ready: "1/1",
    restarts: 0,
    node: "worker-01",
    ip: "10.244.1.12",
    age: "2025-02-14T10:00:00Z",
  },
  {
    name: "nginx-deployment-7fb96c846b-9klmn",
    namespace: "production",
    status: "Running",
    ready: "1/1",
    restarts: 0,
    node: "worker-02",
    ip: "10.244.2.8",
    age: "2025-02-14T10:00:00Z",
  },
  {
    name: "api-server-5d8f9c7b6-abc12",
    namespace: "production",
    status: "Running",
    ready: "2/2",
    restarts: 1,
    node: "worker-01",
    ip: "10.244.1.15",
    age: "2025-02-13T08:30:00Z",
  },
  {
    name: "api-server-5d8f9c7b6-def34",
    namespace: "production",
    status: "Running",
    ready: "2/2",
    restarts: 0,
    node: "worker-03",
    ip: "10.244.3.22",
    age: "2025-02-13T08:30:00Z",
  },
  {
    name: "redis-cache-0",
    namespace: "production",
    status: "CrashLoopBackOff",
    ready: "0/1",
    restarts: 42,
    node: "worker-02",
    ip: "10.244.2.19",
    age: "2025-02-10T14:00:00Z",
  },
  {
    name: "postgres-primary-0",
    namespace: "production",
    status: "Running",
    ready: "1/1",
    restarts: 0,
    node: "worker-01",
    ip: "10.244.1.30",
    age: "2025-01-20T06:00:00Z",
  },
  {
    name: "postgres-replica-0",
    namespace: "production",
    status: "Running",
    ready: "1/1",
    restarts: 0,
    node: "worker-03",
    ip: "10.244.3.31",
    age: "2025-01-20T06:00:00Z",
  },
  {
    name: "worker-processor-abc12",
    namespace: "production",
    status: "Running",
    ready: "1/1",
    restarts: 3,
    node: "worker-02",
    ip: "10.244.2.44",
    age: "2025-02-12T15:00:00Z",
  },
  {
    name: "frontend-app-xyz78",
    namespace: "staging",
    status: "Running",
    ready: "1/1",
    restarts: 0,
    node: "worker-01",
    ip: "10.244.1.50",
    age: "2025-02-14T09:00:00Z",
  },
  {
    name: "frontend-app-uvw90",
    namespace: "staging",
    status: "Pending",
    ready: "0/1",
    restarts: 0,
    node: "",
    ip: "",
    age: "2025-02-14T12:00:00Z",
  },
  {
    name: "batch-job-runner-klm56",
    namespace: "development",
    status: "Running",
    ready: "1/1",
    restarts: 0,
    node: "worker-03",
    ip: "10.244.3.60",
    age: "2025-02-14T11:30:00Z",
  },
  {
    name: "monitoring-agent-nop78",
    namespace: "kube-system",
    status: "Running",
    ready: "1/1",
    restarts: 0,
    node: "worker-01",
    ip: "10.244.1.5",
    age: "2025-01-15T00:00:00Z",
  },
  {
    name: "monitoring-agent-qrs90",
    namespace: "kube-system",
    status: "Running",
    ready: "1/1",
    restarts: 0,
    node: "worker-02",
    ip: "10.244.2.5",
    age: "2025-01-15T00:00:00Z",
  },
  {
    name: "coredns-5d78c9869d-abc12",
    namespace: "kube-system",
    status: "Running",
    ready: "1/1",
    restarts: 0,
    node: "control-plane-01",
    ip: "10.244.0.3",
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "metrics-server-7b9c8d6e5f-xyz",
    namespace: "monitoring",
    status: "Running",
    ready: "1/1",
    restarts: 2,
    node: "worker-01",
    ip: "10.244.1.70",
    age: "2025-02-01T00:00:00Z",
  },
];

const columns: Column<Pod>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (pod) => (
      <span className="font-medium text-foreground">{pod.name}</span>
    ),
  },
  {
    key: "namespace",
    header: "Namespace",
    sortable: true,
    render: (pod) => (
      <span className="text-muted-foreground">{pod.namespace}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (pod) => <StatusBadge status={pod.status} />,
  },
  { key: "ready", header: "Ready" },
  {
    key: "restarts",
    header: "Restarts",
    sortable: true,
    render: (pod) => (
      <span className={pod.restarts > 10 ? "text-red-500 font-medium" : ""}>
        {pod.restarts}
      </span>
    ),
  },
  {
    key: "node",
    header: "Node",
    sortable: true,
    render: (pod) => (
      <span className="text-muted-foreground">{pod.node || "—"}</span>
    ),
  },
  {
    key: "ip",
    header: "IP",
    render: (pod) => (
      <span className="font-mono text-xs text-muted-foreground">
        {pod.ip || "—"}
      </span>
    ),
  },
  {
    key: "age",
    header: "Age",
    sortable: true,
    render: (pod) => (
      <span className="text-muted-foreground">{formatAge(pod.age)}</span>
    ),
  },
];

export default function PodsPage() {
  return (
    <ResourcePage
      title="Pods"
      description="View and manage pods across all namespaces"
      count={pods.length}
    >
      <DataTable
        columns={columns}
        data={pods}
        searchKey="name"
        searchPlaceholder="Search pods..."
        onRefresh={() => {}}
      />
    </ResourcePage>
  );
}

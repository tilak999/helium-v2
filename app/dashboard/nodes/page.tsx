"use client";

import { DataTable, Column } from "@/components/data-table";
import {
  ResourcePage,
  StatusBadge,
  formatAge,
} from "@/components/resource-page";

interface Node {
  name: string;
  status: string;
  roles: string;
  version: string;
  cpu: string;
  memory: string;
  pods: number;
  os: string;
  age: string;
  [key: string]: unknown;
}

const nodes: Node[] = [
  {
    name: "control-plane-01",
    status: "Ready",
    roles: "control-plane",
    version: "v1.29.2",
    cpu: "4/8 cores",
    memory: "12/16 GiB",
    pods: 14,
    os: "Ubuntu 22.04",
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "control-plane-02",
    status: "Ready",
    roles: "control-plane",
    version: "v1.29.2",
    cpu: "3/8 cores",
    memory: "10/16 GiB",
    pods: 12,
    os: "Ubuntu 22.04",
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "control-plane-03",
    status: "Ready",
    roles: "control-plane",
    version: "v1.29.2",
    cpu: "3/8 cores",
    memory: "11/16 GiB",
    pods: 13,
    os: "Ubuntu 22.04",
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "worker-01",
    status: "Ready",
    roles: "worker",
    version: "v1.29.2",
    cpu: "6/8 cores",
    memory: "28/32 GiB",
    pods: 22,
    os: "Ubuntu 22.04",
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "worker-02",
    status: "Ready",
    roles: "worker",
    version: "v1.29.2",
    cpu: "5/8 cores",
    memory: "24/32 GiB",
    pods: 18,
    os: "Ubuntu 22.04",
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "worker-03",
    status: "Ready",
    roles: "worker",
    version: "v1.29.2",
    cpu: "7/8 cores",
    memory: "30/32 GiB",
    pods: 25,
    os: "Ubuntu 22.04",
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "worker-04",
    status: "Ready",
    roles: "worker",
    version: "v1.29.2",
    cpu: "4/8 cores",
    memory: "20/32 GiB",
    pods: 15,
    os: "Ubuntu 22.04",
    age: "2025-01-15T00:00:00Z",
  },
  {
    name: "worker-05",
    status: "Ready",
    roles: "worker",
    version: "v1.29.2",
    cpu: "6/8 cores",
    memory: "26/32 GiB",
    pods: 20,
    os: "Ubuntu 22.04",
    age: "2025-01-15T00:00:00Z",
  },
  {
    name: "worker-06",
    status: "Warning",
    roles: "worker",
    version: "v1.29.2",
    cpu: "7/8 cores",
    memory: "31/32 GiB",
    pods: 28,
    os: "Ubuntu 22.04",
    age: "2025-01-20T00:00:00Z",
  },
  {
    name: "worker-07",
    status: "Ready",
    roles: "worker",
    version: "v1.29.2",
    cpu: "3/8 cores",
    memory: "18/32 GiB",
    pods: 12,
    os: "Ubuntu 22.04",
    age: "2025-01-20T00:00:00Z",
  },
  {
    name: "worker-08",
    status: "Ready",
    roles: "worker",
    version: "v1.29.2",
    cpu: "5/8 cores",
    memory: "22/32 GiB",
    pods: 16,
    os: "Ubuntu 22.04",
    age: "2025-02-01T00:00:00Z",
  },
  {
    name: "worker-09",
    status: "Ready",
    roles: "worker",
    version: "v1.29.2",
    cpu: "4/8 cores",
    memory: "19/32 GiB",
    pods: 14,
    os: "Ubuntu 22.04",
    age: "2025-02-01T00:00:00Z",
  },
];

const columns: Column<Node>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (n) => (
      <span className="font-medium text-foreground">{n.name}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (n) => <StatusBadge status={n.status} />,
  },
  {
    key: "roles",
    header: "Roles",
    sortable: true,
    render: (n) => {
      const color =
        n.roles === "control-plane"
          ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
          : "bg-blue-500/10 text-blue-400 border-blue-500/20";
      return (
        <span
          className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium border ${color}`}
        >
          {n.roles}
        </span>
      );
    },
  },
  {
    key: "version",
    header: "Version",
    render: (n) => (
      <span className="font-mono text-xs text-muted-foreground">
        {n.version}
      </span>
    ),
  },
  { key: "cpu", header: "CPU" },
  { key: "memory", header: "Memory" },
  { key: "pods", header: "Pods", sortable: true },
  {
    key: "age",
    header: "Age",
    sortable: true,
    render: (n) => (
      <span className="text-muted-foreground">{formatAge(n.age)}</span>
    ),
  },
];

export default function NodesPage() {
  return (
    <ResourcePage
      title="Nodes"
      description="View cluster node status and resource allocation"
      count={nodes.length}
    >
      <DataTable
        columns={columns}
        data={nodes}
        searchKey="name"
        searchPlaceholder="Search nodes..."
        onRefresh={() => {}}
      />
    </ResourcePage>
  );
}

"use client";

import { DataTable, Column } from "@/components/data-table";
import {
  ResourcePage,
  StatusBadge,
  formatAge,
} from "@/components/resource-page";

interface Namespace {
  name: string;
  status: string;
  labels: string;
  age: string;
  [key: string]: unknown;
}

const namespaces: Namespace[] = [
  {
    name: "default",
    status: "Active",
    labels: "kubernetes.io/metadata.name=default",
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "kube-system",
    status: "Active",
    labels: "kubernetes.io/metadata.name=kube-system",
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "kube-public",
    status: "Active",
    labels: "kubernetes.io/metadata.name=kube-public",
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "kube-node-lease",
    status: "Active",
    labels: "kubernetes.io/metadata.name=kube-node-lease",
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "production",
    status: "Active",
    labels: "env=production, team=platform",
    age: "2025-01-12T00:00:00Z",
  },
  {
    name: "staging",
    status: "Active",
    labels: "env=staging, team=platform",
    age: "2025-01-12T00:00:00Z",
  },
  {
    name: "development",
    status: "Active",
    labels: "env=development, team=platform",
    age: "2025-01-12T00:00:00Z",
  },
  {
    name: "monitoring",
    status: "Active",
    labels: "app=monitoring, team=sre",
    age: "2025-01-15T00:00:00Z",
  },
  {
    name: "ingress-nginx",
    status: "Active",
    labels: "app.kubernetes.io/name=ingress-nginx",
    age: "2025-01-15T00:00:00Z",
  },
  {
    name: "cert-manager",
    status: "Active",
    labels: "app.kubernetes.io/name=cert-manager",
    age: "2025-01-15T00:00:00Z",
  },
];

const columns: Column<Namespace>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (ns) => (
      <span className="font-medium text-foreground">{ns.name}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (ns) => <StatusBadge status={ns.status} />,
  },
  {
    key: "labels",
    header: "Labels",
    render: (ns) => (
      <div className="flex flex-wrap gap-1">
        {ns.labels.split(", ").map((label) => (
          <span
            key={label}
            className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground"
          >
            {label}
          </span>
        ))}
      </div>
    ),
  },
  {
    key: "age",
    header: "Age",
    sortable: true,
    render: (ns) => (
      <span className="text-muted-foreground">{formatAge(ns.age)}</span>
    ),
  },
];

export default function NamespacesPage() {
  return (
    <ResourcePage
      title="Namespaces"
      description="View and manage cluster namespaces"
      count={namespaces.length}
    >
      <DataTable
        columns={columns}
        data={namespaces}
        searchKey="name"
        searchPlaceholder="Search namespaces..."
        onRefresh={() => {}}
      />
    </ResourcePage>
  );
}

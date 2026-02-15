"use client";

import { DataTable, Column } from "@/components/data-table";
import {
  ResourcePage,
  StatusBadge,
  formatAge,
} from "@/components/resource-page";

interface Deployment {
  name: string;
  namespace: string;
  ready: string;
  upToDate: number;
  available: number;
  status: string;
  age: string;
  [key: string]: unknown;
}

const deployments: Deployment[] = [
  {
    name: "nginx-deployment",
    namespace: "production",
    ready: "3/3",
    upToDate: 3,
    available: 3,
    status: "Available",
    age: "2025-02-10T10:00:00Z",
  },
  {
    name: "api-server",
    namespace: "production",
    ready: "2/2",
    upToDate: 2,
    available: 2,
    status: "Available",
    age: "2025-02-08T08:00:00Z",
  },
  {
    name: "worker-processor",
    namespace: "production",
    ready: "1/1",
    upToDate: 1,
    available: 1,
    status: "Available",
    age: "2025-02-05T14:00:00Z",
  },
  {
    name: "frontend-app",
    namespace: "staging",
    ready: "1/2",
    upToDate: 2,
    available: 1,
    status: "Pending",
    age: "2025-02-14T09:00:00Z",
  },
  {
    name: "batch-processor",
    namespace: "development",
    ready: "1/1",
    upToDate: 1,
    available: 1,
    status: "Available",
    age: "2025-02-12T11:00:00Z",
  },
  {
    name: "auth-service",
    namespace: "production",
    ready: "2/2",
    upToDate: 2,
    available: 2,
    status: "Available",
    age: "2025-01-28T06:00:00Z",
  },
  {
    name: "notification-service",
    namespace: "production",
    ready: "1/1",
    upToDate: 1,
    available: 1,
    status: "Available",
    age: "2025-02-01T12:00:00Z",
  },
  {
    name: "gateway",
    namespace: "production",
    ready: "3/3",
    upToDate: 3,
    available: 3,
    status: "Available",
    age: "2025-01-20T00:00:00Z",
  },
  {
    name: "cronjob-runner",
    namespace: "staging",
    ready: "0/1",
    upToDate: 1,
    available: 0,
    status: "Failed",
    age: "2025-02-13T15:00:00Z",
  },
  {
    name: "metrics-collector",
    namespace: "monitoring",
    ready: "1/1",
    upToDate: 1,
    available: 1,
    status: "Available",
    age: "2025-02-01T00:00:00Z",
  },
  {
    name: "log-aggregator",
    namespace: "monitoring",
    ready: "2/2",
    upToDate: 2,
    available: 2,
    status: "Available",
    age: "2025-01-25T00:00:00Z",
  },
  {
    name: "dashboard",
    namespace: "monitoring",
    ready: "1/1",
    upToDate: 1,
    available: 1,
    status: "Available",
    age: "2025-02-03T10:00:00Z",
  },
];

const columns: Column<Deployment>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (d) => (
      <span className="font-medium text-foreground">{d.name}</span>
    ),
  },
  {
    key: "namespace",
    header: "Namespace",
    sortable: true,
    render: (d) => <span className="text-muted-foreground">{d.namespace}</span>,
  },
  { key: "ready", header: "Ready" },
  { key: "upToDate", header: "Up-to-date", sortable: true },
  { key: "available", header: "Available", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (d) => <StatusBadge status={d.status} />,
  },
  {
    key: "age",
    header: "Age",
    sortable: true,
    render: (d) => (
      <span className="text-muted-foreground">{formatAge(d.age)}</span>
    ),
  },
];

export default function DeploymentsPage() {
  return (
    <ResourcePage
      title="Deployments"
      description="Manage deployment resources across namespaces"
      count={deployments.length}
    >
      <DataTable
        columns={columns}
        data={deployments}
        searchKey="name"
        searchPlaceholder="Search deployments..."
        onRefresh={() => {}}
      />
    </ResourcePage>
  );
}

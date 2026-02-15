"use client";

import { DataTable, Column } from "@/components/data-table";
import {
  ResourcePage,
  StatusBadge,
  formatAge,
} from "@/components/resource-page";

interface HelmRelease {
  name: string;
  namespace: string;
  revision: number;
  status: string;
  chart: string;
  appVersion: string;
  updated: string;
  [key: string]: unknown;
}

const releases: HelmRelease[] = [
  {
    name: "nginx-ingress",
    namespace: "ingress-nginx",
    revision: 3,
    status: "Deployed",
    chart: "ingress-nginx-4.9.1",
    appVersion: "1.9.6",
    updated: "2025-02-10T10:00:00Z",
  },
  {
    name: "prometheus-stack",
    namespace: "monitoring",
    revision: 5,
    status: "Deployed",
    chart: "kube-prometheus-stack-56.6.2",
    appVersion: "v0.71.2",
    updated: "2025-02-08T08:00:00Z",
  },
  {
    name: "cert-manager",
    namespace: "cert-manager",
    revision: 2,
    status: "Deployed",
    chart: "cert-manager-v1.14.3",
    appVersion: "v1.14.3",
    updated: "2025-02-01T00:00:00Z",
  },
  {
    name: "redis",
    namespace: "production",
    revision: 1,
    status: "Deployed",
    chart: "redis-18.12.1",
    appVersion: "7.2.4",
    updated: "2025-01-20T06:00:00Z",
  },
  {
    name: "postgresql",
    namespace: "production",
    revision: 4,
    status: "Deployed",
    chart: "postgresql-14.3.1",
    appVersion: "16.2.0",
    updated: "2025-01-20T06:00:00Z",
  },
  {
    name: "grafana",
    namespace: "monitoring",
    revision: 2,
    status: "Deployed",
    chart: "grafana-7.3.3",
    appVersion: "10.3.1",
    updated: "2025-02-01T00:00:00Z",
  },
  {
    name: "external-dns",
    namespace: "kube-system",
    revision: 1,
    status: "Deployed",
    chart: "external-dns-1.14.3",
    appVersion: "0.14.0",
    updated: "2025-01-15T00:00:00Z",
  },
  {
    name: "test-release",
    namespace: "staging",
    revision: 1,
    status: "Failed",
    chart: "my-app-0.1.0",
    appVersion: "1.0.0",
    updated: "2025-02-13T15:00:00Z",
  },
];

const columns: Column<HelmRelease>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (r) => (
      <span className="font-medium text-foreground">{r.name}</span>
    ),
  },
  {
    key: "namespace",
    header: "Namespace",
    sortable: true,
    render: (r) => <span className="text-muted-foreground">{r.namespace}</span>,
  },
  { key: "revision", header: "Revision", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (r) => <StatusBadge status={r.status} />,
  },
  {
    key: "chart",
    header: "Chart",
    render: (r) => (
      <span className="font-mono text-xs text-muted-foreground">{r.chart}</span>
    ),
  },
  {
    key: "appVersion",
    header: "App Version",
    render: (r) => <span className="font-mono text-xs">{r.appVersion}</span>,
  },
  {
    key: "updated",
    header: "Updated",
    sortable: true,
    render: (r) => (
      <span className="text-muted-foreground">{formatAge(r.updated)}</span>
    ),
  },
];

export default function HelmReleasesPage() {
  return (
    <ResourcePage
      title="Helm Releases"
      description="View and manage Helm releases across the cluster"
      count={releases.length}
    >
      <DataTable
        columns={columns}
        data={releases}
        searchKey="name"
        searchPlaceholder="Search releases..."
        onRefresh={() => {}}
      />
    </ResourcePage>
  );
}

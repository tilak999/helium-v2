"use client";

import { DataTable, Column } from "@/components/data-table";
import { ResourcePage, formatAge } from "@/components/resource-page";

interface ConfigMap {
  name: string;
  namespace: string;
  data: number;
  age: string;
  [key: string]: unknown;
}

const configMaps: ConfigMap[] = [
  {
    name: "app-config",
    namespace: "production",
    data: 5,
    age: "2025-02-10T10:00:00Z",
  },
  {
    name: "nginx-config",
    namespace: "production",
    data: 2,
    age: "2025-02-10T10:00:00Z",
  },
  {
    name: "app-config",
    namespace: "staging",
    data: 5,
    age: "2025-02-12T09:00:00Z",
  },
  {
    name: "feature-flags",
    namespace: "production",
    data: 12,
    age: "2025-02-08T14:00:00Z",
  },
  {
    name: "feature-flags",
    namespace: "staging",
    data: 12,
    age: "2025-02-08T14:00:00Z",
  },
  {
    name: "coredns",
    namespace: "kube-system",
    data: 1,
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "kube-proxy",
    namespace: "kube-system",
    data: 2,
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "kubeadm-config",
    namespace: "kube-system",
    data: 2,
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "grafana-dashboards",
    namespace: "monitoring",
    data: 8,
    age: "2025-02-01T00:00:00Z",
  },
  {
    name: "prometheus-rules",
    namespace: "monitoring",
    data: 15,
    age: "2025-02-01T00:00:00Z",
  },
  {
    name: "alertmanager-config",
    namespace: "monitoring",
    data: 3,
    age: "2025-02-01T00:00:00Z",
  },
  {
    name: "db-init-scripts",
    namespace: "production",
    data: 4,
    age: "2025-01-20T06:00:00Z",
  },
];

const columns: Column<ConfigMap>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (cm) => (
      <span className="font-medium text-foreground">{cm.name}</span>
    ),
  },
  {
    key: "namespace",
    header: "Namespace",
    sortable: true,
    render: (cm) => (
      <span className="text-muted-foreground">{cm.namespace}</span>
    ),
  },
  {
    key: "data",
    header: "Data",
    sortable: true,
    render: (cm) => <span>{cm.data} keys</span>,
  },
  {
    key: "age",
    header: "Age",
    sortable: true,
    render: (cm) => (
      <span className="text-muted-foreground">{formatAge(cm.age)}</span>
    ),
  },
];

export default function ConfigMapsPage() {
  return (
    <ResourcePage
      title="Config Maps"
      description="View and manage ConfigMap resources"
      count={configMaps.length}
    >
      <DataTable
        columns={columns}
        data={configMaps}
        searchKey="name"
        searchPlaceholder="Search config maps..."
        onRefresh={() => {}}
      />
    </ResourcePage>
  );
}

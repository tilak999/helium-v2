"use client";

import { DataTable, Column } from "@/components/data-table";
import { ResourcePage, formatAge } from "@/components/resource-page";

interface Secret {
  name: string;
  namespace: string;
  type: string;
  data: number;
  age: string;
  [key: string]: unknown;
}

const secrets: Secret[] = [
  {
    name: "default-token-abc12",
    namespace: "default",
    type: "kubernetes.io/service-account-token",
    data: 3,
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "tls-production",
    namespace: "production",
    type: "kubernetes.io/tls",
    data: 2,
    age: "2025-01-20T00:00:00Z",
  },
  {
    name: "db-credentials",
    namespace: "production",
    type: "Opaque",
    data: 4,
    age: "2025-01-20T06:00:00Z",
  },
  {
    name: "redis-credentials",
    namespace: "production",
    type: "Opaque",
    data: 2,
    age: "2025-01-20T06:00:00Z",
  },
  {
    name: "api-keys",
    namespace: "production",
    type: "Opaque",
    data: 6,
    age: "2025-02-01T00:00:00Z",
  },
  {
    name: "docker-registry",
    namespace: "production",
    type: "kubernetes.io/dockerconfigjson",
    data: 1,
    age: "2025-01-12T00:00:00Z",
  },
  {
    name: "tls-staging",
    namespace: "staging",
    type: "kubernetes.io/tls",
    data: 2,
    age: "2025-01-20T00:00:00Z",
  },
  {
    name: "db-credentials",
    namespace: "staging",
    type: "Opaque",
    data: 4,
    age: "2025-01-20T06:00:00Z",
  },
  {
    name: "grafana-admin",
    namespace: "monitoring",
    type: "Opaque",
    data: 2,
    age: "2025-02-01T00:00:00Z",
  },
  {
    name: "prometheus-etcd-certs",
    namespace: "monitoring",
    type: "Opaque",
    data: 3,
    age: "2025-02-01T00:00:00Z",
  },
];

const columns: Column<Secret>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (s) => (
      <span className="font-medium text-foreground">{s.name}</span>
    ),
  },
  {
    key: "namespace",
    header: "Namespace",
    sortable: true,
    render: (s) => <span className="text-muted-foreground">{s.namespace}</span>,
  },
  {
    key: "type",
    header: "Type",
    sortable: true,
    render: (s) => (
      <span className="font-mono text-xs text-muted-foreground">{s.type}</span>
    ),
  },
  {
    key: "data",
    header: "Data",
    sortable: true,
    render: (s) => <span>{s.data} keys</span>,
  },
  {
    key: "age",
    header: "Age",
    sortable: true,
    render: (s) => (
      <span className="text-muted-foreground">{formatAge(s.age)}</span>
    ),
  },
];

export default function SecretsPage() {
  return (
    <ResourcePage
      title="Secrets"
      description="View and manage Secret resources"
      count={secrets.length}
    >
      <DataTable
        columns={columns}
        data={secrets}
        searchKey="name"
        searchPlaceholder="Search secrets..."
        onRefresh={() => {}}
      />
    </ResourcePage>
  );
}

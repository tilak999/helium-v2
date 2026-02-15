"use client";

import { DataTable, Column } from "@/components/data-table";
import { ResourcePage, formatAge } from "@/components/resource-page";

interface Service {
  name: string;
  namespace: string;
  type: string;
  clusterIP: string;
  externalIP: string;
  ports: string;
  age: string;
  [key: string]: unknown;
}

const services: Service[] = [
  {
    name: "kubernetes",
    namespace: "default",
    type: "ClusterIP",
    clusterIP: "10.96.0.1",
    externalIP: "—",
    ports: "443/TCP",
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "nginx-service",
    namespace: "production",
    type: "LoadBalancer",
    clusterIP: "10.96.12.45",
    externalIP: "203.0.113.10",
    ports: "80/TCP, 443/TCP",
    age: "2025-02-10T10:00:00Z",
  },
  {
    name: "api-service",
    namespace: "production",
    type: "ClusterIP",
    clusterIP: "10.96.15.20",
    externalIP: "—",
    ports: "8080/TCP",
    age: "2025-02-08T08:00:00Z",
  },
  {
    name: "postgres-service",
    namespace: "production",
    type: "ClusterIP",
    clusterIP: "10.96.20.10",
    externalIP: "—",
    ports: "5432/TCP",
    age: "2025-01-20T06:00:00Z",
  },
  {
    name: "redis-service",
    namespace: "production",
    type: "ClusterIP",
    clusterIP: "10.96.20.15",
    externalIP: "—",
    ports: "6379/TCP",
    age: "2025-01-20T06:00:00Z",
  },
  {
    name: "frontend-service",
    namespace: "staging",
    type: "NodePort",
    clusterIP: "10.96.30.5",
    externalIP: "—",
    ports: "3000:30080/TCP",
    age: "2025-02-14T09:00:00Z",
  },
  {
    name: "kube-dns",
    namespace: "kube-system",
    type: "ClusterIP",
    clusterIP: "10.96.0.10",
    externalIP: "—",
    ports: "53/UDP, 53/TCP, 9153/TCP",
    age: "2025-01-10T00:00:00Z",
  },
  {
    name: "metrics-server",
    namespace: "kube-system",
    type: "ClusterIP",
    clusterIP: "10.96.0.22",
    externalIP: "—",
    ports: "443/TCP",
    age: "2025-01-15T00:00:00Z",
  },
  {
    name: "prometheus",
    namespace: "monitoring",
    type: "ClusterIP",
    clusterIP: "10.96.40.10",
    externalIP: "—",
    ports: "9090/TCP",
    age: "2025-02-01T00:00:00Z",
  },
  {
    name: "grafana",
    namespace: "monitoring",
    type: "LoadBalancer",
    clusterIP: "10.96.40.20",
    externalIP: "203.0.113.20",
    ports: "3000/TCP",
    age: "2025-02-01T00:00:00Z",
  },
];

const columns: Column<Service>[] = [
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
    render: (s) => {
      const colors: Record<string, string> = {
        ClusterIP: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        NodePort: "bg-violet-500/10 text-violet-400 border-violet-500/20",
        LoadBalancer: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        ExternalName: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      };
      return (
        <span
          className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium border ${colors[s.type] || ""}`}
        >
          {s.type}
        </span>
      );
    },
  },
  {
    key: "clusterIP",
    header: "Cluster IP",
    render: (s) => (
      <span className="font-mono text-xs text-muted-foreground">
        {s.clusterIP}
      </span>
    ),
  },
  {
    key: "externalIP",
    header: "External IP",
    render: (s) => (
      <span className="font-mono text-xs text-muted-foreground">
        {s.externalIP}
      </span>
    ),
  },
  {
    key: "ports",
    header: "Ports",
    render: (s) => (
      <span className="text-xs text-muted-foreground">{s.ports}</span>
    ),
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

export default function ServicesPage() {
  return (
    <ResourcePage
      title="Services"
      description="Manage service resources for network access"
      count={services.length}
    >
      <DataTable
        columns={columns}
        data={services}
        searchKey="name"
        searchPlaceholder="Search services..."
        onRefresh={() => {}}
      />
    </ResourcePage>
  );
}

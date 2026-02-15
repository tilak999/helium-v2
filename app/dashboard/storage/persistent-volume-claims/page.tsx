"use client";

import { DataTable, Column } from "@/components/data-table";
import {
  ResourcePage,
  StatusBadge,
  formatAge,
} from "@/components/resource-page";

interface PVC {
  name: string;
  namespace: string;
  status: string;
  volume: string;
  capacity: string;
  accessModes: string;
  storageClass: string;
  age: string;
  [key: string]: unknown;
}

const pvcs: PVC[] = [
  {
    name: "postgres-data-0",
    namespace: "production",
    status: "Bound",
    volume: "pvc-abc12345",
    capacity: "100Gi",
    accessModes: "RWO",
    storageClass: "gp3",
    age: "2025-01-20T06:00:00Z",
  },
  {
    name: "postgres-data-1",
    namespace: "production",
    status: "Bound",
    volume: "pvc-def67890",
    capacity: "100Gi",
    accessModes: "RWO",
    storageClass: "gp3",
    age: "2025-01-20T06:00:00Z",
  },
  {
    name: "redis-data-0",
    namespace: "production",
    status: "Bound",
    volume: "pvc-ghi11111",
    capacity: "20Gi",
    accessModes: "RWO",
    storageClass: "gp3",
    age: "2025-01-20T06:00:00Z",
  },
  {
    name: "prometheus-data",
    namespace: "monitoring",
    status: "Bound",
    volume: "pvc-jkl22222",
    capacity: "200Gi",
    accessModes: "RWO",
    storageClass: "gp3",
    age: "2025-02-01T00:00:00Z",
  },
  {
    name: "grafana-data",
    namespace: "monitoring",
    status: "Bound",
    volume: "pvc-mno33333",
    capacity: "10Gi",
    accessModes: "RWO",
    storageClass: "gp3",
    age: "2025-02-01T00:00:00Z",
  },
  {
    name: "logs-data",
    namespace: "monitoring",
    status: "Bound",
    volume: "pvc-pqr44444",
    capacity: "500Gi",
    accessModes: "RWO",
    storageClass: "gp3-throughput",
    age: "2025-01-15T00:00:00Z",
  },
  {
    name: "app-uploads",
    namespace: "production",
    status: "Bound",
    volume: "pvc-stu55555",
    capacity: "50Gi",
    accessModes: "RWX",
    storageClass: "efs",
    age: "2025-02-05T00:00:00Z",
  },
  {
    name: "test-data",
    namespace: "staging",
    status: "Pending",
    volume: "—",
    capacity: "10Gi",
    accessModes: "RWO",
    storageClass: "gp3",
    age: "2025-02-14T12:00:00Z",
  },
];

const columns: Column<PVC>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (p) => (
      <span className="font-medium text-foreground">{p.name}</span>
    ),
  },
  {
    key: "namespace",
    header: "Namespace",
    sortable: true,
    render: (p) => <span className="text-muted-foreground">{p.namespace}</span>,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (p) => <StatusBadge status={p.status} />,
  },
  {
    key: "volume",
    header: "Volume",
    render: (p) => (
      <span className="font-mono text-xs text-muted-foreground">
        {p.volume}
      </span>
    ),
  },
  { key: "capacity", header: "Capacity", sortable: true },
  { key: "accessModes", header: "Access Modes" },
  {
    key: "storageClass",
    header: "Storage Class",
    sortable: true,
    render: (p) => (
      <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-medium border bg-muted/50 text-muted-foreground">
        {p.storageClass}
      </span>
    ),
  },
  {
    key: "age",
    header: "Age",
    sortable: true,
    render: (p) => (
      <span className="text-muted-foreground">{formatAge(p.age)}</span>
    ),
  },
];

export default function PVCPage() {
  return (
    <ResourcePage
      title="Persistent Volume Claims"
      description="Manage persistent volume claims across namespaces"
      count={pvcs.length}
    >
      <DataTable
        columns={columns}
        data={pvcs}
        searchKey="name"
        searchPlaceholder="Search PVCs..."
        onRefresh={() => {}}
      />
    </ResourcePage>
  );
}

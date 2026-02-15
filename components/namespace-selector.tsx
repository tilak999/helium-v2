"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTitle } from "@/hooks/use-title";
import { LayersIcon } from "lucide-react";

const namespaces = [
  { value: "All Namespaces", label: "All Namespaces" },
  { value: "default", label: "default" },
  { value: "kube-system", label: "kube-system" },
  { value: "production", label: "production" },
  { value: "staging", label: "staging" },
  { value: "development", label: "development" },
  { value: "monitoring", label: "monitoring" },
];

export function NamespaceSelector() {
  const { namespace, setNamespace } = useTitle();

  return (
    <Select value={namespace} onValueChange={(val) => val && setNamespace(val)}>
      <SelectTrigger
        size="sm"
        className="w-[180px] h-8 bg-muted/40 border-border/40 hover:bg-muted/60 hover:border-border transition-all font-medium"
      >
        <div className="flex items-center gap-2 truncate">
          <LayersIcon className="size-3.5 text-muted-foreground shrink-0" />
          <SelectValue placeholder="Namespace" />
        </div>
      </SelectTrigger>
      <SelectContent align="start" className="px-2 py-1">
        {namespaces.map((ns) => (
          <SelectItem key={ns.value} value={ns.value}>
            {ns.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

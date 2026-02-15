"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  TerminalSquareIcon,
  BotIcon,
  Settings2Icon,
  LifeBuoyIcon,
  SendIcon,
  TerminalIcon,
  SettingsIcon,
  NetworkIcon,
  DatabaseIcon,
  LayersIcon,
  ClockIcon,
  ShipIcon,
  ShieldCheckIcon,
  BlocksIcon,
  Server,
} from "lucide-react";
import { ContextSwitcher } from "./context-switcher";

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: TerminalIcon,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp",
      logo: BotIcon,
      plan: "Standard",
    },
    {
      name: "Acme Co",
      logo: BlocksIcon,
      plan: "Basic",
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [],
    },
    {
      title: "Applications",
      url: "/dashboard/applications",
      icon: <BotIcon />,
      items: [],
    },
    {
      title: "Nodes",
      url: "/dashboard/nodes",
      icon: <Server />,
    },
    {
      title: "Workload",
      url: "/dashboard/workload",
      icon: <Settings2Icon />,
      items: [
        { title: "Overview", url: "/dashboard/workload" },
        { title: "Pods", url: "/dashboard/workload/pods" },
        { title: "Deployments", url: "/dashboard/workload/deployments" },
        { title: "Daemonsets", url: "/dashboard/workload/daemonsets" },
        { title: "Statefulsets", url: "/dashboard/workload/statefulsets" },
        { title: "Jobs", url: "/dashboard/workload/jobs" },
        { title: "Cronjobs", url: "/dashboard/workload/cronjobs" },
        { title: "Replicasets", url: "/dashboard/workload/replicasets" },
        {
          title: "Replication Controller",
          url: "/dashboard/workload/replication-controllers",
        },
      ],
    },
    {
      title: "Config",
      url: "/dashboard/config",
      icon: <SettingsIcon />,
      items: [
        { title: "Config Maps", url: "/dashboard/config/config-maps" },
        { title: "Secrets", url: "/dashboard/config/secrets" },
        { title: "Resource Quotas", url: "/dashboard/config/resource-quotas" },
        { title: "Limit Ranges", url: "/dashboard/config/limit-ranges" },
        { title: "Horizontal Pod Autoscalers", url: "/dashboard/config/hpa" },
        { title: "Pod Disruption Budgets", url: "/dashboard/config/pdb" },
        {
          title: "Priority Classes",
          url: "/dashboard/config/priority-classes",
        },
        { title: "Runtime Classes", url: "/dashboard/config/runtime-classes" },
        { title: "Leases", url: "/dashboard/config/leases" },
        {
          title: "Mutating Webhook Configurations",
          url: "/dashboard/config/mutating-webhooks",
        },
        {
          title: "Validating Webhook Configurations",
          url: "/dashboard/config/validating-webhooks",
        },
      ],
    },
    {
      title: "Network",
      url: "/dashboard/network",
      icon: <NetworkIcon />,
      items: [
        { title: "Services", url: "/dashboard/network/services" },
        { title: "Endpoints", url: "/dashboard/network/endpoints" },
        { title: "Ingresses", url: "/dashboard/network/ingresses" },
        { title: "Ingress Classes", url: "/dashboard/network/ingress-classes" },
        {
          title: "Network Policies",
          url: "/dashboard/network/network-policies",
        },
        { title: "Port Forwarding", url: "/dashboard/network/port-forwarding" },
      ],
    },
    {
      title: "Storage",
      url: "/dashboard/storage",
      icon: <DatabaseIcon />,
      items: [
        {
          title: "Persistent Volume Claims",
          url: "/dashboard/storage/persistent-volume-claims",
        },
        {
          title: "Persistent Volumes",
          url: "/dashboard/storage/persistent-volumes",
        },
        { title: "Storage Classes", url: "/dashboard/storage/storage-classes" },
      ],
    },
    {
      title: "Access Control",
      url: "/dashboard/access-control",
      icon: <ShieldCheckIcon />,
      items: [
        {
          title: "Service Accounts",
          url: "/dashboard/access-control/service-accounts",
        },
        {
          title: "Cluster Roles",
          url: "/dashboard/access-control/cluster-roles",
        },
        {
          title: "Cluster Role Bindings",
          url: "/dashboard/access-control/cluster-role-bindings",
        },
        { title: "Roles", url: "/dashboard/access-control/roles" },
        {
          title: "Role Bindings",
          url: "/dashboard/access-control/role-bindings",
        },
      ],
    },
    {
      title: "Custom Resources",
      url: "/dashboard/custom-resources",
      icon: <BlocksIcon />,
      items: [
        {
          title: "Custom Resource Definitions",
          url: "/dashboard/custom-resources/definitions",
        },
      ],
    },
    {
      title: "Namespaces",
      url: "/dashboard/namespaces",
      icon: <LayersIcon />,
    },
    {
      title: "Events",
      url: "/dashboard/events",
      icon: <ClockIcon />,
    },
    {
      title: "Helm",
      url: "/dashboard/helm",
      icon: <ShipIcon />,
      items: [
        { title: "Charts", url: "/dashboard/helm/charts" },
        { title: "Releases", url: "/dashboard/helm/releases" },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: <LifeBuoyIcon />,
    },
    {
      title: "Feedback",
      url: "#",
      icon: <SendIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <ContextSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

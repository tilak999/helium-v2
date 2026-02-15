"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TitleProvider, useTitle } from "@/hooks/use-title";
import { NamespaceSelector } from "@/components/namespace-selector";

function HeaderTitle() {
  const { title, count, description } = useTitle();
  if (!title) return null;

  return (
    <div className="w-full flex items-center gap-3 px-2 justify-between">
      <div className="flex items-center gap-2 min-w-0">
        <h1 className="text-sm font-semibold truncate">{title}</h1>
        {count !== undefined && (
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0 mt-0.5">
            {count}
          </span>
        )}
      </div>
      <NamespaceSelector />
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TitleProvider>
      <SidebarProvider className="h-svh min-h-0! overflow-hidden">
        <AppSidebar />
        <SidebarInset className="overflow-hidden">
          <header className="w-full flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border/40 sticky top-0 z-40 bg-background/80 backdrop-blur-sm px-4">
            <div className="w-full flex items-center gap-2 min-w-0">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-vertical:h-4 data-vertical:self-auto opacity-50"
              />
              <HeaderTitle />
            </div>
          </header>
          <main className="flex flex-1 flex-col overflow-hidden min-h-0">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TitleProvider>
  );
}

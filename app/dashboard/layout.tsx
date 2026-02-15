"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TitleProvider, useTitle } from "@/hooks/use-title";

function HeaderTitle() {
  const { title, count, description } = useTitle();
  if (!title) return null;

  return (
    <div className="flex items-center gap-2 px-2 overflow-hidden">
      <div className="flex items-center gap-2 min-w-0">
        <h1 className="text-sm font-semibold truncate">{title}</h1>
        {count !== undefined && (
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0 mt-0.5">
            {count}
          </span>
        )}
      </div>
      {description && (
        <>
          <Separator
            orientation="vertical"
            className="h-3 bg-border/40 mx-1 shrink-0"
          />
          <p className="text-xs text-muted-foreground truncate">
            {description}
          </p>
        </>
      )}
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
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border/40 sticky top-0 z-40 bg-background/80 backdrop-blur-sm px-4">
            <div className="flex items-center gap-2 min-w-0">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-vertical:h-4 data-vertical:self-auto opacity-50"
              />
              <HeaderTitle />
            </div>
          </header>
          <main className="flex flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TitleProvider>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RefreshCwIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SlidersHorizontalIcon,
  EllipsisVerticalIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { ColumnSelector } from "./column-selector";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  defaultHidden?: boolean;
}

export interface RowAction<T> {
  label: string;
  onClick: (item: T) => void;
  variant?: "default" | "destructive";
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchKey?: string;
  pageSize?: number;
  onRefresh?: () => void;
  emptyMessage?: string;
  rowActions?: RowAction<T>[];
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchKey,
  pageSize = 20,
  onRefresh,
  emptyMessage = "No resources found.",
  rowActions,
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const [hiddenColumns, setHiddenColumns] = React.useState<Set<string>>(
    () => new Set(columns.filter((c) => c.defaultHidden).map((c) => c.key)),
  );
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(
    new Set(),
  );
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
    columns.map((c) => c.key),
  );
  const [columnWidths, setColumnWidths] = React.useState<
    Record<string, number>
  >({});
  const [isResizing, setIsResizing] = React.useState<string | null>(null);

  const orderedColumns = React.useMemo(() => {
    return [...columns].sort(
      (a, b) => columnOrder.indexOf(a.key) - columnOrder.indexOf(b.key),
    );
  }, [columns, columnOrder]);

  const visibleColumns = React.useMemo(
    () => orderedColumns.filter((col) => !hiddenColumns.has(col.key)),
    [orderedColumns, hiddenColumns],
  );

  const toggleColumn = (key: string) => {
    setHiddenColumns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const filteredData = React.useMemo(() => {
    if (!search || !searchKey) return data;
    return data.filter((item) => {
      const value = item[searchKey];
      if (typeof value === "string") {
        return value.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    });
  }, [data, search, searchKey]);

  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [filteredData, sortKey, sortDir]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );

  // Selection helpers
  const allPageSelected =
    paginatedData.length > 0 &&
    paginatedData.every((_, i) => selectedRows.has(page * pageSize + i));
  const somePageSelected =
    paginatedData.some((_, i) => selectedRows.has(page * pageSize + i)) &&
    !allPageSelected;

  const toggleSelectAll = () => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        paginatedData.forEach((_, i) => next.delete(page * pageSize + i));
      } else {
        paginatedData.forEach((_, i) => next.add(page * pageSize + i));
      }
      return next;
    });
  };

  const toggleSelectRow = (globalIndex: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(globalIndex)) {
        next.delete(globalIndex);
      } else {
        next.add(globalIndex);
      }
      return next;
    });
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // Resize handler
  const startResizing = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(key);

    const startX = e.pageX;
    const startWidth =
      columnWidths[key] || e.currentTarget.parentElement?.offsetWidth || 150;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.pageX - startX;
      setColumnWidths((prev) => ({
        ...prev,
        [key]: Math.max(80, startWidth + delta),
      }));
    };

    const onMouseUp = () => {
      setIsResizing(null);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
    };

    document.body.style.cursor = "col-resize";
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortKey !== columnKey)
      return <ArrowUpDownIcon className="size-3 text-muted-foreground/40" />;
    return sortDir === "asc" ? (
      <ArrowUpIcon className="size-3" />
    ) : (
      <ArrowDownIcon className="size-3" />
    );
  };

  const totalColSpan = visibleColumns.length + 1 + (rowActions?.length ? 1 : 0);

  return (
    <div className="flex flex-col gap-2 h-full overflow-hidden select-none">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 shrink-0">
        <div className="relative flex-1 max-w-xs">
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-8 h-8 text-sm"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <ColumnSelector
            columns={orderedColumns}
            hiddenColumns={hiddenColumns}
            toggleColumn={toggleColumn}
            onColumnOrderChange={setColumnOrder}
          />
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={onRefresh}
            >
              <RefreshCwIcon className="size-3.5" />
              Refresh
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border/50 overflow-auto flex-1 min-h-0">
        <table className="w-full caption-bottom text-sm table-fixed min-w-max">
          <TableHeader className="sticky top-0 z-10 bg-muted/60 backdrop-blur-sm">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-9 w-10 px-3">
                <Checkbox
                  checked={allPageSelected}
                  indeterminate={somePageSelected}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              {visibleColumns.map((col) => (
                <TableHead
                  key={col.key}
                  className="h-9 text-xs relative group"
                  style={{
                    width: columnWidths[col.key] || "auto",
                    minWidth: 80,
                  }}
                >
                  <div className="flex items-center justify-between pr-2 overflow-hidden whitespace-nowrap">
                    {col.sortable ? (
                      <button
                        className="flex items-center gap-1 hover:text-foreground transition-colors overflow-hidden truncate"
                        onClick={() => handleSort(col.key)}
                      >
                        <span className="truncate">{col.header}</span>
                        <SortIcon columnKey={col.key} />
                      </button>
                    ) : (
                      <span className="truncate">{col.header}</span>
                    )}
                  </div>
                  {/* Resizer handle */}
                  <div
                    onMouseDown={(e) => startResizing(col.key, e)}
                    className={cn(
                      "absolute right-0 top-0 h-full w-2 flex items-center justify-center cursor-col-resize z-20 hover:bg-accent/50 transition-colors",
                      isResizing === col.key && "bg-accent/80",
                    )}
                  >
                    <Separator
                      orientation="vertical"
                      className="h-[20px] bg-border my-auto"
                    />
                  </div>
                </TableHead>
              ))}
              {rowActions && rowActions.length > 0 && (
                <TableHead className="h-9 w-10" />
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={totalColSpan}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, index) => {
                const globalIndex = page * pageSize + index;
                const isSelected = selectedRows.has(globalIndex);
                return (
                  <TableRow
                    key={index}
                    className={cn(
                      "hover:bg-muted/20",
                      isSelected && "bg-muted/30",
                    )}
                  >
                    <TableCell className="py-1.5 px-3 w-10">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelectRow(globalIndex)}
                      />
                    </TableCell>
                    {visibleColumns.map((col) => (
                      <TableCell
                        key={col.key}
                        className="py-1.5 truncate pr-4"
                        style={{ width: columnWidths[col.key] || "auto" }}
                      >
                        <div className="truncate">
                          {col.render
                            ? col.render(item)
                            : (item[col.key] as React.ReactNode)}
                        </div>
                      </TableCell>
                    ))}
                    {rowActions && rowActions.length > 0 && (
                      <TableCell className="py-1.5 px-2 w-10">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                              >
                                <EllipsisVerticalIcon className="size-4" />
                              </Button>
                            }
                          />
                          <DropdownMenuContent align="end" className="w-40">
                            {rowActions.map((action) => (
                              <DropdownMenuItem
                                key={action.label}
                                variant={action.variant}
                                onClick={() => action.onClick(item)}
                              >
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between shrink-0">
        <p className="text-xs text-muted-foreground">
          {selectedRows.size > 0 ? (
            <span className="font-medium text-foreground">
              {selectedRows.size} selected
            </span>
          ) : (
            <>
              <span className="font-medium text-foreground">
                {sortedData.length === 0 ? 0 : page * pageSize + 1}
              </span>
              –
              <span className="font-medium text-foreground">
                {Math.min((page + 1) * pageSize, sortedData.length)}
              </span>
              {" of "}
              <span className="font-medium text-foreground">
                {sortedData.length}
              </span>
            </>
          )}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
          >
            <ChevronLeftIcon className="size-3.5" />
          </Button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i;
            } else if (page < 3) {
              pageNum = i;
            } else if (page > totalPages - 4) {
              pageNum = totalPages - 5 + i;
            } else {
              pageNum = page - 2 + i;
            }
            return (
              <Button
                key={pageNum}
                variant={page === pageNum ? "default" : "outline"}
                size="sm"
                className="h-7 w-7 p-0 text-xs"
                onClick={() => setPage(pageNum)}
              >
                {pageNum + 1}
              </Button>
            );
          })}
          <Button
            variant="outline"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
          >
            <ChevronRightIcon className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

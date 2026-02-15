"use client";

import * as React from "react";
import { SlidersHorizontalIcon, GripVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  header: string;
}

function SortableColumnItem({
  col,
  checked,
  onCheckedChange,
}: {
  col: Column;
  checked: boolean;
  onCheckedChange: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: col.key });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-0.5 pr-2 pl-1 rounded-sm hover:bg-muted/50 group",
        isDragging && "opacity-50 z-50",
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground/30 hover:text-foreground/60 transition-colors"
      >
        <GripVerticalIcon className="size-3.5" />
      </div>
      <DropdownMenuCheckboxItem
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="flex-1 border-none focus:bg-transparent"
        onSelect={(e) => e.preventDefault()}
      >
        {col.header}
      </DropdownMenuCheckboxItem>
    </div>
  );
}

export function ColumnSelector({
  columns,
  hiddenColumns,
  toggleColumn,
  onColumnOrderChange,
}: {
  columns: Column[];
  hiddenColumns: Set<string>;
  toggleColumn: (key: string) => void;
  onColumnOrderChange: (newOrder: string[]) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = columns.findIndex((c) => c.key === active.id);
      const newIndex = columns.findIndex((c) => c.key === over.id);

      const newOrder = arrayMove(
        columns.map((c) => c.key),
        oldIndex,
        newIndex,
      );
      onColumnOrderChange(newOrder);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <SlidersHorizontalIcon className="size-3.5" />
            Columns
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold">
            Toggle & Reorder columns
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="p-1">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={columns.map((c) => c.key)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col">
                  {columns.map((col) => (
                    <SortableColumnItem
                      key={col.key}
                      col={col}
                      checked={!hiddenColumns.has(col.key)}
                      onCheckedChange={() => toggleColumn(col.key)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

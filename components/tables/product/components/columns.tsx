"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ColumnHeader } from "./column-header";
import { RowActions } from "./actions";
import { formatDate } from "@/utils/date";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitialsFromString } from "@/utils/general";

interface Industry {
  uuid?: string;
  brand_name?: string;
  is_active?: string;
  slug?: string;
}

export const columns: ColumnDef<Industry>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <ColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      let fallbackInitials = getInitialsFromString(row.getValue("title"));
      return (
        <div className="flex gap-3 items-center">
          <Avatar className="rounded-lg">
            {/* <AvatarImage src="" /> */}
            <AvatarFallback>{fallbackInitials}</AvatarFallback>
          </Avatar>
          <span className="text-sm  text-default-600">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => <ColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      let categoryObj: any = row.getValue("category");
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {categoryObj?.category_name}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "brand",
    header: ({ column }) => <ColumnHeader column={column} title="Brand" />,
    cell: ({ row }) => {
      let brandObj: any = row.getValue("brand");
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {brandObj?.brand_name}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <ColumnHeader column={column} title="Price" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("price")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge
            variant="soft"
            color={
              (row.getValue("is_active") === true && "success") ||
              (row.getValue("is_active") === false && "destructive") ||
              "default"
            }
          >
            {row.getValue("is_active") === true ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <ColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {formatDate(row.getValue("created_at"))}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <ColumnHeader column={column} title="Updated At" />,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {formatDate(row.getValue("updated_at"))}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    header: ({ column }) => <ColumnHeader column={column} title="Action" />,
    cell: ({ row }) => <RowActions row={row} />,
  },
];

import { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronUp} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortColumn } from "@/service/datatable.service";
import { useTranslations } from "next-intl";

interface ColumnHeaderProps {
  column: Column<any, any>;
  title: string;
  className?: string;
}

export function ColumnHeader({
  column,
  title,
  className,
}: ColumnHeaderProps) {
  const t = useTranslations("OrderPage");
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{t(title)}</div>;
  }

  //Function to handel sorting
  const handleSorting = async (sortColumnBy: string, sortBy: string) => {
    try {
      await sortColumn(sortColumnBy, sortBy);
      column.toggleSorting(sortBy === 'asc');
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{t(title)}</span>
            {column.getIsSorted() === "desc" ? (
              <ChevronDown className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ChevronUp className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
            ) : (
              <></>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleSorting(column.id, "asc")}>
            <ChevronUp className="ltr:mr-2 rtl:ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {t('Asc')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSorting(column.id, "desc")}>
            <ChevronDown className="ltr:mr-2 rtl:ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {t('Desc')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

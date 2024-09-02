import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface RowActionsProps {
  row: Row<any>;
}

export function RowActions({ row }: RowActionsProps) {
  const t = useTranslations("OrderPage");
  const navigation = useRouter();

  const handleEdit = async (uuid: string) => {
    let navigateUrl = `/order/details?order-number=${uuid}`;
    navigation.push(navigateUrl);
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button
        size="icon"
        variant="outline"
        className=" h-7 w-7"
        color="secondary"
        onClick={() => handleEdit(row.original.uuid)}
      >
        <Icon icon="heroicons:pencil" className="h-4 w-4" />
      </Button>
    </div>
  );
}

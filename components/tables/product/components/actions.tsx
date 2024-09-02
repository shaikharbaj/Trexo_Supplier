import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
//import { deleteBrand, fetchBrandById } from "@/service/brand.service";

interface RowActionsProps {
  row: Row<any>;
}

export function RowActions({ row }: RowActionsProps) {
  const t = useTranslations("ProductListingPage");
  const navigation = useRouter();

  //Function to handel edit
  const handelEdit = (row: any) => {
    let navigateUrl = undefined;
    switch (row.step_completed) {
      case 0:
        navigateUrl = `/product/basic-information?token=${row?.uuid}`;
        break;
      case 1:
        navigateUrl = `/product/location?token=${row?.uuid}`;
        break;
      case 2:
        navigateUrl = `/product/media?token=${row?.uuid}`;
        break;
      case 3:
        navigateUrl = `/product/variant?token=${row?.uuid}`;
        break;
      case 4:
        navigateUrl = `/product/shipping?token=${row?.uuid}`;
        break;
      case 5:
        navigateUrl = `/product/seo?token=${row?.uuid}`;
        break;
      default:
        navigateUrl = `/product/basic-information?token=${row?.uuid}`;
        break;
    }
    navigation.push(navigateUrl);
  };

  //Function to handel delete
  const handleRecordDelete = async (uuid: string) => {
    try {
      toast.error("Functionality under development.");
      // const response: any = await deleteBrand(uuid);
      // if (response?.status === true && response?.statusCode === 200) {
      //   toast.success(response?.message);
      // } else {
      //   toast.error(response?.message);
      // }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button
        size="icon"
        variant="outline"
        className=" h-7 w-7"
        color="secondary"
        onClick={() => handelEdit(row.original)}
      >
        <Icon icon="heroicons:pencil" className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className=" h-7 w-7"
        color="secondary"
        onClick={() => handleRecordDelete(row.original.uuid)}
      >
        <Icon icon="heroicons:trash" className="h-4 w-4" />
      </Button>
    </div>
  );
}

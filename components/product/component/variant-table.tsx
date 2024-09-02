"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../../ui/input";

interface IVariantTableProps {
  variants: any;
  variantErrors: any;
  handelVariantPriceChange: any;
  handelVariantQtyChange: any;
}

const VariantTable = ({
  variants,
  variantErrors,
  handelVariantPriceChange,
  handelVariantQtyChange,
}: IVariantTableProps) => {
  const columns: { key: string; label: string }[] = [
    {
      key: "image",
      label: "Image",
    },
    {
      key: "variant_title",
      label: "Variant Title",
    },
    {
      key: "variant_slug",
      label: "Variant Slug",
    },
    {
      key: "price",
      label: "Price",
    },
    {
      key: "available_qty",
      label: "Available Qty",
    },
  ];

  const handleKeyDown = (event: any) => {
    if (
      event.key === "-" ||
      event.key === "+" ||
      event.key === "e" ||
      event.key === "E"
    ) {
      event.preventDefault();
    }
  };

  const handlePriceBlur = (index: number, value: string) => {
    if (!value) {
      handelVariantPriceChange(index, 0);
    }
  };

  const handleQtyBlur = (index: number, value: string) => {
    if (!value) {
      handelVariantQtyChange(index, 0);
    }
  };

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {variants.map((variant: any, variantIndex: number) => (
            <TableRow key={variantIndex}>
              <TableCell className="font-medium  text-card-foreground/80">
                <Avatar>
                  <AvatarImage src={variant.image} />
                  <AvatarFallback>N/A</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium  text-card-foreground/80">
                {variant.title}
              </TableCell>
              <TableCell className="font-medium  text-card-foreground/80">
                {variant.slug}
              </TableCell>
              <TableCell className="font-medium  text-card-foreground/80">
                <Input
                  type="number"
                  variant="bordered"
                  size="lg"
                  placeholder="Price"
                  value={variant.price}
                  onKeyDown={handleKeyDown}
                  onChange={(e) =>
                    handelVariantPriceChange(variantIndex, e.target.value)
                  }
                  onBlur={(e) => handlePriceBlur(variantIndex, e.target.value)}
                  step="0.00"
                  required
                />
                {variantErrors[`${variantIndex}.price`] && (
                  <div className="text-destructive text-sm">
                    {variantErrors[`${variantIndex}.price`]}
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium  text-card-foreground/80">
                <Input
                  type="number"
                  variant="bordered"
                  size="lg"
                  placeholder="Qty"
                  value={variant.available_qty}
                  onKeyDown={handleKeyDown}
                  onChange={(e) =>
                    handelVariantQtyChange(variantIndex, e.target.value)
                  }
                  onBlur={(e) => handleQtyBlur(variantIndex, e.target.value)}
                  required
                />
                {variantErrors[`${variantIndex}.available_qty`] && (
                  <div className="text-destructive text-sm">
                    {variantErrors[`${variantIndex}.available_qty`]}
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default VariantTable;

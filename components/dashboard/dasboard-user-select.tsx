"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const DashboardUserSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Seller" className="whitespace-nowrap" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Seller 1">Seller 1</SelectItem>
        <SelectItem value="Seller 2">Seller 2</SelectItem>
        <SelectItem value="Seller 3">Seller 3</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DashboardUserSelect;
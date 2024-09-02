"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const DashboardStateSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="State" className="whitespace-nowrap" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Gujrat">Gujrat</SelectItem>
        <SelectItem value="Kerala">Kerala</SelectItem>
        <SelectItem value="Maharashtra">Maharashtra</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DashboardStateSelect;
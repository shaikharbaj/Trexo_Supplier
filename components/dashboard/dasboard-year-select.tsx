"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const DashboardYearSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[124px]">
        <SelectValue placeholder="2024" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="2024">2024</SelectItem>
        <SelectItem value="2023">2023</SelectItem>
        <SelectItem value="2022">2022</SelectItem>
        <SelectItem value="2021">2021</SelectItem>
        <SelectItem value="2020">2020</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DashboardYearSelect;
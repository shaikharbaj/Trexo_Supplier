import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface CitySalesDataProps {
}

const CitySalesData = ({ props }: any) => {
    const sales = [
        {
            id: 1,
            category: "2 Wheelers",
            count: 4,
        },
        {
            id: 2,
            category: "3 Wheelers",
            count: 2,
        },
        {
            id: 3,
            category: "4 Wheelers",
            count: 6,
        },
        {
            id: 4,
            category: "BMW",
            count: 6,
        }
    ];
    return (
        <div className="h-[230px]">
            <ScrollArea className="h-full">
                <Table className="border border-default-200">
                    <TableHeader>
                        <TableRow className="border-b border-default-200">
                            <TableHead className="text-sm h-10 font-medium text-default-800">Category</TableHead>
                            <TableHead className="text-sm h-10 font-medium text-default-800 text-right">Count</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sales.map((item) => (
                            <TableRow key={item.id} className="border-b border-default-200">
                                <TableCell className="text-xs text-default-600 py-2">{item.category}</TableCell>
                                <TableCell className="text-xs text-default-600 text-right pr-6 py-2">{item.count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    );
}

export default CitySalesData;

import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { filterOrderStatus } from "@/service/datatable.service";
import { useTranslations } from "next-intl";

interface Option {
    value: any;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface FilterProps {
    title: string;
    options: Option[];
}

export function OrderStatusFilter({ title, options }: FilterProps) {
    const t = useTranslations("OrderPage");
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    useEffect(() => {
        handelFilter();
    }, [selectedValues]);

    //Function to handel filter
    const handelFilter = async () => {
        await filterOrderStatus(selectedValues);
    };

    //Function to handel value selection
    const handelSelect = (valueToAdd: any) => {
        setSelectedValues((prevValues) => [...prevValues, valueToAdd]);
    };

    //Function to handel value un selection
    const handelUnSelect = (valueToRemove: Boolean | String) => {
        setSelectedValues((prevValues) => prevValues.filter(value => value !== valueToRemove));
    }

    //Function to clear filter
    const handelClear = () => {
        setSelectedValues([]);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                    <PlusCircle className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
                    {title}
                    {selectedValues.length > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                color="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValues.length}
                            </Badge>
                            <div className="hidden space-x-1 rtl:space-x-reverse lg:flex">
                                {selectedValues.length > 2 ? (
                                    <Badge
                                        color="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.length} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option: Option) => selectedValues.includes(option.value))
                                        .map((option) => (
                                            <Badge
                                                color="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    {/* <CommandInput placeholder={title} /> */}
                    <CommandList>
                        <CommandEmpty>{t("No results found")}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option: Option) => {
                                const isSelected = selectedValues.find((val: any) => val === option.value);
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            if (isSelected) {
                                                handelUnSelect(option.value);
                                            } else {
                                                handelSelect(option.value);
                                            }
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <Check className={cn("h-4 w-4")} />
                                        </div>
                                        {option.icon && (
                                            <option.icon className="ltr:mr-2 rtl:ml-2 h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span>{option.label}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {selectedValues.length > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={handelClear}
                                        className="justify-center text-center"
                                    >
                                        {t("Clear filters")}
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

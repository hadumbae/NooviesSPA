import {FieldValues, Path, PathValue, UseFormReturn} from "react-hook-form";
import {Check, ChevronsUpDown} from "lucide-react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/common/components/ui/form.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/common/components/ui/popover.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/common/components/ui/command.tsx";
import HookSelectValue from "@/common/type/HookSelectValue.ts";

interface Props<T extends FieldValues> {
    form: UseFormReturn<T>,
    values: HookSelectValue<T>[],
    name: Path<T>,
    label: string,
    placeholder?: string,
    description?: string,

}

const HookFormCombobox = <T extends FieldValues,>(
    {values, form, name, label, description, placeholder = "Select A Value"}: Props<T>
) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between h-9 py-1",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? values.find(
                                            (value) => value.value === field.value
                                        )?.label
                                        : placeholder}

                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                            <Command>
                                <CommandInput
                                    placeholder={placeholder}
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>No Options.</CommandEmpty>
                                    <CommandGroup>
                                        {values.map((value) => (
                                            <CommandItem
                                                value={value.label}
                                                key={value.key}
                                                onSelect={() => {
                                                    if (value.value === field.value) {
                                                        form.setValue(name, "" as PathValue<T, Path<T>>)
                                                    } else {
                                                        form.setValue(name, value.value)
                                                    }
                                                }}
                                            >
                                                {value.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        value.value === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {
                        description &&
                        <FormDescription>
                            {description}
                        </FormDescription>
                    }

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default HookFormCombobox;

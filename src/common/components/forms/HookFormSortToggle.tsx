import {FC} from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/common/components/ui/form.tsx";
import {Control} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {ArrowDownUp, ArrowDownWideNarrow, ArrowUpNarrowWide} from "lucide-react";

type Props = {
    name: string,
    description?: string;
    label?: string;
    control: Control<any>;
    className?: string;
    disabled?: boolean;
}


const HookFormSortToggle: FC<Props> = (params) => {
    const {
        name,
        label,
        control,
        className,
        disabled,
    } = params;

    const options = [
        {label: "None", value: "", colour: "text-neutral-400", icon: ArrowDownUp},
        {label: "Asc", value: "asc", colour: "text-green-400", icon: ArrowUpNarrowWide},
        {label: "Desc", value: "desc", colour: "text-red-400", icon: ArrowDownWideNarrow},
    ];

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => {
                const currentIndex = options.findIndex(opt => opt.value === field.value);
                const nextIndex = (currentIndex + 1) % options.length;
                const current = options[currentIndex] ?? options[0];

                return (
                    <FormItem className={cn("flex items-center", className)}>
                        {label ?? <FormLabel>{label}</FormLabel>}

                        <FormControl>
                            <Button
                                variant="link"
                                type="button"
                                disabled={disabled}
                                className={current.colour}
                                onClick={() => field.onChange(options[nextIndex].value)}
                            >
                                <current.icon/>
                                {current.label}
                            </Button>
                        </FormControl>
                    </FormItem>
                );
            }}/>
    );
};

export default HookFormSortToggle;

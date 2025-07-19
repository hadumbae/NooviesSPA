import {FC} from 'react';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel, FormMessage,
} from "@/common/components/ui/form.tsx";
import {Control} from "react-hook-form";
import {Checkbox} from "@/common/components/ui/checkbox.tsx";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    name: string,
    label: string;
    description?: string;
    control: Control<any>;
    className?: string;
}

const HookFormCheckbox: FC<Props> = ({name, label, description, control, className}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => <FormItem
                className={cn(
                    "flex flex-row items-start",
                    "rounded-md border shadow",
                    "space-x-3 space-y-0 p-4",
                    className,
                )}
            >
                <FormControl>
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                </FormControl>

                <div className="space-y-1 leading-none">
                    <FormLabel>{label}</FormLabel>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </div>
            </FormItem>} />
    );
};

export default HookFormCheckbox;

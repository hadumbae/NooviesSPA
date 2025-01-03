import {FC} from 'react';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/common/components/ui/form.tsx";
import {Control} from "react-hook-form";
import {Textarea} from "@/common/components/ui/textarea.tsx";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    name: string,
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<any>;
    className?: string;
}

const HookFormTextArea: FC<Props> = (
    {name, label, description, placeholder, control, className = ""}
) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                    <Textarea
                        placeholder={placeholder || label}
                        className={cn("resize-none", className)}
                        {...field}
                    />
                </FormControl>

                {
                    description &&
                    <FormDescription>
                        {description}
                    </FormDescription>
                }

                <FormMessage />
            </FormItem>} />
    );
};

export default HookFormTextArea;

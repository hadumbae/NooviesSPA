import {FC} from 'react';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/common/components/ui/form.tsx";
import {Input} from "@/common/components/ui/input.tsx";
import {Control} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    name: string,
    label: string;
    description?: string;
    control: Control<any>;
    className?: string;
    disabled?: boolean;
    multiple?: boolean;
    hasLabel?: boolean;
}

const HookFormFileInput: FC<Props> = (params) => {
    const {
        name,
        label,
        description,
        control,
        disabled,
        className,
        multiple = false,
        hasLabel = true,
    } = params;

    return (
        <FormField
            control={control}
            name={name}
            render={({field: {value, onChange, ...fieldProps}}) => <FormItem className={cn(className)}>
                {hasLabel && <FormLabel>{label}</FormLabel>}

                <FormControl>
                    <Input
                        type="file"
                        disabled={disabled}
                        multiple={multiple}
                        onChange={(event) => onChange(
                            event.target.files && (multiple ? event.target.files : event.target.files[0])
                        )}

                        {...fieldProps}
                    />
                </FormControl>

                {description && <FormDescription>{description}</FormDescription>}

                <FormMessage/>
            </FormItem>}/>
    );
};

export default HookFormFileInput;

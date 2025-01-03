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

interface Props {
    name: string,
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<any>;
    step?: number | string;
    type?: string;
    min?: number;
}

const HookFormInput: FC<Props> = ({name, label, description, placeholder, control, step, type, min}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                    <Input
                        type={type}
                        step={step}
                        min={min}
                        placeholder={placeholder || label}
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

export default HookFormInput;
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

interface Props {
    name: string,
    label: string;
    description?: string;
    control: Control<any>;
}

const HookFormCheckbox: FC<Props> = ({name, label, description, control}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => <FormItem
                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow"
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

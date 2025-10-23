import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
} from "@/common/components/ui/form.tsx";
import {Control, Controller, FieldValues, Path} from "react-hook-form";

import Select from "react-select";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import HookFormErrorMessage from "@/common/components/forms/HookFormErrorMessage.tsx";
import {cn} from "@/common/lib/utils.ts";

interface Props<TSubmit extends FieldValues> {
    name: Path<TSubmit>,
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TSubmit>;
    isDisabled?: boolean;
    options: ReactSelectOption[];
    className?: string;
}

const HookFormSelect = <TSubmit extends FieldValues>(props: Props<TSubmit>) => {
    const {
        name,
        label,
        description,
        className,
        control,
        isDisabled,
        placeholder = "Select an option.",
        options,
    } = props;

    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState: {error}}) => <FormItem className={cn(className)}>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                    <Select
                        options={options}
                        value={options.find(o => o.value === field.value) || {label: placeholder, value: undefined}}
                        onChange={(val) => field.onChange(val?.value)}
                        placeholder={placeholder}
                        isDisabled={isDisabled}
                    />
                </FormControl>

                {
                    description &&
                    <FormDescription>
                        {description}
                    </FormDescription>
                }

                <HookFormErrorMessage error={error} />
            </FormItem>}
        />
    );
};

export default HookFormSelect;

import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
} from "@/common/components/ui/form.tsx";
import {Control, Controller, FieldValues, Path} from "react-hook-form";

import Select from "react-select";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import HookFormErrorMessage from "@/common/components/forms/HookFormErrorMessage.tsx";

interface Props<TSubmit extends FieldValues> {
    name: Path<TSubmit>,
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TSubmit>;
    options: ReactSelectOption[];
}

const HookFormSelect = <TSubmit extends FieldValues>(
    {name, label, description, control, placeholder = "Select an option.", options}: Props<TSubmit>
) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState: {error}}) => <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                    <Select
                        options={options}
                        value={options.find(o => o.value === field.value) || {label: placeholder, value: undefined}}
                        onChange={(val) => field.onChange(val?.value)}
                        placeholder={placeholder}
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

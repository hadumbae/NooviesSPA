import Select from "react-select";
import {Control, Controller, FieldValues, Path} from "react-hook-form";

import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import {FormControl, FormDescription, FormItem, FormLabel} from "@/common/components/ui/form.tsx";
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

const HookFormMultiSelect = <TSubmit extends FieldValues>(
    {name, label, description, control, placeholder, isDisabled, className, options = []}: Props<TSubmit>
) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState: {error}}) => <FormItem className={cn(className)}>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                    <Select
                        options={options}
                        isMulti
                        value={options.filter(v => field.value.includes(v.value))}
                        onChange={value => field.onChange(value.map(v => v.value))}
                        placeholder={placeholder}
                        isDisabled={isDisabled}
                    />
                </FormControl>

                {
                    description &&
                    <FormDescription> {description} </FormDescription>
                }

                <HookFormErrorMessage error={error} />
            </FormItem>}
        />
    );
};

export default HookFormMultiSelect;

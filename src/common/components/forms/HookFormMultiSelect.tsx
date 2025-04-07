import Select from "react-select";
import {Control, Controller, FieldValues, Path} from "react-hook-form";

import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import {FormControl, FormDescription, FormItem, FormLabel} from "@/common/components/ui/form.tsx";
import HookFormErrorMessage from "@/common/components/forms/HookFormErrorMessage.tsx";

interface Props<TSubmit extends FieldValues> {
    name: Path<TSubmit>,
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TSubmit>;
    isDisabled?: boolean;
    options: ReactSelectOption[];
}

const HookFormMultiSelect = <TSubmit extends FieldValues>(
    {name, label, description, control, placeholder, isDisabled, options = []}: Props<TSubmit>
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

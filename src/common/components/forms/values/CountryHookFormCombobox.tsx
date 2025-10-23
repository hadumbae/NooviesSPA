import {FieldValues, Path, PathValue, UseFormReturn} from "react-hook-form";
import HookSelectValue from "@/common/type/input/HookSelectValue.ts";
import HookFormCombobox from "@/common/components/forms/HookFormCombobox.tsx";
import CountryConstant from "@/common/constants/CountryConstant.ts";

interface Props<T extends FieldValues> {
    form: UseFormReturn<T>,
    name: Path<T>,
    label: string,
    placeholder?: string,
    description?: string,
}

const CountryHookFormCombobox = <T extends FieldValues>(
    props: Props<T>
) => {
    const {placeholder = "Select A Value"} = props
    const values: HookSelectValue<T>[] = CountryConstant.map(
        (country): HookSelectValue<T> => ({
            label: country,
            key: country,
            value: country as PathValue<T, Path<T>>,
        }),
    );

    return (
        <HookFormCombobox
            {...props}
            values={values}
            placeholder={placeholder}
        />
    );
};

export default CountryHookFormCombobox;

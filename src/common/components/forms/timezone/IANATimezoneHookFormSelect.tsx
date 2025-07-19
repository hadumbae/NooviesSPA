import {Control, FieldValues, Path} from "react-hook-form";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import {getTimeZones} from "@vvo/tzdb";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";

type FormSelectProps<TValues extends FieldValues> = {
    name: Path<TValues>;
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TValues>
    isMulti?: boolean;
    className?: string;
}

const IANATimezoneHookFormSelect = <TValues extends FieldValues>(props: FormSelectProps<TValues>) => {
    const {isMulti} = props
    const timeZones = getTimeZones();

    const options: ReactSelectOption[] = timeZones.map(
        ({name, alternativeName, mainCities}) => ({
            value: name,
            label: `${alternativeName} (${mainCities[0]})`,
        })
    );

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...props} />
            : <HookFormSelect options={options} {...props} />
    );
};

export default IANATimezoneHookFormSelect;

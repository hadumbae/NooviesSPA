import {Control, FieldValues, Path} from "react-hook-form";
import SeatTypeConstant from "@/pages/seats/constants/SeatTypeConstant.ts";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";

type SelectProps<TSubmit extends FieldValues> = {
    isMulti?: boolean;
    name: Path<TSubmit>,
    label: string,
    description?: string,
    placeholder?: string,
    control: Control<TSubmit>,
};

const SeatTypeHookFormSelect = <TSubmit extends FieldValues>(params: SelectProps<TSubmit>) => {
    const {isMulti = false, ...selectOptions} = params

    const options = SeatTypeConstant.map(type => ({value: type, label: type}));

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...selectOptions} />
            : <HookFormSelect options={options} {...selectOptions} />
    );
};

export default SeatTypeHookFormSelect;

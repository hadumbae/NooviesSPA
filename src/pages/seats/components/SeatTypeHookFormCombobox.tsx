import {FieldValues, Path, PathValue, UseFormReturn} from "react-hook-form";
import HookSelectValue from "@/common/type/HookSelectValue.ts";
import HookFormCombobox from "@/common/components/forms/HookFormCombobox.tsx";
import SeatTypeConstant from "@/pages/seats/constants/SeatTypeConstant.ts";

interface Props<TSubmitValues extends FieldValues> {
    form: UseFormReturn<TSubmitValues>,
    name: Path<TSubmitValues>,
    label: string,
    placeholder?: string,
    description?: string,
}

const SeatTypeHookFormCombobox = <TSubmitValues extends FieldValues>(props: Props<TSubmitValues>) => {
    const {placeholder = "Select A Value"} = props
    const values: HookSelectValue<TSubmitValues>[] = SeatTypeConstant.map(
        (seatType): HookSelectValue<TSubmitValues> => ({
            label: seatType,
            key: seatType,
            value: seatType as PathValue<TSubmitValues, Path<TSubmitValues>>,
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

export default SeatTypeHookFormCombobox;

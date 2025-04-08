import {FieldValues, Path, PathValue, UseFormReturn} from "react-hook-form";
import HookSelectValue from "@/common/type/HookSelectValue.ts";
import HookFormCombobox from "@/common/components/forms/HookFormCombobox.tsx";
import ScreenTypeConstant from "@/pages/screens/constants/ScreenTypeConstant.ts";

interface Props<TSubmitValues extends FieldValues> {
    form: UseFormReturn<TSubmitValues>;
    name: Path<TSubmitValues>;
    label: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean;
}

const ScreenTypeHookFormCombobox = <TSubmitValues extends FieldValues>(props: Props<TSubmitValues>) => {
    const {placeholder = "Select A Value"} = props

    const values: HookSelectValue<TSubmitValues>[] = ScreenTypeConstant.map(
        (screenType): HookSelectValue<TSubmitValues> => ({
            label: screenType,
            key: screenType,
            value: screenType as PathValue<TSubmitValues, Path<TSubmitValues>>,
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

export default ScreenTypeHookFormCombobox;

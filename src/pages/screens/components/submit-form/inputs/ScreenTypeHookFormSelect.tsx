import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import {Control, FieldValues, Path} from "react-hook-form";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import ScreenTypeConstant from "@/pages/screens/constants/ScreenTypeConstant.ts";

interface Props<TSubmit extends FieldValues> {
    name: Path<TSubmit>,
    label: string,
    description?: string,
    placeholder?: string;
    control: Control<TSubmit>,
    isMulti?: boolean;
    isDisabled?: boolean;
}

const ScreenTypeHookFormSelect = <TSubmit extends FieldValues>(props: Props<TSubmit>) => {
    const {isDisabled, isMulti = false} = props

    const options: ReactSelectOption[] = ScreenTypeConstant.map(
        (screenType): ReactSelectOption => ({label: screenType, value: screenType}),
    );

    return (
        isMulti
            ? <HookFormMultiSelect<TSubmit> isDisabled={isDisabled} options={options} {...props} />
            : <HookFormSelect<TSubmit> isDisabled={isDisabled} options={options} {...props} />
    );
};

export default ScreenTypeHookFormSelect;

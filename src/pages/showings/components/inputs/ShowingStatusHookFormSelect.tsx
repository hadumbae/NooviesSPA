import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import {Control, FieldValues, Path} from "react-hook-form";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import ShowingStatusConstant from "@/pages/showings/constants/ShowingStatusConstant.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";

type FormSelectProps<TSubmit extends FieldValues> = {
    name: Path<TSubmit>;
    label: string;
    control: Control<TSubmit>;
    description?: string;
    placeholder?: string;
};

const ShowingStatusHookFormSelect= <TSubmit extends FieldValues>(props: FormSelectProps<TSubmit>) => {
    const {name, label, control, description, placeholder} = props;

    const options: ReactSelectOption[] = ShowingStatusConstant.map(
        status => {
            const formattedStatus = convertToTitleCase(status.replace("_", " "));
            return  {label: formattedStatus, value: status};
        }
    );

    return (
        <HookFormSelect
            name={name}
            label={label}
            control={control}
            options={options}
            description={description}
            placeholder={placeholder}
        />
    );
};

export default ShowingStatusHookFormSelect;

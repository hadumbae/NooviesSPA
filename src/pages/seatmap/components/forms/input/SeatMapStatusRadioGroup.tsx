import HookRadioOption from "@/common/type/input/HookRadioOption.ts";
import SeatMapStatusConstant from "@/pages/seatmap/constants/SeatMapStatusConstant.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import HookFormRadioGroup from "@/common/components/forms/radio-group/HookFormRadioGroup.tsx";
import {Control, FieldValues, Path} from "react-hook-form";

type RadioGroupProps<TValues extends FieldValues> = {
    name: Path<TValues>;
    label: string;
    control: Control<TValues>;
    className?: string;
};

const SeatMapStatusRadioGroup = <TValues extends FieldValues>(props: RadioGroupProps<TValues>) => {
    const items: HookRadioOption[] = SeatMapStatusConstant.map(
        (status): HookRadioOption => ({ value: status, label: convertToTitleCase(status) }),
    );

    return (
        <HookFormRadioGroup
            {...props}
            items={items}
        />
    );
};

export default SeatMapStatusRadioGroup;

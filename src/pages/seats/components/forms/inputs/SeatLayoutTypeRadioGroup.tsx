import {Control, FieldValues, Path} from "react-hook-form";
import SeatLayoutTypeConstant from "@/pages/seats/constants/SeatLayoutTypeConstant.ts";
import SeatLayoutTypeLabelMap from "@/pages/seats/constants/SeatLayoutTypeLabelMap.ts";
import HookFormRadioGroup from "@/common/components/forms/radio-group/HookFormRadioGroup.tsx";
import HookRadioOption from "@/common/type/input/HookRadioOption.ts";

type RadioGroupProps<TValues extends FieldValues> = {
    name: Path<TValues>;
    label: string;
    control: Control<TValues>;
    className?: string;
};

const SeatLayoutTypeRadioGroup = <TValues extends FieldValues>(props: RadioGroupProps<TValues>) => {
    const items: HookRadioOption[] = SeatLayoutTypeConstant.map(
        (type): HookRadioOption => ({value: type, label: SeatLayoutTypeLabelMap[type]})
    );

    return (
       <HookFormRadioGroup
           {...props}
           items={items}
       />
    );
};

export default SeatLayoutTypeRadioGroup;

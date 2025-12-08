/**
 * @file SeatLayoutTypeRadioGroup
 * @description
 * Renders a radio group for selecting theatre seat layout types using react-hook-form.
 *
 * Uses `SeatLayoutTypeConstant` to generate options and `SeatLayoutTypeLabelMap` for
 * display labels. Wraps `HookFormRadioGroup` to integrate with React Hook Form's `control`.
 */

import { Control, FieldValues, Path } from "react-hook-form";
import SeatLayoutTypeConstant from "@/pages/seats/constants/SeatLayoutTypeConstant.ts";
import SeatLayoutTypeLabelMap from "@/pages/seats/constants/SeatLayoutTypeLabelMap.ts";
import HookFormRadioGroup from "@/common/components/forms/radio-group/HookFormRadioGroup.tsx";
import HookRadioOption from "@/common/type/input/HookRadioOption.ts";

/**
 * Props for {@link SeatLayoutTypeRadioGroup}.
 *
 * @template TValues Form values type used by react-hook-form.
 * @property name The field name in the form corresponding to seat layout type.
 * @property label Label to display above the radio group.
 * @property control The react-hook-form control object for form state management.
 * @property className Optional CSS class string for styling the radio group container.
 */
type RadioGroupProps<TValues extends FieldValues> = {
    name: Path<TValues>;
    label: string;
    control: Control<TValues>;
    className?: string;
};

/**
 * `SeatLayoutTypeRadioGroup`
 *
 * @template TValues Form values type used by react-hook-form.
 *
 * @component
 * Wraps `HookFormRadioGroup` to render a selection of seat layout types.
 *
 * @example
 * ```tsx
 * <SeatLayoutTypeRadioGroup<MyFormValues>
 *     name="layoutType"
 *     label="Select Seat Layout"
 *     control={control}
 * />
 * ```
 *
 * @param props Radio group props.
 * @returns A controlled radio group for selecting seat layout types.
 */
const SeatLayoutTypeRadioGroup = <TValues extends FieldValues>(
    props: RadioGroupProps<TValues>
) => {
    const items: HookRadioOption[] = SeatLayoutTypeConstant.map(
        (type): HookRadioOption => ({ value: type, label: SeatLayoutTypeLabelMap[type] })
    );

    return (
        <HookFormRadioGroup
            {...props}
            items={items}
        />
    );
};

export default SeatLayoutTypeRadioGroup;

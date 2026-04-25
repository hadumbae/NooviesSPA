/**
 * @fileoverview Hook Form select component for theatre screen types.
 * Provides a standardized way to select from predefined screen type constants.
 */

import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import {Control, FieldValues, Path} from "react-hook-form";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import ScreenTypeConstant from "@/domains/theatre-screens/constants/ScreenTypeConstant.ts";
import {ReactElement} from "react";

/**
 * Props for the ScreenTypeHookFormSelect component.
 */
type Props<TSubmit extends FieldValues> = {
    name: Path<TSubmit>;
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TSubmit>;
    isMulti?: boolean;
    disabled?: boolean;
};

/**
 * A form select component that populates options from the `ScreenTypeConstant`.
 */
export function ScreenTypeHookFormSelect<TSubmit extends FieldValues>(
    props: Props<TSubmit>
): ReactElement {
    const {disabled, isMulti = false} = props;
    const options: ReactSelectOption[] = ScreenTypeConstant.map(
        (screenType): ReactSelectOption => ({
            label: screenType,
            value: screenType
        }),
    );

    return (
        isMulti
            ? <HookFormMultiSelect<TSubmit> disabled={disabled} options={options} {...props} />
            : <HookFormSelect<TSubmit> disabled={disabled} options={options} {...props} />
    );
}
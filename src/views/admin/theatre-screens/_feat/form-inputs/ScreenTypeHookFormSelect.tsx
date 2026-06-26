/**
 * @fileoverview Hook form select component for theatre screen types.
 */

import {ReactElement} from "react";
import {Control, FieldValues, Path} from "react-hook-form";
import {HookFormMultiSelect} from "@/views/common/_comp/form-select/HookFormMultiSelect.tsx";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {ScreenTypeConstant} from "@/domains/theatre-screens";

/** Props for the ScreenTypeHookFormSelect component. */
type Props<TSubmit extends FieldValues> = {
    name: Path<TSubmit>;
    label: string;
    description?: string;
    placeholder?: string;
    control: Control<TSubmit>;
    isMulti?: boolean;
    disabled?: boolean;
};

/** Form select component that populates options from the ScreenTypeConstant. */
export function ScreenTypeHookFormSelect<TSubmit extends FieldValues>(
    {disabled, isMulti, ...rest}: Props<TSubmit>
): ReactElement {
    const options: ReactSelectOption[] = ScreenTypeConstant.map(
        (screenType): ReactSelectOption => ({
            label: screenType,
            value: screenType
        }),
    );

    return (
        isMulti
            ? <HookFormMultiSelect<TSubmit> options={options} {...rest} />
            : <HookFormSelect<TSubmit> options={options} {...rest} />
    );
}
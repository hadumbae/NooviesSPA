/**
 * @fileoverview Radio group component for selecting a role type department.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {HookRadioOption} from "@/common/_types/input/HookRadioOption.ts";
import {HookFormRadioGroup} from "@/views/common/_feat";
import {convertToTitleCase} from "@/common/_feat/formatters/convertToTitleCase.ts";
import {RoleTypeDepartmentConstant} from "@/domains/roletypes";
import {HookFormInputProps} from "@/common/_types/input/HookFormInputProps.ts";

/** Radio group populated with department options from RoleTypeDepartmentConstant. */
export function RoleTypeDepartmentRadioGroup<TValues extends FieldValues>(
    props: Omit<HookFormInputProps<TValues>, "control">
): ReactElement {
    const items: HookRadioOption[] = RoleTypeDepartmentConstant.map(
        val => ({label: convertToTitleCase(val), value: val})
    );

    return (
        <HookFormRadioGroup {...props} items={items}/>
    );
}

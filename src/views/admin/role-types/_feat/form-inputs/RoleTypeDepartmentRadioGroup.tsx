/**
 * @fileoverview Radio group component for selecting a role type department.
 */

import {ReactElement} from "react";
import {Control, FieldValues, Path} from "react-hook-form";
import HookRadioOption from "@/common/type/input/HookRadioOption.ts";
import HookFormRadioGroup from "@/common/components/forms/radio-group/HookFormRadioGroup.tsx";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import {RoleTypeDepartmentConstant} from "@/domains/roletype";

/** Props for the RoleTypeDepartmentRadioGroup component. */
export type RoleTypeProps<TForm extends FieldValues> = {
    control: Control<TForm>;
    name: Path<TForm>;
    label: string;
    className?: string;
};

/** Radio group populated with department options from RoleTypeDepartmentConstant. */
export function RoleTypeDepartmentRadioGroup<TForm extends FieldValues>(
    {control, name, label, className}: RoleTypeProps<TForm>
): ReactElement {
    const items: HookRadioOption[] = RoleTypeDepartmentConstant.map(
        val => ({label: convertToTitleCase(val), value: val})
    );

    return (
        <HookFormRadioGroup
            className={className}
            control={control}
            label={label}
            name={name}
            items={items}
        />
    );
}

/**
 * @fileoverview Form input component for selecting role categories based on department.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {ReactSelectOption} from "@/common/_types/input/ReactSelectOption.ts";
import {HookFormInputControlProps} from "@/common/_types/input/HookFormInputProps.ts";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {RoleTypeCastCategoryConstant, RoleTypeCrewCategoryConstant, RoleTypeDepartment} from "@/domains/roletypes";

/** Props for the RoleTypeCategorySelect component. */
type SelectProps<TSubmit extends FieldValues> = Omit<HookFormInputControlProps<TSubmit>, "control"> & {
    department: RoleTypeDepartment | undefined | null;
};

/**
 * Form select component for choosing role categories that filters options based on the provided department.
 */
export function RoleTypeCategorySelect<TSubmit extends FieldValues>(
    {department, ...rest}: SelectProps<TSubmit>
): ReactElement {
    const values = department === "CAST"
        ? RoleTypeCastCategoryConstant
        : department === "CREW"
            ? RoleTypeCrewCategoryConstant
            : [];

    const options: ReactSelectOption[] = values.map(value => ({value, label: value}));

    return (
        <HookFormSelect options={options} {...rest}/>
    );
}

/**
 * @fileoverview Form input component for selecting role categories based on department.
 *
 */

import {RoleTypeCrewCategoryConstant} from "@/domains/roletype/schema/fields/RoleTypeCrewCategoryConstant.ts";
import {RoleTypeCastCategoryConstant} from "@/domains/roletype/schema/fields/RoleTypeCastCategoryConstant.ts";
import {RoleTypeDepartment} from "@/domains/roletype/schema/fields/RoleTypeDepartmentSchema.ts";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {FieldValues} from "react-hook-form";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ReactElement} from "react";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/** Props for the RoleTypeCategorySelect component. */
type SelectProps<TSubmit extends FieldValues> = HookFormInputControlProps<TSubmit> & {
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
        <HookFormSelect
            options={options}
            {...rest}
        />
    );
}

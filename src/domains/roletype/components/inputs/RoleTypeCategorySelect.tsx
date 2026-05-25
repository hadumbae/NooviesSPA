/**
 * @fileoverview Form input component for selecting role categories based on department.
 *
 */

import RoleTypeCrewCategoryConstant from "@/domains/roletype/constant/RoleTypeCrewCategoryConstant.ts";
import RoleTypeCastCategoryConstant from "@/domains/roletype/constant/RoleTypeCastCategoryConstant.ts";
import {RoleTypeDepartment} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {HookFormMultiSelect} from "@/views/common/_comp/form-select/HookFormMultiSelect.tsx";
import {FieldValues} from "react-hook-form";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ReactElement} from "react";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/** Props for the RoleTypeCategorySelect component. */
type SelectProps<TSubmit extends FieldValues> = HookFormInputControlProps<TSubmit> & {
    isMulti?: boolean;
    department: RoleTypeDepartment | undefined | null;
};

/**
 * Form select component for choosing role categories that filters options based on the provided department.
 */
export function RoleTypeCategorySelect<TSubmit extends FieldValues>(
    {department, isMulti = false, ...rest}: SelectProps<TSubmit>
): ReactElement {
    const values = department === "CAST"
        ? RoleTypeCastCategoryConstant
        : department === "CREW"
            ? RoleTypeCrewCategoryConstant
            : [];

    const options: ReactSelectOption[] = values.map(value => ({value, label: value}));

    return isMulti
        ? <HookFormMultiSelect options={options} {...rest} />
        : <HookFormSelect options={options} {...rest} />;
}

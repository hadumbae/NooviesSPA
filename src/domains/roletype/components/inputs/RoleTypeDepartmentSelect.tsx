/**
 * @fileoverview Form select component for choosing a role type department.
 */

import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {FieldValues} from "react-hook-form";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import RoleTypeDepartmentConstant from "@/domains/roletype/constant/RoleTypeDepartmentConstant.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";
import {ReactElement} from "react";


/**
 * A controlled select input for choosing a role type department using react-hook-form.
 */
export function RoleTypeDepartmentSelect<TSubmit extends FieldValues>(
    props: HookFormInputControlProps<TSubmit>
): ReactElement {
    const options: ReactSelectOption[] = RoleTypeDepartmentConstant.map(
        value => ({value, label: convertToTitleCase(value)})
    );

    return (
        <HookFormSelect options={options} {...props} />
    );
}
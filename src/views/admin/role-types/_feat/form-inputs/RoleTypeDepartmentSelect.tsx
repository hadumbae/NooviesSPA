/**
 * @fileoverview Form select component for choosing a role type department.
 */

import {ReactElement} from "react";
import {FieldValues} from "react-hook-form";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import {convertToTitleCase} from "@/common/_feat/formatters/convertToTitleCase.ts";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";
import {RoleTypeDepartmentConstant} from "@/domains/roletypes";

/**
 * Controlled select input for choosing a role type department using react-hook-form.
 */
export function RoleTypeDepartmentSelect<TSubmit extends FieldValues>(
    props: Omit<HookFormInputControlProps<TSubmit>, "control">
): ReactElement {
    const options: ReactSelectOption[] = RoleTypeDepartmentConstant.map(
        value => ({value, label: convertToTitleCase(value)})
    );

    return (
        <HookFormSelect
            options={options}
            {...props}
        />
    );
}
/**
 * @fileoverview Form view component for creating and updating RoleType entities.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";
import {HookFormInput} from "@/views/common/_feat";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ReactSelectOption} from "@/common/_types/input/ReactSelectOption.ts";
import {convertToTitleCase} from "@/common/_feat/formatters/convertToTitleCase.ts";
import {HookFormTextArea} from "@/views/common/_feat/form-inputs/HookFormTextArea.tsx";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";
import {RoleTypeCategorySelect} from "@/views/admin/role-types/_feat/form-inputs";
import {RoleTypeDepartment, RoleTypeDepartmentConstant, RoleTypeFormValues} from "@/domains/roletypes";

/**
 * Form component for creating or editing a RoleType entity.
 */
export function RoleTypeSubmitFormView(
    {className, disableFields, hideFields}: FormViewProps<RoleTypeFormValues>
): ReactElement {
    const {control, watch} = useFormContext();

    const departmentOptions: ReactSelectOption[] = RoleTypeDepartmentConstant.map((val) => ({
        label: convertToTitleCase(val),
        value: val
    }));

    const department: RoleTypeDepartment | undefined = watch("department");

    return (
        <div className={cn('space-y-5', className)}>
            {!hideFields?.roleName && (
                <HookFormInput
                    name="roleName"
                    label="Role Name"
                    control={control}
                    disabled={disableFields?.roleName}
                />
            )}

            {!hideFields?.department && (
                <HookFormSelect
                    name="department"
                    label="Department"
                    options={departmentOptions}
                    disabled={disableFields?.department}
                />
            )}

            {!hideFields?.category && (
                <RoleTypeCategorySelect
                    department={department}
                    name="category"
                    label="Category"
                    disabled={disableFields?.category}
                />
            )}

            {!hideFields?.description && (
                <HookFormTextArea
                    name="description"
                    label="Description"
                    disabled={disableFields?.description}
                />
            )}
        </div>
    );
}

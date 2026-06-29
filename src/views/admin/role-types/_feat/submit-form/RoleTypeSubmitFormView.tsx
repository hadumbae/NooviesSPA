/**
 * @fileoverview Form view component for creating and updating RoleType entities.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";
import {RoleTypeCategorySelect} from "@/views/admin/role-types/_feat/form-inputs";
import {RoleTypeDepartment, RoleTypeFormValues, RoleTypeDepartmentConstant} from "@/domains/roletypes";

/** Props for the RoleTypeSubmitFormView component. */
type SubmitViewProps = Pick<FormViewProps<RoleTypeFormValues>, "disableFields" | "className">

/**
 * Form component for creating or editing a RoleType entity.
 */
export function RoleTypeSubmitFormView(
    {className, disableFields}: SubmitViewProps
): ReactElement {
    const {control, watch} = useFormContext();

    const departmentOptions: ReactSelectOption[] = RoleTypeDepartmentConstant.map((val) => ({
        label: convertToTitleCase(val),
        value: val
    }));

    const department: RoleTypeDepartment | undefined = watch("department");

    return (
        <div className={cn('space-y-5', className)}>
            {!disableFields?.roleName && (
                <HookFormInput
                    name="roleName"
                    label="Role Name"
                    control={control}
                />
            )}

            {!disableFields?.department && (
                <HookFormSelect
                    name="department"
                    label="Department"
                    options={departmentOptions}
                />
            )}

            {!disableFields?.category && (
                <RoleTypeCategorySelect
                    department={department}
                    name="category"
                    label="Category"
                    control={control}
                />
            )}

            {!disableFields?.description && (
                <HookFormTextArea
                    name="description"
                    label="Description"
                    control={control}
                />
            )}
        </div>
    );
}

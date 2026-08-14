/**
 * @fileoverview Renders a fieldset component containing filter inputs for role type index query options.
 */

import {ReactElement} from "react";
import {cn, FormFieldsetProps} from "@/common/_feat";
import {
    RoleTypeIndexQueryOptionsFormValues
} from "@/domains/roletypes/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsSchema.ts";
import {HookFormInput} from "@/views/common/_feat";
import {useFormContext} from "react-hook-form";
import {LabelledFormInput} from "@/views/admin/movies";
import {HookFormSelect} from "@/views/common/_comp";
import {RoleTypeDepartmentSelectOptions} from "@/domains/roletypes";

/**
 * Renders filter controls for role name and department within a role type index query options form.
 */
export function RoleTypeIndexQueryOptionsFormFilterFieldset(
    {className, disableFields, hideFields}: FormFieldsetProps<RoleTypeIndexQueryOptionsFormValues>
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("query-option-fieldset-grid", className)}>
            {
                !hideFields?.roleName && (
                    <LabelledFormInput label="Role Name">
                        <HookFormInput
                            name="roleName"
                            control={control}
                            disabled={disableFields?.roleName}
                        />
                    </LabelledFormInput>
                )
            }

            {
                !hideFields?.department && (
                    <LabelledFormInput label="Department">
                        <HookFormSelect
                            name="department"
                            options={RoleTypeDepartmentSelectOptions}
                            disabled={disableFields?.department}
                        />
                    </LabelledFormInput>
                )
            }
        </fieldset>
    );
}
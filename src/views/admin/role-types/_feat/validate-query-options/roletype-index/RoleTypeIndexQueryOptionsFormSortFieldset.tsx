/**
 * @fileoverview Renders a fieldset component containing sort toggles for role type index query options.
 */

import {ReactElement} from "react";
import {cn, FormFieldsetProps} from "@/common/_feat";
import {
    RoleTypeIndexQueryOptionsFormValues
} from "@/domains/roletypes/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsSchema.ts";
import {HookFormSortToggle} from "@/views/common/_feat";

/**
 * Renders sort option toggles for role name and department within a role type index form.
 */
export function RoleTypeIndexQueryOptionsFormSortFieldset(
    {className, disableFields, hideFields}: FormFieldsetProps<RoleTypeIndexQueryOptionsFormValues>
): ReactElement {
    return (
        <fieldset className={cn("flex flex-wrap space-x-4", className)}>
            {
                !hideFields?.sortByRoleName && (
                    <HookFormSortToggle
                        name="sortByRoleName"
                        label="Role Name"
                        disabled={disableFields?.sortByRoleName}
                    />
                )
            }

            {
                !hideFields?.sortByDepartment && (
                    <HookFormSortToggle
                        name="sortByDepartment"
                        label="Department"
                        disabled={disableFields?.sortByDepartment}
                    />
                )
            }
        </fieldset>
    );
}
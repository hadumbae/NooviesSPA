/**
 * @fileoverview Renders the form view component for role type index query options.
 */

import {ReactElement} from "react";
import {QueryOptionFormViewProps} from "@/common/_feat";
import {
    RoleTypeIndexQueryOptionsFormValues
} from "@/domains/roletypes/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsSchema.ts";
import {QueryOptionFormLayout} from "@/views/common/_feat";
import {
    RoleTypeIndexQueryOptionsFormFilterFieldset
} from "@/views/admin/role-types/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsFormFilterFieldset.tsx";
import {
    RoleTypeIndexQueryOptionsFormSortFieldset
} from "@/views/admin/role-types/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsFormSortFieldset.tsx";

/**
 * Renders the layout view for role type index filter and sort form fieldsets.
 */
export function RoleTypeIndexQueryOptionsFormView(
    {disableFields, classNames}: QueryOptionFormViewProps<RoleTypeIndexQueryOptionsFormValues>
): ReactElement {
    return (
        <QueryOptionFormLayout
            filterFieldset={RoleTypeIndexQueryOptionsFormFilterFieldset}
            sortFieldset={RoleTypeIndexQueryOptionsFormSortFieldset}
            classNames={classNames}
            disableFields={disableFields}
        />
    );
}
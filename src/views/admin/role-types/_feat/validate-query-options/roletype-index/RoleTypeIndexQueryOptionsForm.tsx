/**
 * @fileoverview Defines the form component and hook for managing role type index query options.
 */

import {createQueryOptionForm} from "@/common/_feat";
import {
    RoleTypeIndexQueryOptionsSchema
} from "@/domains/roletypes/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsSchema.ts";

const {useQueryOptionForm, QueryOptionForm} = createQueryOptionForm({
    schema: RoleTypeIndexQueryOptionsSchema,
    name: "role-type-index-query-options-form"
});

export {
/** React form component for configuring role type index query options. */
    QueryOptionForm as RoleTypeIndexQueryOptionsForm,
/** Custom hook for managing the role type index query options form state. */
    useQueryOptionForm as useRoleTypeIndexQueryOptionForm,
}
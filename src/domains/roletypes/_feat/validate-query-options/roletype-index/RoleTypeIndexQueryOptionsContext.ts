/**
 * @fileoverview React context provider and hook for managing role type index query options state.
 */

import {createQueryOptionsContext} from "@/common/_feat";
import {
    RoleTypeIndexQueryOptionsSchema
} from "@/domains/roletypes/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsSchema.ts";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    name: "role-type-index-query-options-context",
    schema: RoleTypeIndexQueryOptionsSchema,
});

export {
    /** Context provider component for managing role type index query options state. */
        Provider as RoleTypeIndexQueryOptionsContextProvider,
    /** Custom hook to access role type index query options from context. */
        useQueryOptionsContext as useRoleTypeIndexQueryOptionsContext,
}
/**
 * @fileoverview Creates the form section component for managing role type index query options.
 */

import {createQueryOptionFormSection} from "@/common/_feat";
import {
    RoleTypeIndexQueryOptionsForm
} from "@/views/admin/role-types/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsForm.tsx";
import {
    RoleTypeIndexQueryOptionsFormView
} from "@/views/admin/role-types/_feat/validate-query-options/roletype-index/RoleTypeIndexQueryOptionsFormView.tsx";
import {useRoleTypeIndexQueryOptionsContext} from "@/domains/roletypes";

const section = createQueryOptionFormSection({
    queryOptionForm: RoleTypeIndexQueryOptionsForm,
    formView: RoleTypeIndexQueryOptionsFormView,
    useQueryOptionsContext: useRoleTypeIndexQueryOptionsContext,
});

/** Form section component for filtering and sorting role types in the index view. */
export {
    section as RoleTypeIndexQueryOptionsFormSection
}
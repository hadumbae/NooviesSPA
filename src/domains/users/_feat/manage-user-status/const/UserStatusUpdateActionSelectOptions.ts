/**
 * @fileoverview Defines select dropdown options for user status update actions.
 */

import {
    UserStatusUpdateActionConstant
} from "@/domains/users/_feat/manage-user-status/const/UserStatusUpdateActionConstant.ts";
import {ReactSelectOption} from "@/common/_types";

/** Select options for user status update actions formatted for React Select components. */
export const UserStatusUpdateActionSelectOptions: ReactSelectOption[] = UserStatusUpdateActionConstant.map(
    (action): ReactSelectOption => ({value: action, label: action})
);
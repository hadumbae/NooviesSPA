/**
 * @fileoverview Defines select dropdown options for user statuses.
 */

import {ReactSelectOption} from "@/common/_types";
import {UserStatusConstant} from "@/domains/users/_const/UserStatusConstant.ts";

/** Select options for user statuses formatted for React Select components. */
export const UserStatusSelectOptions: ReactSelectOption[] = UserStatusConstant.map(
    (status): ReactSelectOption => ({label: status, value: status})
);
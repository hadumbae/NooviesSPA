/**
 * @fileoverview Defines filtered select dropdown options for active and inactive user statuses.
 */

import {ReactSelectOption} from "@/common/_types";
import {UserStatusConstant} from "@/domains/users/_const/UserStatusConstant.ts";

/** Select options for active user statuses formatted for React Select components. */
export const UserActivateStatusSelectOptions: ReactSelectOption[] = UserStatusConstant
    .filter(status => status !== "INACTIVE")
    .map((status): ReactSelectOption => ({label: status, value: status}));

/** Select options for inactive user statuses formatted for React Select components. */
export const UserDeactivateStatusSelectOptions: ReactSelectOption[] = UserStatusConstant
    .filter(status => status === "INACTIVE")
    .map((status): ReactSelectOption => ({label: status, value: status}));
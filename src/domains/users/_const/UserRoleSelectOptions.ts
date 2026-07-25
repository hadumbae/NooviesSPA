/**
 * @fileoverview Provides configuration options for user role selection components.
 */

import {ReactSelectOption} from "@/common/_types";
import {UserRoleLabels} from "@/domains/users/_const/UserRoleLabels.ts";

/** Array of select options mapped from user role labels. */
export const UserRoleSelectOptions: ReactSelectOption[] = Object
    .entries(UserRoleLabels)
    .map(([role, label]) => ({label, value: role}));
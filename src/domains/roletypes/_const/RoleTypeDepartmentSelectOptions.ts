/**
 * @fileoverview Converts role type department constants into select option objects for UI dropdown components.
 */

import {ReactSelectOption} from "@/common/_types";
import {RoleTypeDepartmentConstant} from "@/domains/roletypes/_const/RoleTypeDepartmentConstant.ts";

/** Select option list mapped from role type department constants for dropdown components. */
export const RoleTypeDepartmentSelectOptions: ReactSelectOption[] = RoleTypeDepartmentConstant.map(
    (department): ReactSelectOption => ({label: department, value: department})
);
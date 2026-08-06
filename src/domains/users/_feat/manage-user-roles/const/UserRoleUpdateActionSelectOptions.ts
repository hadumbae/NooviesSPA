/**
 * @fileoverview Select options array mapped from user role update action constants for dropdown UI components.
 */

import {UserRoleUpdateActionConstant} from "@/domains/users";
import {ReactSelectOption} from "@/common/_types";

/** React Select dropdown options representing available user role update actions. */
export const UserRoleUpdateActionSelectOptions: ReactSelectOption[] = UserRoleUpdateActionConstant.map(
    (action): ReactSelectOption => ({value: action, label: action})
);
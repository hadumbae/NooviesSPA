/**
 * @fileoverview Select options array mapped from user suspension update action constants for dropdown UI components.
 */

import {ReactSelectOption} from "@/common/_types";
import {
    UserSuspensionUpdateActionConstant
} from "@/domains/users/_feat/manage-user-suspension/const/UserSuspensionUpdateActionConstant.ts";

/** React Select dropdown options representing available user suspension update actions. */
export const UserSuspensionUpdateActionSelectOptions: ReactSelectOption[] = UserSuspensionUpdateActionConstant.map(
    (action): ReactSelectOption => ({value: action, label: action})
);
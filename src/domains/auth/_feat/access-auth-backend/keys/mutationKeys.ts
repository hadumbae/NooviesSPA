/**
 * @fileoverview Defines mutation keys for authentication operations.
 */

import {buildQueryKey} from "@/common/_feat";

/** Mutation keys for registration, login, and logout processes. */
export const AuthUserMutationKeys = buildQueryKey(
    ["auth", "user"],
    {
        register: ["register"],
        login: ["login"],
        logout: ["logout"],
    },
);
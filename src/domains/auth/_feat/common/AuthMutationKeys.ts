/**
 * @fileoverview Defines mutation keys for authentication operations.
 */

import {buildQueryKey} from "@/common/_feat/handle-query/buildQueryKeys.ts";

/** Mutation keys for registration, login, and logout processes. */
export const AuthMutationKeys = buildQueryKey(
    ["auth", "user"],
    {
        register: ["register"],
        login: ["login"],
        logout: ["logout"],
    },
);

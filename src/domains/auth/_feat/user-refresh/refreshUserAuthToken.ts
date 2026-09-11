/**
 * @fileoverview Utility function for refreshing authentication tokens and fetching validated user data.
 */

import {User, UserSchema} from "@/domains/users";
import {postRefreshAuthentication} from "@/domains/auth";
import {validateData} from "@/common/_feat";

/** Triggers a token refresh request and returns the validated user data. */
export async function refreshUserAuthToken(): Promise<User> {
    const {result} = await postRefreshAuthentication();
    const {data: parsedData, success, error} = validateData({
        data: result,
        schema: UserSchema,
        message: "Invalid Refresh API Response.",
    });

    if (!success) throw error;
    return parsedData;
}
/**
 * @fileoverview Repository for handling the deletion of person profile images.
 */

import {PersonProfileImageBaseURL} from "@/domains/persons/_feat/submit-profile-image";
import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {buildURL} from "@/common/features/fetch-api";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {RemoveProfileImageConfig} from "@/domains/persons/_feat/remove-profile-image";

/**
 * Executes a DELETE request to remove the profile image for a specific person.
 */
export async function deleteRemoveProfileImage(
    {_id}: RemoveProfileImageConfig
): Promise<RequestReturns> {
    const url = buildURL({
        baseURL: PersonProfileImageBaseURL,
        path: `/image/${_id}/remove`,
    });

    return useFetchAPI({url, method: "DELETE"});
}
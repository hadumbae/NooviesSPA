/**
 * @fileoverview Repository for managing person profile image persistence.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";
import {buildURL} from "@/common/features/fetch-api";
import {PersonProfileImageBaseURL} from "@/domains/persons/_feat/submit-profile-image/repositories/baseURL.ts";
import {UploadProfileImageConfig} from "@/domains/persons/_feat/submit-profile-image/repositories/repository.types.ts";

/**
 * Uploads or updates a person's profile image using FormData.
 */
export async function patchUploadProfileImage(
    {_id, data, config}: UploadProfileImageConfig
): Promise<RequestReturns> {
    const url = buildURL({
        baseURL: PersonProfileImageBaseURL,
        path: `/image/${_id}/update`,
        queries: config
    });

    return useFetchAPI({url, method: "PATCH", data});
}


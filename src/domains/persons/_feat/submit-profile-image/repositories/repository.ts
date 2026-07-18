/**
 * @fileoverview Repository for managing person profile image persistence.
 */

import {FetchRequestReturns} from "@/common/_types/request/FetchRequestReturns.ts";
import {useFetchAPI} from "@/common/_feat/use-fetch-api/useFetchAPI.ts";
import {buildURL} from "@/common/_feat/fetch-api";
import {PersonProfileImageBaseURL} from "@/domains/persons/_feat/submit-profile-image/repositories/baseURL.ts";
import {UploadProfileImageConfig} from "@/domains/persons/_feat/submit-profile-image/repositories/repository.types.ts";

/**
 * Uploads or updates a person's profile image using FormData.
 */
export async function patchUploadProfileImage(
    {_id, data, config}: UploadProfileImageConfig
): Promise<FetchRequestReturns> {
    const url = buildURL({
        baseURL: PersonProfileImageBaseURL,
        path: `/image/${_id}/update`,
        queries: config
    });

    return useFetchAPI({url, method: "PATCH", data});
}


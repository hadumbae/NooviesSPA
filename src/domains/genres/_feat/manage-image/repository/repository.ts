/**
 * @fileoverview Repository for managing genre image upload and removal operations.
 */

import RequestReturns from "@/common/type/request/RequestReturns.ts";
import {Genre} from "@/domains/genres/schema";
import {
    RemoveGenreImageConfig,
    UpdateGenreImageConfig
} from "@/domains/genres/_feat/manage-image/repository/repository.types.ts";
import {buildURL} from "@/common/features/fetch-api";
import {ManageGenreImageBaseURL} from "@/domains/genres/_feat/manage-image/repository/baseURL.ts";
import useFetchAPI from "@/common/utility/features/use-fetch-api/useFetchAPI.ts";

/** Updates a genre's image using multipart form data. */
export async function patchUpdateGenreImage(
    {_id, formData}: UpdateGenreImageConfig
): Promise<RequestReturns<Genre>> {
    const url = buildURL({
        baseURL: ManageGenreImageBaseURL,
        path: `/item/${_id}/image/update`,
    });

    return useFetchAPI({url, method: "PATCH", data: formData});
}

/** Removes the current image associated with a genre. */
export async function patchRemoveGenreImage(
    {_id}: RemoveGenreImageConfig
): Promise<RequestReturns<Genre>> {
    const url = buildURL({
        baseURL: ManageGenreImageBaseURL,
        path: `/item/${_id}/image/remove`,
    });

    return useFetchAPI({url, method: "PATCH"});
}
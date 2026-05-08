/**
 * @fileoverview Mutation keys for genre image management operations.
 */
import {buildQueryKey} from "@/common/utility/buildQueryKeys.ts";

/** Mutation keys for uploading and removing genre images. */
export const ManageGenreImageMutationKeys = buildQueryKey(
    ["genres", "feat", "manage-images"],
    {upload: ["upload"], remove: ["remove"]}
);


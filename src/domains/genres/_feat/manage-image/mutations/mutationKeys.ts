/**
 * @fileoverview Mutation keys for genre image management operations.
 */
import {buildQueryKey} from "@/common/_feat";

/** Mutation keys for uploading and removing genre images. */
export const ManageGenreImageMutationKeys = buildQueryKey(
    ["genres", "feat", "manage-images"],
    {upload: ["upload"], remove: ["remove"]}
);


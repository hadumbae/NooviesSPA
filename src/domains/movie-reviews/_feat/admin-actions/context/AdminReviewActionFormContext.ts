/**
 * @fileoverview React Context for sharing movie review metadata across administrative moderation forms.
 */

import {ObjectId} from "@/common/_schemas";
import {createContext} from "react";

/** Shape of the context values provided to moderation form children. */
export type AdminReviewActionFormContextValues = {
    formID: string;
    reviewID: ObjectId;
}

/** Context provider for administrative review actions. */
export const AdminReviewActionFormContext = createContext<AdminReviewActionFormContextValues | undefined>(undefined);
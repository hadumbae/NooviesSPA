/**
 * @file React Context for sharing movie review metadata across administrative moderation forms.
 * @filename AdminReviewActionFormContext.ts
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {createContext} from "react";

/**
 * Shape of the context values provided to moderation form children.
 */
export type AdminReviewActionFormContextValues = {
    /**
     * Unique HTML ID for the form element.
     * Useful for linking external submit buttons to the form via the `form` attribute.
     */
    formID: string;
    /**
     * The ID string of the movie review currently being moderated.
     */
    reviewID: ObjectId;
}

/**
 * Context provider for administrative review actions.
 * ---
 */
export const AdminReviewActionFormContext = createContext<AdminReviewActionFormContextValues | undefined>(undefined);
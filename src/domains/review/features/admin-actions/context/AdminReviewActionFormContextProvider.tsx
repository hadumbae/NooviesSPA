/**
 * @file Provider component for administrative movie review moderation form metadata.
 * @filename AdminReviewActionFormContextProvider.tsx
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    AdminReviewActionFormContext,
    AdminReviewActionFormContextValues
} from "@/domains/review/features/admin-actions/context/AdminReviewActionFormContext.ts";
import {ReactNode, useMemo} from "react";

/**
 * Props for the AdminReviewActionFormContextProvider.
 */
type ProviderProps = {
    /** The form content, typically a layout component or modal body. */
    children: ReactNode;
    /** The HTML 'id' attribute to synchronize the form with its submission buttons. */
    formID: string;
    /** The unique identifier of the movie review targeted for moderation. */
    reviewID: ObjectId;
};

/**
 * Context Provider to facilitate communication between moderation forms and their controls.
 * ---
 */
export const AdminReviewActionFormContextProvider = (
    {children, formID, reviewID}: ProviderProps
) => {
    const values: AdminReviewActionFormContextValues = useMemo(() => ({
        formID,
        reviewID,
    }), [formID, reviewID]);

    return (
        <AdminReviewActionFormContext.Provider value={values}>
            {children}
        </AdminReviewActionFormContext.Provider>
    );
};
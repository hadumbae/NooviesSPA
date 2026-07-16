/**
 * @fileoverview Provider component for administrative movie review moderation form metadata.
 */

import {ReactElement, ReactNode, useMemo} from "react";
import {ObjectId} from "@/common/_schemas";
import {
    AdminReviewActionFormContext,
    AdminReviewActionFormContextValues
} from "@/domains/movie-reviews/_feat/admin-actions/context/AdminReviewActionFormContext.ts";

/** Props for the AdminReviewActionFormContextProvider component. */
type ProviderProps = {
    children: ReactNode;
    formID: string;
    reviewID: ObjectId;
};

/**
 * Context Provider to facilitate communication between moderation forms and their controls. */
export function AdminReviewActionFormContextProvider(
    {children, formID, reviewID}: ProviderProps
): ReactElement {
    const values: AdminReviewActionFormContextValues = useMemo(() => ({
        formID,
        reviewID,
    }), [formID, reviewID]);

    return (
        <AdminReviewActionFormContext.Provider value={values}>
            {children}
        </AdminReviewActionFormContext.Provider>
    );
}
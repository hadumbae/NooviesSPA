/**
 * @fileoverview Layout component for the administrative actions section of the Customer Review page.
 */

import {ReactElement} from "react";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    ResetReviewDisplayNameAction,
    ResetReviewLikesAction,
    SetReviewRatingAction,
    ToggleReviewPublicityAction
} from "@/views/admin/customers/_feat";

/** Props for the CustomerReviewPageActionSection component. */
export type SectionProps = {
    reviewID: ObjectId;
    displayName: string;
    rating: number;
};

/** Renders a grid of administrative tools for moderating a specific customer review. */
export function CustomerReviewPageActionSection(
    {reviewID, displayName, rating}: SectionProps
): ReactElement {
    return (
        <section className="space-y-4">
            <PageSectionHeader>Actions</PageSectionHeader>
            <div className="grid grid-cols-2 gap-2">
                <SetReviewRatingAction
                    reviewID={reviewID}
                    presetValues={{rating}}
                />
                <ResetReviewDisplayNameAction
                    reviewID={reviewID}
                    presetValues={{displayName}}
                />
                <ResetReviewLikesAction
                    reviewID={reviewID}
                />
                <ToggleReviewPublicityAction
                    reviewID={reviewID}
                />
            </div>
        </section>
    );
}
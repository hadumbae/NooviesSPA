/**
 * @file Layout component for the administrative actions section of the Customer Review page.
 * @filename CustomerReviewPageActionSection.tsx
 */

import {PageSectionHeader} from "@/views/common/_comp/page";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    ResetReviewDisplayNameAction,
    ResetReviewLikesAction,
    SetReviewRatingAction,
    ToggleReviewPublicityAction
} from "@/views/admin/customers/_feat";

/**
 * Props for the CustomerReviewPageActionSection component.
 */
type SectionProps = {
    /** The internal database ID of the movie review. */
    reviewID: ObjectId;
    /** The current display name of the review author, used for form pre-population. */
    displayName: string;
    /** The current star rating of the review, used for form pre-population. */
    rating: number;
};

/**
 * Renders a grid of administrative tools for moderating a specific customer review.
 * ---
 */
export const CustomerReviewPageActionSection = (
    {reviewID, displayName, rating}: SectionProps
) => {
    return (
        <section className="space-y-4">
            <PageSectionHeader>Actions</PageSectionHeader>

            <div className="grid grid-cols-2 gap-2">
                {/* Manual override for the review's star rating */}
                <SetReviewRatingAction
                    reviewID={reviewID}
                    presetValues={{rating}}
                />

                {/* Reversion of author display name to system defaults */}
                <ResetReviewDisplayNameAction
                    reviewID={reviewID}
                    presetValues={{displayName}}
                />

                {/* Reset of total engagement/like metrics to zero */}
                <ResetReviewLikesAction
                    reviewID={reviewID}
                />

                {/* Visibility control (Public vs. Private) for the review */}
                <ToggleReviewPublicityAction
                    reviewID={reviewID}
                />
            </div>
        </section>
    );
};
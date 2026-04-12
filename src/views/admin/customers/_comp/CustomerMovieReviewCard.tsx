/**
 * @file Summary card component for displaying customer movie reviews in an administrative context.
 * @filename CustomerMovieReviewCard.tsx
 */

import {CustomerMovieReview} from "@/domains/review/schemas/models/customer-movie-reviews/CustomerMovieReviewSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {UniqueReviewCodeBadge} from "@/views/admin/moviereviews/components/model-badges/UniqueReviewCodeBadge.tsx";
import {
    DisplayNameBadge,
    IsReviewPublicBadge,
    MovieRatingBadge
} from "@/views/admin/moviereviews/components/model-badges";
import IsRecommendedBadge from "@/views/client/movie-reviews/components/badges/IsRecommendedBadge.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import MovieReviewText from "@/views/client/movie-reviews/components/text/MovieReviewText.tsx";

/**
 * Props for the CustomerMovieReviewCard component.
 */
type CardProps = {
    /** The review data object containing content, metadata, and author info. */
    review: CustomerMovieReview;
};

/**
 * Renders a comprehensive preview of a customer's review for administrative moderation.
 * ---
 */
export const CustomerMovieReviewCard = (
    {review}: CardProps
) => {
    const {
        uniqueCode,
        isPublic,
        isRecommended,
        summary,
        rating,
        reviewText,
        displayName,
        helpfulCount,
        createdAt
    } = review;

    const dateWritten = createdAt.toFormat("dd MMM, yyyy");

    return (
        <Card>
            <CardContent className="p-3 space-y-3">
                <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                        <UniqueReviewCodeBadge code={uniqueCode}/>
                        <IsReviewPublicBadge isPublic={isPublic}/>
                        {isRecommended && <IsRecommendedBadge/>}
                    </div>

                    <div className="space-y-1">
                        <p className="subsection-title font-bold italic">
                            "{summary}"
                        </p>
                        <MovieRatingBadge rating={rating}/>
                    </div>
                </div>

                {reviewText && (
                    <>
                        <Separator />
                        <MovieReviewText text={reviewText}/>
                    </>
                )}

                <Separator/>

                <div className="flex flex-wrap items-center justify-between gap-2">
                    <DisplayNameBadge displayName={displayName} />

                    <span className="secondary-text inline-flex items-center gap-2 text-sm font-medium max-lg:font-bold">
                        Likes • {helpfulCount} | {dateWritten}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};
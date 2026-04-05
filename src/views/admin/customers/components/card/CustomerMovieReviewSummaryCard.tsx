/**
 * @file Individual summary card for a customer's movie review, used in admin dashboards.
 * @filename CustomerMovieReviewSummaryCard.tsx
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {
    CustomerMovieReviewSummary
} from "@/domains/review/schemas/models/customer-movie-reviews/CustomerMovieReviewSummarySchema.ts";
import MovieReviewRatingStars from "@/views/client/movie-reviews/components/MovieReviewRatingStars.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {UserUniqueCode} from "@/domains/users/schemas/UserUniqueCodeSchema.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {IsRecommendedCheck} from "@/views/client/movie-reviews/components/badges/IsRecommendedCheck.tsx";

/**
 * Properties for the CustomerMovieReviewSummaryCard component.
 */
type CardProps = {
    /** The unique identification code of the customer for deep-linking. */
    code: UserUniqueCode;
    /** The summarized review data object. */
    review: CustomerMovieReviewSummary;
};

/**
 * A compact card component that displays a high-level overview of a specific movie review.
 * ---
 */
export const CustomerMovieReviewSummaryCard = (
    {code, review}: CardProps
) => {
    const {
        rating,
        summary,
        reviewText,
        isRecommended,
        helpfulCount,
        movie: {title, releaseDate},
        createdAt,
    } = review;

    const releaseYear = releaseDate ? releaseDate.toFormat("yyyy") : null;
    const dateWritten = createdAt.toUTC().toFormat("dd MMM, yyyy");

    return (
        <Card>
            <CardContent className="h-full flex flex-col p-3 space-y-2">
                {/* Header: Title and Rating */}
                <div className='flex justify-between items-start'>
                    <div className="space-y-1">
                        <h3 className="primary-text subsection-subtitle line-clamp-1">
                            {title} <span className="font-light">({releaseYear})</span>
                        </h3>
                        <MovieReviewRatingStars size={15} rating={rating}/>
                    </div>

                    {/* Badge: Recommendation status */}
                    {isRecommended && <IsRecommendedCheck size={15}/>}
                </div>

                <Separator/>

                {/* Body: Summary and Snippet */}
                <div className="primary-text flex-1">
                    <h2 className="font-extrabold line-clamp-1">{summary}</h2>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {reviewText || "No review text provided."}
                    </p>
                </div>

                <Separator/>

                {/* Footer: Metadata and Actions */}
                <div className="flex justify-between items-center text-xs secondary-text">
                    <span className="inline-flex items-center gap-2">
                        Likes • {helpfulCount} | {dateWritten}
                    </span>
                    <LoggedLink to={`/admin/customers/${code}/reviews/${review.slug}`}>
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                            Go To Details
                        </Button>
                    </LoggedLink>
                </div>
            </CardContent>
        </Card>
    );
};
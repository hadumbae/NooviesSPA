/**
 * @fileoverview Individual summary card for a customer's movie review, used in admin dashboards.
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {CustomerMovieReviewSummary} from "@/domains/movie-reviews/_schema/customer-reviews";
import {MovieReviewRatingStars} from "@/views/client/movie-reviews/_comp/display/MovieReviewRatingStars.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {UserUniqueCode} from "@/domains/users/_schema/fields/UserUniqueCodeSchema.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {IsRecommendedCheck} from "@/views/client/movie-reviews/_comp/badges/IsRecommendedCheck.tsx";
import {ReactElement} from "react";

/** Props for the CustomerMovieReviewSummaryCard component. */
type CardProps = {
    code: UserUniqueCode;
    review: CustomerMovieReviewSummary;
};

/** A compact card component that displays a high-level overview of a specific movie review. */
export function CustomerMovieReviewSummaryCard(
    {code, review}: CardProps
): ReactElement {
    const {
        rating,
        summary,
        reviewText,
        isRecommended,
        helpfulCount,
        movie: {title, releaseDate},
        uniqueCode: reviewCode,
        createdAt,
    } = review;

    const releaseYear = releaseDate ? releaseDate.toFormat("yyyy") : null;
    const dateWritten = createdAt.toUTC().toFormat("dd MMM, yyyy");

    return (
        <Card>
            <CardContent className="h-full flex flex-col p-3 space-y-2">
                <div className='flex justify-between items-start'>
                    <div className="space-y-1">
                        <h3 className="primary-text subsection-subtitle line-clamp-1">
                            {title} <span className="font-light">({releaseYear})</span>
                        </h3>
                        <MovieReviewRatingStars size={15} rating={rating}/>
                    </div>

                    {isRecommended && <IsRecommendedCheck size={15}/>}
                </div>

                <Separator/>

                <div className="primary-text flex-1">
                    <h2 className="font-extrabold line-clamp-1">{summary}</h2>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {reviewText || "No review text provided."}
                    </p>
                </div>

                <Separator/>

                <div className="flex justify-between items-center text-xs secondary-text">
                    <span className="inline-flex items-center gap-2">
                        Likes • {helpfulCount} | {dateWritten}
                    </span>
                    <LoggedLink to={`/admin/customers/${code}/reviews/${reviewCode}`}>
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                            Go To Details
                        </Button>
                    </LoggedLink>
                </div>
            </CardContent>
        </Card>
    );
}
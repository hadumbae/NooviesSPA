/**
 * @fileoverview Summary item component for displaying a single movie review in the admin user details view.
 */

import {ReactElement} from "react";
import {PopulatedMovieReview} from "@/domains/movie-reviews";
import {MoviePosterImage} from "@/views/admin/movies";
import {MovieReviewRatingStars} from "@/views/client/movie-reviews";
import {cn} from "@/common/_feat";

/** Style overrides for the AdminUserReviewListSummaryItem component. */
type ItemClassNames = {
   container?: string;
   poster?: string;
   title?: string;
} ;

/** Props for the AdminUserReviewListSummaryItem component. */
type ItemProps = {
    review: PopulatedMovieReview;
    classNames?: ItemClassNames;
};


/** Displays a concise summary of a movie review including the poster, title, and star rating. */
export function CustomerReviewListSummaryItem(
    {review, classNames}: ItemProps
): ReactElement {
    const {movie: {title: movieTitle, posterImage}, summary, rating} = review;

    return (
        <div className={cn("flex justify-start items-center space-x-4 p-2", classNames?.container)}>
            <MoviePosterImage url={posterImage?.secure_url} className={cn("w-16", classNames?.poster)}/>

            <div className="flex-1 space-y-2 min-w-0">
                <h3 className={cn("primary-text font-bold truncate", classNames?.title)}>
                    {movieTitle}
                </h3>

                <p className={cn("secondary-text text-sm font-bold truncate italic", classNames?.title)}>
                    "{summary}"
                </p>

                <MovieReviewRatingStars rating={rating}/>
            </div>
        </div>
    );
}
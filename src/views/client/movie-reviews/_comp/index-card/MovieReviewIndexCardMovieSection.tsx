/**
 * @fileoverview Sub-component for displaying movie identity and core metadata within a review card.
 */

import {MovieWithRating} from "@/domains/movies/_schema/movie/MovieWithRatingSchema.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SecondarySpan from "@/views/common/_comp/text/SecondarySpan.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {MovieReviewRatingStars} from "@/views/client/movie-reviews/_comp/display/MovieReviewRatingStars.tsx";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";
import {formatMovieData} from "@/domains/movies/_feat/formatters";
import {ReactElement} from "react";

/** Props for the MovieReviewIndexCardMovieSection component. */
type SectionProps = {
    movie: MovieWithRating;
};

/**
 * Renders a horizontal layout representing the movie identity and metadata in a review context.
 */
export function MovieReviewIndexCardMovieSection(
    {movie}: SectionProps
): ReactElement {
    const {averageRating} = movie;

    const {
        slug,
        title,
        posterImage,
        formatted: {releaseYear, genreList, duration},
    } = formatMovieData(movie);

    return (
        <section className="flex items-center gap-4">
            <SectionHeader srOnly={true}>
                Movie Review - Movie Metadata
            </SectionHeader>

            <LoggedLink to={`/browse/movies/${slug}`}>
                <MoviePosterImage
                    url={posterImage?.secure_url}
                    className="h-24"
                />
            </LoggedLink>

            <div className="space-y-2">
                <LoggedLink to={`/browse/movies/${slug}`}>
                    <PrimaryHeaderText className="hover:underline underline-offset-4">
                        {title}
                    </PrimaryHeaderText>
                </LoggedLink>

                <SecondarySpan>
                    {releaseYear} • {duration} • {genreList}
                </SecondarySpan>

                <MovieReviewRatingStars rating={averageRating} size={12}/>
            </div>
        </section>
    );
}
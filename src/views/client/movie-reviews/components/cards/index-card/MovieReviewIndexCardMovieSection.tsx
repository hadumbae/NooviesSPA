/**
 * @file Sub-component for displaying movie identity and core metadata within a review card.
 * @filename MovieReviewIndexCardMovieSection.tsx
 */

import formatMovieData from "@/domains/movies/utility/formatMovieData.ts";
import {MovieWithRating} from "@/domains/movies/schema/movie/MovieWithRatingSchema.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import PosterImage from "@/domains/movies/components/images/PosterImage.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SecondarySpan from "@/views/common/components/text/SecondarySpan.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MovieReviewRatingStars from "@/views/client/movie-reviews/components/MovieReviewRatingStars.tsx";

/**
 * Props for the {@link MovieReviewIndexCardMovieSection} component.
 */
type SectionProps = {
    /** The movie object, containing populated genres and calculated average rating. */
    movie: MovieWithRating;
};

/**
 * Renders a horizontal layout representing the movie's "identity" in a review context.
 * @param props - Component {@link SectionProps}.
 */
export const MovieReviewIndexCardMovieSection = (
    {movie}: SectionProps
) => {
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
                <PosterImage
                    src={posterImage?.secure_url}
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
};
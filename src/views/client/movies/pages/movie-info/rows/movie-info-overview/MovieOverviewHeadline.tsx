/**
 * @file Headline block for a movie detail page.
 *
 * MovieOverviewHeadline.tsx
 */

import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import buildString from "@/common/utility/buildString.ts"
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";

/**
 * Props for {@link MovieOverviewHeadline}.
 */
type HeadlineProps = {
    /**
     * Movie used to construct the headline.
     */
    movie: MovieDetails;
};

/**
 * Displays the movie title with release year and runtime.
 */
const MovieOverviewHeadline = ({ movie }: HeadlineProps) => {
    const { title, releaseDate, runtime } = movie;

    const formattedReleaseDate =
        releaseDate ? releaseDate.toFormat("yyyy") : "Unreleased";

    const formattedRuntime = formatMovieRuntime(runtime, true);

    const subtitle = buildString(
        [formattedReleaseDate, formattedRuntime],
        " • ",
    );

    return (
        <div>
            <PrimaryHeaderText>{title}</PrimaryHeaderText>
            <SecondaryHeaderText>{subtitle}</SecondaryHeaderText>
        </div>
    );
};

export default MovieOverviewHeadline;
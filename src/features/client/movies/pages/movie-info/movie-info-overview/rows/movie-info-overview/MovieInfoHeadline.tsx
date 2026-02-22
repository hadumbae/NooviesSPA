/**
 * @file MovieInfoHeadline.tsx
 *
 * @summary
 * Renders the primary title and supporting metadata headline for a movie.
 *
 * @description
 * Displays a movie’s main title along with a secondary line containing
 * high-level release information. The subtitle is composed from:
 * - Release year (or `"Unreleased"` when absent)
 * - Formatted runtime (when available)
 *
 * Values are safely combined using `buildString` to avoid empty separators.
 * This component is intended for use at the top of movie detail pages.
 *
 * @example
 * ```tsx
 * <MovieInfoHeadline movie={movie} />
 * ```
 */

import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import buildString from "@/common/utility/buildString.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import SecondaryHeaderText from "@/common/components/text/header/SecondaryHeaderText.tsx";

/**
 * Props for {@link MovieInfoHeadline}.
 */
type HeadlineProps = {
    /** Movie metadata used to construct the headline */
    movie: MovieDetails;
};

/**
 * Displays a movie title with release year and runtime.
 *
 * @param props - {@link HeadlineProps}
 * @returns A headline block with primary and secondary text
 */
const MovieInfoHeadline = ({movie}: HeadlineProps) => {
    const {title, releaseDate, runtime} = movie;

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

export default MovieInfoHeadline;

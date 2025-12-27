/**
 * @file BrowseMovieSummaryMeta.tsx
 * @description
 * Renders textual metadata for a movie summary, including title,
 * genres, release year, and runtime, with logged navigation to
 * the movie details page.
 */

import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {cn} from "@/common/lib/utils.ts";
import {
    PrimaryTextBaseCSS,
    SecondaryTextBaseCSS,
} from "@/common/constants/css/TextCSS.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import buildString from "@/common/utility/buildString.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import buildMovieContext from "@/pages/movies/utility/navigation/buildMovieContext.ts";

/**
 * Props for {@link BrowseMovieSummaryMeta}.
 */
type SummaryProps = {
    /**
     * Movie data used to render summary metadata.
     */
    movie: MovieDetails;

    className?: string;
};

/**
 * Displays core movie metadata as part of a summary view.
 *
 * Includes:
 * - Movie title as a logged navigation link
 * - Genre list
 * - Release year and runtime
 *
 * @param props - Component props.
 *
 * @example
 * ```tsx
 * <BrowseMovieSummaryMeta movie={movie} />
 * ```
 */
const BrowseMovieSummaryMeta = ({movie, className}: SummaryProps) => {
    const {
        title,
        releaseDate,
        runtime,
        genres,
        slug,
    } = movie;

    const movieContext = buildMovieContext(movie);

    const navObject = {
        to: `/browse/movies/${slug}`,
        component: BrowseMovieSummaryMeta.name,
        message: "Navigate to movie info.",
        context: {system: "CLIENT", ...movieContext},
    };

    const formattedRuntime = formatMovieRuntime(runtime, true);
    const formattedDate = releaseDate ? releaseDate.toFormat("yyyy") : null;
    const formattedMeta = buildString([formattedDate, formattedRuntime], " • ");
    const formattedGenres = buildString(genres.map((genre) => genre.name), " • ");

    return (
        <div className={cn("flex flex-col justify-center space-y-1", className)}>
            <LoggedLink
                {...navObject}
                className={cn(
                    PrimaryTextBaseCSS,
                    "hover:underline hover:underline-offset-4",
                    "font-bold text-sm",
                )}
            >
                {title}
            </LoggedLink>

            <div className="space-y-1">
                <h4 className={cn(SecondaryTextBaseCSS, "text-sm font-bold")}>
                    {formattedGenres}
                </h4>

                <h3 className={cn(SecondaryTextBaseCSS, "text-sm")}>
                    {formattedMeta}
                </h3>
            </div>
        </div>
    );
};

export default BrowseMovieSummaryMeta;

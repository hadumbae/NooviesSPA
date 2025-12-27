/**
 * @file BrowseMovieSummarySpan.tsx
 * @description
 * Compact, clickable summary row for a movie, displaying key metadata
 * and providing logged navigation to the movie details page.
 */

import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {cn} from "@/common/lib/utils.ts";
import {Image} from "lucide-react";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {
    PrimaryTextBaseCSS,
    SecondaryTextBaseCSS,
} from "@/common/constants/css/TextCSS.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import buildString from "@/common/utility/buildString.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * Props for {@link BrowseMovieSummarySpan}.
 */
type SpanProps = {
    /**
     * Movie data used to render summary information.
     */
    movie: MovieDetails;

    /**
     * Optional class name applied to the root container.
     */
    className?: string;
};

/**
 * Renders a compact movie summary with:
 * - Placeholder poster image
 * - Title link with logged navigation
 * - Genre list
 * - Release year and runtime metadata
 *
 * Both the image and title navigate to the movie details page
 * with enriched logging context.
 *
 * @param props - Component props.
 *
 * @example
 * ```tsx
 * <BrowseMovieSummarySpan movie={movie} />
 * ```
 */
const BrowseMovieSummarySpan = ({movie, className}: SpanProps) => {
    const {
        _id,
        title,
        originalTitle,
        country,
        releaseDate,
        runtime,
        genres,
        slug,
    } = movie;

    const navigate = useLoggedNavigate();

    // --- FORMATTED ---

    const formattedRuntime = formatMovieRuntime(runtime, true);
    const formattedDate = releaseDate ? releaseDate.toFormat("yyyy") : null;
    const formattedMeta = buildString([formattedDate, formattedRuntime], " • ");
    const formattedGenres = buildString(genres.map((genre) => genre.name), " • ");

    // --- NAVIGATION ---

    const navObject = {
        to: `/browse/movies/${slug}`,
        component: BrowseMovieSummarySpan.name,
        message: "Navigate to movie info.",
        context: {
            system: "CLIENT",
            _id,
            title,
            originalTitle,
            country,
            slug,
        },
    };

    /**
     * Navigates to the movie details page using logged navigation.
     */
    const navigateToDetails = () => {
        navigate(navObject);
    };

    return (
        <div className={cn("flex items-center space-x-4", className)}>
            {/* Image */}
            <section
                onClick={navigateToDetails}
                className={cn(
                    PrimaryTextBaseCSS,
                    "h-24 aspect-[2/3] border rounded-md",
                    "cursor-pointer",
                    "flex justify-center items-center",
                )}
            >
                <Image/>
            </section>

            {/* Data */}
            <section className="flex-1 flex flex-col justify-center space-y-1">
                <SectionHeader srOnly={true}>
                    Movie Details
                </SectionHeader>

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

                <h4 className={cn(SecondaryTextBaseCSS, "text-sm font-bold")}>
                    {formattedGenres}
                </h4>

                <h3 className={cn(SecondaryTextBaseCSS, "text-sm")}>
                    {formattedMeta}
                </h3>
            </section>
        </div>
    );
};

export default BrowseMovieSummarySpan;

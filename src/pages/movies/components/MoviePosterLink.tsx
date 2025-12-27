/**
 * @file MoviePosterLink.tsx
 * @description
 * Clickable movie poster component with logged navigation and
 * graceful fallbacks for missing or failed poster images.
 */

import {cn} from "@/common/lib/utils.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import buildMovieContext from "@/pages/movies/utility/navigation/buildMovieContext.ts";
import {useState} from "react";
import MoviePosterPlaceholder from "@/pages/movies/components/MoviePosterPlaceholder.tsx";
import MoviePosterErrorPlaceholder from "@/pages/movies/components/MoviePosterErrorPlaceholder.tsx";

/**
 * Props for {@link MoviePosterLink}.
 */
type PosterProps = {
    /**
     * Optional alt text for the poster image.
     */
    alt?: string;

    /**
     * Optional class name applied to the poster element.
     */
    className?: string;

    /**
     * Movie data used for navigation, logging, and poster rendering.
     */
    movie: MovieDetails;
};

/**
 * Renders a movie poster wrapped in a logged navigation link.
 *
 * Behavior:
 * - Displays a placeholder when no poster image exists
 * - Displays an error placeholder if the poster fails to load
 * - Logs navigation with movie context
 *
 * @param props Component props
 */
const MoviePosterLink = ({alt, movie, className}: PosterProps) => {
    const [hasError, setHasError] = useState<boolean>(false);
    const {slug, posterImage} = movie;

    // --- NAVIGATION ---
    const movieContext = buildMovieContext(movie);

    const navObject = {
        to: `/browse/movies/${slug}`,
        component: MoviePosterLink.name,
        message: "Navigate to movie info.",
        context: {system: "CLIENT", ...movieContext},
    };

    // --- POSTER MISSING ---
    if (!posterImage?.secure_url) {
        return (
            <LoggedLink {...navObject}>
                <MoviePosterPlaceholder className={className}/>
            </LoggedLink>
        );
    }

    // --- FAILED TO FETCH POSTER ---
    if (hasError) {
        return (
            <LoggedLink {...navObject}>
                <MoviePosterErrorPlaceholder className={className}/>
            </LoggedLink>
        );
    }

    // --- RENDER ---
    return (
        <LoggedLink {...navObject}>
            <img
                src={posterImage.secure_url}
                alt={alt}
                loading="lazy"
                onError={() => setHasError(true)}
                className={cn(
                    "aspect-[2/3] rounded-md",
                    className
                )}
            />
        </LoggedLink>
    );
};

export default MoviePosterLink;

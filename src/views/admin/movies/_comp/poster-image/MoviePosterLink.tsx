/** @fileoverview Clickable movie poster component that handles logged navigation and image fallbacks. */

import {cn} from "@/common/lib/utils.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {ReactElement, useState} from "react";
import {BrokenPosterImagePlaceholder} from "@/views/admin/movies/_comp/poster-image/BrokenPosterImagePlaceholder.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {HasNoMoviePosterPlaceholder} from "@/views/admin/movies/_comp/poster-image/HasNoMoviePosterPlaceholder.tsx";
import {buildMovieContext} from "@/domains/movies/_feat/navigation";

/** Props for the MoviePosterLink component. */
type PosterProps = {
    alt?: string;
    className?: string;
    movie: MovieDetails;
};

/**
 * Renders a movie poster wrapped in a navigation link that logs user interaction.
 */
export function MoviePosterLink({alt, movie, className}: PosterProps): ReactElement {
    const [hasError, setHasError] = useState<boolean>(false);
    const {slug, posterImage} = movie;

    const movieContext = buildMovieContext(movie);

    const navObject = {
        to: `/browse/movies/${slug}`,
        component: MoviePosterLink.name,
        message: "Navigate to movie info.",
        context: {system: "CLIENT", ...movieContext},
    };

    if (!posterImage?.secure_url) {
        return (
            <LoggedLink {...navObject}>
                <HasNoMoviePosterPlaceholder className={className}/>
            </LoggedLink>
        );
    }

    if (hasError) {
        return (
            <LoggedLink {...navObject}>
                <BrokenPosterImagePlaceholder className={className}/>
            </LoggedLink>
        );
    }

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
}
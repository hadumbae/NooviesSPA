/** @fileoverview Clickable movie poster component that handles logged navigation and image fallbacks. */

import {cn} from "@/common/lib/utils.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {ReactElement, useState} from "react";
import {HasNoMoviePosterPlaceholder} from "@/views/admin/movies/_comp/poster-image/HasNoMoviePosterPlaceholder.tsx";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {URLString} from "@/common/schema/strings/URLStringSchema.ts";

/** Props for the MoviePosterLink component. */
type PosterProps = {
    alt?: string;
    className?: string;
    slug: SlugString;
    url?: URLString | null;
};

/**
 * Renders a movie poster wrapped in a navigation link that logs user interaction.
 */
export function MoviePosterLink({className, alt, slug, url}: PosterProps): ReactElement {
    const [hasError, setHasError] = useState<boolean>(false);

    const navObject = {
        to: `/browse/movies/${slug}`,
        component: MoviePosterLink.name,
        message: "Navigate to movie info.",
        context: {system: "CLIENT", slug},
    };

    if (!url || hasError) {
        return (
            <LoggedLink {...navObject}>
                <HasNoMoviePosterPlaceholder
                    className={className}
                    hasError={hasError}
                />
            </LoggedLink>
        );
    }

    return (
        <LoggedLink {...navObject}>
            <img
                src={url}
                alt={alt}
                loading="lazy"
                onError={() => setHasError(true)}
                className={cn(
                    "object-center object-cover rounded-md",
                    className
                )}
            />
        </LoggedLink>
    );
}
/** @fileoverview Clickable movie poster component that handles logged navigation and image fallbacks. */

import {cn} from "@/common/lib/utils.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {ReactElement, useState} from "react";
import {HasNoMoviePosterPlaceholder} from "@/views/admin/movies/_comp/poster-image/HasNoMoviePosterPlaceholder.tsx";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {CloudinaryImage} from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";

/** Props for the MoviePosterLink component. */
type PosterProps = {
    alt?: string;
    className?: string;
    slug: SlugString;
    image?: CloudinaryImage | null;
};

/**
 * Renders a movie poster wrapped in a navigation link that logs user interaction.
 */
export function MoviePosterLink({className, alt, slug, image}: PosterProps): ReactElement {
    const [hasError, setHasError] = useState<boolean>(false);

    const navObject = {
        to: `/browse/movies/${slug}`,
        component: MoviePosterLink.name,
        message: "Navigate to movie info.",
        context: {system: "CLIENT", slug},
    };

    if (!image || hasError) {
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
                src={image.secure_url}
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
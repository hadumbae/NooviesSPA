/** @fileoverview Base movie poster image component with integrated loading and error state management. */

import {ReactElement, useState} from 'react';
import {BrokenPosterImagePlaceholder} from "@/views/admin/movies/_comp/poster-image/BrokenPosterImagePlaceholder.tsx";
import {cn} from "@/common/lib/utils.ts";
import {HasNoMoviePosterPlaceholder} from "@/views/admin/movies/_comp/poster-image/HasNoMoviePosterPlaceholder.tsx";

/** Props for the MoviePosterImage component. */
type ImageProps = {
    src?: string | null;
    alt?: string;
    className?: string;
};

/**
 * Renders a movie poster image with graceful fallbacks.
 */
export function MoviePosterImage({src, alt, className}: ImageProps): ReactElement {
    const [hasError, setHasError] = useState<boolean>(false);

    if (!src) {
        return (
            <HasNoMoviePosterPlaceholder
                className={className}
            />
        );
    }

    if (hasError) {
        return (
            <BrokenPosterImagePlaceholder
                className={className}
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setHasError(true)}
            className={cn(
                "aspect-[2/3] rounded-md",
                className
            )}
        />
    );
}
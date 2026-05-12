/** @fileoverview Movie poster image component with integrated loading and error state management. */

import {ReactElement, useState} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {HasNoMoviePosterPlaceholder} from "@/views/admin/movies/_comp/poster-image/HasNoMoviePosterPlaceholder.tsx";
import {URLString} from "@/common/schema/strings/URLStringSchema.ts";

/** Props for the MoviePosterImage component. */
type ImageProps = {
    url?: URLString | null;
    alt?: string;
    className?: string;
};

/** Renders a movie poster image with fallbacks for missing or broken assets. */
export function MoviePosterImage({url, alt, className}: ImageProps): ReactElement {
    const [hasError, setHasError] = useState<boolean>(false);

    if (!url || hasError) {
        return (
            <HasNoMoviePosterPlaceholder
                className={className}
                hasError={hasError}
            />
        );
    }

    return (
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
    );
}
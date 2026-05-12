/** @fileoverview Movie poster component with fallback states and a zoomable dialog view. */

import {ReactElement, useState} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {Dialog, DialogContent, DialogTrigger} from "@/common/components/ui/dialog.tsx";
import {HasNoMoviePosterPlaceholder} from "@/views/admin/movies/_comp/poster-image/HasNoMoviePosterPlaceholder.tsx";

/** Props for the MoviePosterImageDialog component. */
type PosterProps = {
    url?: string | null;
    alt?: string;
    className?: string;
    disableDialog?: boolean;
};

/**
 * Renders a movie poster image that handles loading errors and missing sources.
 */
export function MoviePosterImageDialog(
    {url, alt, className, disableDialog}: PosterProps
): ReactElement {
    const [hasError, setHasError] = useState<boolean>(false);

    if (!url || hasError) {
        return (
            <HasNoMoviePosterPlaceholder
                className={className}
                hasError={hasError}
            />
        );
    }

    const posterComponent = (
        <img
            src={url}
            alt={alt}
            loading="lazy"
            onError={() => setHasError(true)}
            className={cn(
                "object-cover object-center rounded-md",
                className
            )}
        />
    );

    if (disableDialog) {
        return posterComponent;
    }

    return (
        <Dialog>
            <DialogTrigger asChild className="hover:cursor-pointer object-cover">
                {posterComponent}
            </DialogTrigger>

            <DialogContent className="p-0 bg-transparent border-0">
                <img
                    src={url}
                    alt={alt}
                    loading="lazy"
                    onError={() => setHasError(true)}
                    className={cn("w-full")}
                />
            </DialogContent>
        </Dialog>
    );
}
/** @fileoverview Movie poster component with fallback states and a zoomable dialog view. */

import {ReactElement, useState} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {Dialog, DialogContent, DialogTrigger} from "@/common/components/ui/dialog.tsx";
import {BrokenPosterImagePlaceholder} from "@/views/admin/movies/_comp/poster-image/BrokenPosterImagePlaceholder.tsx";
import {HasNoMoviePosterPlaceholder} from "@/views/admin/movies/_comp/poster-image/HasNoMoviePosterPlaceholder.tsx";

/** Props for the MoviePosterImageDialog component. */
type PosterProps = {
    src: string | null | undefined;
    alt?: string;
    className?: string;
    disableDialog?: boolean;
};

/**
 * Renders a movie poster image that handles loading errors and missing sources.
 */
export function MoviePosterImageDialog(
    {src, alt, className, disableDialog}: PosterProps
): ReactElement {
    const [hasError, setHasError] = useState<boolean>(false);

    if (!src) {
        return <HasNoMoviePosterPlaceholder className={className}/>;
    }

    if (hasError) {
        return <BrokenPosterImagePlaceholder className={className}/>;
    }

    const posterComponent = (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setHasError(true)}
            className={cn(
                "aspect-[2/3] rounded-md",
                "w-16",
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
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onError={() => setHasError(true)}
                    className={cn("w-full")}
                />
            </DialogContent>
        </Dialog>
    );
}
import { FC, useState } from 'react';
import { cn } from "@/common/lib/utils.ts";
import { Dialog, DialogContent, DialogTrigger } from "@/common/components/ui/dialog.tsx";
import MoviePosterPlaceholder from "@/pages/movies/components/MoviePosterPlaceholder.tsx";
import MoviePosterErrorPlaceholder from "@/pages/movies/components/MoviePosterErrorPlaceholder.tsx";

/**
 * Props for the {@link MoviePosterImage} component.
 */
type PosterProps = {
    /**
     * The URL of the movie poster image.
     * If `null` or `undefined`, a placeholder will be displayed instead.
     */
    src: string | null | undefined;

    /**
     * Alternative text for the image, used for accessibility and when the image cannot load.
     */
    alt?: string;

    /**
     * Additional class names applied to the image element for styling customization.
     */
    className?: string;

    /**
     * Disables the dialog popup when `true`.
     * When disabled, the image is rendered directly without enlarging on click.
     */
    disableDialog?: boolean;
};

/**
 * Displays a movie poster image with built-in fallback and error handling.
 *
 * - If no image source is provided, renders a generic placeholder.
 * - If the image fails to load, renders an error placeholder.
 * - When not disabled, clicking the image opens it in a fullscreen-style dialog for detailed viewing.
 *
 * @example
 * ```tsx
 * <MoviePosterImage
 *   src={movie.posterUrl}
 *   alt={movie.title}
 *   className="w-32"
 * />
 * ```
 */
const MoviePosterImage: FC<PosterProps> = (props) => {
    const [hasError, setHasError] = useState<boolean>(false);
    const { src, alt, className, disableDialog } = props;

    // Display a placeholder if no source is provided
    if (!src) {
        return <MoviePosterPlaceholder className={className} />;
    }

    // Display an error placeholder if the image failed to load
    if (hasError) {
        return <MoviePosterErrorPlaceholder className={className} />;
    }

    // The base image element, reused in both inline and dialog modes
    const imgComponent = (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setHasError(true)}
            className={cn(
                "aspect-[2/3] rounded-md",
                "w-28 xl:w-44",
                className
            )}
        />
    );

    // Render static image if dialog is disabled
    if (disableDialog) {
        return imgComponent;
    }

    // Render image inside a dialog for zoomed view
    return (
        <Dialog>
            <DialogTrigger asChild className="hover:cursor-pointer object-cover">
                {imgComponent}
            </DialogTrigger>

            <DialogContent className="p-0 bg-transparent border-0">
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onError={() => setHasError(true)}
                    className={cn("w-full", className)}
                />
            </DialogContent>
        </Dialog>
    );
};

export default MoviePosterImage;

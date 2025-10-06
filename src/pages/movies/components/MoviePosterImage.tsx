import { FC, useState } from 'react';
import { cn } from "@/common/lib/utils.ts";
import { Dialog, DialogContent, DialogTrigger } from "@/common/components/ui/dialog.tsx";
import MoviePosterPlaceholder from "@/pages/movies/components/MoviePosterPlaceholder.tsx";

/**
 * Props for the `MoviePosterImage` component.
 */
type PosterProps = {
    /** The URL of the movie poster image. Can be `null` or `undefined`. */
    src: string | null | undefined;

    /** The alt text for the image, for accessibility purposes. */
    alt?: string;

    /** Additional CSS class names to apply to the image container. */
    className?: string;

    /**
     * If `true`, disables the dialog/modal feature.
     * When disabled, the poster image is rendered as-is without click-to-enlarge functionality.
     */
    disableDialog?: boolean;
};

/**
 * Displays a movie poster image with optional click-to-enlarge dialog.
 *
 * @remarks
 * - If `src` is missing or fails to load, a fallback placeholder with a film icon is displayed.
 * - When `disableDialog` is `false` or not provided, clicking the poster opens a dialog
 *   showing a larger version of the image.
 * - The component uses `useState` to track image load errors.
 *
 * @param props - The properties for the poster image component.
 *
 * @example
 * ```tsx
 * <MoviePosterImage src="https://example.com/poster.jpg" alt="Movie Poster" />
 * ```
 */
const MoviePosterImage: FC<PosterProps> = (props) => {
    const [hasError, setHasError] = useState<boolean>(false);
    const { src, alt, className, disableDialog } = props;

    // Fallback placeholder if no image or image fails to load
    if (!src || hasError) {
        return (
            <MoviePosterPlaceholder className={className} />
        );
    }

    // Image component for both inline and dialog display
    const imgComponent = (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setHasError(true)}
            className={cn(
                "aspect-[2/3] w-16 rounded-md",
                className
            )}
        />
    );

    // Render image without dialog if disabled
    if (disableDialog) {
        return imgComponent;
    }

    // Render image with click-to-enlarge dialog
    return (
        <Dialog>
            <DialogTrigger asChild className="hover:cursor-pointer">
                {imgComponent}
            </DialogTrigger>

            <DialogContent className="aspect-[2/3] w-96 p-0 bg-transparent border-0">
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onError={() => setHasError(true)}
                    className={cn(
                        "w-full",
                        className
                    )}
                />
            </DialogContent>
        </Dialog>
    );
};

export default MoviePosterImage;

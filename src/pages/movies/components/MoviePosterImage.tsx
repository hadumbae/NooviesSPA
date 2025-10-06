import { FC, useState } from 'react';
import { cn } from "@/common/lib/utils.ts";
import { Dialog, DialogContent, DialogTrigger } from "@/common/components/ui/dialog.tsx";
import MoviePosterPlaceholder from "@/pages/movies/components/MoviePosterPlaceholder.tsx";
import MoviePosterErrorPlaceholder from "@/pages/movies/components/MoviePosterErrorPlaceholder.tsx";

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
     * If `true`, disables the click-to-enlarge dialog.
     * When disabled, the poster image is rendered inline without a modal.
     */
    disableDialog?: boolean;
};

/**
 * Displays a movie poster image with optional click-to-enlarge dialog.
 *
 * @remarks
 * - If `src` is `null` or `undefined`, a `MoviePosterPlaceholder` is rendered.
 * - If the image fails to load, a `MoviePosterErrorPlaceholder` is displayed.
 * - By default, clicking the image opens a dialog with a larger version.
 * - Use `disableDialog={true}` to render the image without a dialog.
 * - Tracks load errors using React `useState`.
 *
 * @param props - The properties for the poster image component.
 * @param props.src - URL of the poster image.
 * @param props.alt - Alt text for accessibility.
 * @param props.className - Optional additional CSS classes.
 * @param props.disableDialog - Optional flag to disable the dialog/modal.
 *
 * @example
 * ```tsx
 * // Renders a poster with dialog enabled
 * <MoviePosterImage src="https://example.com/poster.jpg" alt="Movie Poster" />
 *
 * // Renders a poster without a dialog
 * <MoviePosterImage src="https://example.com/poster.jpg" alt="Movie Poster" disableDialog />
 *
 * // Renders a placeholder if no image URL is provided
 * <MoviePosterImage src={null} />
 * ```
 */
const MoviePosterImage: FC<PosterProps> = (props) => {
    const [hasError, setHasError] = useState<boolean>(false);
    const { src, alt, className, disableDialog } = props;

    // Render placeholder if no image URL
    if (!src) {
        return <MoviePosterPlaceholder className={className} />;
    }

    // Render error placeholder if image failed to load
    if (hasError) {
        return <MoviePosterErrorPlaceholder className={className} />;
    }

    // Image element used for inline and dialog display
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

    // Render image inline without dialog if disabled
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

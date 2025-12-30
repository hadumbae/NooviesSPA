/**
 * @file PosterImage.tsx
 * @description
 * Renders a movie poster image with graceful fallbacks for missing
 * or failed image sources.
 *
 * - Displays a placeholder when no source is provided.
 * - Displays an error placeholder if the image fails to load.
 * - Lazily loads valid poster images.
 */
import {useState} from 'react';
import MoviePosterPlaceholder from "@/pages/movies/components/MoviePosterPlaceholder.tsx";
import MoviePosterErrorPlaceholder from "@/pages/movies/components/MoviePosterErrorPlaceholder.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for {@link PosterImage}.
 */
type ImageProps = {
    /** Poster image URL */
    src?: string;
    /** Alternative text for accessibility */
    alt?: string;
    /** Optional image class name */
    className?: string;
};

/**
 * Displays a movie poster image with built-in fallback states.
 *
 * @param props - {@link ImageProps}
 * @returns A poster image, placeholder, or error placeholder
 *
 * @example
 * ```tsx
 * <PosterImage src={posterUrl} alt={title} />
 * ```
 */
const PosterImage = ({src, alt, className}: ImageProps) => {
    const [hasError, setHasError] = useState<boolean>(false);

    // --- NO POSTER ---
    if (!src) {
        return (
            <MoviePosterPlaceholder
                className={className}
            />
        );
    }

    // --- ERROR LOADING ---
    if (hasError) {
        return (
            <MoviePosterErrorPlaceholder
                className={className}
            />
        );
    }

    // --- POSTER IMAGE ---
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
};

export default PosterImage;

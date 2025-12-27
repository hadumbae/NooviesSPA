import { FC } from 'react';
import { cn } from "@/common/lib/utils.ts";
import { Film } from "lucide-react";

/**
 * Props for the `MoviePosterPlaceholder` component.
 */
type PlaceholderProps = {
    /** Optional additional CSS classes to apply to the placeholder container. */
    className?: string;
};

/**
 * A simple placeholder component for a movie poster.
 *
 * @remarks
 * - Displays a gray box with a film icon in the center.
 * - Used when a movie poster image is unavailable or still loading.
 *
 * @param props - The component props.
 * @param props.className - Additional CSS classes for custom styling.
 *
 * @example
 * ```tsx
 * <MoviePosterPlaceholder className="w-24" />
 * ```
 */
const MoviePosterPlaceholder: FC<PlaceholderProps> = ({ className }) => {
    return (
        <div className={cn(
            "bg-gray-600 aspect-[2/3] rounded-md",
            "flex items-center justify-center",
            className
        )}>
            <Film className="text-gray-400" />
        </div>
    );
};

export default MoviePosterPlaceholder;

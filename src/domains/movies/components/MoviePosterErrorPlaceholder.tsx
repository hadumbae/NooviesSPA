import { FC } from 'react';
import { cn } from "@/common/lib/utils.ts";
import { CircleSlash } from "lucide-react";

/**
 * Props for the `MoviePosterErrorPlaceholder` component.
 */
type ErrorPlaceholderProps = {
    /** Optional additional CSS classes to apply to the placeholder container. */
    className?: string;
};

/**
 * A placeholder component displayed when a movie poster image fails to load.
 *
 * @remarks
 * - Shows a gray box with a `CircleSlash` icon centered inside.
 * - Intended to visually indicate an error or broken image.
 *
 * @param props - The component props.
 * @param props.className - Optional additional CSS classes for styling.
 *
 * @example
 * ```tsx
 * <MoviePosterErrorPlaceholder className="w-24" />
 * ```
 */
const MoviePosterErrorPlaceholder: FC<ErrorPlaceholderProps> = ({ className }) => {
    return (
        <div className={cn(
            "bg-gray-600 aspect-[2/3] rounded-md",
            "flex items-center justify-center",
            className
        )}>
            <CircleSlash className="text-gray-400" />
        </div>
    );
};

export default MoviePosterErrorPlaceholder;

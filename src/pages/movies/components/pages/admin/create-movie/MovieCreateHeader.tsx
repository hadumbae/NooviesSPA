import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the `MovieCreateHeader` component.
 */
type HeaderProps = {
    /**
     * Optional additional CSS classes to apply to the header element.
     */
    className?: string;
};

/**
 * `MovieCreateHeader` is a header component for the "Create Movies" page.
 *
 * It displays a title and a description to guide users in creating new movies.
 *
 * @param {HeaderProps} props - Props for the component.
 * @param {string} [props.className] - Optional additional CSS classes for the header.
 *
 * @example
 * ```tsx
 * <MovieCreateHeader className="mb-4" />
 * ```
 */
const MovieCreateHeader: FC<HeaderProps> = ({className}) => {
    return (
        <header className={cn("flex flex-col space-y-1", className)}>
            <HeaderTitle>
                Create Movies
            </HeaderTitle>
            <HeaderDescription>
                Enter details and press on `Submit` to create movies.
            </HeaderDescription>
        </header>
    );
};

export default MovieCreateHeader;

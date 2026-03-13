import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

type HeaderProps = {
    /**
     * Optional CSS class applied to the header element.
     *
     * Useful for adjusting spacing, layout, or styling when
     * used inside different page layouts.
     */
    className?: string;
};

/**
 * Page header component for the "Create Genre" page.
 *
 * Displays:
 * - A primary title (`Create Genre`)
 * - A short description guiding the user through the form purpose.
 *
 * Intended to be placed at the top of the "Create Genre" form page.
 *
 * @param {HeaderProps} props - The header configuration.
 *
 * @example
 * ```tsx
 * <GenreCreateHeader className="mb-6" />
 * ```
 */
const GenreCreateHeader: FC<HeaderProps> = ({className}) => {
    return (
        <header className={className}>
            <HeaderTitle>Create Genre</HeaderTitle>
            <HeaderDescription>
                Define a new movie genre by providing its name and description. Click on `Submit` to continue.
            </HeaderDescription>
        </header>
    );
};

export default GenreCreateHeader;
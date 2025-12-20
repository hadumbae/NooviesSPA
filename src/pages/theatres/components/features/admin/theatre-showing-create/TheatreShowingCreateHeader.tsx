/**
 * @file TheatreShowingCreateHeader.tsx
 *
 * @summary
 * Header component for the theatre showing creation page.
 *
 * @description
 * Displays the theatre name as the page title along with a short description
 * indicating that the page is used to create showings for the selected theatre.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

/**
 * Props for {@link TheatreShowingCreateHeader}.
 */
type HeaderProps = {
    /**
     * Display name of the theatre.
     */
    theatreName: string;
};

/**
 * Renders the header section for creating showings under a specific theatre.
 *
 * @param props - Component props.
 * @returns A page header containing the theatre name and a description.
 */
const TheatreShowingCreateHeader = (props: HeaderProps) => {
    const {theatreName} = props;

    return (
        <header>
            <HeaderTitle>{theatreName} | Showings</HeaderTitle>
            <HeaderDescription>
                Create showings for theatre here.
            </HeaderDescription>
        </header>
    );
};

export default TheatreShowingCreateHeader;

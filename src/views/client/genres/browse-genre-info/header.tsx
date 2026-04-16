/**
 * @fileoverview Header component for a specific Genre's information page.
 * Displays the genre's name as the primary title and labels the page type.
 */

import {ReactElement} from "react";
import HeaderTitle from "../../../../common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "../../../../common/components/page/headers/HeaderDescription.tsx";

/**
 * Props for the {@link BrowseGenreInfoPageHeader} component.
 */
type HeaderProps = {
    /** The display name of the genre (e.g., "Action", "Horror"). */
    name: string;
};

/**
 * Renders the header section for a single genre's detail or browse page.
 */
export function BrowseGenreInfoPageHeader(
    {name}: HeaderProps
): ReactElement {
    return (
        <header>
            <HeaderTitle>{name}</HeaderTitle>
            <HeaderDescription>Genre</HeaderDescription>
        </header>
    );
}
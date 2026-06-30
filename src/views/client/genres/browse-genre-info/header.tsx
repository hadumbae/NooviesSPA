/**
 * @fileoverview Header component for a specific Genre's information page.
 * Displays the genre's name as the primary title and labels the page type.
 */

import {ReactElement} from "react";
import {HeaderDescription, HeaderTitle} from "@/views/common/_comp/page-headers";

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
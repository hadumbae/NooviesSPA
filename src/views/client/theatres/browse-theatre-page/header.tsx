/**
 * @fileoverview Header component for the theatre browsing page.
 */

import {ReactElement} from "react";
import {HeaderDescription, HeaderTitle} from "@/common/components/page/headers";

/**
 * Displays the title and description for the theatre list view.
 */
export function BrowseTheatreListPageHeader(): ReactElement {
    return (
        <header>
            <HeaderTitle>Theatres</HeaderTitle>
            <HeaderDescription>Theatres Near You</HeaderDescription>
        </header>
    );
}
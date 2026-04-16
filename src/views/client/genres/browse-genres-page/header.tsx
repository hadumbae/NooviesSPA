/**
 * @fileoverview Header component for the Browse Genres page.
 * Provides semantic structure and descriptive text for the page top.
 */

import {ReactElement} from "react";
import HeaderTitle from "../../../../common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "../../../../common/components/page/headers/HeaderDescription.tsx";

/**
 * Renders the primary heading and sub-description for the genres browsing view.
 */
export function BrowseGenresPageHeader(): ReactElement {
    return (
        <header>
            <HeaderTitle>Genres</HeaderTitle>
            <HeaderDescription>Browse</HeaderDescription>
        </header>
    );
}
/**
 * @fileoverview Header component for the movie browsing page.
 */

import {ReactElement} from "react";
import {HeaderDescription, HeaderTitle} from "@/common/components/page/headers";

/** Header component that displays the title and description for the movie browser. */
export function BrowseMoviesPageHeader(): ReactElement {
    return (
        <header>
            <HeaderTitle>Browse The Movies!</HeaderTitle>
            <HeaderDescription>
                From timeless classics to the latest releases — find them all here.
            </HeaderDescription>
        </header>
    );
}

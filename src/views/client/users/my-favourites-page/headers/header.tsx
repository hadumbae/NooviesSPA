/**
 * @fileoverview Header component for the user's personal movie favourites page.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {ReactElement} from "react";

/** Displays the title and description for the My Favourites page. */
export function MyFavouritesPageHeader(): ReactElement {
    return (
        <header>
            <HeaderTitle>My Favourites</HeaderTitle>
            <HeaderDescription>All your favourite movies in one place.</HeaderDescription>
        </header>
    );
}

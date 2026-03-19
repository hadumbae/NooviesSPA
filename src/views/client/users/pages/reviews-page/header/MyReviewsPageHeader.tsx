/**
 * @file Header component for the user's personal movie reviews index.
 * @filename MyReviewsPageHeader.tsx
 */

import {ReactElement} from "react";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

/**
 * Renders the semantic `<header>` section for the Movie Reviews page.
 * @returns {ReactElement} The rendered header block.
 */
const MyReviewsPageHeader = (): ReactElement => {
    return (
        <header>
            <HeaderTitle>My Reviews</HeaderTitle>
            <HeaderDescription>An Index Of All Your Reviews</HeaderDescription>
        </header>
    );
};

export default MyReviewsPageHeader;
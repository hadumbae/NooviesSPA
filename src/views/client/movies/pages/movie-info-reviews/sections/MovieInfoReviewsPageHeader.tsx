/**
 * @file Header component for the Movie Reviews page.
 *
 * MovieInfoReviewsPageHeader.tsx
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import PosterImage from "@/domains/movies/components/images/PosterImage.tsx";
import {URLString} from "@/common/schema/strings/URLStringSchema.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/**
 * Props for MovieInfoReviewsPageHeader.
 */
type HeaderProps = {
    /**
     * Optional poster image URL for the movie.
     */
    posterURL?: URLString;

    /**
     * Slug identifier for the movie.
     * Used to navigate back to the movie detail page.
     */
    movieSlug: string;

    /**
     * Display title of the movie.
     */
    movieTitle: string;
};

/**
 * Renders the header section for the Movie Info Reviews page.
 */
const MovieInfoReviewsPageHeader = (
    {movieSlug, movieTitle, posterURL}: HeaderProps
) => {
    return (
        <header className="flex space-x-4 items-end">
            <LoggedLink to={`/browse/movies/${movieSlug}`}>
                <PosterImage src={posterURL} className="h-28"/>
            </LoggedLink>

            <div className="space-y-1 py-3">
                <HeaderDescription className="text-sm">{movieTitle}</HeaderDescription>
                <HeaderTitle className="text-2xl">Movie Reviews</HeaderTitle>
            </div>
        </header>
    );
};

export default MovieInfoReviewsPageHeader;
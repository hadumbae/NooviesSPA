/**
 * @file Header component for movie information pages.
 * @filename MovieInfoHeader.tsx
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import PosterImage from "@/pages/movies/components/images/PosterImage.tsx";
import {URLString} from "@/common/schema/strings/URLStringSchema.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/**
 * Component props.
 */
type MovieInfoHeaderProps = {
    /** Poster image URL */
    posterURL?: URLString;

    /** Movie slug used for navigation */
    movieSlug: string;

    /** Movie title displayed in the header */
    movieTitle: string;

    /** Page title displayed below the movie title */
    pageText: string;
};

/**
 * Displays a movie context header with poster and page title.
 */
const MovieInfoHeader = (
    {movieSlug, movieTitle, posterURL, pageText}: MovieInfoHeaderProps
) => {
    return (
        <header className="flex space-x-4 items-end">
            <LoggedLink to={`/browse/movies/${movieSlug}`}>
                <PosterImage src={posterURL} className="h-28"/>
            </LoggedLink>

            <div className="space-y-1 py-3">
                <HeaderDescription className="text-sm">{movieTitle}</HeaderDescription>
                <HeaderTitle className="text-2xl">{pageText}</HeaderTitle>
            </div>
        </header>
    );
};

export default MovieInfoHeader;
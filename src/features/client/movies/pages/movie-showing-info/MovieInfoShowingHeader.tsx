/**
 * @file MovieInfoShowingHeader.tsx
 *
 * Header component for movie-related showing pages.
 *
 * @remarks
 * Displays the movie title (optionally including release year)
 * as a navigable link back to the movie detail page, along with
 * a static "Showings" section label.
 *
 * Formatting logic:
 * - Appends the release year when available
 * - Omits the year gracefully when `releaseDate` is undefined or null
 */

import {DateTime} from "luxon";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import buildString from "@/common/utility/buildString.ts";

/**
 * Props for {@link MovieInfoShowingHeader}.
 */
type HeaderProps = {
    /** Movie display title. */
    movieTitle: string;

    /** Slug used for linking to the movie detail page. */
    movieSlug: string;

    /** Optional movie release date. */
    releaseDate?: DateTime | null;
};

/**
 * Renders the header section for movie showing pages.
 *
 * @param props - Header props.
 * @returns Movie showing header element.
 */
const MovieInfoShowingHeader = (
    {movieTitle, movieSlug, releaseDate}: HeaderProps
) => {
    const titleString = buildString([
        movieTitle,
        releaseDate && `(${releaseDate.toFormat("yyyy")})`,
    ]);

    return (
        <header>
            <HeaderTitle>
                <LoggedLink
                    to={`/browse/movies/${movieSlug}`}
                    className="hover:underline underline-offset-4"
                >
                    {titleString}
                </LoggedLink>
            </HeaderTitle>

            <HeaderDescription>Showings</HeaderDescription>
        </header>
    );
};

export default MovieInfoShowingHeader;

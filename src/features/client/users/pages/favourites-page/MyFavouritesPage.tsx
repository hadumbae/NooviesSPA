/**
 * @file Favourites page container.
 * MyFavouritesPage.tsx
 */

import {FC} from 'react';
import useTitle from "@/common/hooks/document/useTitle.ts";
import {useFetchCurrentUserFavourites} from "@/domains/users/fetch/favourites/useFetchCurrentUserFavourites.ts";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import MyFavouritesPageContent from "@/features/client/users/pages/favourites-page/MyFavouritesPageContent.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {PaginatedMovieDetailsSchema} from "@/domains/movies/schema/movie/Movie.schema.ts";
import {PaginatedMovieDetails} from "@/domains/movies/schema/movie/Movie.types.ts";

/** Number of favourite movies displayed per page. */
const MOVIES_PER_PAGE = 20;

/**
 * Displays the user's favourite movies page.
 *
 * @remarks
 * - Sets the browser document title to "My Favourites".
 * - Reads and controls pagination state from URL search params.
 * - Fetches the current user's favourite movies using pagination.
 * - Validates the API response against `PaginatedMovieDetailsSchema`.
 * - Renders {@link MyFavouritesPageContent} once validated data is available.
 *
 * @returns A validated favourites page view with pagination support.
 */
const MyFavouritesPage: FC = () => {
    useTitle('My Favourites');

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const query = useFetchCurrentUserFavourites({page, perPage: MOVIES_PER_PAGE});

    return (
        <ValidatedDataLoader query={query} schema={PaginatedMovieDetailsSchema}>
            {({items: movies, totalItems}: PaginatedMovieDetails) => (
                <MyFavouritesPageContent
                    page={page}
                    perPage={MOVIES_PER_PAGE}
                    setPage={setPage}
                    totalItems={totalItems}
                    movies={movies}
                />
            )}
        </ValidatedDataLoader>
    );
};

export default MyFavouritesPage;
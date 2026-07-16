/**
 * @fileoverview Container component for the user's favourite movies page.
 */

import {ReactElement} from 'react';
import {useTitle} from "@/common/_feat";
import {
    useFetchCurrentUserFavourites
} from "@/domains/users/_feat/manage-user-favourites/hooks/useFetchCurrentUserFavourites.ts";
import useParsedPaginationValue from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {MyFavouritesPageContent} from "@/views/client/users/my-favourites-page/content.tsx";
import {MovieDetails} from "@/domains/movies/_schema/movie";
import {PaginatedItems} from "@/common/types";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";

/** Number of favourite movies displayed per page. */
const MOVIES_PER_PAGE = 20;

/**
 * Renders the My Favourites page with paginated movie data.
 */
export function MyFavouritesPage(): ReactElement {
    useTitle('My Favourites');

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const query = useFetchCurrentUserFavourites({page, perPage: MOVIES_PER_PAGE});

    return (
        <QueryDataLoader query={query}>
            {({items: movies, totalItems}: PaginatedItems<MovieDetails>) => (
                <MyFavouritesPageContent
                    page={page}
                    perPage={MOVIES_PER_PAGE}
                    setPage={setPage}
                    totalItems={totalItems}
                    movies={movies}
                />
            )}
        </QueryDataLoader>
    );
}
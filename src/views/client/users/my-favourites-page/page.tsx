/**
 * @fileoverview Container component for the user's favourite movies page.
 */

import {ReactElement} from 'react';
import useTitle from "@/common/hooks/document/useTitle.ts";
import {useFetchCurrentUserFavourites} from "@/domains/users/_feat/manage-user-favourites/hooks/useFetchCurrentUserFavourites.ts";
import useParsedPaginationValue
    from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {MyFavouritesPageContent} from "@/views/client/users/my-favourites-page/content.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/schema/movie";
import {PaginatedItems} from "@/common/types";

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
        <ValidatedDataLoader query={query} schema={generatePaginationSchema(MovieDetailsSchema)}>
            {({items: movies, totalItems}: PaginatedItems<MovieDetails>) => (
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
}
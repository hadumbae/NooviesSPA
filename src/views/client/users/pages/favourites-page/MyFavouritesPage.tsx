/**
 * @fileoverview Container component for the user's favourite movies page.
 */

import {ReactElement} from 'react';
import useTitle from "@/common/hooks/document/useTitle.ts";
import {useFetchCurrentUserFavourites} from "@/domains/users/fetch/favourites/useFetchCurrentUserFavourites.ts";
import useParsedPaginationValue
    from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import MyFavouritesPageContent from "@/views/client/users/pages/favourites-page/MyFavouritesPageContent.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
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
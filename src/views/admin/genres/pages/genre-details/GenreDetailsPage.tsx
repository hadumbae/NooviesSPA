/**
 * @file Administrative page for managing a specific genre and its associated movie catalog.
 * @filename GenreDetailsPage.tsx
 */

import {FC, ReactElement} from 'react';
import useTitle from "@/common/hooks/document/useTitle.ts";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import GenreDetailsUIContextProvider
    from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIContextProvider.tsx";
import GenreDetailsPageContent
    from "@/views/admin/genres/pages/genre-details/GenreDetailsPageContent.tsx";
import MultiQueryDataLoader from "@/common/components/query/loaders/MultiQueryDataLoader.tsx";
import useGenreDetailsPageQueries from "@/domains/genres/views/admin/details-page/useGenreDetailsPageQueries.ts";
import {PaginatedMovieDetails} from "@/domains/movies/schema/movie/PaginatedMovieDetailsSchema.ts";

import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";

/** Default limit for the paginated movie sub-collection. */
const MOVIES_PER_PAGE = 12;

/**
 * Validated data structure returned by the multi-query loader.
 */
type ValidatedData = {
    genre: Genre;
    movies: PaginatedMovieDetails;
};

/**
 * The administrative entry point for the Genre Details view.
 * @returns A fully hydrated admin view or a loading skeleton.
 */
const GenreDetailsPage: FC = (): ReactElement => {
    useTitle("Genre Details");

    const {value: page, setValue: setPage} =
        useParsedPaginationValue("page", 1);

    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
        errorMessage: "Failed to fetch genre slug. Please try again.",
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const queries = useGenreDetailsPageQueries({
        genreConfig: {slug},
        movieConfig: {page, perPage: MOVIES_PER_PAGE},
    });

    return (
        <GenreDetailsUIContextProvider>
            <MultiQueryDataLoader queries={queries}>
                {(data) => {
                    const {
                        genre,
                        movies: {totalItems, items: movies},
                    } = data as ValidatedData;

                    return (
                        <GenreDetailsPageContent
                            genre={genre}
                            movies={movies}
                            totalItems={totalItems}
                            page={page}
                            perPage={MOVIES_PER_PAGE}
                            setPage={setPage}
                        />
                    );
                }}
            </MultiQueryDataLoader>
        </GenreDetailsUIContextProvider>
    );
};

export default GenreDetailsPage;
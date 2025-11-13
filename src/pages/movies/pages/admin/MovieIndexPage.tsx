import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieIndexHeader from "@/pages/movies/components/headers/admin/MovieIndexHeader.tsx";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import MovieIndexCard from "@/pages/movies/components/admin/movie-index-list/MovieIndexCard.tsx";
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {MovieDetails, PaginatedMovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {PaginatedMovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";

import useFetchPaginatedMovies from "@/pages/movies/hooks/queries/useFetchPaginatedMovies.ts";
import MovieQueryOptionFormContainer
    from "@/pages/movies/components/features/admin/movie-query-option/MovieQueryOptionFormContainer.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {MovieQueryOptionSchema} from "@/pages/movies/schema/queries/MovieQueryOption.schema.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

const MovieIndexPage: FC = () => {

    // ⚡ State ⚡

    const {data: paginationState} = usePaginationLocationState();
    const {page, perPage} = usePaginationSearchParams(paginationState ?? {page: 1, perPage: 25});
    const {searchParams} = useParsedSearchParams({schema: MovieQueryOptionSchema});

    // ⚡ Query ⚡

    const query = useFetchPaginatedMovies({
        page,
        perPage,
        populate: true,
        virtuals: true,
        queries: searchParams,
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedMovieDetailsSchema}>
                {(paginatedMovies: PaginatedMovieDetails) => {
                    const {items: movies} = paginatedMovies;
                    const hasMovies = (movies || []).length > 0;

                    const movieSection = (
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <SectionHeader srOnly={true}>List Of Movies</SectionHeader>

                            {movies.map(
                                (movie: MovieDetails) => <MovieIndexCard
                                    className="w-16"
                                    movie={movie}
                                    key={movie._id}
                                />
                            )}
                        </section>
                    );

                    const emptySection = (
                        <PageCenter>
                            <span className="text-neutral-400 select-none">
                                There Are No Movies
                            </span>
                        </PageCenter>
                    );

                    return (
                        <PageFlexWrapper>
                            <MovieIndexHeader/>

                            <PresetFilterDialog
                                title="Movie Filters"
                                description="Filter and sort movies here."
                            >
                                <MovieQueryOptionFormContainer presetValues={searchParams}/>
                            </PresetFilterDialog>


                            {
                                hasMovies
                                    ? movieSection
                                    : emptySection
                            }

                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default MovieIndexPage;

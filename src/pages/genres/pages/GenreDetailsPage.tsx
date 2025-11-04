// TODO - Movies By Genre
import {FC, ReactElement} from 'react';
import useFetchGenre from "@/pages/genres/hooks/useFetchGenre.ts";
import useFetchGenreParams from "@/pages/genres/hooks/useFetchGenreParams.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import GenreDetailsHeader from "@/pages/genres/components/pages/genre-details/GenreDetailsHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import {GenreDetailsSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import GenreDetailsCard from "@/pages/genres/components/pages/genre-details/GenreDetailsCard.tsx";
import GenreDetailsBreadcrumbs from "@/pages/genres/components/pages/genre-details/GenreDetailsBreadcrumbs.tsx";
import useFetchPaginatedMovies from "@/pages/movies/hooks/queries/useFetchPaginatedMovies.ts";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {PaginatedMovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {MovieDetails, PaginatedMovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MovieIndexCard from "@/pages/movies/components/admin/movie-index-list/MovieIndexCard.tsx";
import GenreDetailsUIContextProvider
    from "@/pages/genres/components/admin/genre-details/GenreDetailsUIContextProvider.tsx";
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import EllipsisPaginationButtons from "@/common/components/pagination/EllipsisPaginationButtons.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {GenreDetailsUIContext} from "@/pages/genres/context/GenreDetailsUIContext.ts";
import GenreSubmitFormPanel from "@/pages/genres/components/form/GenreSubmitFormPanel.tsx";
import GenreDeleteWarningDialog from "@/pages/genres/components/dialog/GenreDeleteWarningDialog.tsx";

/**
 * The validated data returned by {@link CombinedValidatedQueryBoundary}.
 *
 * @property genre - The validated genre details data.
 * @property movies - The validated paginated movie list associated with the genre.
 */
type ValidatedData = {
    genre: GenreDetails;
    movies: PaginatedMovieDetails;
};

/**
 * The `GenreDetailsPage` component.
 *
 * @remarks
 * Displays the complete details of a {@link Genre}, along with a paginated list
 * of related movies. The page integrates multiple query hooks and context providers
 * to manage state and mutation flows for editing and deletion.
 *
 * This page is intended to be rendered via React Router, using the `genreID`
 * from the route parameters.
 *
 * @example
 * ```tsx
 * <Route path="/genres/:genreID" element={<GenreDetailsPage />} />
 * ```
 *
 * @description
 * - Fetches genre data using {@link useFetchGenre}.
 * - Fetches paginated movies using {@link useFetchPaginatedMovies}.
 * - Wraps content inside {@link CombinedQueryBoundary} and {@link CombinedValidatedQueryBoundary}
 *   for loading/error/validation handling.
 * - Supports in-place editing and deletion of the genre via contextual UI state.
 *
 * @returns The rendered Genre Details page component.
 */
const GenreDetailsPage: FC = (): ReactElement => {
    /**
     * ⚡ Page Setup ⚡
     * Sets the initial document title and pagination parameters.
     */
    useTitle("Genre Details");
    const {page, perPage, setPage} = usePaginationSearchParams({page: 1, perPage: 10});

    /**
     * ⚡ Data Fetching ⚡
     * Fetches genre details and paginated movies in parallel.
     */
    const {genreID} = useFetchGenreParams();
    const genreQuery = useFetchGenre({_id: genreID!, virtuals: true});
    const movieQuery = useFetchPaginatedMovies({page, perPage, populate: true, virtuals: true});

    const queries = [genreQuery, movieQuery];
    const validationQueries: CombinedSchemaQuery[] = [
        {key: "genre", query: genreQuery, schema: GenreDetailsSchema},
        {key: "movies", query: movieQuery, schema: PaginatedMovieDetailsSchema},
    ];

    /**
     * ⚡ Render ⚡
     * Uses nested query boundaries to handle loading, validation, and rendering.
     */
    return (
        <GenreDetailsUIContextProvider>
            <CombinedQueryBoundary queries={queries}>
                <CombinedValidatedQueryBoundary queries={validationQueries}>
                    {(data) => {
                        const {genre, movies: {totalItems, items: movies}} = data as ValidatedData;
                        const {name} = genre;

                        useTitle(name);

                        /**
                         * ⚡ Context ⚡
                         * Accesses editing/deletion UI state from GenreDetailsUIContext.
                         */
                        const {
                            isEditing,
                            setIsEditing,
                            isDeleting,
                            setIsDeleting,
                        } = useRequiredContext({context: GenreDetailsUIContext});

                        /**
                         * ⚡ Sections ⚡
                         * Defines conditional rendering blocks for the Movies section.
                         */
                        const noMovieSection = (
                            <section className="flex-1">
                                <SectionHeader>Movies</SectionHeader>
                                <div className="flex justify-center items-center h-full">
                                    <span className="text-neutral-400 select-none">
                                        There Are No Movies
                                    </span>
                                </div>
                            </section>
                        );

                        const hasMovieSection = (
                            <section className="space-y-2">
                                <SectionHeader>Movies</SectionHeader>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                                    {movies.map((movie: MovieDetails) => (
                                        <MovieIndexCard
                                            className="w-16"
                                            movie={movie}
                                            key={movie._id}
                                        />
                                    ))}
                                </div>
                            </section>
                        );

                        /**
                         * ⚡ Main Layout ⚡
                         * Renders the page wrapper, sections, and contextual forms/dialogs.
                         */
                        return (
                            <PageFlexWrapper>
                                <GenreDetailsBreadcrumbs genreName={name}/>
                                <GenreDetailsHeader genre={genre}/>

                                <PageSection srTitle="Genre Details">
                                    <GenreDetailsCard genre={genre}/>
                                </PageSection>

                                {movies.length > 0 ? hasMovieSection : noMovieSection}

                                {totalItems > perPage && (
                                    <EllipsisPaginationButtons
                                        page={page}
                                        perPage={perPage}
                                        totalItems={totalItems}
                                        setPage={setPage}
                                    />
                                )}

                                <section className="hidden">
                                    <SectionHeader>Genre Editing Form</SectionHeader>
                                    <GenreSubmitFormPanel
                                        isEditing={true}
                                        entity={genre}
                                        presetOpen={isEditing}
                                        setPresetOpen={setIsEditing}
                                    />
                                </section>

                                <section className="hidden">
                                    <GenreDeleteWarningDialog
                                        presetOpen={isDeleting}
                                        setPresetOpen={setIsDeleting}
                                        genreID={genre._id}
                                    />
                                </section>
                            </PageFlexWrapper>
                        );
                    }}
                </CombinedValidatedQueryBoundary>
            </CombinedQueryBoundary>
        </GenreDetailsUIContextProvider>
    );
};

export default GenreDetailsPage;

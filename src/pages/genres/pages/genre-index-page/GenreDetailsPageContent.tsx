/**
 * Genre details page content.
 *
 * Presentational component responsible for rendering:
 * - Genre metadata
 * - Movie list (empty + populated states)
 * - Pagination controls
 * - Hidden edit/delete panels driven by UI context
 */
import useTitle from "@/common/hooks/document/useTitle.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";

import {GenreDetailsUIContext} from "@/pages/genres/context/GenreDetailsUIContext.ts";
import {GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";

import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";

import GenreDetailsBreadcrumbs
    from "@/pages/genres/components/pages/genre-details/GenreDetailsBreadcrumbs.tsx";
import GenreDetailsHeader
    from "@/pages/genres/components/pages/genre-details/GenreDetailsHeader.tsx";
import GenreDetailsCard
    from "@/pages/genres/components/pages/genre-details/GenreDetailsCard.tsx";

import MovieIndexCard
    from "@/pages/movies/components/admin/movie-index-list/MovieIndexCard.tsx";

import GenreSubmitFormPanel
    from "@/pages/genres/components/form/GenreSubmitFormPanel.tsx";
import GenreDeleteWarningDialog
    from "@/pages/genres/components/dialog/GenreDeleteWarningDialog.tsx";

/**
 * Props for {@link GenreDetailsPageContent}.
 *
 * @property genre      - Genre details
 * @property movies     - Movies belonging to the genre
 * @property totalItems - Total number of movies
 * @property page       - Current pagination page
 * @property perPage    - Items per page
 * @property setPage    - Pagination state setter
 */
type ContentProps = {
    genre: GenreDetails;
    movies: MovieDetails[];
    totalItems: number;
    page: number;
    perPage: number;
    setPage: (page: number | string) => void;
};

const GenreDetailsPageContent = (props: ContentProps) => {
    const {page, perPage, setPage, movies, genre, totalItems} = props;
    const {name} = genre;

    useTitle(name);

    // --- UI Context ---
    const {
        isEditing,
        setIsEditing,
        isDeleting,
        setIsDeleting,
    } = useRequiredContext({context: GenreDetailsUIContext});

    /**
     * ⚡ Sections ⚡
     * Conditional rendering blocks for the Movies section.
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
     * Renders page structure, sections, and contextual panels.
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
                <PaginationRangeButtons
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
};

export default GenreDetailsPageContent;

/**
 * @file GenreDetailsPageContent.tsx
 *
 * Presentational content component for the genre details page.
 *
 * Responsibilities:
 * - Render genre metadata and details
 * - Display associated movies (empty and populated states)
 * - Handle pagination UI
 * - Host hidden edit and delete panels driven by UI context
 *
 * Contains no data-fetching logic.
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
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

/**
 * Props for {@link GenreDetailsPageContent}.
 */
type ContentProps = {
    /** Genre details payload. */
    genre: GenreDetails;

    /** Movies associated with the genre. */
    movies: MovieDetails[];

    /** Total number of movies available. */
    totalItems: number;

    /** Current pagination page. */
    page: number;

    /** Items displayed per page. */
    perPage: number;

    /** Pagination state setter. */
    setPage: (page: number | string) => void;
};

/**
 * **GenreDetailsPageContent**
 *
 * Stateless page section responsible for rendering genre details,
 * movie listings, and context-driven edit/delete panels.
 *
 * @remarks
 * UI state (editing, deleting) is controlled via {@link GenreDetailsUIContext}.
 */
const GenreDetailsPageContent = (props: ContentProps) => {
    const {page, perPage, setPage, movies, genre, totalItems} = props;
    const {name} = genre;

    useTitle(name);

    const navigate = useLoggedNavigate();

    const {
        isEditing,
        setIsEditing,
        isDeleting,
        setIsDeleting,
    } = useRequiredContext({context: GenreDetailsUIContext});

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

    const content = movies.length > 0
        ? hasMovieSection
        : noMovieSection;

    const onEditSuccess = (genre: GenreDetails) => {
        navigate({
            to: `/admin/genres/get/${genre.slug}`,
            options: {replace: true},
        });
    }

    return (
        <PageFlexWrapper>
            <GenreDetailsBreadcrumbs genreName={name}/>
            <GenreDetailsHeader genre={genre}/>

            <PageSection srTitle="Genre Details">
                <GenreDetailsCard genre={genre}/>
            </PageSection>

            {content}

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
                    onSubmitSuccess={onEditSuccess}
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

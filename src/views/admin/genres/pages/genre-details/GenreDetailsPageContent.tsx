/**
 * @fileoverview Presentation component for the Genre Details page.
 * Orchestrates the display of genre metadata and a paginated list of
 * associated movies, while managing administrative editing and deletion panels.
 */

import useTitle from "@/common/hooks/document/useTitle.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {GenreDetailsUIContext} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIContext.ts";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import GenreDetailsBreadcrumbs from "@/views/admin/genres/pages/genre-details/header/GenreDetailsBreadcrumbs.tsx";
import GenreDetailsHeader from "@/views/admin/genres/pages/genre-details/header/GenreDetailsHeader.tsx";
import GenreDetailsCard from "@/views/admin/genres/pages/genre-details/display/GenreDetailsCard.tsx";
import MovieIndexCard from "@/domains/movies/components/admin/movie-index-list/MovieIndexCard.tsx";
import GenreDeleteWarningDialog from "@/views/admin/genres/_comp/dialog/GenreDeleteWarningDialog.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {GenreSubmitForm, GenreSubmitFormPanel} from "@/views/admin/genres/_feat/submit-form";

type ContentProps = {
    genre: Genre;
    movies: MovieDetails[];
    totalItems: number;
    page: number;
    perPage: number;
    setPage: (page: number | string) => void;
};

/**
 * Renders the structural layout and interactive panels for the Genre Details page.
 * Synchronizes document title with the genre name and handles administrative
 * state via GenreDetailsUIContext.
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
        setIsDeleting
    } = useRequiredContext({context: GenreDetailsUIContext});

    /** Syncs the URL slug if the genre name is modified during editing. */
    const updateSlug = ({slug}: Genre) => navigate({
        to: `/admin/genres/get/${slug}`,
        options: {replace: true}
    });

    /** Redirects to the genre library after successful deletion. */
    const navigateToIndex = () => navigate({
        to: `/admin/genres`,
        message: "Navigation to index after successful genre deletion."
    });

    return (
        <PageFlexWrapper>
            <GenreDetailsBreadcrumbs genreName={name}/>
            <GenreDetailsHeader genre={genre}/>

            <GenreDetailsCard genre={genre}/>

            {movies.length > 0 ? (
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
            ) : (
                <EmptyArrayContainer text="There Are No Movies"/>
            )}

            {totalItems > perPage && (
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalItems}
                    setPage={setPage}
                />
            )}

            {/* Administrative Panels */}
            <section className="hidden">
                <SectionHeader>Genre Editing Form</SectionHeader>

                <GenreSubmitForm
                    editEntity={genre}
                    onSubmitSuccess={updateSlug}
                >
                    <GenreSubmitFormPanel
                        isEditing={true}
                        isOpen={isEditing}
                        setIsOpen={setIsEditing}

                    />
                </GenreSubmitForm>
            </section>

            <section className="hidden">
                <GenreDeleteWarningDialog
                    presetOpen={isDeleting}
                    setPresetOpen={setIsDeleting}
                    genreID={genre._id}
                    onDeleteSuccess={navigateToIndex}
                />
            </section>
        </PageFlexWrapper>
    );
};

export default GenreDetailsPageContent;
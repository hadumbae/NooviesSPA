/**
 * @file Presentational layer for the Genre Details administrative view.
 * @filename GenreDetailsPageContent.tsx
 */

import useTitle from "@/common/hooks/document/useTitle.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";

import {GenreDetailsUIContext} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIContext.ts";

import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";

import GenreDetailsBreadcrumbs
    from "@/views/admin/genres/pages/genre-details/header/GenreDetailsBreadcrumbs.tsx";
import GenreDetailsHeader
    from "@/views/admin/genres/pages/genre-details/header/GenreDetailsHeader.tsx";
import GenreDetailsCard
    from "@/views/admin/genres/pages/genre-details/display/GenreDetailsCard.tsx";

import MovieIndexCard
    from "@/domains/movies/components/admin/movie-index-list/MovieIndexCard.tsx";

import GenreSubmitFormPanel
    from "@/views/admin/genres/components/form/submit-form/GenreSubmitFormPanel.tsx";
import GenreDeleteWarningDialog
    from "@/views/admin/genres/components/dialog/GenreDeleteWarningDialog.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";

import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

/**
 * Props for the {@link GenreDetailsPageContent} component.
 */
type ContentProps = {
    /** The core genre data to display. */
    genre: Genre;
    /** List of movies associated with this genre. */
    movies: MovieDetails[];
    /** Total count for pagination calculations. */
    totalItems: number;
    /** Current active page index. */
    page: number;
    /** Number of items per results page. */
    perPage: number;
    /** Callback to update the current page state. */
    setPage: (page: number | string) => void;
};

/**
 * Renders the structural layout and interactive panels for the Genre Details page.
 * @param props - Data and pagination controls from the parent loader.
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

    const updateSlug = ({slug}: Genre) => navigate({
        to: `/admin/genres/get/${slug}`,
        options: {replace: true},
    });

    const navigateToIndex = () => navigate({
        to: `/admin/genres`,
        message: "Navigate after deleting genre.",
    });

    return (
        <PageFlexWrapper>
            <GenreDetailsBreadcrumbs genreName={name}/>
            <GenreDetailsHeader genre={genre}/>

            <PageSection srTitle="Genre Details">
                <GenreDetailsCard genre={genre}/>
            </PageSection>

            {
                movies.length > 0 ? (
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
                    <EmptyArrayContainer
                        text="There Are No Movies"
                    />
                )
            }

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
                    onSubmitSuccess={updateSlug}
                />
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
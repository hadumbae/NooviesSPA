/** @fileoverview Presentation component for the Genre Details page, orchestrating metadata display and associated movies. */

import {ReactElement} from "react";
import useTitle from "@/common/hooks/document/useTitle.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {GenreDetailsUIContext} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIContext.ts";
import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {GenreSubmitForm, GenreSubmitFormPanel} from "@/views/admin/genres/_feat/submit-form";
import {GenreDetailsPageHeader} from "@/views/admin/genres/pages/genre-details/header.tsx";
import {GenreDetailsCard} from "@/views/admin/genres/pages/genre-details/detailsCard.tsx";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {GenreDeleteWarningDialog} from "@/views/admin/genres/_feat/delete-genre";
import {MovieIndexCard} from "@/views/admin/movies/_comp/index-list-display";

/** Props for the GenreDetailsPageContent component. */
type ContentProps = {
    genre: Genre;
    movies: MovieDetails[];
    totalItems: number;
    page: number;
    perPage: number;
    setPage: (page: number | string) => void;
};

/**
 * Renders the layout for a specific genre, including its metadata, associated movies, and admin controls.
 */
export function GenreDetailsPageContent(
    {page, perPage, setPage, movies, genre, totalItems}: ContentProps
): ReactElement {
    useTitle(genre.name);

    const navigate = useLoggedNavigate();

    const {
        isEditing,
        setIsEditing,
        isDeleting,
        setIsDeleting
    } = useRequiredContext({context: GenreDetailsUIContext});

    const replaceSlug = ({slug}: Genre) => {
        navigate({
            to: `/admin/genres/get/${slug}`,
            options: {replace: true}
        });

        setIsEditing(false);
    }

    /** Redirects to the genre index after a successful deletion. */
    const navigateToIndex = () => navigate({
        to: `/admin/genres`,
        message: "Navigation to index after successful genre deletion."
    });

    return (
        <PageFlexWrapper>
            <GenreDetailsPageHeader genre={genre}/>

            <GenreDetailsCard genre={genre}/>

            {movies.length > 0 ? (
                <section className="space-y-4">
                    <PageSectionHeader text="Movies"/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {movies.map((movie: MovieDetails) => (
                            <MovieIndexCard key={movie._id} className="w-16" movie={movie}/>
                        ))}
                    </div>
                </section>
            ) : (
                <EmptyArrayContainer
                    className="flex-1"
                    text="There Are No Movies"
                />
            )}

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalItems}
                setPage={setPage}
            />

            {/* Admin Dialogs Section */}
            <section className="hidden">
                <SROnly text="Genre Option Dialogs"/>

                <GenreSubmitForm
                    editEntity={genre}
                    onSubmitSuccess={replaceSlug}
                    successMessage="Updated"
                >
                    <GenreSubmitFormPanel
                        isEditing={true}
                        isOpen={isEditing}
                        setIsOpen={setIsEditing}
                    />
                </GenreSubmitForm>

                <GenreDeleteWarningDialog
                    isOpen={isDeleting}
                    setIsOpen={setIsDeleting}
                    _id={genre._id}
                    name={genre.name}
                    onSubmitSuccess={navigateToIndex}
                />
            </section>
        </PageFlexWrapper>
    );
}
/**
 * @fileoverview Presentation component for the Genre Details page.
 * Orchestrates the display of genre metadata and a paginated list of
 * associated movies, while managing administrative editing and deletion panels.
 */

import useTitle from "@/common/hooks/document/useTitle.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {GenreDetailsUIContext} from "@/domains/genres/context/genre-details-ui-context/GenreDetailsUIContext.ts";
import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import MovieIndexCard from "@/domains/movies/components/admin/movie-index-list/MovieIndexCard.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {GenreSubmitForm, GenreSubmitFormPanel} from "@/views/admin/genres/_feat/submit-form";
import {ReactElement} from "react";
import {GenreDetailsPageHeader} from "@/views/admin/genres/pages/genre-details/header.tsx";
import {GenreDetailsCard} from "@/views/admin/genres/pages/genre-details/detailsCard.tsx";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {GenreDeleteWarningDialog} from "@/views/admin/genres/_feat/delete-genre";

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
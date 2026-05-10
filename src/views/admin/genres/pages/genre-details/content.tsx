/** @fileoverview Presentation component for the Genre Details page, orchestrating metadata display and associated movies. */

import {ReactElement} from "react";
import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {GenreDetailsPageHeader} from "@/views/admin/genres/pages/genre-details/header.tsx";
import {GenreDetailsCard} from "@/views/admin/genres/pages/genre-details/detailsCard.tsx";
import {MovieIndexCard} from "@/views/admin/movies/_comp/index-list-display";
import {useSetAdminPageTitle} from "@/common/features/handle-pages";
import {GenreDetailsPageActions} from "@/views/admin/genres/pages/genre-details/actions.tsx";
import {
    GenreDetailsPageImageSection
} from "@/views/admin/genres/pages/genre-details/sections/GenreDetailsPageImageSection.tsx";

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
    useSetAdminPageTitle({presetTitle: genre.name});

    return (
        <PageFlexWrapper>
            <GenreDetailsPageHeader genre={genre}/>

            <GenreDetailsCard genre={genre}/>

            <GenreDetailsPageImageSection genre={genre}/>

            <section className="space-y-4">
                <PageSectionHeader text="Movies"/>

                {
                    movies.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {movies.map((movie: MovieDetails) => (
                                <MovieIndexCard key={movie._id} className="w-16" movie={movie}/>
                            ))}
                        </div>
                    ) : (
                        <EmptyArrayContainer className="border rounded-xl h-52" text="There Are No Movies"/>
                    )
                }
            </section>

            <PaginationRangeButtons page={page} perPage={perPage} totalItems={totalItems} setPage={setPage}/>
            <GenreDetailsPageActions className="hidden" genre={genre}/>
        </PageFlexWrapper>
    );
}
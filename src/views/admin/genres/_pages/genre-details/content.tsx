/** @fileoverview Presentation component for the Genre Details page, orchestrating metadata display and associated movies. */

import {ReactElement} from "react";
import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import {PaginationRangeButtons} from "@/views/common/_comp";
import {MovieDetails} from "@/domains/movies";
import {EmptyArrayContainer} from "@/common/components/text/EmptyArrayContainer.tsx";
import {MovieIndexCard} from "@/views/admin/movies/_comp/index-list-display";
import {useSetAdminPageTitle} from "@/common/_feat/handle-pages";
import {PageHeader} from "@/views/common/_comp";
import {IconButton} from "@/views/common/_comp";
import {Ellipsis} from "lucide-react";
import {Genre} from "@/domains/genres";
import {
    GenreDetailsPageActions,
    GenreDetailsPageBreadcrumbs,
    GenreDetailsPageImageSection
} from "@/views/admin/genres/_pages/genre-details/sections";
import {GenreDetailsCard, GenreDetailsUIToggles} from "@/views/admin/genres/_pages/genre-details/elements";

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
    const {name: genreName} = genre;
    useSetAdminPageTitle({presetTitle: genreName});

    return (
        <PageFlexWrapper>
            <PageHeader
                title={genreName}
                description="Genre"
                breadcrumbs={<GenreDetailsPageBreadcrumbs genreName={genreName}/>}
                actions={
                    <GenreDetailsUIToggles>
                        <IconButton icon={Ellipsis} aria-label="Genre UI Toggles"/>
                    </GenreDetailsUIToggles>
                }
            />

            <GenreDetailsCard genre={genre}/>

            <GenreDetailsPageImageSection genre={genre}/>

            <section className="space-y-4">
                <PageSectionHeader text="Movies"/>

                {
                    movies.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                            {movies.map((movie: MovieDetails) => (
                                <MovieIndexCard key={movie._id} movie={movie}/>
                            ))}
                        </div>
                    ) : (
                        <EmptyArrayContainer
                            className="border rounded-xl h-52"
                            text="There Are No Movies"
                        />
                    )
                }
            </section>

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalItems}
                setPage={setPage}
            />

            <GenreDetailsPageActions
                className="hidden"
                genre={genre}
            />
        </PageFlexWrapper>
    );
}
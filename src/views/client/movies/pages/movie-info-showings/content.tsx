/**
 * @fileoverview Renders the movie showings page content including filters and the paginated list of showings.
 */

import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import {BrowseMovieShowingIndexCard} from "@/views/client/showings/_comp/info-index-card/BrowseMovieShowingIndexCard.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import MovieInfoHeader from "@/views/client/movies/components/headers/MovieInfoHeader.tsx";
import {PopulatedShowing} from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {ReactElement} from "react";
import {
    MovieInfoShowingsPageFormSection
} from "@/views/client/movies/pages/movie-info-showings/MovieInfoShowingsPageFormSection.tsx";

/** Props for the MovieInfoShowingsPageContent component. */
type ContentProps = {
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    movie: MovieDetails;
    totalShowings: number;
    showings: PopulatedShowing[];
};

/**
 * Displays a list of movie showings with a search form and pagination controls.
 */
export function MovieInfoShowingsPageContent(
    {page, perPage, movie, totalShowings, showings, setPage}: ContentProps
): ReactElement {
    const {title, posterImage, slug} = movie;

    return (
        <PageFlexWrapper className="space-y-6">
            <MovieInfoHeader
                movieSlug={slug}
                movieTitle={title}
                posterURL={posterImage?.secure_url}
                pageText="Showings"
            />

            <MovieInfoShowingsPageFormSection
                defaultValues={{page}}
            />

            <section className="space-y-4">
                <PageSectionHeader text="Showings"/>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {showings.map(showing => (
                        <BrowseMovieShowingIndexCard key={showing._id} showing={showing}/>
                    ))}
                </div>

                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalShowings}
                    setPage={setPage}
                />
            </section>
        </PageFlexWrapper>
    );
}

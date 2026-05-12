/**
 * @fileoverview Main content layout for the movie browsing page.
 */
import {ReactElement} from "react";
import BrowseMoviesHeader from "@/views/client/movies/browse-movies/BrowseMoviesHeader.tsx";
import {
    BrowseMovieSummaryCard
} from "@/views/client/movies/browse-movies/browse-movie-summary/BrowseMovieSummaryCard.tsx";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {SROnly} from "@/views/common/_comp/screen-readers";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";

/** Props for the BrowseMoviesPageContent component. */
type ContentProps = {
    movies: MovieDetails[];
    totalMovies: number;
    page: number;
    perPage: number;
    setPage: (newPage: number) => void;
};

/** Renders the grid of movie cards and pagination controls for the browse view. */
export function BrowseMoviesPageContent(
    {movies, totalMovies, ...paginationProps}: ContentProps
): ReactElement {
    return (
        <PageFlexWrapper>
            <BrowseMoviesHeader/>

            <section>
                <SROnly text="Browse | Movie List"/>

                <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {movies.map((movie) =>
                        <BrowseMovieSummaryCard key={movie._id} movie={movie}/>
                    )}
                </div>

                <PaginationRangeButtons
                    totalItems={totalMovies}
                    {...paginationProps}
                />
            </section>

        </PageFlexWrapper>
    );
}
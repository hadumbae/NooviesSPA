/**
 * @fileoverview Main content layout for the movie browsing page.
 */
import {ReactElement} from "react";
import BrowseMoviesHeader from "@/views/client/movies/browse-movies/BrowseMoviesHeader.tsx";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {SROnly} from "@/views/common/_comp/screen-readers";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {BrowseMovieIndexCard} from "@/views/client/movies/_comp/browse-movie-index";

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

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {movies.map((movie) =>
                        <BrowseMovieIndexCard key={movie._id} movie={movie}/>
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
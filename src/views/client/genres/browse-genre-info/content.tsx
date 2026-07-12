/**
 * @fileoverview Presentational content for the client-facing Genre Detail page.
 */

import {ReactElement} from "react";
import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import {BrowseMovieOverviewCard} from "@/views/client/movies/_comp";
import {PaginationRangeButtons} from "@/views/common/_comp";
import {BrowseGenreInfoPageHeader} from "@/views/client/genres/browse-genre-info/header.tsx";
import {Genre} from "@/domains/genres";
import {MovieWithGenres} from "@/domains/movies";
import {GenreInfoBanner} from "@/views/client/genres/_comp";

/** Props for the BrowseGenreInfoPageContent component. */
type ContentProps = {
    genre: Genre;
    movies: MovieWithGenres[];
    totalMovies: number;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
};

/** Renders the primary layout for the Genre Detail view. */
export function BrowseGenreInfoPageContent(
    {genre, movies, totalMovies, page, perPage, setPage}: ContentProps
): ReactElement {
    return (
        <PageFlexWrapper>
            <BrowseGenreInfoPageHeader name={genre.name}/>

            <GenreInfoBanner genre={genre}/>

            <section className="space-y-4">
                <PageSectionHeader text="Movies"/>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {movies.map(movie => (
                        <BrowseMovieOverviewCard key={movie._id} movie={movie}/>
                    ))}
                </div>

                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalMovies}
                    setPage={setPage}
                />
            </section>

        </PageFlexWrapper>
    );
}
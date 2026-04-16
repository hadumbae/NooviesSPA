/**
 * @fileoverview Presentational content for the client-facing Genre Detail page.
 * Responsibly maps genre metadata and movie collections into a structured UI.
 */

import { ReactElement } from "react";
import { PageFlexWrapper } from "@/views/common/_comp/page";
import GenreInfoBanner from "@/views/client/genres/_comp/GenreInfoBanner.tsx";
import BrowseMovieOverviewCard from "@/domains/movies/components/client/browse-movies/browse-movie-overview/BrowseMovieOverviewCard.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import { Genre } from "@/domains/genres/schema";
import { BrowseGenreInfoPageHeader } from "@/views/client/genres/browse-genre-info/header.tsx";
import { MovieWithGenres } from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";

/**
 * Props for the {@link BrowseGenreInfoPageContent} component.
 */
type ContentProps = {
    genre: Genre;
    movies: MovieWithGenres[];
    totalMovies: number;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
};

/**
 * Renders the primary layout for the Genre Detail view.
 */
export function BrowseGenreInfoPageContent(
    { genre, movies, totalMovies, page, perPage, setPage }: ContentProps
): ReactElement {
    return (
        <PageFlexWrapper>
            <BrowseGenreInfoPageHeader name={genre.name} />

            <GenreInfoBanner genre={genre} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {movies.map(movie => (
                    <BrowseMovieOverviewCard key={movie._id} movie={movie} />
                ))}
            </div>

            <PaginationRangeButtons
                page={page}
                perPage={perPage}
                totalItems={totalMovies}
                setPage={setPage}
            />
        </PageFlexWrapper>
    );
}
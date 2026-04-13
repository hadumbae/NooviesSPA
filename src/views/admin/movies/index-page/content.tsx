/**
 * @fileoverview Presentation component for the Movie Index page.
 * Handles the layout for the movie grid, filter dialog, and pagination
 * based on administrative movie data.
 */

import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MovieIndexCard from "@/domains/movies/components/admin/movie-index-list/MovieIndexCard.tsx";
import PageFlexWrapper from "@/views/common/_comp/page/PageFlexWrapper.tsx";
import MovieIndexPageHeader from "@/views/admin/movies/index-page/header.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import MovieQueryOptionFormContainer
    from "@/domains/movies/components/features/admin/movie-query-option/MovieQueryOptionFormContainer.tsx";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {MovieQueryOptionSchema} from "@/domains/movies/schema/queries/MovieQueryOption.schema.ts";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {ReactElement} from "react";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

type ContentProps = {
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    totalItems: number;
    movies: MovieDetails[];
};

/**
 * Renders the main movie listing interface, including search/filter logic
 * and responsive grid displays for movie details.
 */
export function MovieIndexPageContent(
    {page, perPage, setPage, movies, totalItems}: ContentProps
): ReactElement {
    const {searchParams} = useParsedSearchParams({schema: MovieQueryOptionSchema});

    return (
        <PageFlexWrapper>
            <MovieIndexPageHeader />

            <PresetFilterDialog
                title="Movie Filters"
                description="Filter and sort movies here."
            >
                <MovieQueryOptionFormContainer presetValues={searchParams} />
            </PresetFilterDialog>

            {movies.length > 0 ? (
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <SectionHeader srOnly={true}>List Of Movies</SectionHeader>

                    {movies.map((movie: MovieDetails) => (
                        <MovieIndexCard className="w-16" movie={movie} key={movie._id} />
                    ))}
                </section>
            ) : (
                <EmptyArrayContainer
                    className="flex-1"
                    text="There Are No Movies"
                />
            )}

            {totalItems > perPage && (
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalItems}
                    setPage={setPage}
                />
            )}
        </PageFlexWrapper>
    );
}
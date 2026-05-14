/**
 * @fileoverview Presentation component for the Movie Index page.
 *
 */

import {PageFlexWrapper} from "@/views/common/_comp/page";
import {MovieIndexPageHeader} from "@/views/admin/movies/index-page/header.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import MovieQueryOptionFormContainer
    from "@/views/admin/movies/_feat/submit-query-options/MovieQueryOptionFormContainer.tsx";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {MovieQueryOptionSchema} from "@/domains/movies/schema/queries";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {ReactElement} from "react";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {MovieIndexCard} from "@/views/admin/movies/_comp/index-list-display";
import {SROnly} from "@/views/common/_comp/screen-readers";

/** Props for the MovieIndexPageContent component. */
type ContentProps = {
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    totalItems: number;
    movies: MovieDetails[];
};

/**
 * Renders the main movie listing interface with search filters and pagination.
 */
export function MovieIndexPageContent(
    {page, perPage, setPage, movies, totalItems}: ContentProps
): ReactElement {
    const {searchParams} = useParsedSearchParams({schema: MovieQueryOptionSchema});

    return (
        <PageFlexWrapper>
            <MovieIndexPageHeader paginationState={{page, perPage}}/>

            <PresetFilterDialog title="Movie Filters" description="Filter and sort movies here.">
                <MovieQueryOptionFormContainer presetValues={searchParams}/>
            </PresetFilterDialog>

            {movies.length > 0 ? (
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    <SROnly text="List Of Movies"/>

                    {movies.map((movie: MovieDetails) => (
                        <MovieIndexCard
                            key={movie._id}
                            movie={movie}
                        />
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
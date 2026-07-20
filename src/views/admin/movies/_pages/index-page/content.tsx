/**
 * @fileoverview Presentation component for the Movie Index page.
 */

import {ReactElement, useState} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {QueryFilterDialog} from "@/views/common/_feat/dialog/QueryFilterDialog.tsx";
import {useParsedSearchParams} from "@/common/_feat/fetch-search-params";
import {PageHeader, PaginationRangeButtons} from "@/views/common/_comp";
import {EmptyArrayContainer} from "@/views/common/_comp/text-display/EmptyArrayContainer.tsx";
import {SROnly} from "@/views/common/_comp/screen-readers";

import {MovieDetails, MovieQueryOptionSchema} from "@/domains/movies";
import {MovieQueryOptionForm, MovieQueryOptionFormView} from "@/views/admin/movies/_feat";
import {MovieIndexCard} from "@/views/admin/movies/_comp";
import {HoverLink} from "@/views/common/_feat/navigation/HoverLink.tsx";
import {Plus} from "lucide-react";

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
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <PageFlexWrapper>
            <PageHeader title="Movies" description="Registered movies." actions={(
                <section className="flex justify-end items-center">
                    <HoverLink
                        to="/admin/movies/create"
                        // options={{state: {page, perPage}}}
                    >
                        <Plus/> Create
                    </HoverLink>
                </section>
            )}/>

            <QueryFilterDialog
                title="Movie Filters"
                description="Filter and sort movies here."
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <MovieQueryOptionForm presetValues={searchParams}>
                    <MovieQueryOptionFormView/>
                </MovieQueryOptionForm>
            </QueryFilterDialog>

            {movies.length > 0 ? (
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    <SROnly text="List Of Movies"/>
                    {movies.map((movie: MovieDetails) => <MovieIndexCard key={movie._id} movie={movie}/>)}
                </section>
            ) : <EmptyArrayContainer className="flex-1" text="There Are No Movies"/>}

            <PaginationRangeButtons page={page} perPage={perPage} totalItems={totalItems} setPage={setPage}/>
        </PageFlexWrapper>
    );
}
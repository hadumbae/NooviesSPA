/**
 * @fileoverview Presentation component for the Movie Index page.
 */

import {ReactElement, useState} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {PageHeader, PaginationRangeButtons} from "@/views/common/_comp";
import {EmptyArrayContainer} from "@/views/common/_comp/text-display/EmptyArrayContainer.tsx";
import {SROnly} from "@/views/common/_comp/screen-readers";

import {MovieDetails} from "@/domains/movies";
import {MovieQueryOptionForm, MovieQueryOptionFormView} from "@/views/admin/movies/_feat";
import {MovieIndexCard} from "@/views/admin/movies/_comp";
import {HoverLink} from "@/views/common/_feat/navigation/HoverLink.tsx";
import {Plus} from "lucide-react";
import {useMovieIndexQueryOptionsContext} from "@/domains/movies/_ctx/index-query-options";
import {QueryOptionsFormCollapsible} from "@/views/common/_feat";

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
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {activeOptions, values: searchParams, setValues: setSearchParams} = useMovieIndexQueryOptionsContext();

    return (
        <PageFlexWrapper>
            <PageHeader title="Movies" description="Registered movies." actions={(
                <section className="flex justify-end items-center">
                    <HoverLink to="/admin/movies/create" state={{page, perPage}}>
                        <Plus/> Create
                    </HoverLink>
                </section>
            )}/>

            <MovieQueryOptionForm
                activeOptions={activeOptions}
                queryOptions={searchParams}
                setQueryOptions={setSearchParams}
            >
                <QueryOptionsFormCollapsible isOpen={isOpen} setIsOpen={setIsOpen}>
                    <MovieQueryOptionFormView/>
                </QueryOptionsFormCollapsible>
            </MovieQueryOptionForm>

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
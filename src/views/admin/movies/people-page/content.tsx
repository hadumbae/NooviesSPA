/** @fileoverview Layout component for managing movie credits with a split-view dashboard. */

import {ReactElement} from "react";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {RoleTypeDepartment} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {MoviePeopleHeader} from "@/views/admin/movies/people-page/header.tsx";
import {MoviePeoplePageFormSection} from "@/views/admin/movies/people-page/sections/MoviePeoplePageFormSection.tsx";
import {MoviePeoplePageCreditSection} from "@/views/admin/movies/people-page/sections/MoviePeoplePageCreditSection.tsx";

/** Props for the MoviePeoplePageContent component. */
type ContentProps = {
    movie: Movie;
    department: RoleTypeDepartment;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
};

/** Renders a submission form and a paginated list of credits for a specific movie department. */
export function MoviePeoplePageContent(
    {movie, department, page, perPage, setPage}: ContentProps
): ReactElement {
    const {_id: movieID} = movie;


    return (
        <PageFlexWrapper className="space-y-6">
            <MoviePeopleHeader movie={movie} department={department}/>

            <div className="grid max-md:grid-cols-1 md:grid-cols-3 md:gap-4 gap-6">
                <MoviePeoplePageFormSection
                    department={department}
                    movieID={movieID}
                />

                <MoviePeoplePageCreditSection
                    className="md:col-span-2"
                    department={department}
                    page={page}
                    perPage={perPage}
                    setPage={setPage}
                />
            </div>
        </PageFlexWrapper>
    );
}
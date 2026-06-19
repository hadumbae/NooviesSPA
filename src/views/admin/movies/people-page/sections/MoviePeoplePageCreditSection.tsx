/**
 * @fileoverview Section component for displaying and paginating movie credits filtered by department.
 */

import {ReactElement} from "react";
import {PaginatedItems} from "@/common/types";
import {cn} from "@/common/lib/utils.ts";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";
import {RoleTypeDepartment} from "@/domains/roletype";
import {
    MovieCreditDetails,
    MovieCreditDetailsSchema,
    useFetchPaginatedMovieCredits,
} from "@/domains/moviecredit/schemas";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import {MovieCastCreditCard} from "@/views/admin/movie-credits/_feat";

/** Props for the MoviePeoplePageCreditSection component. */
type SectionProps = {
    department: RoleTypeDepartment;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    className?: string;
};

/** Displays a paginated list of movie credits for a specific department within the movie people page. */
export function MoviePeoplePageCreditSection(
    {className, department, page, perPage, setPage}: SectionProps
): ReactElement {
    const query = useFetchPaginatedMovieCredits({
        schema: generatePaginationSchema(MovieCreditDetailsSchema),
        page,
        perPage,
        queries: {department, sortByBillingOrder: 1},
        config: {populate: true, virtuals: true},
    });

    return (
        <section className={cn("space-y-4", className)}>
            <PageSectionHeader text="Credits"/>

            <QueryDataLoader query={query}>
                {({totalItems, items: credits}: PaginatedItems<MovieCreditDetails>) => {
                    if (credits.length === 0) {
                        return (
                            <EmptyArrayContainer
                                text="There Are No Credits"
                                className="h-28"
                            />
                        );
                    }

                    return (
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 gap-2">
                                {credits.map((credit) => (
                                    credit.department === "CREW"
                                        ? <MovieCrewCreditCard key={credit._id} credit={credit}/>
                                        : <MovieCastCreditCard key={credit._id} credit={credit}/>
                                ))}
                            </div>

                            <PaginationRangeButtons
                                page={page}
                                perPage={perPage}
                                totalItems={totalItems}
                                setPage={setPage}
                            />
                        </div>
                    );
                }}
            </QueryDataLoader>
        </section>
    );
}
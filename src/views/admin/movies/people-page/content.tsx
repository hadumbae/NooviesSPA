/**
 * @fileoverview Layout component for the Movie People page.
 * Features a split-view containing a credit submission form and a
 * paginated list of existing credits.
 */

import {ReactElement} from "react";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import TextCollapsible from "@/common/components/TextCollapsible.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import MovieCreditSubmitFormContainer from "@/domains/moviecredit/components/forms/MovieCreditSubmitFormContainer.tsx";
import {MovieCreditFormValues} from "@/domains/moviecredit/schemas/form/MovieCreditForm.types.ts";
import {RoleTypeDepartment} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import MovieCreditPaginatedListQuery
    from "@/domains/moviecredit/components/movie-credit-paginated-list/MovieCreditPaginatedListQuery.tsx";
import {MoviePeopleHeader} from "@/views/admin/movies/people-page/header.tsx";

type ContentProps = {
    movie: Movie;
    department: RoleTypeDepartment;
    page: number;
    perPage: number;
    setPage: (page: number) => void;
};

/**
 * Renders the primary interface for managing movie credits, including
 * hierarchical navigation and a responsive credit management dashboard.
 */
export function MoviePeoplePageContent(
    {movie, department, page, perPage, setPage}: ContentProps
): ReactElement {
    const {_id: movieID} = movie;
    const isDesktop = !useIsMobile();

    const presetValues: Partial<MovieCreditFormValues> = {
        department,
        movie: movieID,
    };

    /** Prevents administrative override of movie/department within this specific view. */
    const disableFields: (keyof MovieCreditFormValues)[] = [
        "department",
        "movie",
    ];

    return (
        <PageFlexWrapper className="space-y-6">
            <MoviePeopleHeader movie={movie} department={department}/>

            <div className="grid max-md:grid-cols-1 md:grid-cols-3 md:gap-4 gap-6">
                <section className="space-y-3">
                    <SectionHeader>Add Credits</SectionHeader>

                    <TextCollapsible
                        triggerText="Form"
                        defaultOpen={isDesktop}
                        className="py-2"
                    >
                        <Card>
                            <CardContent className="p-4">
                                <MovieCreditSubmitFormContainer
                                    presetValues={presetValues}
                                    disableFields={disableFields}
                                />
                            </CardContent>
                        </Card>
                    </TextCollapsible>
                </section>

                <section className="md:col-span-2">
                    <SectionHeader>Credits</SectionHeader>

                    <MovieCreditPaginatedListQuery
                        department={department}
                        sortByBillingOrder={1}
                        page={page}
                        perPage={perPage}
                        setPage={setPage}
                    />
                </section>
            </div>
        </PageFlexWrapper>
    );
}
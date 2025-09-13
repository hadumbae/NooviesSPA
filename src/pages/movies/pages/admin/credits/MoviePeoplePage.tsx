import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useFetchMovieParams from "@/pages/movies/hooks/params/useFetchMovieParams.ts";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import MoviePersonListBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MoviePersonListBreadcrumb.tsx";
import MoviePeopleHeader from "@/pages/movies/components/headers/admin/MoviePeopleHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import MoviePersonSubmitFormContainer
    from "@/pages/movies/components/admin/credits/forms/MoviePersonSubmitFormContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import useFetchMovieCredits from "@/pages/moviecredit/hooks/queries/useFetchMovieCredits.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {
    PaginatedMovieCreditDetailsSchema,
} from "@/pages/moviecredit/schemas/model/MovieCredit.schema.ts";
import {
    PaginatedMovieCreditDetails
} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import TextCollapsible from "@/common/components/TextCollapsible.tsx";
import MoviePersonDetailsCard from "@/pages/movies/components/admin/credits/cards/MoviePersonDetailsCard.tsx";

type PeoplePageProps = {
    department: RoleTypeDepartment;
};

type ValidatedDataType = {
    movie: Movie;
    credits: PaginatedMovieCreditDetails;
}

const MoviePeoplePage: FC<PeoplePageProps> = ({department}) => {
    const movieParams = useFetchMovieParams();
    const {page, perPage} = usePaginationSearchParams();
    if (!movieParams) return <PageLoader/>;

    const {movieID} = movieParams;
    const movieQuery = useFetchMovie({_id: movieID});
    const creditQuery = useFetchMovieCredits({
        movie: movieID,
        populate: true,
        virtuals: true,
        paginated: true,
        page,
        perPage,
        department
    });

    const queries = [movieQuery, creditQuery];
    const validatedQueries: CombinedSchemaQuery[] = [
        {key: "movie", query: movieQuery, schema: MovieSchema},
        {key: "credits", query: creditQuery, schema: PaginatedMovieCreditDetailsSchema},
    ];

    const presetValues: Partial<MovieCreditFormValues> = {department, movie: movieID};
    const disableFields: (keyof MovieCreditFormValues)[] = ["department", "movie"];

    return (
        <CombinedQueryBoundary queries={queries}>
            <CombinedValidatedQueryBoundary queries={validatedQueries}>
                {(data) => {
                    const {movie, credits: {items: credits}} = data as ValidatedDataType;

                    const hasCredits = credits.length > 0;

                    const hasCreditsSection = (
                      <div className="space-y-3">
                          {credits.map(credit => <MoviePersonDetailsCard key={credit._id} credit={credit}/>)}
                      </div>
                    );

                    const hasNoCreditsSection = (
                        <div className="flex justify-center items-center h-24">
                            <span className="text-sm text-neutral-400 select-none uppercase">
                                No Credits
                            </span>
                        </div>
                    );

                    return (
                        <PageFlexWrapper className="space-y-6">
                            <section className="space-y-2">
                                <h1 className="sr-only">Header</h1>
                                <MoviePersonListBreadcrumb movie={movie!} department={department}/>
                                <MoviePeopleHeader movie={movie!} roleType={department}/>
                            </section>

                            <section className="grid max-md:grid-cols-1 md:grid-cols-3 gap-4">
                                <h1 className="sr-only">Credits</h1>

                                <PageSection title="Add Credits" srTitle="Credit Form">
                                    <TextCollapsible triggerText="Form" defaultOpen={true} className="py-2">
                                        <Card>
                                            <CardContent className="p-4">
                                                <MoviePersonSubmitFormContainer
                                                    presetValues={presetValues}
                                                    disableFields={disableFields}
                                                />
                                            </CardContent>
                                        </Card>
                                    </TextCollapsible>
                                </PageSection>

                                <PageSection title="Credits" srTitle="Credit List">
                                    {hasCredits ? hasCreditsSection : hasNoCreditsSection}
                                </PageSection>
                            </section>
                        </PageFlexWrapper>
                    );
                }}
            </CombinedValidatedQueryBoundary>
        </CombinedQueryBoundary>
    );
};

export default MoviePeoplePage;

// import {FC} from 'react';
// import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
// import useFetchMovieParams from "@/pages/movies/hooks/params/useFetchMovieParams.ts";
// import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
// import PageLoader from "@/common/components/page/PageLoader.tsx";
// import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
// import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
// import MoviePersonListBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MoviePersonListBreadcrumb.tsx";
// import MoviePeopleHeader from "@/pages/movies/components/headers/admin/MoviePeopleHeader.tsx";
// import PageSection from "@/common/components/page/PageSection.tsx";
// import MoviePersonSubmitFormContainer from "@/pages/movies/components/admin/credits/forms/MoviePersonSubmitFormContainer.tsx";
// import {Card, CardContent} from "@/common/components/ui/card.tsx";
// import MoviePeopleListPageSection from "@/pages/movies/components/admin/sections/MoviePeopleListPageSection.tsx";
// import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
//
// interface PeoplePageProps {
//     roleType: RoleTypeDepartment;
// }
//
// const MoviePeoplePage: FC<PeoplePageProps> = ({roleType}) => {
//     const movieParams = useFetchMovieParams();
//     const {page, perPage} = usePaginationSearchParams();
//     if (!movieParams) return <PageLoader />;
//
//     const {movieID} = movieParams;
//     const {data, isPending, isError, queryError, parseSuccess, parseError} = useFetchPopulatedMovieWithCredits({
//         _id: movieID,
//         page,
//         perPage,
//         virtuals: false,
//         creditFilters: {roleType},
//     });
//
//     const formPresetValues = {roleType, movie: movieID};
//
//     if (isPending) return <PageLoader />;
//     if (isError) return <PageHTTPError error={queryError} />;
//     if (!parseSuccess) return <PageParseError error={parseError} />;
//
//     const {movie, credits: paginatedCredits} = data;
//     const {items: credits} = paginatedCredits!;
//
//     return (
//         <PageFlexWrapper className="space-y-6">
//             <section className="space-y-2">
//                 <h1 className="sr-only">Header</h1>
//                 <MoviePersonListBreadcrumb movie={movie!} roleType={roleType} />
//                 <MoviePeopleHeader movie={movie!} roleType={roleType} />
//             </section>
//
//
//             <section className="grid max-md:grid-cols-1 md:grid-cols-3 gap-4">
//                 <h1 className="sr-only">Credits</h1>
//
//                 <PageSection title="Add Credits" srTitle="Credit Form">
//                     <Card>
//                         <CardContent className="p-4">
//                             <MoviePersonSubmitFormContainer movieID={movieID} presetValues={formPresetValues} />
//                         </CardContent>
//                     </Card>
//                 </PageSection>
//
//                 <MoviePeopleListPageSection roleType={roleType} credits={credits} />
//             </section>
//         </PageFlexWrapper>
//     );
// };
//
// export default MoviePeoplePage;

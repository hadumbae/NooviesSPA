import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useFetchMovieParams from "@/pages/movies/hooks/params/useFetchMovieParams.ts";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import MoviePersonListBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MoviePersonListBreadcrumb.tsx";
import MoviePeopleHeader from "@/pages/movies/components/headers/admin/MoviePeopleHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import MovieCreditSubmitFormContainer
    from "@/pages/moviecredit/components/forms/MovieCreditSubmitFormContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import useFetchMovieCredits from "@/pages/moviecredit/hooks/queries/useFetchMovieCredits.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import TextCollapsible from "@/common/components/TextCollapsible.tsx";
import MoviePersonDetailsCard from "@/pages/movies/components/admin/credits/cards/MoviePersonDetailsCard.tsx";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import {PaginatedMovieCreditDetailsSchema} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.schema.ts";
import {PaginatedMovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.types.ts";

/**
 * Props for {@link MoviePeoplePage}.
 *
 * @interface PeoplePageProps
 */
type PeoplePageProps = {
    /**
     * The department of credits to display and manage on this page.
     *
     * - `CAST`: For actor/actress credits.
     * - `CREW`: For crew credits (e.g., director, editor).
     */
    department: RoleTypeDepartment;
};

/**
 * Validated data returned by the page's queries.
 *
 * @interface ValidatedDataType
 */
type ValidatedDataType = {
    /** The movie entity */
    movie: Movie;

    /** Paginated movie credits for the selected department */
    credits: PaginatedMovieCreditDetails;
};

/**
 * Page component displaying movie people (CAST or CREW) for a specific movie.
 *
 * Handles:
 * - Fetching movie data via {@link useFetchMovie}.
 * - Fetching paginated credits via {@link useFetchMovieCredits}.
 * - Validating queries with {@link CombinedValidatedQueryBoundary} and schemas:
 *   - {@link MovieSchema}
 *   - {@link PaginatedMovieCreditDetailsSchema}
 * - Rendering the credit submission form via {@link MovieCreditSubmitFormContainer}.
 * - Displaying a list of credits via {@link MoviePersonDetailsCard}.
 * - Conditional layout for mobile vs desktop using {@link useIsMobile}.
 *
 * @param {PeoplePageProps} props - Props specifying the department of credits to show.
 *
 * @returns A React functional component rendering the movie credits page.
 *
 * @remarks
 * - Uses `PageFlexWrapper`, `PageSection`, and other UI components for layout.
 * - Pre-populates credit submission form with `department` and `movieID`.
 * - Disables `department` and `movie` fields in the form to prevent editing.
 * - Conditionally renders "No Credits" message if the movie has no credits.
 *
 * @example
 * ```tsx
 * <MoviePeoplePage department="CAST" />
 * ```
 */
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

                    const isDesktop = !useIsMobile();
                    const hasCredits = credits.length > 0;

                    const hasCreditsSection = (
                        <div className="grid max-md:grid-cols-1 md:grid-cols-2 gap-4">
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

                            <section className="grid max-md:grid-cols-1 md:grid-cols-3 md:gap-4 gap-6">
                                <h1 className="sr-only">Credits</h1>

                                <PageSection title="Add Credits" srTitle="Credit Form">
                                    <TextCollapsible triggerText="Form" defaultOpen={isDesktop} className="py-2">
                                        <Card>
                                            <CardContent className="p-4">
                                                <MovieCreditSubmitFormContainer
                                                    presetValues={presetValues}
                                                    disableFields={disableFields}
                                                />
                                            </CardContent>
                                        </Card>
                                    </TextCollapsible>
                                </PageSection>

                                <section className="md:col-span-2">
                                    <PageSection title="Credits" srTitle="Credit List" className="md:col-span-2">
                                        {hasCredits ? hasCreditsSection : hasNoCreditsSection}
                                    </PageSection>
                                </section>
                            </section>
                        </PageFlexWrapper>
                    );
                }}
            </CombinedValidatedQueryBoundary>
        </CombinedQueryBoundary>
    );
};

export default MoviePeoplePage;

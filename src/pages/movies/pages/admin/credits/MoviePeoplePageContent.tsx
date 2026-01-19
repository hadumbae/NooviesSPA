    import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MoviePersonListBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MoviePersonListBreadcrumb.tsx";
import MoviePeopleHeader from "@/pages/movies/components/headers/admin/MoviePeopleHeader.tsx";
import TextCollapsible from "@/common/components/TextCollapsible.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import MovieCreditSubmitFormContainer from "@/pages/moviecredit/components/forms/MovieCreditSubmitFormContainer.tsx";
import {MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import MovieCreditPaginatedListQuery
    from "@/pages/moviecredit/components/movie-credit-paginated-list/MovieCreditPaginatedListQuery.tsx";

/**
 * Props for {@link MoviePeoplePageContent}.
 */
type ContentProps = {
    /** Movie being managed */
    movie: Movie;

    /** Credit department (CAST or CREW) */
    department: RoleTypeDepartment;

    /** Current pagination page */
    page: number;

    /** Items per page */
    perPage: number;

    /** Updates the current page */
    setPage: (page: number) => void;
};

/**
 * Admin movie people page content.
 *
 * Renders credit submission form and
 * paginated credit list for a movie.
 */
const MoviePeoplePageContent = (props: ContentProps) => {
    // --- STATE ---
    const {movie, department, page, perPage, setPage} = props;
    const {_id: movieID} = movie;

    const isDesktop = !useIsMobile();

    // --- FORM SETUP ---
    const presetValues: Partial<MovieCreditFormValues> = {
        department,
        movie: movieID,
    };

    const disableFields: (keyof MovieCreditFormValues)[] = [
        "department",
        "movie",
    ];

    // --- RENDER ---
    return (
        <PageFlexWrapper className="space-y-6">
            {/* --- Header --- */}
            <section className="space-y-2">
                <SectionHeader srOnly>Header</SectionHeader>
                <MoviePersonListBreadcrumb
                    movie={movie}
                    department={department}
                />
                <MoviePeopleHeader
                    movie={movie}
                    roleType={department}
                />
            </section>

            <div className="grid max-md:grid-cols-1 md:grid-cols-3 md:gap-4 gap-6">
                {/* --- Credit Form --- */}
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

                {/* --- Credit List --- */}
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
};

export default MoviePeoplePageContent;

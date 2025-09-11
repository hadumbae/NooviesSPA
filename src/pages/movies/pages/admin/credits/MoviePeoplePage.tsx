import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useFetchMovieParams from "@/pages/movies/hooks/params/useFetchMovieParams.ts";
import useFetchPopulatedMovieWithCredits from "@/pages/movies/hooks/queries/useFetchPopulatedMovieWithCredits.ts";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import MoviePersonListBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MoviePersonListBreadcrumb.tsx";
import MoviePeopleHeader from "@/pages/movies/components/headers/admin/MoviePeopleHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import MoviePersonSubmitFormContainer from "@/pages/movies/components/admin/credits/forms/MoviePersonSubmitFormContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import MoviePeopleListPageSection from "@/pages/movies/components/admin/sections/MoviePeopleListPageSection.tsx";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";

interface PeoplePageProps {
    roleType: RoleTypeDepartment;
}

const MoviePeoplePage: FC<PeoplePageProps> = ({roleType}) => {
    const movieParams = useFetchMovieParams();
    const {page, perPage} = usePaginationSearchParams();
    if (!movieParams) return <PageLoader />;

    const {movieID} = movieParams;
    const {data, isPending, isError, queryError, parseSuccess, parseError} = useFetchPopulatedMovieWithCredits({
        _id: movieID,
        page,
        perPage,
        virtuals: false,
        creditFilters: {roleType},
    });

    const formPresetValues = {roleType, movie: movieID};

    if (isPending) return <PageLoader />;
    if (isError) return <PageHTTPError error={queryError} />;
    if (!parseSuccess) return <PageParseError error={parseError} />;

    const {movie, credits: paginatedCredits} = data;
    const {items: credits} = paginatedCredits!;

    return (
        <PageFlexWrapper className="space-y-6">
            <section className="space-y-2">
                <h1 className="sr-only">Header</h1>
                <MoviePersonListBreadcrumb movie={movie!} roleType={roleType} />
                <MoviePeopleHeader movie={movie!} roleType={roleType} />
            </section>


            <section className="grid max-md:grid-cols-1 md:grid-cols-3 gap-4">
                <h1 className="sr-only">Credits</h1>

                <PageSection title="Add Credits" srTitle="Credit Form">
                    <Card>
                        <CardContent className="p-4">
                            <MoviePersonSubmitFormContainer movieID={movieID} presetValues={formPresetValues} />
                        </CardContent>
                    </Card>
                </PageSection>

                <MoviePeopleListPageSection roleType={roleType} credits={credits} />
            </section>
        </PageFlexWrapper>
    );
};

export default MoviePeoplePage;

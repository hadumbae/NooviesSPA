import {FC} from 'react';
import useFetchMoviePersonParams from "@/pages/movies/hooks/params/useFetchMoviePersonParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchMovieCredit from "@/pages/moviecredit/hooks/queries/useFetchMovieCredit.ts";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import MoviePersonEditHeader from "@/pages/movies/components/headers/admin/MoviePersonEditHeader.tsx";
import {MovieCreditPopulatedSchema} from "@/pages/moviecredit/schemas/model/references/MovieCreditPopulatedSchema.ts";
import MoviePersonUpdateFormContainer
    from "@/pages/movies/components/admin/credits/forms/MoviePersonUpdateFormContainer.tsx";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/base/MovieCreditSchema.ts";
import {useNavigate} from "react-router-dom";
import MoviePersonEditBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MoviePersonEditBreadcrumb.tsx";
import {format} from "date-fns";
import {Card, CardContent} from "@/common/components/ui/card.tsx";

const MoviePersonEditPage: FC = () => {
    const navigate = useNavigate();
    const params = useFetchMoviePersonParams();
    if (!params) return <PageLoader/>;

    const {creditID} = params;

    const {data, isPending, isError, error: queryError} = useFetchMovieCredit({_id: creditID, populate: true});
    const {data: credit, error: parseError} = useValidateData({schema: MovieCreditPopulatedSchema, data, isPending});

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (parseError) return <PageParseError error={parseError}/>;

    const {roleType, movie: {_id: movieID, title, releaseDate}} = credit!;
    const formattedReleaseDate = format(releaseDate, "yyyy");
    const movieTitle = `${title} (${formattedReleaseDate})`;

    const onSubmit = (credit: MovieCredit) => {
        const {movie, roleType} = credit;
        const movieID = typeof movie === "object" ? movie._id : movie;

        navigate(`/admin/movies/get/${movieID}/people/${roleType.toLowerCase()}`);
    }

    return (
        <PageFlexWrapper>
            <section className="space-y-2">
                <h1 className="sr-only">Header</h1>
                <MoviePersonEditBreadcrumb movieID={movieID} movieTitle={movieTitle} roleType={roleType}/>
                <MoviePersonEditHeader credit={credit!}/>
            </section>


            <PageSection>
                <Card>
                    <CardContent className="p-4">
                        <MoviePersonUpdateFormContainer
                            credit={credit!}
                            populate={false}
                            onSubmit={onSubmit}
                        />
                    </CardContent>
                </Card>
            </PageSection>
        </PageFlexWrapper>
    );
};

export default MoviePersonEditPage;

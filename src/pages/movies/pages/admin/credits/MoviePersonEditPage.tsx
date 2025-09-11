import {FC} from 'react';
import useFetchMoviePersonParams from "@/pages/movies/hooks/params/useFetchMoviePersonParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchMovieCredit from "@/pages/moviecredit/hooks/queries/useFetchMovieCredit.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import MoviePersonEditHeader from "@/pages/movies/components/headers/admin/MoviePersonEditHeader.tsx";
import MoviePersonUpdateFormContainer
    from "@/pages/movies/components/admin/credits/forms/MoviePersonUpdateFormContainer.tsx";
import {useNavigate} from "react-router-dom";
import MoviePersonEditBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MoviePersonEditBreadcrumb.tsx";
import {format} from "date-fns";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {MovieCreditDetailsSchema} from "@/pages/moviecredit/schemas/model/MovieCredit.schema.ts";
import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";

const MoviePersonEditPage: FC = () => {
    const navigate = useNavigate();
    const params = useFetchMoviePersonParams();
    if (!params) return <PageLoader/>;

    const {creditID} = params;

    const {data, isPending, isError, error: queryError} = useFetchMovieCredit({_id: creditID, populate: true});
    const {success, data: credit, error: parseError} = useValidateData({
        schema: MovieCreditDetailsSchema,
        data,
        isPending
    });

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!success) return <PageParseError error={parseError}/>;

    const {roleType, movie: {_id: movieID, title, releaseDate}} = credit;
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
                <MoviePersonEditHeader credit={credit}/>
            </section>


            <PageSection>
                <Card>
                    <CardContent className="p-4">
                        <MoviePersonUpdateFormContainer
                            credit={credit}
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

import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieDetailsHeader from "@/pages/movies/components/headers/MovieDetailsHeader.tsx";
import useFetchMovieParams from "@/pages/movies/hooks/params/useFetchMovieParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import MovieDetailsCard from "@/pages/movies/components/details/MovieDetailsCard.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import CollapsibleTextblock from "@/common/components/text/CollapsibleTextblock.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import MovieDetailsBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MovieDetailsBreadcrumb.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import MovieDetailsCreditPageSection from "@/pages/movies/components/admin/sections/MovieDetailsCreditPageSection.tsx";
import useFetchMovieWithCredits from "@/pages/movies/hooks/queries/useFetchMovieWithCredits.ts";

const MoviePage: FC = () => {
    useTitle("Movie Details");

    const movieParams = useFetchMovieParams();
    if (!movieParams) return <PageLoader />;

    const {movieID} = movieParams;
    const {data: {movie, cast, crew}, isPending, isError, errors} = useFetchMovieWithCredits({
        movieID,
        populateMovie: true,
        creditFilters: {limit: 6}
    });

    useTitle(movie?.title);

    const {query: queryError, parse: parseError} = errors;

    if (isPending) return <PageLoader />;
    if (isError) return <PageHTTPError error={queryError} />;
    if (parseError) return <PageParseError error={parseError} />;

    const {_id, synopsis} = movie!;

    return (
        <PageFlexWrapper>
            <MovieDetailsBreadcrumb />

            <MovieDetailsHeader movie={movie!} />

            <section>
                <MovieDetailsCard movie={movie!} />
            </section>

            <PageSection title="Synopsis">
                <Card>
                    <CardContent className="p-4">
                        <CollapsibleTextblock text={synopsis} />
                    </CardContent>
                </Card>
            </PageSection>

            <MovieDetailsCreditPageSection movieID={_id} roleType="CREW" credits={crew!} />

            <MovieDetailsCreditPageSection movieID={_id} roleType="CAST" credits={cast!} />
        </PageFlexWrapper>
    );
};

export default MoviePage;

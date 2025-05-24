import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieDetailsHeader from "@/pages/movies/components/headers/MovieDetailsHeader.tsx";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import useFetchMovieParams from "@/pages/movies/hooks/params/useFetchMovieParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import MovieDetailsCard from "@/pages/movies/components/details/MovieDetailsCard.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import CollapsibleTextblock from "@/common/components/text/CollapsibleTextblock.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import MovieDetailsBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MovieDetailsBreadcrumb.tsx";

const MoviePage: FC = () => {
    useTitle("Movie Details");

    const {movieID} = useFetchMovieParams();
    const {data: movie, isPending, isError, error} = useFetchMovie({_id: movieID!});

    useTitle(movie?.title);

    if (isPending) return <PageLoader />
    if (isError) return <PageError error={error} />

    const {synopsis} = movie;

    return (
        <PageFlexWrapper>
            <MovieDetailsBreadcrumb />

            <MovieDetailsHeader movie={movie} />

            <section>
                <MovieDetailsCard movie={movie} />
            </section>

            <PageSection title="Synopsis">
                <Card>
                    <CardContent className="p-4">
                        <CollapsibleTextblock text={synopsis} />
                    </CardContent>
                </Card>
            </PageSection>

            <PageSection title="Crew">
                {/*TODO Crew Movie Credit Component*/}
            </PageSection>

            <PageSection title="Cast">
                {/*TODO Crew Movie Credit Component*/}
            </PageSection>
        </PageFlexWrapper>
    );
};

export default MoviePage;

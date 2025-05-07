import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useFetchMovieBrowseParams from "@/pages/movies/hooks/params/client/useFetchMovieBrowseParams.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import MovieDetailsClientHeader from "@/pages/movies/components/headers/client/MovieDetailsClientHeader.tsx";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";

const MovieDetailsClientPage: FC = () => {
    const movieID = useFetchMovieBrowseParams();
    if (!movieID) return <PageLoader />;

    const {data: movie, isPending, isError, error} = useFetchMovie({_id: movieID});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    return (
        <PageFlexWrapper>
            <MovieDetailsClientHeader movie={movie} />

            <PageSection>

            </PageSection>

            <PageSection
                title="Movie Details"
                className="grid grid-cols-3 gap-2">
                <div>
                    <p>Add Poster Here!</p>
                    {/*TODO: Add Poster*/}
                </div>
                <div className="col-span-2">
                    <p>{movie.description}</p>
                    <p>Duration: {movie?.durationInMinutes} minutes</p>
                    {/* TODO: Add Favourites Button */}
                </div>
            </PageSection>
        </PageFlexWrapper>
    );
};

export default MovieDetailsClientPage;

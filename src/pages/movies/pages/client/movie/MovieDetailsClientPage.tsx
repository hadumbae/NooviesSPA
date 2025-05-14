import {FC} from 'react';
import useFetchMovieBrowseParams from "@/pages/movies/hooks/params/client/useFetchMovieBrowseParams.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import MovieDetailsClientHeader from "@/pages/movies/components/headers/client/MovieDetailsClientHeader.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import useFetchFavouriteMovieAndRelatedShowings
    from "@/pages/movies/hooks/client/favourites/useFetchFavouriteMovieAndRelatedShowings.ts";
import MoviePersonPreviewListContainer from "@/pages/movies/pages/persons/MoviePersonPreviewListContainer.tsx";
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import {cn} from "@/common/lib/utils.ts";

const MovieDetailsClientPage: FC = () => {
    const movieID = useFetchMovieBrowseParams();
    if (!movieID) return <PageLoader/>;

    const {data, isPending, isError, error} = useFetchFavouriteMovieAndRelatedShowings({movieID: movieID});

    if (isPending) return <PageLoader/>;
    if (isError) return <PageError error={error}/>;

    const {movie} = data;
    const {staff, cast} = movie;

    return (
        <section
            className={cn(
                "max-md:flex max-md:flex-col max-md:space-y-5",
                "md:grid md:grid-cols-3 md:gap-2"
            )}
        >
            <PageSection className="">
                <h1 className="sr-only">Movie Poster</h1>
                <p>Add Poster Here!</p>
                {/*TODO: Add Poster*/}
            </PageSection>

            <PageSection>
                <h1 className="sr-only">Movie Information</h1>

                {/* Header */}
                <section>
                    <h2 className="sr-only">Movie Header</h2>
                    <MovieDetailsClientHeader movie={movie}/>
                </section>

                {/* Trailer */}
                <section>
                    <h2 className="sr-only">Movie Trailer</h2>
                </section>

                {/* Movie Details */}
                <section>
                    <h2 className="sr-only">Movie Details</h2>
                </section>

                {/*Staff And Cast*/}
                <section>
                    <h2 className="sr-only">Staff And Cast</h2>

                    <MoviePersonPreviewListContainer
                        staff={staff as Person[]}
                        cast={cast as Person[]}
                    />
                </section>
            </PageSection>
        </section>
    );
};

export default MovieDetailsClientPage;

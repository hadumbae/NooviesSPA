import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import BrowseMoviesHeader from "@/pages/movies/components/client/browse-movies/BrowseMoviesHeader.tsx";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import useFetchPaginatedMovies from "@/pages/movies/hooks/queries/useFetchPaginatedMovies.ts";
import {PaginatedMovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {PaginatedMovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";

const BrowseMoviesPage: FC = () => {
    const query = useFetchPaginatedMovies({
        page: 1,
        perPage: 25,
        populate: true,
        virtuals: true,
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedMovieDetailsSchema}>
                {({totalItems, items: movies}: PaginatedMovieDetails) => {

                    return (
                        <PageFlexWrapper>
                            <BrowseMoviesHeader/>

                            Total Items: {totalItems}

                            <section>
                                {movies.map((movie) => <LoggedHoverLink
                                    key={movie._id}
                                    to={`/browse/movies/${movie._id}`}
                                >
                                    {movie.title}
                                </LoggedHoverLink>)}
                            </section>
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default BrowseMoviesPage;

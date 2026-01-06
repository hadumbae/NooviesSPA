import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import BrowseMoviesHeader from "@/pages/movies/components/client/browse-movies/BrowseMoviesHeader.tsx";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import useFetchPaginatedMovies from "@/pages/movies/hooks/queries/useFetchPaginatedMovies.ts";
import {PaginatedMovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {PaginatedMovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import BrowseMovieSummaryCard from "@/pages/movies/components/client/browse-movies/browse-movie-summary/BrowseMovieSummaryCard.tsx";
import {cn} from "@/common/lib/utils.ts";

const BrowseMoviesPage: FC = () => {
    const query = useFetchPaginatedMovies({
        page: 1,
        perPage: 25,
        config: {populate: true, virtuals: true},
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedMovieDetailsSchema}>
                {({totalItems, items: movies}: PaginatedMovieDetails) => {

                    return (
                        <PageFlexWrapper>
                            <BrowseMoviesHeader/>

                            Total Items: {totalItems}

                            <section className={cn(
                                "grid gap-2",
                                "grid-cols-1 lg:grid-cols-2",
                            )}>
                                {movies.map((movie) =>
                                    <BrowseMovieSummaryCard key={movie._id} movie={movie}/>
                                )}
                            </section>
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default BrowseMoviesPage;

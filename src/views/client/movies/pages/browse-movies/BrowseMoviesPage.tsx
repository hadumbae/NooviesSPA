import {FC} from 'react';
import PageFlexWrapper from "@/views/common/_comp/page/PageFlexWrapper.tsx";
import BrowseMoviesHeader from "@/domains/movies/components/client/browse-movies/BrowseMoviesHeader.tsx";
import useFetchPaginatedMovies from "@/domains/movies/hooks/queries/useFetchPaginatedMovies.ts";
import BrowseMovieSummaryCard
    from "@/domains/movies/components/client/browse-movies/browse-movie-summary/BrowseMovieSummaryCard.tsx";
import {cn} from "@/common/lib/utils.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {
    PaginatedMovieDetails,
    PaginatedMovieDetailsSchema
} from "@/domains/movies/schema/movie/PaginatedMovieDetailsSchema.ts";

const BrowseMoviesPage: FC = () => {
    const query = useFetchPaginatedMovies({
        page: 1,
        perPage: 25,
        config: {populate: true, virtuals: true},
    });

    return (
        <ValidatedDataLoader query={query} schema={PaginatedMovieDetailsSchema}>
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
        </ValidatedDataLoader>
    );
};

export default BrowseMoviesPage;

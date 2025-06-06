import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieIndexHeader from "@/pages/movies/components/headers/MovieIndexHeader.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import {useFetchPaginatedMovies} from "@/pages/movies/hooks/queries/useFetchPaginatedMovies.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import MovieIndexCard from "@/pages/movies/components/list/MovieIndexCard.tsx";

const MoviesPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams({perPage: "25"});
    const {data, isPending, isError, error, refetch} = useFetchPaginatedMovies({page, perPage, populate: true});

    if (isPending) return <PageLoader/>;
    if (isError) return <PageError error={error}/>;

    const onDelete = () => refetch();

    const {items: movies} = data;
    const hasMovies = (movies || []).length > 0;

    return (
        <PageFlexWrapper>
            <MovieIndexHeader/>

            {
                hasMovies
                    ? <PageSection srTitle="List Of Movies" className="space-y-3">
                        {
                            movies.map(
                                (movie: Movie) => <MovieIndexCard movie={movie} key={movie._id} onMovieDelete={onDelete}/>
                            )
                        }
                    </PageSection>
                    : <PageCenter>
                        <span className="text-neutral-400 select-none">
                            There Are No Movies
                        </span>
                    </PageCenter>
            }

        </PageFlexWrapper>
    );
};

export default MoviesPage;

import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieIndexHeader from "@/pages/movies/components/headers/MovieIndexHeader.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import {useFetchPaginatedMovies} from "@/pages/movies/hooks/queries/useFetchPaginatedMovies.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import MovieCardList from "@/pages/movies/components/MovieCardList.tsx";

const MoviesPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams({perPage: "25"});
    const {data, isPending, isError, error, refetch} = useFetchPaginatedMovies({page, perPage});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    const {items: movies} = data;

    const onDelete = () => {
        refetch();
    }

    return (
        <PageFlexWrapper>
            <MovieIndexHeader />

            <section className="space-y-2">
                <MovieCardList movies={movies} onMovieDelete={onDelete} />
            </section>
        </PageFlexWrapper>
    );
};

export default MoviesPage;

import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieIndexHeader from "@/pages/movies/components/headers/MovieIndexHeader.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import MovieIndexCard from "@/pages/movies/components/list/MovieIndexCard.tsx";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {PaginatedMovieSchema} from "@/pages/movies/schema/model/pagination/MoviePaginationSchema.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import useFetchMovieQuery from "@/pages/movies/hooks/queries/useFetchMovieQuery.ts";

const MoviesPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams({perPage: "25"});
    const {data, isPending, isError, error: queryError} = useFetchMovieQuery({populate: true, paginated: true, page, perPage});
    const {data: paginatedMovies, error: parseError} = useValidateData({schema: PaginatedMovieSchema, data, isPending});

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (parseError) return <PageParseError error={parseError}/>;

    const {items: movies} = paginatedMovies!;
    const hasMovies = (movies || []).length > 0;

    return (
        <PageFlexWrapper>
            <MovieIndexHeader/>

            {
                hasMovies
                    ? <PageSection srTitle="List Of Movies" className="space-y-3">
                        {movies.map((movie: Movie) => <MovieIndexCard movie={movie} key={movie._id} />)}
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

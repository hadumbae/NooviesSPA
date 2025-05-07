import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useFetchGenresAndMoviesWithData from "@/pages/movies/hooks/queries/useFetchGenresAndMoviesWithData.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import MoviesByGenreClientHeader from "@/pages/movies/components/headers/client/MoviesByGenreClientHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import GenreDropdownSelector from "@/pages/genres/components/input/GenreDropdownSelector.tsx";
import MovieClientBrowseList from "@/pages/movies/components/list/MovieClientBrowseList.tsx";

const MoviesByGenreClientPage: FC = () => {
    const dataQuery = useFetchGenresAndMoviesWithData();

    const {genres, movies, totalMovies} = dataQuery;
    const {isPending, isError, error} = dataQuery;

    if (isPending) return <PageLoader/>;
    if (isError) return <PageError error={error}/>;

    return (
        <PageFlexWrapper>
            <MoviesByGenreClientHeader/>

            <PageSection>
                <GenreDropdownSelector genres={genres!}/>
            </PageSection>

            <PageSection className="grid grid-cols-2 gap-2">
                <MovieClientBrowseList movies={movies!} />
            </PageSection>

            <PageSection>
                {totalMovies}
            </PageSection>
        </PageFlexWrapper>
    );
};

export default MoviesByGenreClientPage;

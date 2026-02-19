import {FC} from 'react';
import useTitle from "@/common/hooks/document/useTitle.ts";
import {useFetchCurrentUserFavourites} from "@/pages/users/fetch/favourites/useFetchCurrentUserFavourites.ts";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";
import MyFavouritesPageContent from "@/features/client/users/pages/favourites-page/MyFavouritesPageContent.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {PaginatedMovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {PaginatedMovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";

const MOVIES_PER_PAGE = 20;

const MyFavouritesPage: FC = () => {
    useTitle('My Favourites');

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const query = useFetchCurrentUserFavourites({page, perPage: MOVIES_PER_PAGE});

    return (
        <ValidatedDataLoader query={query} schema={PaginatedMovieDetailsSchema}>
            {({items: movies, totalItems}: PaginatedMovieDetails) => (
                <MyFavouritesPageContent
                    page={page}
                    setPage={setPage}
                    totalItems={totalItems}
                    movies={movies}
                    />
            )}
        </ValidatedDataLoader>
    );
};

export default MyFavouritesPage;

import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MyFavouritesPageHeader from "@/features/client/users/pages/favourites-page/headers/MyFavouritesPageHeader.tsx";

type ContentProps = {
    page: number;
    setPage: (page: number) => void;
    totalItems: number;
    movies: MovieDetails[];
};

const MyFavouritesPageContent = (
    {page, totalItems, movies}: ContentProps
) => {
    return (
        <PageFlexWrapper>
            <MyFavouritesPageHeader />
        </PageFlexWrapper>
    );
};

export default MyFavouritesPageContent;

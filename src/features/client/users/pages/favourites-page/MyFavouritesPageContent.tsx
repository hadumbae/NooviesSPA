/**
 * @file Favourites page content layout.
 * MyFavouritesPageContent.tsx
 */

import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MyFavouritesPageHeader from "@/features/client/users/pages/favourites-page/headers/MyFavouritesPageHeader.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import MyFavouriteMovieCompactCard from "@/features/client/movies/card/favourites/MyFavouriteMovieCompactCard.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

/** Props for MyFavouritesPageContent. */
type ContentProps = {
    /** Current page index. */
    page: number;
    /** Number of items per page. */
    perPage: number;
    /** Page change handler. */
    setPage: (page: number) => void;
    /** Total favourite count. */
    totalItems: number;
    /** Movies for the current page. */
    movies: MovieDetails[];
};

/** Renders the favourites page body with list and pagination. */
const MyFavouritesPageContent = (
    {page, perPage, totalItems, setPage, movies}: ContentProps
) => {
    const movieSection = (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {movies.map((movie: MovieDetails) =>
                <MyFavouriteMovieCompactCard key={movie.slug} movie={movie}/>)}
        </section>
    );

    return (
        <PageFlexWrapper>
            <MyFavouritesPageHeader/>

            {
                movies.length === 0 ? movieSection : (
                    <EmptyArrayContainer
                        text="You Have No Favourites"
                        className="flex-1"
                    />
                )
            }

            {
                totalItems > perPage &&
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalItems}
                    setPage={setPage}
                />
            }
        </PageFlexWrapper>
    );
};

export default MyFavouritesPageContent;
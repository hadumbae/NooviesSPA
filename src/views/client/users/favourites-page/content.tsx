/**
 * @fileoverview Favourites page content layout for displaying a user's saved movies.
 */

import {PageFlexWrapper} from "@/views/common/_comp/page";
import {MyFavouritesPageHeader} from "@/views/client/users/favourites-page/headers/header.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import MyFavouriteMovieCompactCard
    from "@/views/client/movies/components/card/favourites/MyFavouriteMovieCompactCard.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {ReactElement} from "react";
import {SROnly} from "@/views/common/_comp/screen-readers";

/** Props for the MyFavouritesPageContent component. */
type ContentProps = {
    page: number;
    perPage: number;
    setPage: (page: number) => void;
    totalItems: number;
    movies: MovieDetails[];
};

/** Renders the favourites page body including the movie grid and pagination controls. */
export function MyFavouritesPageContent(
    {page, perPage, totalItems, setPage, movies}: ContentProps
): ReactElement {
    return (
        <PageFlexWrapper>
            <MyFavouritesPageHeader/>

            {
                movies.length > 0 ? (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <SROnly text="Favourite Movies"/>

                        {movies.map((movie: MovieDetails) =>
                            <MyFavouriteMovieCompactCard key={movie.slug} movie={movie}/>
                        )}
                    </section>
                ) : (
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
}
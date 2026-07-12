/**
 * @fileoverview Component for toggling a movie's favorite status within the movie overview page.
 */

import {ReactElement} from "react";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";
import {Card, CardContent} from "@/common/components/ui";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {FavouriteMovieHeartButton} from "@/views/client/movies/_comp";

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {IsFavouriteMovieMetadata, useCheckIsFavouriteMovie, useToggleUserFavouriteMovie} from "@/domains/users";
import {cn} from "@/common/lib/utils.ts";

/** Props for the MovieOverviewFavouriteToggle component. */
type SelectorProps = {
    movieID: ObjectId;
}

/** Displays a card allowing the user to view and toggle the favorite status of a specific movie. */
export function MovieOverviewFavouriteToggle(
    {movieID}: SelectorProps
): ReactElement {
    const query = useCheckIsFavouriteMovie({_id: movieID});
    const {mutate, isPending} = useToggleUserFavouriteMovie();

    return (
        <QueryDataLoader query={query} loaderComponent={AnimatedLoader}>
            {({isFavourite}: IsFavouriteMovieMetadata) => {
                return (
                    <Card className={isFavourite ? "border-pink-500" : ""}>
                        <CardContent className="p-4 flex justify-between items-center">
                            <h2 className={cn("subsection-title", isFavourite ? "text-pink-500" : "")}>
                                {isFavourite ? "In Favourites" : "Add To Your Favourites"}
                            </h2>

                            <FavouriteMovieHeartButton
                                className={isFavourite ? "border-pink-500" : ""}
                                isFavourite={isFavourite}
                                movieID={movieID}
                                disabled={isPending}
                                onClick={() => mutate(movieID)}
                            />
                        </CardContent>
                    </Card>
                );
            }}
        </QueryDataLoader>
    );
}
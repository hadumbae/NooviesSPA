/**
 * @file Favourite selector component for a movie.
 * MovieFavouriteSelector.tsx
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useCheckIsFavouriteMovie} from "@/pages/movies/fetch/favourites/useCheckIsFavouriteMovie.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {
    IsFavouriteMovieMetadata,
    IsFavouriteMovieSchema
} from "@/pages/users/schemas/favourites/IsFavouriteMovieSchema.ts";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import FavouriteMovieHeartButton from "@/features/client/movies/buttons/FavouriteMovieHeartButton.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {useToggleUserFavouriteMovie} from "@/pages/users/mutations/useToggleUserFavouriteMovie.ts";

/** Props for MovieFavouriteSelector. */
type SelectorProps = {
    /** Target movie identifier. */
    movieID: ObjectId;
}

/** Displays and manages the current user's favourite state for a movie. */
const MovieFavouriteSelector = (
    {movieID}: SelectorProps
) => {
    const query = useCheckIsFavouriteMovie({_id: movieID});
    const {mutate, isPending} = useToggleUserFavouriteMovie();

    return (
        <ValidatedDataLoader query={query} schema={IsFavouriteMovieSchema} loaderComponent={AnimatedLoader}>
            {({isFavourite}: IsFavouriteMovieMetadata) => {
                return (
                    <Card className={isFavourite ? "border-pink-500" : ""}>
                        <CardContent className="p-4 flex justify-between items-center">
                            <PrimaryHeaderText className={isFavourite ? "text-pink-500" : ""}>
                                {isFavourite ? "In Favourites" : "Add To Your Favourites"}
                            </PrimaryHeaderText>

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
        </ValidatedDataLoader>
    );
};

export default MovieFavouriteSelector;
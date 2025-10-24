import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import {FavouriteMovie} from "@/pages/movies/schema/client/favourites/FavouriteMovieSchema.ts";
import FavouritesButton from "@/common/components/buttons/FavouritesButton.tsx";
import useAddMovieToFavouritesMutation from "@/pages/movies/hooks/client/favourites/useAddMovieToFavouritesMutation.ts";
import useRemoveMovieToFavouritesMutation
    from "@/pages/movies/hooks/client/favourites/useRemoveMovieToFavouritesMutation.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";

interface DetailsProps {
    movie: FavouriteMovie;
}

const MovieBrowseDetails: FC<DetailsProps> = ({movie}) => {
    const {_id, synopsis, genres, runtime, isFavourite} = movie;

    const genreString = (genres as Genre[]).map((genre) => genre.name).join(", ");
    const timeString = formatMovieRuntime(runtime);

    const addMutation = useAddMovieToFavouritesMutation({movieID: _id});
    const removeMutation = useRemoveMovieToFavouritesMutation({movieID: _id});
    const isPending = [addMutation.isPending, removeMutation.isPending].some(val => val);

    const onFavClick = () => {
        isFavourite
            ? removeMutation.mutate()
            : addMutation.mutate();
    }

    // genres
    // synopsis
    // runtime
    // releaseDate
    // creative credits
    // technical aspects
    //
    // Add To Favourites
    // Add To Watchlist

    // Social Media
    // Tweet, Reddit

    return (
        <Card>
            <CardContent className="p-4 space-y-7">
                <section>
                    <p><span className="font-extrabold pr-2">Genres</span> {genreString}</p>
                    <p><span className="font-extrabold pr-2">Runtime</span> {timeString}</p>
                </section>

                <section>
                    <p>{synopsis}</p>
                </section>

                <section>
                    <FavouritesButton
                        isPending={isPending}
                        isFavourite={isFavourite}
                        onClick={onFavClick} className="w-full"
                    />
                </section>
            </CardContent>
        </Card>
    );
};

export default MovieBrowseDetails;

import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/MovieSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import MovieOptions from "@/pages/movies/components/MovieOptions.tsx";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import generateGenreString from "@/pages/movies/utility/generateGenreString.ts";
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";

interface Props {
    movie: Movie;
    onMovieDelete: () => void;
}

const MovieListCard: FC<Props> = ({movie, onMovieDelete}) => {
    const {_id, title, genres, releaseDate, runtime} = movie;

    console.log(genres);

    const formattedDate = format(releaseDate, "yyyy");
    const genreString = generateGenreString(genres as Genre[]);

    return (
        <Card>
            <CardContent className="p-4 flex justify-between items-center">
                <div className="flex flex-col space-y-3">
                    <Link
                        to={`/admin/movies/get/${_id}`}
                        className="text-md font-extrabold hover:underline"
                    >
                        {title}
                    </Link>

                    <span>
                        {genreString} | {runtime} mins {formattedDate && ` | ${formattedDate}`}
                    </span>
                </div>

                <MovieOptions
                    movie={movie}
                    onDelete={onMovieDelete}
                    variant="outline"
                />
            </CardContent>
        </Card>
    );
};

export default MovieListCard;

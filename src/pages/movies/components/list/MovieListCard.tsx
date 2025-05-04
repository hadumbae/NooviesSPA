import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/MovieSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import MovieOptions from "@/pages/movies/components/MovieOptions.tsx";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import useGenerateMovieGenreString from "@/pages/movies/hooks/utility/useGenerateMovieGenreString.ts";

interface Props {
    movie: Movie;
    onMovieDelete: () => void;
}

const MovieListCard: FC<Props> = ({movie, onMovieDelete}) => {
    const {_id, title, genres, releaseDate, durationInMinutes} = movie;

    const formattedDate = format(releaseDate, "yyyy");
    const genreString = useGenerateMovieGenreString({genres});

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
                        {genreString} | {durationInMinutes} mins {formattedDate && ` | ${formattedDate}`}
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

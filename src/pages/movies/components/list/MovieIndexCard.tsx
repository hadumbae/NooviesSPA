import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import MovieOptions from "@/pages/movies/components/MovieOptions.tsx";
import {Link} from "react-router-dom";
import {format} from "date-fns";

interface Props {
    movie: Movie;
    onDelete?: () => void;
}

const MovieIndexCard: FC<Props> = ({movie, onDelete}) => {
    const {_id, title, originalTitle, releaseDate} = movie;
    const formattedDate = format(releaseDate, "yyyy");

    return (
        <Card>
            <CardContent className="p-4 flex items-center">
                <section className="flex-grow flex flex-col space-y-3">
                    <Link to={`/admin/movies/get/${_id}`} className="text-md font-extrabold hover:underline">
                        {title} {formattedDate && `(${formattedDate})`}
                    </Link>

                    <span>{originalTitle}</span>
                </section>

                <MovieOptions movie={movie} onDelete={onDelete} variant="outline" />
            </CardContent>
        </Card>
    );
};

export default MovieIndexCard;

import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/MovieSchema.ts";
import {Card, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import {format} from "date-fns";

interface MovieProps {
    movie: Movie;
}

const MovieClientBrowseCard: FC<MovieProps> = ({movie}) => {
    const {title, releaseDate} = movie;
    const formattedDate = format(releaseDate, "yyyy");

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{formattedDate}</CardDescription>
            </CardHeader>
        </Card>
    );
};

export default MovieClientBrowseCard;

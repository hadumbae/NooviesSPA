import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import {Card, CardDescription, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import {format} from "date-fns";
import {Link, useLocation} from "react-router-dom";

interface MovieProps {
    movie: Movie;
}

const MovieClientBrowseCard: FC<MovieProps> = ({movie}) => {
    const {search, hash} = useLocation();

    const {_id, title, releaseDate} = movie;
    const formattedDate = format(releaseDate, "yyyy");

    const navigatePath = {
        pathname: `/browse/movies/${_id}`,
        search,
        hash,
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Link className="hover:underline hover:underline-offset-4" to={navigatePath}>
                        {title}
                    </Link>
                </CardTitle>
                <CardDescription>{formattedDate}</CardDescription>
            </CardHeader>
        </Card>
    );
};

export default MovieClientBrowseCard;

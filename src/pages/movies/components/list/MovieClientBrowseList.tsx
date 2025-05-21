import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import MovieClientBrowseCard from "@/pages/movies/components/list/MovieClientBrowseCard.tsx";

interface BrowseListProps {
    movies: Movie[];
}

const MovieClientBrowseList: FC<BrowseListProps> = ({movies}) => {
    return (
        <>
            {movies.map(movie => <MovieClientBrowseCard
                key={movie._id}
                movie={movie}
            />)}
        </>
    );
};

export default MovieClientBrowseList;

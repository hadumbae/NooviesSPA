import {FC} from 'react';
import MovieClientBrowseCard from "@/domains/movies/components/list/MovieClientBrowseCard.tsx";
import {Movie} from "@/domains/movies/schema/movie/Movie.types.ts";

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

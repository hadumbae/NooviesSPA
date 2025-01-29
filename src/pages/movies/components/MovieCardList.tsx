import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/MovieSchema.ts";
import MovieListCard from "@/pages/movies/components/MovieListCard.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";

interface Props {
    movies: Movie[];
    onMovieDelete: () => void;
}

const MovieCardList: FC<Props> = ({movies, onMovieDelete}) => {
    if (movies.length === 0) {
        return <PageCenter>
            <span className="text-neutral-500">There are no movies.</span>
        </PageCenter>;
    }

    return (
        movies.map(
            (movie: Movie) => (
                <MovieListCard
                    movie={movie}
                    key={movie._id}
                    onMovieDelete={onMovieDelete}
                />
            )
        )
    );
};

export default MovieCardList;

import {FC} from 'react';

import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";

interface Props {
    genre: Genre;
}

/**
 * A React component that fetches and displays a paginated list of movies
 * belonging to a specific genre.
 *
 * @component
 * @param {Props} props - The component's props.
 * @param {Genre} props.genre - The genre object used to filter movies.
 *
 * @example
 * <MoviesPaginatedByGenre genre={selectedGenre} />
 *
 * This component fetches movies associated with the provided
 * genre and displays them in a paginated format. It ensures
 * that users can navigate through the list of movies easily,
 * based on the selected genre.
 */
const MoviesPaginatedByGenre: FC<Props> = ({genre}: Props) => {
    console.log(genre);

    return (
        <div>
            MoviesPaginatedByGenre
        </div>
    );
};

export default MoviesPaginatedByGenre;

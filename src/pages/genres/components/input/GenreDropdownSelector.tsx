import {FC} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";
import {Button} from "@/common/components/ui/button.tsx";
import useFetchMovieBrowseQueryParams from "@/pages/movies/hooks/params/useFetchMovieBrowseQueryParams.ts";

interface DropdownProps {
    genres: Genre[];
}

const GenreDropdownSelector: FC<DropdownProps> = ({genres}) => {
    const {rawQuery, setMovieQueryParams} = useFetchMovieBrowseQueryParams({genres});
    const {genreFilter: displayGenre = "All"} = rawQuery;

    const selectGenre = (genre?: Genre) => {
        console.log("Here!");
        setMovieQueryParams({genre});
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Genre: {displayGenre}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Genres</DropdownMenuLabel>
                <DropdownMenuSeparator/>

                <DropdownMenuItem onClick={() => selectGenre()}>
                    All
                </DropdownMenuItem>

                {genres.map(genre => <DropdownMenuItem key={genre._id} onClick={() => selectGenre(genre)}>
                        {genre.name}
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default GenreDropdownSelector;

import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {format} from "date-fns";
import {Pencil, Trash} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import MovieSubmitFormPanel from "@/pages/movies/components/forms/MovieSubmitFormPanel.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import MovieDeleteWarningDialog from "@/pages/movies/components/dialog/MovieDeleteWarningDialog.tsx";
import {useNavigate} from "react-router-dom";

interface Props {
    /** The movie object containing details to display in the header. */
    movie: Movie;
}

/**
 * Component that renders the header section for a movie details page.
 *
 * This header includes:
 * - The movie title and release year.
 * - The movie tagline.
 * - Buttons for editing or deleting the movie.
 *
 * The Edit button opens the `MovieSubmitFormPanel` in editing mode.
 * The Delete button opens the `MovieDeleteWarningDialog` and navigates
 * back to the movies list upon successful deletion.
 *
 * @param {Props} props - The component props.
 * @param {Movie} props.movie - The movie to display details for.
 *
 * @example
 * ```tsx
 * <MovieDetailsHeader movie={myMovie} />
 * ```
 */
const MovieDetailsHeader: FC<Props> = ({ movie }) => {
    const navigate = useNavigate();

    const { _id, title, releaseDate, tagline } = movie;
    const formattedDate = releaseDate && format(releaseDate, "yyyy");

    /** Callback fired after movie is successfully deleted. Navigates back to movies list. */
    const onMovieDelete = () => navigate("/admin/movies");

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center"
        )}>
            <section>
                <HeaderTitle>{title} ({formattedDate})</HeaderTitle>
                <HeaderDescription>{tagline}</HeaderDescription>
            </section>

            <section className="space-x-2 flex justify-end items-center">
                <MovieSubmitFormPanel isEditing={true} movie={movie}>
                    <Button variant="link" className="text-neutral-400 hover:text-black">
                        <Pencil/> Edit
                    </Button>
                </MovieSubmitFormPanel>

                <MovieDeleteWarningDialog movieID={_id} onDeleteSuccess={onMovieDelete}>
                    <Button variant="link" className="text-neutral-400 hover:text-black">
                        <Trash /> Delete
                    </Button>
                </MovieDeleteWarningDialog>
            </section>
        </header>
    );
};

export default MovieDetailsHeader;

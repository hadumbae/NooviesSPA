import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {format} from "date-fns";
import {Pencil, TableOfContents, Trash} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {cn} from "@/common/lib/utils.ts";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import useMovieDeleteMutation from "@/pages/movies/hooks/mutations/useMovieDeleteMutation.ts";
import HeaderButton from "@/common/components/page/headers/HeaderButton.tsx";

interface Props {
    movie: Movie;
}

const MovieDetailsHeader: FC<Props> = ({movie}) => {
    const navigate = useNavigate();

    const {_id, title, releaseDate, tagline} = movie;
    const formattedDate = releaseDate && format(releaseDate, "yyyy");

    const {mutate: deleteMovie, isPending, isSuccess} = useMovieDeleteMutation({
        onDelete: () => navigate("/admin/movies")
    });

    const isDisabled = isPending || isSuccess;

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
                <HeaderLink variant="link" to="/admin/movies">
                    <TableOfContents /> Index
                </HeaderLink>

                <HeaderLink variant="link" to={`/admin/movies/edit/${_id}`}>
                    <Pencil /> Edit
                </HeaderLink>

                <HeaderButton
                    variant="link"
                    disabled={isDisabled}
                    onClick={() => deleteMovie({_id})}
                >
                    <Trash /> Delete
                </HeaderButton>
            </section>
        </header>
    );
};

export default MovieDetailsHeader;

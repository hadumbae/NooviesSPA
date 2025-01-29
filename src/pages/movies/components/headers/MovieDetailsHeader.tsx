import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/MovieSchema.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {format} from "date-fns";
import {TableOfContents} from "lucide-react";
import MovieOptions from "@/pages/movies/components/MovieOptions.tsx";
import {useNavigate} from "react-router-dom";
import {Button} from "@/common/components/ui/button.tsx";

interface Props {
    movie: Movie;
}

const MovieDetailsHeader: FC<Props> = ({movie}) => {
    const navigate = useNavigate();
    const {title, releaseDate} = movie;
    const formattedDate = releaseDate && format(releaseDate, "yyyy");

    const navigateToIndex = () => {
        navigate("/admin/movies");
    }

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>{title}</HeaderTitle>
                <HeaderDescription>
                    Movie {formattedDate && ` | ${formattedDate}`}
                </HeaderDescription>
            </div>

            <div className="space-x-2">
                <Button
                    variant="outline"
                    className="p-2"
                    onClick={navigateToIndex}
                >
                    <TableOfContents />
                </Button>

                <MovieOptions
                    variant="outline"
                    className="p-2"
                    movie={movie}
                    onDelete={navigateToIndex}
                />
            </div>
        </header>
    );
};

export default MovieDetailsHeader;

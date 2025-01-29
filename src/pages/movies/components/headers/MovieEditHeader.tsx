import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Movie} from "@/pages/movies/schema/MovieSchema.ts";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Search, TableOfContents} from "lucide-react";

interface Props {
    movie: Movie;
}

const MovieEditHeader: FC<Props> = ({movie}) => {
    const {_id, title} = movie

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>{title}</HeaderTitle>
                <HeaderDescription>Edit the movie ({title}) here.</HeaderDescription>
            </div>

            <div className="space-x-2">
                <HeaderLink to="/admin/movies">
                    <TableOfContents/>
                </HeaderLink>
                <HeaderLink to={`/admin/movies/get/${_id}`}>
                    <Search/>
                </HeaderLink>
            </div>
        </header>
    );
};

export default MovieEditHeader;

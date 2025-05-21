import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Search, TableOfContents} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    movie: Movie;
}

const MovieEditHeader: FC<Props> = ({movie}) => {
    const {_id, title} = movie

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center"
        )}>
            <section>
                <HeaderTitle>{title}</HeaderTitle>
                <HeaderDescription>Edit the movie ({title}) here.</HeaderDescription>
            </section>

            <section className="space-x-2 flex justify-end items-center">
                <HeaderLink variant="link" to="/admin/movies">
                    <TableOfContents/> Index
                </HeaderLink>
                <HeaderLink variant="link" to={`/admin/movies/get/${_id}`}>
                    <Search/> Details
                </HeaderLink>
            </section>
        </header>
    );
};

export default MovieEditHeader;

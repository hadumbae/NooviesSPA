import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";

interface Props {
    movie: Movie;
}

const MovieEditHeader: FC<Props> = ({movie}) => {
    const {title} = movie

    return (
        <header>
            <HeaderTitle>{title}</HeaderTitle>
            <HeaderDescription>Edit the movie ({title}) here.</HeaderDescription>
        </header>
    );
};

export default MovieEditHeader;

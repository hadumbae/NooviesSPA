import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";

type ContentProps = {
    movie: MovieDetails;
};

const MovieInfoShowingsPageContent = ({movie}: ContentProps) => {
    const {title} = movie;

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{title}</HeaderTitle>
                <HeaderDescription>Showings</HeaderDescription>
            </header>
        </PageFlexWrapper>
    );
};

export default MovieInfoShowingsPageContent;

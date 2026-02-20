import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

type ContentProps = {
    movie: MovieDetails;
}

const MovieInfoCreditsPageContent = ({movie}: ContentProps) => {
    const {title} = movie;

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{title}</HeaderTitle>
                <HeaderDescription>Cast & Crew</HeaderDescription>
            </header>
        </PageFlexWrapper>
    );
};

export default MovieInfoCreditsPageContent;

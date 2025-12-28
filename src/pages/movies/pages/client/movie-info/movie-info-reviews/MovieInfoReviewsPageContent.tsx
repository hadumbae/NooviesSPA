import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

type ContentProps = {
    movie: MovieDetails;
}

const MovieInfoReviewsPageContent = ({movie} : ContentProps) => {
    const {title} = movie;

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{title}</HeaderTitle>
                <HeaderDescription>Reviews</HeaderDescription>
            </header>
        </PageFlexWrapper>
    );
};

export default MovieInfoReviewsPageContent;

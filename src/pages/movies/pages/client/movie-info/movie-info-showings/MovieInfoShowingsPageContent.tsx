import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";

type ContentProps = {
    page: number,
    perPage: number,
    setPage: (page: number) => void,
    movie: MovieDetails;
    totalShowings: number;
    showings: ShowingDetails[];
};

const MovieInfoShowingsPageContent = (props: ContentProps) => {
    const {
        page,
        perPage,
        movie,
        totalShowings,
        showings,
    } = props;

    const {title} = movie;

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{title}</HeaderTitle>
                <HeaderDescription>Showings</HeaderDescription>
            </header>

            <div>
                <p>Page: {page}, Per Page: {perPage}</p>
                <p>Showings: {showings.length}</p>
                <p>Total Showings: {totalShowings}</p>
            </div>
        </PageFlexWrapper>
    );
};

export default MovieInfoShowingsPageContent;

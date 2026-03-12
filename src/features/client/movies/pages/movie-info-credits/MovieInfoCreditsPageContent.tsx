import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {
    CastCreditExceptMovie
} from "@/pages/moviecredit/schemas/model/credit-except-schemas/CreditExceptMovie.types.ts";
import {
    GroupedCrewCreditsExceptMovie
} from "@/pages/moviecredit/schemas/model/movie-credit-related-schema/MovieCreditRelated.types.ts";

type ContentProps = {
    movie: MovieDetails;
    castCredits: CastCreditExceptMovie[];
    crewCredits: GroupedCrewCreditsExceptMovie[];
}

const MovieInfoCreditsPageContent = (
    {movie, castCredits, crewCredits}: ContentProps
) => {
    const {title} = movie;

    console.log("Cast : ", castCredits);
    console.log("Crew: ", crewCredits);

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

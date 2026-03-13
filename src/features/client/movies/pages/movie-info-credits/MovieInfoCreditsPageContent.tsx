/**
 * @file Page content component for the movie credits view.
 * @filename MovieInfoCreditsPageContent.tsx
 */

import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {
    CastCreditExceptMovie
} from "@/pages/moviecredit/schemas/model/credit-except-schemas/CreditExceptMovie.types.ts";
import {
    GroupedCrewCreditsExceptMovie
} from "@/pages/moviecredit/schemas/model/movie-credit-related-schema/MovieCreditRelated.types.ts";
import MovieInfoHeader from "@/features/client/movies/headers/MovieInfoHeader.tsx";
import MovieInfoCastCreditsSection
    from "@/features/client/movies/pages/movie-info-credits/sections/MovieInfoCastCreditsSection.tsx";
import {
    buildFullCreditListByCategoryOrder
} from "@/pages/movies/views/client/movie-info-credits-page/buildFullCreditListByCategoryOrder.ts";
import MovieInfoCreditListSection
    from "@/features/client/movies/pages/movie-info-credits/sections/MovieInfoCreditListSection.tsx";
import {useMemo} from "react";

/**
 * Props for {@link MovieInfoCreditsPageContent}.
 */
type ContentProps = {
    /** Movie details displayed in the header */
    movie: MovieDetails;

    /** Cast credits for the movie */
    castCredits: CastCreditExceptMovie[];

    /** Crew credits grouped by category */
    crewCredits: GroupedCrewCreditsExceptMovie[];
}

/**
 * Renders the movie credits page content.
 */
const MovieInfoCreditsPageContent = (
    {movie, castCredits, crewCredits}: ContentProps
) => {
    const {title, slug, posterImage} = movie;

    const organisedList = useMemo(
        () => buildFullCreditListByCategoryOrder({castCredits, crewDetails: crewCredits}),
        [castCredits, crewCredits]
    );

    return (
        <PageFlexWrapper className="space-y-8">
            <MovieInfoHeader
                posterURL={posterImage?.secure_url}
                movieSlug={slug}
                movieTitle={title}
                pageText="Cast & Crew"
            />

            {
                organisedList.map(([category, credits]) => {
                    if (category === "Cast") {
                        return (
                            <MovieInfoCastCreditsSection
                                key={`${category}-${credits.length}`}
                                cast={credits as CastCreditExceptMovie[]}
                            />
                        );
                    }

                    return (
                        <MovieInfoCreditListSection
                            key={`${category}-${credits.length}`}
                            category={category}
                            credits={credits}
                        />
                    );
                })
            }

        </PageFlexWrapper>
    );
};

export default MovieInfoCreditsPageContent;
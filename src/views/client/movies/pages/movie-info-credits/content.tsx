/**
 * @fileoverview Content component for the movie credits page displaying organized cast and crew lists.
 */

import {PageFlexWrapper} from "@/views/common/_comp/page";
import {CastCreditExceptMovie} from "@/domains/moviecredit/_feat/movie-info-credits/CreditExceptMovie.types.ts";
import MovieInfoHeader from "@/views/client/movies/components/headers/MovieInfoHeader.tsx";
import {
    MovieInfoCastCreditsSection
} from "@/views/client/movies/pages/movie-info-credits/sections/MovieInfoCastCreditsSection.tsx";
import {
    MovieInfoCreditListSection
} from "@/views/client/movies/pages/movie-info-credits/sections/MovieInfoCreditListSection.tsx";
import {ReactElement, useMemo} from "react";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {
    GroupedCrewCreditsExceptMovie
} from "@/domains/moviecredit/schemas/model/GroupedCrewCreditsExceptMovieSchema.ts";
import {
    buildFullCreditListByCategoryOrder
} from "@/domains/movies/_feat/manage-credits-page/buildFullCreditListByCategoryOrder.ts";

/** Props for the MovieInfoCreditsPageContent component. */
type ContentProps = {
    movie: MovieDetails;
    castCredits: CastCreditExceptMovie[];
    crewCredits: GroupedCrewCreditsExceptMovie[];
}

/** Renders the full list of cast and crew credits for a specific movie. */
export function MovieInfoCreditsPageContent(
    {movie, castCredits, crewCredits}: ContentProps
): ReactElement {
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
}
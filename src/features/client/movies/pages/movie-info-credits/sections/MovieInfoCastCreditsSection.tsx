/**
 * @file Section component displaying cast credits for a movie.
 * @filename MovieInfoCastCreditsSection.tsx
 */

import {useMemo} from "react";
import {
    CastCreditExceptMovie
} from "@/domains/moviecredit/schemas/model/credit-except-schemas/CreditExceptMovie.types.ts";
import {
    organiseMovieCastCreditsByPrimacy
} from "@/domains/movies/views/client/movie-info-credits-page/organiseMovieCastCreditsByPrimacy.ts";
import MovieCreditInfoList from "@/features/client/movie-credits/components/lists/MovieCreditInfoList.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";

/**
 * Props for {@link MovieInfoCastCreditsSection}.
 */
type SectionProps = {
    /** Cast credits for the movie */
    cast: CastCreditExceptMovie[];
};

/**
 * Renders primary and supporting cast credit lists.
 */
const MovieInfoCastCreditsSection = ({cast}: SectionProps) => {
    const organisedCast = useMemo(
        () => organiseMovieCastCreditsByPrimacy({credits: cast}),
        [cast]
    );

    const {primaryCast, supportCast} = organisedCast;

    return (
        <section className="space-y-4">
            <SectionHeader className={SectionHeaderCSS}>
                Cast
            </SectionHeader>

            <PrimaryHeaderText className="hidden" as="h3">Support Cast</PrimaryHeaderText>

            <MovieCreditInfoList credits={primaryCast} />

            <PrimaryHeaderText className="text-base" as="h3">Support Cast</PrimaryHeaderText>

            <MovieCreditInfoList credits={supportCast} />
        </section>
    );
};

export default MovieInfoCastCreditsSection;
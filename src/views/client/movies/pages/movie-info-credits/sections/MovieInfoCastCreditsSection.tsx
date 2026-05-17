/**
 * @fileoverview Section component that displays movie cast credits organized by primacy.
 */

import {ReactElement, useMemo} from "react";
import {
    CastCreditExceptMovie
} from "@/domains/moviecredit/_feat/movie-info-credits/CreditExceptMovie.types.ts";
import MovieCreditInfoList from "@/views/client/movie-credits/components/lists/MovieCreditInfoList.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {
    organiseMovieCastCreditsByPrimacy
} from "@/domains/movies/_feat/manage-credits-page/organiseMovieCastCreditsByPrimacy.ts";

/** Props for the MovieInfoCastCreditsSection component. */
type SectionProps = {
    cast: CastCreditExceptMovie[];
};

/** Displays the primary and support cast members for a specific movie. */
export function MovieInfoCastCreditsSection(
    {cast}: SectionProps
): ReactElement {
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
}
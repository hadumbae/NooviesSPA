/**
 * @fileoverview Section component that displays movie cast credits organized by primacy.
 */

import {ReactElement, useMemo} from "react";
import {MovieCreditInfoList} from "@/views/client/movie-credits/_comp";

import {organiseMovieCastCreditsByPrimacy} from "@/domains/movies";
import {CastCreditExceptMovie} from "@/domains/movie-credits";
import {PageSectionHeader} from "@/views/common/_comp/page";

/** Props for the MovieInfoCastCreditsSection component. */
type SectionProps = {
    cast: CastCreditExceptMovie[];
};

/** Displays the primary and support cast members for a specific movie. */
export function MovieInfoCastCreditsSection(
    {cast}: SectionProps
): ReactElement {
    const {primaryCast, supportCast} = useMemo(
        () => organiseMovieCastCreditsByPrimacy({credits: cast}),
        [cast]
    );

    return (
        <section className="space-y-4">
            <PageSectionHeader text="Cast"/>
            <MovieCreditInfoList credits={primaryCast}/>

            <h3 className="subsection-title text-base">Support Cast</h3>
            <MovieCreditInfoList credits={supportCast}/>
        </section>
    );
}
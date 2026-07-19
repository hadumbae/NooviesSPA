/**
 * @fileoverview Displays a summarized cast and crew section on the movie details page.
 */

import {ReactElement} from "react";
import {ChevronRight} from "lucide-react";
import {Separator} from "@/common/components/ui";
import {HoverLink, SeparatedLinks} from "@/views/common/_feat";
import {LabelContent, NoneSpan, PageSectionHeaderLink} from "@/views/common/_comp";
import {ActorCreditAvatar} from "@/views/admin/movie-credits/_comp/actor-credit-avatar/ActorCreditAvatar.tsx";

import {MovieDetails} from "@/domains/movies";
import {generateMovieCreditLinkConfigs, MovieCreditDetails} from "@/domains/movie-credits";

/** Props for the MovieOverviewCredits component. */
type MovieOverviewCreditsProps = {
    movie: MovieDetails;
    credits: MovieCreditDetails[];
};

/** Displays a preview of the cast and key crew members for a specific movie. */
export function MovieOverviewCredits({movie, credits}: MovieOverviewCreditsProps): ReactElement {
    const {slug: movieSlug} = movie;

    const {directors: directorLinks, writers: writerLinks} = generateMovieCreditLinkConfigs({
        sourceComponent: MovieOverviewCredits.name,
        credits,
    });

    return (
        <section className="space-y-6">
            <PageSectionHeaderLink
                to={`/browse/movies/${movieSlug}/credits`}
                text="Cast & Crew"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 gap-2">
                {
                    credits.filter(
                        (credit): credit is Extract<MovieCreditDetails, { department: "CAST" }> =>
                            credit.department === "CAST" && credit.isPrimary
                    ).map(credit => <ActorCreditAvatar credit={credit} key={credit._id}/>)
                }
            </div>

            <div className="space-y-2">
                <LabelContent orientation="horizontal" label="Directors">
                    {directorLinks.length > 0 ? <SeparatedLinks links={directorLinks}/> : <NoneSpan/>}
                </LabelContent>

                <Separator/>

                <LabelContent orientation="horizontal" label="Writers">
                    {writerLinks.length > 0 ? <SeparatedLinks links={writerLinks}/> : <NoneSpan/>}
                </LabelContent>

                <Separator/>

                <HoverLink
                    to={`/browse/movies/${movieSlug}/credits`}
                    className="flex justify-between items-center"
                >
                    <span>Full Cast & Crew</span>
                    <ChevronRight/>
                </HoverLink>
            </div>
        </section>
    );
}

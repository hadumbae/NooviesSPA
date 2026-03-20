/**
 * @file Displays a summarized cast and crew section on the movie details page.
 * @filename MovieOverviewCredits.tsx
 */

import generateMovieCreditLinkConfigs from "@/domains/moviecredit/utility/generateMovieCreditLinkConfigs.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import LinkGroup from "@/common/components/LinkGroup.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import NoneSpan from "@/common/components/NoneSpan.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {ChevronRight} from "lucide-react";
import ActorCreditAvatar from "@/domains/moviecredit/components/clients/ActorCreditAvatar.tsx";
import SectionHeaderLink from "@/common/components/page/SectionHeaderLink.tsx";
import {
    MovieCreditDetails
} from "@/domains/moviecredit/schemas/model/movie-credit-details-schema/MovieCreditDetails.types.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";

/**
 * Component props.
 */
type MovieOverviewCreditsProps = {
    /** Movie used for credit page routing */
    movie: MovieDetails;

    /** Credit records associated with the movie */
    credits: MovieCreditDetails[];
};

/**
 * Renders a compact preview of primary cast and key crew groups
 * with navigation to the full credits page.
 */
const MovieOverviewCredits = ({movie, credits}: MovieOverviewCreditsProps) => {
    const {slug: movieSlug} = movie;

    const {directors: directorLinks, writers: writerLinks} = generateMovieCreditLinkConfigs({
        sourceComponent: MovieOverviewCredits.name,
        credits,
    });

    return (
        <section className="space-y-6">
            <SectionHeaderLink to={`/browse/movies/${movieSlug}/credits`}>
                Cast & Crew
            </SectionHeaderLink>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 gap-2">
                {
                    credits.filter(
                        (credit): credit is Extract<MovieCreditDetails, { department: "CAST" }> =>
                            credit.department === "CAST" && credit.isPrimary
                    ).map(credit => <ActorCreditAvatar credit={credit} key={credit._id}/>)
                }
            </div>

            <div className="space-y-2">
                {/* DIRECTORS */}

                <LabeledGroup label="Directors">
                    {directorLinks.length > 0
                        ? <LinkGroup links={directorLinks}/>
                        : <NoneSpan/>
                    }
                </LabeledGroup>

                <Separator/>

                {/* WRITERS */}

                <LabeledGroup label="Writers">
                    {writerLinks.length > 0
                        ? <LinkGroup links={writerLinks}/>
                        : <NoneSpan/>
                    }
                </LabeledGroup>

                <Separator/>

                {/* FULL CAST & CREW */}

                <LoggedHoverLink
                    to={`/browse/movies/${movieSlug}/credits`}
                    className="flex justify-between items-center"
                >
                    <span>Full Cast & Crew</span>
                    <ChevronRight/>
                </LoggedHoverLink>
            </div>
        </section>
    );
};

export default MovieOverviewCredits;
/**
 * @file MovieCreditInfoRow.tsx
 *
 * @summary
 * Displays a compact overview of key movie credits (directors and writers),
 * with navigation to the full cast & crew page.
 *
 * @description
 * This component renders a structured “Cast & Crew” section for a movie detail
 * page. It:
 * - Groups director and writer credits using labeled sections
 * - Converts credits into navigable links via `generateMovieCreditLinkConfigs`
 * - Gracefully falls back to a `NoneSpan` when no credits are available
 * - Provides a logged navigation link to the full credits page
 *
 * Primarily intended for use on movie detail views as a high-level summary,
 * not a full credit listing.
 *
 * @example
 * ```tsx
 * <MovieCreditInfoRow
 *   movie={movie}
 *   credits={movieCredits}
 * />
 * ```
 */

import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {SectionHeaderCSS} from "@/common/constants/css/TextCSS.ts";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import generateMovieCreditLinkConfigs from "@/pages/moviecredit/utility/generateMovieCreditLinkConfigs.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import LinkGroup from "@/common/components/LinkGroup.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import NoneSpan from "@/common/components/NoneSpan.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {ChevronRight} from "lucide-react";
import ActorCreditAvatar from "@/pages/moviecredit/components/clients/ActorCreditAvatar.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import {cn} from "@/common/lib/utils.ts";
import {RoundedBorderCSS} from "@/common/constants/css/ContainerCSS.ts";

/**
 * Props for {@link MovieCreditInfoRow}.
 */
type RowProps = {
    /** Movie metadata used for routing to the full credits page */
    movie: MovieDetails;

    /** List of credit entries associated with the movie */
    credits: MovieCreditDetails[];
};

/**
 * Renders a summarized Cast & Crew section for a movie.
 *
 * @param props - {@link RowProps}
 * @returns A section containing director and writer credits with navigation
 */
const MovieCreditInfoRow = ({movie, credits}: RowProps) => {
    const {slug: movieSlug} = movie;

    // --- AVATARS ---
    const mainActorAvatars = credits.filter(
        (credit): credit is Extract<MovieCreditDetails, { department: "CAST" }> =>
            credit.department === "CAST" && credit.isPrimary
    ).map(credit => <ActorCreditAvatar credit={credit} key={credit._id}/>);

    // --- Link Configs ---
    const {directors: directorLinks, writers: writerLinks} = generateMovieCreditLinkConfigs({
        sourceComponent: MovieCreditInfoRow.name,
        credits,
    });

    return (
        <section className="space-y-4">
            <SectionHeader className={SectionHeaderCSS}>
                Cast & Crew
            </SectionHeader>

            <ScrollArea className={cn(RoundedBorderCSS, "p-3")}>
                <div className="flex justify-start items-center space-x-5">
                    {mainActorAvatars}
                </div>

                <ScrollBar orientation="horizontal"/>
            </ScrollArea>

            <div className="space-y-2">
                {/* Directors */}
                <LabeledGroup label="Directors">
                    {
                        directorLinks.length > 0
                            ? <LinkGroup links={directorLinks}/>
                            : <NoneSpan/>
                    }
                </LabeledGroup>

                <Separator/>

                {/* Writers */}
                <LabeledGroup label="Writers">
                    {
                        writerLinks.length > 0
                            ? <LinkGroup links={writerLinks}/>
                            : <NoneSpan/>
                    }
                </LabeledGroup>

                <Separator/>

                {/* Full Cast & Crew */}
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

export default MovieCreditInfoRow;

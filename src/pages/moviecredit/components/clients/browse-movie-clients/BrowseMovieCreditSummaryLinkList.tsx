/**
 * @file MovieCreditSummaryLinkList.tsx
 * @description
 * Renders a concise list of movie credit links, grouped by directors
 * and primary actors.
 */

import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import LinkGroup from "@/common/components/LinkGroup.tsx";
import generateMovieCreditLinkConfigs from "@/pages/moviecredit/utility/generateMovieCreditLinkConfigs.ts";
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for {@link BrowseMovieCreditSummaryLinkList}.
 */
type LinkProps = {
    /**
     * List of movie credits used to derive director and actor links.
     */
    credits: MovieCreditDetails[];
};

/**
 * Displays grouped credit links for a movie.
 *
 * - **Directors**: crew members with the Director role
 * - **Actors**: primary cast members
 *
 * If no credits exist for a group, a styled "None" placeholder is rendered.
 *
 * @param props - Component props.
 *
 * @example
 * ```tsx
 * <MovieCreditSummaryLinkList credits={credits} />
 * ```
 */
const BrowseMovieCreditSummaryLinkList = (props: LinkProps) => {
    const {credits} = props;

    // --- PLACEHOLDERS ---
    const spanCSS = cn(
        PrimaryTextBaseCSS,
        "italic max-md:text-sm select-none",
    );

    const noneSpan = (
        <span className={spanCSS}>
            None
        </span>
    );

    // --- LINKS ---
    const {directors: directorLinks, actors: actorLinks} =
        generateMovieCreditLinkConfigs({
            sourceComponent: BrowseMovieCreditSummaryLinkList.name,
            credits,
        });

    // --- RENDER ---
    return (
        <div className="space-y-1">
            <LabeledGroup label="Directors">
                {directorLinks.length > 0
                    ? <LinkGroup links={directorLinks}/>
                    : noneSpan}
            </LabeledGroup>

            <LabeledGroup label="Actors">
                {actorLinks.length > 0
                    ? <LinkGroup links={actorLinks}/>
                    : noneSpan}
            </LabeledGroup>
        </div>
    );
};

export default BrowseMovieCreditSummaryLinkList;

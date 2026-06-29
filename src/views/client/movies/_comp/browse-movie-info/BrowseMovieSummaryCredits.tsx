/**
 * @fileoverview Renders a concise list of movie credit links grouped by directors and primary actors.
 */

import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import LinkGroup from "@/common/components/LinkGroup.tsx";
import {generateMovieCreditLinkConfigs} from "@/domains/movie-credits/_feat/navigation/generateMovieCreditLinkConfigs.ts";

import {MovieCreditDetails} from "@/domains/movie-credits/_schemas/model/MovieCreditDetailsSchema.ts";
import {ReactElement} from "react";

/** Props for the BrowseMovieSummaryCredits component. */
type LinkProps = {
    credits: MovieCreditDetails[];
};

/**
 * Displays grouped credit links for a movie, including directors and primary actors.
 */
export function BrowseMovieSummaryCredits(
    {credits}: LinkProps
): ReactElement {
    const spanCSS = "primary-text italic max-md:text-sm select-none";
    const noneSpan = (<span className={spanCSS}>None</span>);

    const {directors, actors} = generateMovieCreditLinkConfigs({
        sourceComponent: BrowseMovieSummaryCredits.name,
        credits,
    });

    return (
        <div className="space-y-1">
            <LabeledGroup label="Directors">
                {directors.length > 0 ? <LinkGroup links={directors}/> : noneSpan}
            </LabeledGroup>

            <LabeledGroup label="Actors">
                {actors.length > 0 ? <LinkGroup links={actors}/> : noneSpan}
            </LabeledGroup>
        </div>
    );
}



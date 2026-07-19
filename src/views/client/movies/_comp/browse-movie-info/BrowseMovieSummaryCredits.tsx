/**
 * @fileoverview Renders a concise list of movie credit links grouped by directors and primary actors.
 */

import {ReactElement} from "react";
import {SeparatedLinks} from "@/views/common/_feat";
import {LabelContent} from "@/views/common/_comp";
import {generateMovieCreditLinkConfigs, MovieCreditDetails} from "@/domains/movie-credits";

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
            <LabelContent orientation="horizontal" label="Directors">
                {directors.length > 0 ? <SeparatedLinks links={directors}/> : noneSpan}
            </LabelContent>

            <LabelContent orientation="horizontal" label="Actors">
                {actors.length > 0 ? <SeparatedLinks links={actors}/> : noneSpan}
            </LabelContent>
        </div>
    );
}



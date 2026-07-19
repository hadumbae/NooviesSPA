/**
 * @fileoverview Component that renders categorized navigation links for movie directors, writers, and actors.
 *
 */

import {ReactElement, useMemo} from "react";
import {cn} from "@/common/_feat";
import {Separator} from "@/views/common/_comp/ui";
import {LabelContent} from "@/views/common/_comp";
import {SeparatedLinks} from "@/views/common/_feat";
import {generateMovieCreditLinkConfigs, MovieCreditDetails} from "@/domains/movie-credits";

/** Props for the MovieOverviewCreditLinks component. */
type LinkProps = {
    className?: string;
    credits: MovieCreditDetails[];
};

/** Displays a vertical list of movie credits grouped by their production roles. */
export function MovieOverviewCreditLinks({className, credits}: LinkProps): ReactElement {
    const links = useMemo(() => {
        return generateMovieCreditLinkConfigs({
            sourceComponent: MovieOverviewCreditLinks.name,
            credits,
        });
    }, [credits]);

    const {
        actors: actorLinks,
        writers: writerLinks,
        directors: directorLinks
    } = links;

    return (
        <div className={cn("space-y-2", className)}>
            <LabelContent orientation="horizontal" label="Directors">
                <SeparatedLinks links={directorLinks}/>
            </LabelContent>

            <Separator/>

            <LabelContent orientation="horizontal" label="Writers">
                <SeparatedLinks links={writerLinks}/>
            </LabelContent>

            <Separator/>

            <LabelContent orientation="horizontal" label="Actors">
                <SeparatedLinks links={actorLinks}/>
            </LabelContent>
        </div>
    );
}
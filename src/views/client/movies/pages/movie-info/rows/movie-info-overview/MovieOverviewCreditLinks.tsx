/**
 * @fileoverview Component that renders categorized navigation links for movie directors, writers, and actors.
 *
 */

import generateMovieCreditLinkConfigs from "@/domains/moviecredit/_feat/navigation/generateMovieCreditLinkConfigs.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import LinkGroup from "@/common/components/LinkGroup.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ReactElement, useMemo} from "react";
import {Separator} from "@/common/components/ui/separator.tsx";

import {
    MovieCreditDetails
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsSchema.ts";

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
            <LabeledGroup label="Directors">
                <LinkGroup links={directorLinks}/>
            </LabeledGroup>

            <Separator/>

            <LabeledGroup label="Writers">
                <LinkGroup links={writerLinks}/>
            </LabeledGroup>

            <Separator/>

            <LabeledGroup label="Actors">
                <LinkGroup links={actorLinks}/>
            </LabeledGroup>
        </div>
    );
}
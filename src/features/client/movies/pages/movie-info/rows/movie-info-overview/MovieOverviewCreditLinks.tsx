/**
 * @file Grouped credit navigation links for a movie overview.
 *
 * MovieOverviewCreditLinks.tsx
 */

import generateMovieCreditLinkConfigs from "@/pages/moviecredit/utility/generateMovieCreditLinkConfigs.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import LinkGroup from "@/common/components/LinkGroup.tsx";
import {cn} from "@/common/lib/utils.ts";
import {useMemo} from "react";
import {Separator} from "@/common/components/ui/separator.tsx";
import {
    MovieCreditDetails
} from "@/pages/moviecredit/schemas/model/movie-credit-details-schema/MovieCreditDetails.types.ts";

/**
 * Props for MovieOverviewCreditLinks.
 */
type LinkProps = {
    /**
     * Optional wrapper classes.
     */
    className?: string;

    /**
     * Credit entries used to generate links.
     */
    credits: MovieCreditDetails[];
};

/**
 * Renders grouped credit links.
 */
const MovieOverviewCreditLinks = ({className, credits}: LinkProps) => {
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
};

export default MovieOverviewCreditLinks;
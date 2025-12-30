/**
 * @file MovieInfoOverviewCreditLinks.tsx
 * @description
 * Renders grouped navigation links for a movie’s primary credits,
 * including directors, writers, and actors.
 *
 * Credit links are generated once per render cycle and displayed
 * with graceful fallbacks when no entries exist.
 */
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import generateMovieCreditLinkConfigs from "@/pages/moviecredit/utility/generateMovieCreditLinkConfigs.ts";
import LabeledGroup from "@/common/components/card-content/LabeledGroup.tsx";
import LinkGroup from "@/common/components/LinkGroup.tsx";
import {cn} from "@/common/lib/utils.ts";
import {useMemo} from "react";
import {Separator} from "@/common/components/ui/separator.tsx";

/**
 * Props for {@link MovieInfoOverviewCreditLinks}.
 */
type LinkProps = {
    /** Optional wrapper class name */
    className?: string;
    /** Normalized credit entries for the movie */
    credits: MovieCreditDetails[];
};

/**
 * Displays navigable credit links grouped by role.
 *
 * @param props - {@link LinkProps}
 * @returns A labeled list of credit link groups
 *
 * @example
 * ```tsx
 * <MovieInfoOverviewCreditLinks credits={credits} />
 * ```
 */
const MovieInfoOverviewCreditLinks = ({className, credits}: LinkProps) => {
    const links = useMemo(() => {
        return generateMovieCreditLinkConfigs({
            sourceComponent: MovieInfoOverviewCreditLinks.name,
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

            <Separator />

            <LabeledGroup label="Writers">
                <LinkGroup links={writerLinks}/>
            </LabeledGroup>

            <Separator />

            <LabeledGroup label="Actors">
                <LinkGroup links={actorLinks}/>
            </LabeledGroup>
        </div>
    );
};

export default MovieInfoOverviewCreditLinks;

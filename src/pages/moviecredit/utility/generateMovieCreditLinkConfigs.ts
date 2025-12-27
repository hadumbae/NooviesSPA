/**
 * @file generateMovieCreditLinkConfigs.ts
 * @description
 * Generates grouped {@link LinkConfig} objects for movie credits, separating
 * primary actors and directors with enriched logging context.
 */

import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {LinkConfig} from "@/common/type/components/LinkConfig.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

/**
 * Parameters for {@link generateMovieCreditLinkConfigs}.
 */
type ConfigParams = {
    /**
     * Optional source component name used for logging context.
     */
    sourceComponent?: string;

    /**
     * List of movie credit details to process.
     */
    credits: MovieCreditDetails[];
};

/**
 * Creates link configurations for navigating from movie credits to person pages.
 *
 * Credits are grouped into:
 * - **actors**: primary cast members with the "Actor" role.
 * - **directors**: crew members with the "Director" role.
 *
 * Each link includes structured logging context derived from the credit data,
 * with nullish values automatically removed.
 *
 * @param params - Configuration parameters including credits and optional source component.
 * @returns An object containing actor and director link configurations.
 *
 * @example
 * ```ts
 * const {actors, directors} = generateMovieCreditLinkConfigs({
 *   sourceComponent: "MovieDetailsPage",
 *   credits
 * });
 * ```
 */
export default function generateMovieCreditLinkConfigs(params: ConfigParams) {
    const {sourceComponent, credits} = params;

    // --- MAPPING FUNC ---

    /**
     * Maps a single movie credit to a {@link LinkConfig}.
     */
    const linkMap = (credit: MovieCreditDetails): LinkConfig => {
        const {
            _id: creditID,
            person: {_id: personID, name},
            movie: {_id: movieID},
            roleType: {category, roleName},
            department,
        } = credit;

        const context = filterNullishAttributes({
            component: sourceComponent,
            person: personID,
            credit: creditID,
            movie: movieID,
            name,
            department,
            roleCategory: category,
            roleName,
        });

        return {
            to: `/browse/persons/${personID}`,
            label: name,
            message: "Navigate to person's details from credits.",
            context,
        };
    };

    // --- CREW ---

    /**
     * Director links derived from crew credits.
     */
    const directorLinks = credits
        .filter(credit =>
            credit.department === "CREW" &&
            credit.roleType.department === "CREW" &&
            credit.roleType.category === "Director"
        )
        .map(linkMap);

    // --- CAST ---

    /**
     * Actor links derived from primary cast credits.
     */
    const actorLinks = credits
        .filter(credit =>
            credit.department === "CAST" &&
            credit.roleType.department === "CAST" &&
            credit.roleType.category === "Actor" &&
            credit.isPrimary
        )
        .map(linkMap);

    // --- LINKS ---

    return {
        actors: actorLinks,
        directors: directorLinks,
    };
}

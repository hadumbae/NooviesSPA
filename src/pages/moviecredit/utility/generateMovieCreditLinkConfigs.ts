/**
 * @file generateMovieCreditLinkConfigs.ts
 * @description
 * Generates grouped {@link LinkConfig} objects for movie credits,
 * categorized by role and enriched with structured logging context.
 */

import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {LinkConfig} from "@/common/type/components/LinkConfig.ts";
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";

/**
 * Parameters for {@link generateMovieCreditLinkConfigs}.
 */
type ConfigParams = {
    /**
     * Optional source component name for logging context.
     */
    sourceComponent?: string;

    /**
     * Movie credit records to transform into link configs.
     */
    credits: MovieCreditDetails[];
};

/**
 * Groups movie credits into navigable link configurations.
 *
 * Credits are categorized as:
 * - **actors** – primary cast members with the "Actor" role
 * - **directors** – crew members with the "Director" role
 * - **writers** – crew members with the "Writer" role
 *
 * Each link includes filtered logging context derived from
 * credit, person, and movie metadata.
 *
 * @param params - Credit list and optional source component.
 * @returns Grouped link configurations by credit role.
 *
 * @example
 * ```ts
 * const {actors, directors, writers} =
 *   generateMovieCreditLinkConfigs({
 *     sourceComponent: "MovieDetailsPage",
 *     credits,
 *   });
 * ```
 */
export default function generateMovieCreditLinkConfigs(
    params: ConfigParams,
): {
    actors: LinkConfig[];
    directors: LinkConfig[];
    writers: LinkConfig[];
} {
    const {sourceComponent, credits} = params;

    const actors: LinkConfig[] = [];
    const directors: LinkConfig[] = [];
    const writers: LinkConfig[] = [];

    /**
     * Maps a single credit record to a {@link LinkConfig}.
     */
    const mapToLinkConfig = (credit: MovieCreditDetails): LinkConfig => {
        const {
            _id: creditID,
            person: {_id: personID, name},
            movie: {_id: movieID},
            roleType: {category, roleName},
            department,
        } = credit;

        return {
            to: `/browse/persons/${personID}`,
            label: name,
            message: "Navigate to person's details from credits.",
            context: filterNullishAttributes({
                component: sourceComponent,
                person: personID,
                credit: creditID,
                movie: movieID,
                name,
                department,
                roleCategory: category,
                roleName,
            }),
        };
    };

    for (const credit of credits) {
        const {department, isPrimary, roleType: {category}} = credit;

        if (department === "CREW") {
            if (category === "Director") directors.push(mapToLinkConfig(credit));
            if (category === "Writer") writers.push(mapToLinkConfig(credit));
        }

        if (department === "CAST" && category === "Actor" && isPrimary) {
            actors.push(mapToLinkConfig(credit));
        }
    }

    return {actors, directors, writers};
}

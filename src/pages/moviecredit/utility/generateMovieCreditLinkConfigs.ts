/**
 * @file generateMovieCreditLinkConfigs.ts
 * @description
 * Generates grouped {@link LinkConfig} objects from movie credit data,
 * categorized by role and enriched with structured logging context.
 */
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {LinkConfig} from "@/common/type/components/LinkConfig.ts";
import mapCreditToPersonLinkConfig from "@/pages/moviecredit/utility/mapCreditToPersonLinkConfig.ts";

/**
 * Parameters for {@link generateMovieCreditLinkConfigs}.
 */
type ConfigParams = {
    /** Optional source component identifier for analytics context */
    sourceComponent?: string;

    /** Movie credit records to transform into link configs */
    credits: MovieCreditDetails[];
};

/**
 * Grouped link configurations by credit role.
 */
type ConfigReturns = {
    actors: LinkConfig[];
    directors: LinkConfig[];
    writers: LinkConfig[];
};

/**
 * Transforms movie credits into grouped navigation link configs.
 *
 * Grouping rules:
 * - **actors**: CAST credits with category `"Actor"` and `isPrimary === true`
 * - **directors**: CREW credits with category `"Director"`
 * - **writers**: CREW credits with category `"Writer"`
 *
 * Each link is generated via {@link mapCreditToPersonLinkConfig}
 * and includes filtered contextual metadata for logging.
 *
 * @param params - Credit records and optional source component
 * @returns Link configurations grouped by role
 */
export default function generateMovieCreditLinkConfigs(
    params: ConfigParams,
): ConfigReturns {
    const {sourceComponent, credits} = params;

    const actors: LinkConfig[] = [];
    const directors: LinkConfig[] = [];
    const writers: LinkConfig[] = [];

    for (const credit of credits) {
        const {department, isPrimary, roleType: {category}} = credit;

        const link = mapCreditToPersonLinkConfig({
            credit,
            sourceComponent,
        });

        if (department === "CREW") {
            if (category === "Director") directors.push(link);
            if (category === "Writer") writers.push(link);
        }

        if (department === "CAST" && category === "Actor" && isPrimary) {
            actors.push(link);
        }
    }

    return {actors, directors, writers};
}

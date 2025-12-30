/**
 * @file mapCreditToPersonLinkConfigs.ts
 * @description
 * Maps a {@link MovieCreditDetails} record to a {@link LinkConfig}
 * for navigating to the associated person detail page.
 *
 * Additional contextual metadata is attached for logging and analytics.
 */
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {LinkConfig} from "@/common/type/components/LinkConfig.ts";

/**
 * Parameters for {@link mapCreditToPersonLinkConfig}.
 */
type LinkParams = {
    /** Movie credit used to derive the link */
    credit: MovieCreditDetails;
    /** Optional source component identifier for analytics context */
    sourceComponent?: string;
};

/**
 * Creates a person navigation link from a movie credit.
 *
 * @param params - {@link LinkParams}
 * @returns A configured {@link LinkConfig} for person navigation
 */
export default function mapCreditToPersonLinkConfig(
    {credit, sourceComponent}: LinkParams
): LinkConfig {
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
}

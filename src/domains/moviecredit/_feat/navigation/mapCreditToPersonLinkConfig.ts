/**
 * @fileoverview Maps movie credit records to link configurations for person navigation.
 *
 */
import filterNullishAttributes from "@/common/utility/collections/filterNullishAttributes.ts";
import {LinkConfig} from "@/common/type/components/LinkConfig.ts";

import {
    MovieCreditDetails
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsSchema.ts";

/** Parameters for the mapCreditToPersonLinkConfig function. */
type LinkParams = {
    credit: MovieCreditDetails;
    sourceComponent?: string;
};

/** Transforms a movie credit into a standardised link configuration for person navigation. */
export function mapCreditToPersonLinkConfig(
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

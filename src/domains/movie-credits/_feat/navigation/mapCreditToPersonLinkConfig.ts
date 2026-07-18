/**
 * @fileoverview Maps movie credit records to link configurations for person navigation.
 *
 */
import {
    filterNullishAttributes
} from "@/common/_feat/filter-object-attributes/filterNullishAttributes.ts";
import {LinkItemConfig} from "@/common/_types/navigation/LinkItemConfig.ts";

import {MovieCreditDetails} from "@/domains/movie-credits/_schemas/model/MovieCreditDetailsSchema.ts";

/** Parameters for the mapCreditToPersonLinkConfig function. */
type LinkParams = {
    credit: MovieCreditDetails;
    sourceComponent?: string;
};

/** Transforms a movie credit into a standardised link configuration for person navigation. */
export function mapCreditToPersonLinkConfig(
    {credit, sourceComponent}: LinkParams
): LinkItemConfig {
    const {
        _id: creditID,
        person: {_id: personID, name, slug: personSlug},
        movie: {_id: movieID},
        roleType: {category, roleName},
        department,
    } = credit;

    return {
        to: `/browse/persons/${personSlug}`,
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

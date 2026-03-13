/**
 * @file Groups cast credits into primary and supporting collections.
 * @filename organiseMovieCastCreditsByPrimacy.ts
 */

import {
    CastCreditExceptMovie
} from "@/domains/moviecredit/schemas/model/credit-except-schemas/CreditExceptMovie.types.ts";

/**
 * Parameters for organising cast credits.
 */
type PrimacyParams = {
    /** Cast credits to group */
    credits: CastCreditExceptMovie[];
}

/**
 * Result of cast credit grouping.
 */
type PrimacyReturns = {
    /** Primary cast ordered by billing priority */
    primaryCast: CastCreditExceptMovie[];

    /** Supporting cast ordered alphabetically */
    supportCast: CastCreditExceptMovie[];
}

/**
 * Organises cast credits by primacy and applies ordering rules.
 */
export function organiseMovieCastCreditsByPrimacy(
    {credits}: PrimacyParams
): PrimacyReturns {
    const primaryCredits = [];
    const supportCredits = [];

    for (const credit of credits) {
        credit.isPrimary
            ? primaryCredits.push(credit)
            : supportCredits.push(credit);
    }

    primaryCredits.sort((a, b) => {
        if (a.billingOrder === undefined && b.billingOrder === undefined) {
            return 0;
        } else if (a.billingOrder === undefined) {
            return 1;
        } else if (b.billingOrder === undefined) {
            return -1;
        }

        return a.billingOrder - b.billingOrder
    });

    supportCredits.sort((a, b) => a.person.name.localeCompare(b.person.name));

    return {
        primaryCast: primaryCredits,
        supportCast: supportCredits,
    };
}
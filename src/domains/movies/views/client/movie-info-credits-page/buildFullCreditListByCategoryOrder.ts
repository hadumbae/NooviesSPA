/**
 * @file Builds an ordered list of movie credits grouped by category.
 * @filename buildFullCreditListByCategoryOrder.ts
 */

import {
    CastCreditExceptMovie, CreditExceptMovie
} from "@/domains/moviecredit/_feat/movie-info-credits/CreditExceptMovie.types.ts";
import {
    GroupedCrewCreditsExceptMovie
} from "@/domains/moviecredit/schemas/model/movie-credit-related-schema/MovieCreditRelated.types.ts";
import {
    CreditCategoryDisplayOrderConstant,
    CreditDisplayOrderCategory
} from "@/domains/moviecredit/constants/CreditCategoryDisplayOrderConstant.ts";

/** Pair representing a category and its associated credits. */
type DisplayOrderCategoryPair = [CreditDisplayOrderCategory, CreditExceptMovie[]];

/** Ordered list of credit category pairs. */
type DisplayOrderCategoryList = DisplayOrderCategoryPair[];

/**
 * Parameters for building the ordered credit list.
 */
type OrderParams = {
    /** Cast credits for the movie */
    castCredits: CastCreditExceptMovie[];

    /** Crew credits grouped by category */
    crewDetails: GroupedCrewCreditsExceptMovie[];
}

/**
 * Builds a category-ordered list of movie credits for display.
 */
export function buildFullCreditListByCategoryOrder(
    {castCredits, crewDetails}: OrderParams
): DisplayOrderCategoryList {
    const creditsList: DisplayOrderCategoryList = [];
    const crewCredits = Object.fromEntries(crewDetails.map(details => [details.category, details.credits]));

    for (const category of CreditCategoryDisplayOrderConstant) {
        if (category === "Cast") {
            creditsList.push([category, castCredits]);
        } else if (category in crewCredits && crewCredits[category].length > 0) {
            creditsList.push([category, crewCredits[category]]);
        }
    }

    return creditsList;
}
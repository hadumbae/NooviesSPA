/**
 * @fileoverview Utility for building an ordered list of movie credits grouped by category.
 *
 */

import {
    CreditCategoryDisplayOrderConstant,
    CreditDisplayOrderCategory
} from "@/domains/movie-credits/_const/CreditCategoryDisplayOrderConstant.ts";
import {GroupedCrewCreditsExceptMovie} from "@/domains/movie-credits/_schemas";
import {CastCreditExceptMovie, CreditExceptMovie} from "@/domains/movie-credits";

/** A tuple representing a credit category and its associated list of credits. */
export type DisplayOrderCategoryPair = [CreditDisplayOrderCategory, CreditExceptMovie[]];
/** A list of category-credit pairs ordered for display. */
export type DisplayOrderCategoryList = DisplayOrderCategoryPair[];

/** Parameters for building the ordered credit list. */
type OrderParams = {
    castCredits: CastCreditExceptMovie[];
    crewDetails: GroupedCrewCreditsExceptMovie[];
}

/**
 * Builds a category-ordered list of movie credits for display based on a predefined constant.
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
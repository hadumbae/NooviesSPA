/**
 * @fileoverview Formats theatre details into display-ready structures.
 */

import {ISO3166Alpha2CountryConstant} from "@/common/_const";
import {TheatreDetails} from "@/domains/theatres";
import {buildString} from "@/common/_feat/formatters/buildString.ts";

/**
 * Formats a theatre details object into a display-ready structure.
 */
export function formatTheatreDetails(theatre: TheatreDetails) {
    const {location, seatCount, screenCount, futureShowingCount} = theatre;
    const {street, city, state, country} = location;

    const countryLabel = ISO3166Alpha2CountryConstant[country];

    const address = buildString(
        [street, city, state, countryLabel],
        ", "
    );

    const details = buildString(
        [
            screenCount && `${screenCount} screens`,
            seatCount && `${seatCount} seats`,
            futureShowingCount && `${futureShowingCount} showings`,
        ],
        ", "
    );

    return {
        ...theatre,
        formatted: {
            address,
            details,
            countryLabel,
        }
    };
}
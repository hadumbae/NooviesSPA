import {TheatreDetails} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import ISO3166Alpha2CountryConstant from "@/common/constants/country/ISO3166Alpha2CountryConstant.ts";

/**
 * Formats a {@link TheatreDetails} object into a concise and display-ready structure,
 * including readable address and summary details.
 *
 * This utility is commonly used by UI components such as
 * {@link TheatreQuickOverviewFetchCard} to render human-friendly
 * theatre summaries.
 *
 * It extracts key fields such as the number of screens, seats,
 * and upcoming showings, and joins the location parts into a single
 * address string.
 *
 * @param theatre - The full theatre data object to format.
 * @returns An object containing both raw and formatted fields:
 *
 * - `name`: The theatre name.
 * - `seatCapacity`: Maximum seat capacity (if available).
 * - `seatCount`: Total number of seats across all screens.
 * - `screenCount`: Number of screens in the theatre.
 * - `futureShowingCount`: Number of upcoming scheduled showings.
 * - `address`: Combined string of street, city, state, and country.
 * - `details`: A short textual summary such as `"8 screens, 1200 seats, 5 showings"`.
 * - `location`: The original location object from {@link TheatreDetails}.
 *
 * @example
 * ```ts
 * const formatted = formatTheatreDetails(theatre);
 * console.log(formatted.address);
 * // "123 Main St, Springfield, IL, United States"
 *
 * console.log(formatted.details);
 * // "8 screens, 1200 seats, 5 showings"
 * ```
 */
export default function formatTheatreDetails(theatre: TheatreDetails) {
    const {name, seatCapacity, location, seatCount, screenCount, futureShowingCount} = theatre;
    const {street, city, state, country} = location;

    const formattedCountry = ISO3166Alpha2CountryConstant[country];

    const address = [street, city, state, formattedCountry]
        .filter(v => !!v)
        .join(", ");

    const details = [`${screenCount} screens`, `${seatCount} seats`, `${futureShowingCount} showings`]
        .filter(v => !!v)
        .join(", ");

    return {
        name,
        seatCapacity,
        seatCount,
        screenCount,
        futureShowingCount,
        address,
        details,
        location,
    };
}

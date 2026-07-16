/**
 * @fileoverview Formatter for generating human-readable date strings for movie showings.
 */

import {DateTime} from "luxon";
import {IANATimezone} from "@/common/_schemas/time/IANATimezoneSchema.ts";

/** Parameters for the buildShowingDateString function. */
type DateParams = {
    start: DateTime;
    end: DateTime | undefined | null;
    timezone?: IANATimezone;
};

/**
 * Constructs a formatted string representing the date and time range of a showing.
 */
export function buildShowingDateString(params: DateParams): string {
    const {start, end, timezone} = params;

    const localStart = start.setZone(timezone);
    if (!end) return localStart.toFormat("ccc dd, MMM yyyy HH:mm");

    const localEnd = end.setZone(timezone);

    const sameYear = localStart.year === localEnd.year;
    const sameMonth = sameYear && localStart.month === localEnd.month;
    const sameDay = sameMonth && localStart.day === localEnd.day;

    if (sameDay) {
        return `${localStart.toFormat("HH:mm")} · ${localEnd.toFormat("HH:mm")} ${localStart.toFormat("ccc dd, MMM yyyy")}`;
    }

    if (sameMonth) {
        const format = "HH:mm ccc dd";
        return `${localStart.toFormat(format)} · ${localEnd.toFormat(format)}, ${localStart.toFormat("MMM yyyy")}`;
    }

    if (sameYear) {
        const format = "HH:mm ccc dd, MMM";
        return `${localStart.toFormat(format)} · ${localEnd.toFormat(format)} ${localStart.toFormat("yyyy")}`;
    }

    const format = "HH:mm ccc dd, MMM yyyy";
    return `${localStart.toFormat(format)} · ${localEnd.toFormat(format)}`;
}
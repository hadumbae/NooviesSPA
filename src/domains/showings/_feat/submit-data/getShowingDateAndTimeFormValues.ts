/**
 * @fileoverview Utility for extracting and formatting date and time strings from showing timestamps.
 */

import { IANATimezone } from "@/common/_schemas/time/IANATimezoneSchema.ts";
import { ISO8601DateTime } from "@/common/_schemas/iso-8601/ISO8601DateTimeSchema.ts";

/** Parameters for extracting showing date and time values. */
type ShowingDateTimeParams = {
    startTime?: ISO8601DateTime | null;
    endTime?: ISO8601DateTime | null;
    theatreTimezone?: IANATimezone;
};

/** Formatted date and time strings for form initialization. */
type ShowingDateTimeReturns = {
    startAtDate: string;
    startAtTime: string;
    endAtDate: string;
    endAtTime: string;
};

/** Converts ISO timestamps into localised date and time strings based on the theatre timezone. */
export function getShowingDateAndTimeFormValues(
    {startTime, endTime, theatreTimezone}: ShowingDateTimeParams
): ShowingDateTimeReturns {
    const values = {
        startAtDate: "",
        startAtTime: "",
        endAtDate: "",
        endAtTime: "",
    };

    if (!theatreTimezone) {
        return values;
    }

    if (startTime) {
        const start = startTime.setZone(theatreTimezone);
        values.startAtDate = start.toFormat("yyyy-MM-dd");
        values.startAtTime = start.toFormat("HH:mm");
    }

    if (endTime) {
        const end = endTime.setZone(theatreTimezone);
        values.endAtDate = end.toFormat("yyyy-MM-dd");
        values.endAtTime = end.toFormat("HH:mm");
    }

    return values;
}

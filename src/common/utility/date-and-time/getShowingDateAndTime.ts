import { IANATimezone } from "@/common/schema/date-time/IANATimezone.schema.ts";

import {UTCISO8601DateTime} from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";

/**
 * Parameters for {@link getShowingDateAndTime}.
 */
export type ShowingDateTimeParams = {
    /**
     * The showing start time in UTC as a Luxon {@link UTCISO8601DateTime}.
     */
    startTime: UTCISO8601DateTime;

    /**
     * The showing end time in UTC as a Luxon {@link UTCISO8601DateTime}.
     * Optional; may be `null` if the end time is not set.
     */
    endTime?: UTCISO8601DateTime | null;

    /**
     * The theatre's IANA timezone identifier, used to localize the times.
     */
    theatreTimezone: IANATimezone;
};

/**
 * Return type for {@link getShowingDateAndTime}.
 */
export type ShowingDateTimeReturns = {
    /** Localized start date in `yyyy-MM-dd` format */
    startAtDate: string;

    /** Localized start time in `HH:mm` format */
    startAtTime: string;

    /** Localized end date in `yyyy-MM-dd` format, or `null` if unavailable */
    endAtDate: string | null;

    /** Localized end time in `HH:mm` format, or `null` if unavailable */
    endAtTime: string | null;
};

/**
 * Converts UTC start and end times of a showing into localized
 * date and time strings according to the theatre's timezone.
 *
 * @param {ShowingDateTimeParams} params - The UTC times and target timezone.
 * @param {UTCISO8601DateTime} params.startTime - The showing start time.
 * @param {UTCISO8601DateTime | null} [params.endTime] - The showing end time.
 * @param {IANATimezone} params.theatreTimeZone - The target timezone.
 *
 * @returns {ShowingDateTimeReturns} Localized date and time strings:
 * - `startAtDate` — start date in `yyyy-MM-dd` format
 * - `startAtTime` — start time in `HH:mm` format
 * - `endAtDate` — end date in `yyyy-MM-dd` format, or `null`
 * - `endAtTime` — end time in `HH:mm` format, or `null`
 *
 * @remarks
 * This function is useful for displaying showing times in the local
 * theatre timezone while storing them in UTC internally.
 *
 * @example
 * ```ts
 * import { DateTime } from "luxon";
 * import getShowingDateAndTime from "@/common/utility/getShowingDateAndTime.ts";
 *
 * const showingTimes = getShowingDateAndTime({
 *   startTime: DateTime.fromISO("2025-10-15T06:45:00.000Z"),
 *   endTime: DateTime.fromISO("2025-10-15T09:30:00.000Z"),
 *   theatreTimeZone: "Asia/Bangkok",
 * });
 *
 * console.log(showingTimes);
 * // {
 * //   startAtDate: "2025-10-15",
 * //   startAtTime: "13:45",
 * //   endAtDate: "2025-10-15",
 * //   endAtTime: "16:30"
 * // }
 * ```
 */
export default function getShowingDateAndTime(
    params: ShowingDateTimeParams
): ShowingDateTimeReturns {
    const { startTime, endTime, theatreTimezone } = params;
    const start = startTime.setZone(theatreTimezone);
    const end = endTime?.setZone(theatreTimezone) ?? null;

    return {
        startAtDate: start.toFormat("yyyy-MM-dd"),
        startAtTime: start.toFormat("HH:mm"),
        endAtDate: end?.toFormat("yyyy-MM-dd") ?? null,
        endAtTime: end?.toFormat("HH:mm") ?? null,
    };
}

import { IANATimezone } from "@/common/schema/date-time/IANATimezone.schema.ts";
import { UTCISO8601DateTime } from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";

/**
 * Parameters for {@link getShowingDateAndTimeFormValues}.
 */
export type ShowingDateTimeParams = {
    /**
     * Showing start time in UTC.
     *
     * @remarks
     * Typically stored internally as a UTC Luxon `DateTime`.
     */
    startTime?: UTCISO8601DateTime | null;

    /**
     * Showing end time in UTC.
     *
     * @remarks
     * Optional; may be `null` when the showing has no defined end time.
     */
    endTime?: UTCISO8601DateTime | null;

    /**
     * Theatre IANA timezone identifier used for localization.
     *
     * @example "Asia/Bangkok"
     */
    theatreTimezone?: IANATimezone;
};

/**
 * Return type for {@link getShowingDateAndTimeFormValues}.
 *
 * @remarks
 * All values are formatted for direct use in form inputs.
 */
export type ShowingDateTimeReturns = {
    /** Localized start date (`yyyy-MM-dd`) */
    startAtDate: string;

    /** Localized start time (`HH:mm`) */
    startAtTime: string;

    /** Localized end date (`yyyy-MM-dd`), or empty string if unavailable */
    endAtDate: string;

    /** Localized end time (`HH:mm`), or empty string if unavailable */
    endAtTime: string;
};

/**
 * Converts UTC showing times into localized date and time
 * strings for form consumption.
 *
 * @param params - UTC showing times and target theatre timezone.
 *
 * @returns Localized date and time strings formatted for form fields.
 *
 * @remarks
 * This utility bridges the gap between:
 * - **UTC storage** (backend / persistence)
 * - **Localized display** (admin and booking forms)
 *
 * Empty strings are returned for missing values to ensure
 * compatibility with controlled form inputs.
 *
 * @example
 * ```ts
 * const values = getShowingDateAndTimeFormValues({
 *   startTime: DateTime.fromISO("2025-10-15T06:45:00.000Z"),
 *   endTime: DateTime.fromISO("2025-10-15T09:30:00.000Z"),
 *   theatreTimezone: "Asia/Bangkok",
 * });
 *
 * // {
 * //   startAtDate: "2025-10-15",
 * //   startAtTime: "13:45",
 * //   endAtDate: "2025-10-15",
 * //   endAtTime: "16:30"
 * // }
 * ```
 */
export default function getShowingDateAndTimeFormValues(
    { startTime, endTime, theatreTimezone }: ShowingDateTimeParams
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

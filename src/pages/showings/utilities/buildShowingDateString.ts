import {DateTime} from "luxon";
import {IANATimezone} from "@/common/schema/date-time/IANATimezone.schema.ts";

/**
 * Parameters for {@link buildShowingDateString}.
 */
type DateParams = {
    /** Start date and time in UTC (as a Luxon `DateTime`). */
    start: DateTime;
    /** End date and time in UTC (as a Luxon `DateTime`), or `null` if not applicable. */
    end: DateTime | undefined | null;
    /** IANA timezone identifier to localize the formatted output. */
    timezone: IANATimezone;
};

/**
 * **buildShowingDateString**
 *
 * Formats a showing’s start and end times into a concise, human-readable date range string.
 *
 * - Converts both `start` and `end` `DateTime` objects into the provided IANA `timezone`.
 * - Adjusts the output format depending on whether the times share the same day, month, or year.
 * - Handles open-ended showings (`end = null`) gracefully.
 * - Uses **24-hour time** formatting (`HH:mm`).
 *
 * ### Parameters
 * @param params - An object containing `start`, `end`, and `timezone`.
 *
 * ### Returns
 * A formatted date range string:
 *
 * | Case | Example Output |
 * |------|----------------|
 * | Same day | `"14:00 · 16:30 Sat 18, Oct 2025"` |
 * | Same month | `"Fri 17 19:30 · Sat 18 21:45, Oct 2025"` |
 * | Same year | `"Sun 28, Sep 19:00 · Mon 02, Oct 21:00 2025"` |
 * | Different years | `"Sun 31, Dec 2025 22:00 · Mon 01, Jan 2026 01:00"` |
 * | No end time | `"Sat 18, Oct 2025 14:00"` |
 *
 * ### Example
 * ```ts
 * const dateStr = buildShowingDateString({
 *   start: DateTime.fromISO("2025-10-18T14:00:00Z"),
 *   end: DateTime.fromISO("2025-10-18T16:30:00Z"),
 *   timezone: "Asia/Bangkok"
 * });
 *
 * console.log(dateStr);
 * // "21:00 · 23:30 Sat 18 Oct 2025"
 * ```
 */
export default function buildShowingDateString(params: DateParams): string {
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
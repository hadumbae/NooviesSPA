import buildString from "@/common/utility/buildString.ts";

/**
 * @file formatMovieRuntime.ts
 *
 * Utility for converting a movie runtime (in minutes) into a
 * human-readable duration string.
 */

/**
 * Converts a movie runtime in total minutes into a formatted string.
 *
 * The output may include days, hours, and minutes. Zero-value units
 * are omitted unless the total runtime is `0` minutes.
 * Proper singular / plural forms are applied.
 *
 * When `compact` is enabled, unit suffixes are shortened and spacing
 * is removed (e.g. `"1h30m"`).
 *
 * @param totalMinutes
 * Total runtime in minutes.
 * Must be a non-negative integer.
 *
 * @param compact
 * Whether to use a compact format.
 * Defaults to `false`.
 *
 * @returns
 * A formatted runtime string.
 *
 * @throws
 * Throws if `totalMinutes` is not an integer or is negative.
 *
 * @example
 * ```ts
 * formatMovieRuntime(150);          // "2 Hours 30 Minutes"
 * formatMovieRuntime(1440);         // "1 Day"
 * formatMovieRuntime(0);            // "0 Minutes"
 * formatMovieRuntime(150, true);    // "2h30m"
 * ```
 */
export default function formatMovieRuntime(
    totalMinutes: number,
    compact: boolean = false,
): string {
    // --- Invalid Runtime ---
    if (!Number.isInteger(totalMinutes) || totalMinutes < 0) {
        throw new Error("Minutes must be a number and at least 0.");
    }

    // --- Time ---
    const minutes = totalMinutes % 60;
    const tempHours = Math.floor(totalMinutes / 60);

    const hours = tempHours % 24;
    const days = Math.floor(tempHours / 24);

    const parts: string[] = [];
    const separator = compact ? "" : " ";

    // --- Days ---
    if (days > 0) {
        const dayString = buildString([
            days,
            `${compact ? "d" : days > 1 ? "Days" : "Day"}`,
        ], separator);

        parts.push(dayString);
    }

    // --- Hours ---
    if (hours > 0) {
        const hourString = buildString([
            hours,
            `${compact ? "h" : hours > 1 ? "Hours" : "Hour"}`,
        ], separator);

        parts.push(hourString);
    }

    // --- Minutes ---
    if (minutes > 0 || parts.length === 0) {
        const minuteString = buildString([
            hours,
            `${compact ? "m" : minutes > 1 ? "Minutes" : "Minute"}`,
        ], separator);

        parts.push(minuteString);
    }

    return parts.join(' ');
}

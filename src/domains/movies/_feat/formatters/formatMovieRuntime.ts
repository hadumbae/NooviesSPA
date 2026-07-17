/**
 * @fileoverview Utility for formatting movie durations into human-readable strings.
 */

import {buildString} from "@/common/_feat/formatters/buildString.ts";

/** Formats a total number of minutes into a string representation of days, hours, and minutes. */
export function formatMovieRuntime(
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
            minutes,
            `${compact ? "m" : minutes > 1 ? "Minutes" : "Minute"}`,
        ], separator);

        parts.push(minuteString);
    }

    return parts.join(' ');
}

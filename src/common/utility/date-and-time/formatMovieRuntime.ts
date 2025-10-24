/**
 * Converts a movie runtime in total minutes into a human-readable string.
 *
 * The format includes days, hours, and minutes, omitting any zero values
 * unless the total time is 0 minutes. Proper pluralization is applied.
 *
 * @param totalMinutes - The total runtime in minutes. Must be a non-negative integer.
 * @returns A formatted string representing the runtime, e.g. `"1 Hour 30 Minutes"`.
 *
 * @throws Will throw an error if `totalMinutes` is not an integer or is negative.
 *
 * @example
 * ```ts
 * formatMovieRuntime(150); // "2 Hours 30 Minutes"
 * formatMovieRuntime(1440); // "1 Day"
 * formatMovieRuntime(0); // "0 Minutes"
 * ```
 */
export default function formatMovieRuntime(totalMinutes: number): string {
    if (!Number.isInteger(totalMinutes) || totalMinutes < 0) {
        throw new Error("Minutes must be a number and at least 0.");
    }

    const minutes = totalMinutes % 60;
    const tempHours = Math.floor(totalMinutes / 60);

    const hours = tempHours % 24;
    const days = Math.floor(tempHours / 24);

    const parts: string[] = [];
    if (days > 0) parts.push(`${days} Day${days > 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} Hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0 || parts.length === 0) parts.push(`${minutes} Minute${minutes !== 1 ? 's' : ''}`);

    return parts.join(' ');
}

/**
 * Converts a total number of minutes into a human-readable string format.
 * @param totalMinutes - The total number of minutes to convert.
 * @returns A string representing the duration in days, hours, and minutes.
 */
export default function formatDuration(totalMinutes: number): string {
    if (!Number.isInteger(totalMinutes) || totalMinutes < 0) {
        throw new Error("Minutes must be a number and at least 0.");
    }

    const minutes = totalMinutes % 60;
    const tempHours = Math.floor(totalMinutes / 60);

    const hours = tempHours % 24;
    const days = Math.floor(tempHours / 24)

    const parts: string[] = [];
    if (days > 0) parts.push(`${days} Day${days > 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} Hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0 || parts.length === 0) parts.push(`${minutes} Minute${minutes !== 1 ? 's' : ''}`);

    return parts.join(' ');
}
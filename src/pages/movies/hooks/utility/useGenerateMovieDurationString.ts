export default function useGenerateMovieDurationString({minutes}: {minutes: number}): string {
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;

    return `${hours}h ${remaining}m`;
}
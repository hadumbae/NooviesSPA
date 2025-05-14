import {Genre} from "@/pages/genres/schema/GenreSchema.ts";

export default function generateGenreString(genres: Genre[]): string {
    if (!Array.isArray(genres)) throw new Error("[Genre String] Invalid Genre Array");
    return genres.length === 0
        ? "None"
        : genres.map(({name}) => name).join(", ");
}
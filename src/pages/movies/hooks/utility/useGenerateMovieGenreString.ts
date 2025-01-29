import {Genre} from "@/pages/genres/schema/GenreSchema.ts";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";

export default function useGenerateMovieGenreString({genres}: {genres: (Genre | ObjectId)[]}): string {
    if (!Array.isArray(genres)) throw new Error("[Genre String] Invalid Genre Array");

    const filteredGenres = genres
        .filter(genre => typeof genre === "object")
        .map(({name}) => name);

    return filteredGenres.length === 0
        ? "Genre"
        : filteredGenres.join(", ");
}
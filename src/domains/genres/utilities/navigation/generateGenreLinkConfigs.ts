/**
 * @file Generates link configurations for navigating to genre-specific detail pages.
 * @filename generateGenreLinkConfigs.ts
 */

import {LinkConfig} from "@/common/type/components/LinkConfig.ts";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";

/**
 * Maps a collection of genre entities to standardized {@link LinkConfig} objects.
 * @param genres - An array of {@link Genre} or populated genre detail objects.
 * @returns An array of {@link LinkConfig} ready for consumption by navigation components.
 */
export default function generateGenreLinkConfigs(
    genres: (Genre)[]
): LinkConfig[] {
    return genres.map((genre): LinkConfig => {
        const {_id, slug, name} = genre;

        return {
            to: `/browse/genres/${slug}`,
            label: name,
            message: "Navigate to Genre Info page.",
            context: {_id, slug, name},
        };
    });
}
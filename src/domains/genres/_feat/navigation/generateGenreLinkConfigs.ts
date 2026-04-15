/**
 * @fileoverview Utility for generating standardized navigation link configurations for Genres.
 * Maps genre domain entities to link structures used by public-facing browsing components.
 */

import {LinkConfig} from "@/common/type/components/LinkConfig.ts";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";

/**
 * Maps a collection of genre entities to standardized {@link LinkConfig} objects.
 */
export function generateGenreLinkConfigs(
    genres: Genre[]
): LinkConfig[] {
    return genres.map((genre): LinkConfig => {
        const {_id, slug, name} = genre;

        return {
            to: `/browse/genres/${slug}`,
            label: name,
            message: `Maps to the ${name} genre browsing page.`,
            context: {
                _id,
                slug,
                name,
            },
        };
    });
}
/**
 * @file generateGenreLinkConfigs.ts
 * @description
 * Generates {@link LinkConfig} objects for navigating to genre detail pages.
 */

import {Genre, GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import {LinkConfig} from "@/common/type/components/LinkConfig.ts";

/**
 * Creates navigation link configurations for genres.
 *
 * Each genre is mapped to a {@link LinkConfig} pointing to its
 * `/browse/genres/:slug` page, with logging context derived from
 * the genre's identity.
 *
 * @param genres - List of genre or genre detail objects.
 * @returns An array of link configurations for genre navigation.
 *
 * @example
 * ```ts
 * const links = generateGenreLinkConfigs(genres);
 * ```
 */
export default function generateGenreLinkConfigs(
    genres: (Genre | GenreDetails)[]
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

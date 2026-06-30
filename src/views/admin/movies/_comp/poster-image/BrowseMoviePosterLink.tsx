/**
 * @fileoverview Clickable movie poster component that handles logged navigation and image fallbacks.
 */

import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {ReactElement} from "react";
import {SlugString} from "@/common/_schemas/strings/SlugString.ts";
import {URLString} from "@/common/schema/strings/URLStringSchema.ts";
import {MoviePosterImage} from "@/views/admin/movies/_comp";

/** Props for the BrowseMoviePosterLink component. */
type PosterProps = {
    alt?: string;
    className?: string;
    slug: SlugString;
    url?: URLString | null;
};

/**
 * Movie poster wrapped in a client-side navigation link that logs user interaction.
 */
export function BrowseMoviePosterLink({slug, ...navProps}: PosterProps): ReactElement {
    const navObject = {
        to: `/browse/movies/${slug}`,
        component: BrowseMoviePosterLink.name,
        message: "Navigate to movie info.",
        context: {system: "CLIENT", slug},
    };

    return (
        <LoggedLink {...navObject}>
            <MoviePosterImage {...navProps}/>
        </LoggedLink>
    );
}
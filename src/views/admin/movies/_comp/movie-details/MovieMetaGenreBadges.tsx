/**
 * @fileoverview Component for displaying a list of movie genres as styled badges.
 */

import {ReactElement} from "react";
import {Genre} from "@/domains/genres/_schema";
import {Badge} from "@/views/common/_comp/ui/badge.tsx";
import {cn} from "@/common/_feat";

/** Props for the MovieMetaGenreBadges component. */
type BadgeProps = {
    genres: Genre[];
    className?: string;
};

/**
 * Renders a horizontal list of genre badges for movie metadata displays.
 */
export function MovieMetaGenreBadges(
    {genres, className}: BadgeProps
): ReactElement {
    return (
        <div className={cn("space-x-2", className)}>
            {genres.map((genre) => (
                <Badge key={genre._id} variant="outline" className="text-xs">
                    {genre.name}
                </Badge>
            ))}
        </div>
    );
}
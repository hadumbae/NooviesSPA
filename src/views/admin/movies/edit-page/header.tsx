/**
 * @fileoverview Header component for the movie editing page.
 */

import {HeaderTitle, HeaderDescription} from "@/common/components/page/headers";
import {cn} from "@/common/lib/utils.ts";
import {MovieEditBreadcrumbs} from "@/views/admin/movies/edit-page/breadcrumbs.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/** Props for the MovieEditHeader component. */
export type HeaderProps = {
    movieSlug: ObjectId;
    movieTitle: string;
    className?: string;
};

/**
 * Renders the administrative header for the movie editing interface.
 */
export function MovieEditHeader({className, movieTitle, movieSlug}: HeaderProps) {
    return (
        <header className={cn("space-y-2", className)}>
            <MovieEditBreadcrumbs movieSlug={movieSlug} movieTitle={movieTitle} />

            <div>
                <HeaderTitle>Edit Movies</HeaderTitle>
                <HeaderDescription className="truncate">
                    Edit • {movieTitle}
                </HeaderDescription>
            </div>
        </header>
    );
}
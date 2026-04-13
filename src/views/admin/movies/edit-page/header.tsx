/**
 * @fileoverview Defines the header for the Movie Edit page.
 * Displays breadcrumb navigation and page titles optimized for editing
 * an existing movie record.
 */

import {HeaderTitle, HeaderDescription} from "@/common/components/page/headers";
import {cn} from "@/common/lib/utils.ts";
import {MovieEditBreadcrumbs} from "@/views/admin/movies/edit-page/breadcrumbs.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

type HeaderProps = {
    movieID: ObjectId;
    movieTitle: string;
    className?: string;
};

/**
 * Renders the administrative header for the movie editing interface.
 */
export function MovieEditHeader({className, movieTitle, movieID}: HeaderProps) {
    return (
        <header className={cn("space-y-2", className)}>
            <MovieEditBreadcrumbs movieID={movieID} movieTitle={movieTitle} />

            <div>
                <HeaderTitle>Edit Movies</HeaderTitle>
                <HeaderDescription className="truncate">
                    Edit • {movieTitle}
                </HeaderDescription>
            </div>
        </header>
    );
}
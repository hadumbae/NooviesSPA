/**
 * @fileoverview Defines the header component for the Movie Creation page.
 * Provides hierarchical navigation through breadcrumbs and a clear
 * call-to-action for administrators.
 */

import {MovieCreatePageBreadcrumbs} from "@/views/admin/movies/create-page/breadcrumbs.tsx";

/**
 * Renders the introductory section of the movie creation interface,
 * including the page title and instructional subtitle.
 */
export const MovieCreatePageHeader = () => {
    return (
        <header className="space-y-2">
            <MovieCreatePageBreadcrumbs />

            <div>
                <h1 className="page-title tracking-tight">
                    Create Movies
                </h1>
                <h2 className="page-subtitle text-muted-foreground">
                    Enter details and press on `Submit` to create movies.
                </h2>
            </div>
        </header>
    );
};
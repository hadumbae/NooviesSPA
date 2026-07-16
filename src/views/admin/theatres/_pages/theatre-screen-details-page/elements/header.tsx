/**
 * @fileoverview Header section for the Theatre Screen details administration page.
 */

import {ReactElement} from "react";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {HeaderDescription, HeaderTitle} from "@/views/common/_comp/page-headers";
import {
    TheatreScreenDetailsBreadcrumbs,
    TheatreScreenDetailsToggles
} from "@/views/admin/theatres/_pages/theatre-screen-details-page/elements";

/** Props for the TheatreScreenDetailsHeader component. */
type DetailsHeader = {
    theatreSlug: SlugString;
    theatreName: string;
    screenName: string;
};

/**
 * Renders the navigation breadcrumbs, screen title, and administrative action menu.
 */
export function TheatreScreenDetailsHeader(
    {theatreSlug, theatreName, screenName}: DetailsHeader
): ReactElement {
    return (
        <header className="space-y-2">
            <TheatreScreenDetailsBreadcrumbs
                theatreSlug={theatreSlug}
                theatreName={theatreName}
                screenName={screenName}
            />

            <div className="flex justify-between items-center">
                <section className="flex-1">
                    <HeaderTitle>{screenName} Details</HeaderTitle>
                    <HeaderDescription>Screen at {theatreName}. Handle seats and showings here.</HeaderDescription>
                </section>

                <TheatreScreenDetailsToggles/>
            </div>
        </header>
    );
}
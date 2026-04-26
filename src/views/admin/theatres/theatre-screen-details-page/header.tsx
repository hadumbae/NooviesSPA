/**
 * @fileoverview Header section for the Theatre Screen details administration page.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import ScreenDetailsOptions
    from "@/views/admin/theatre-screens/components/admin/features/screen-details/ScreenDetailsOptions.tsx";
import {TheatreScreenDetailsBreadcrumbs} from "@/views/admin/theatres/theatre-screen-details-page/breadcrumbs.tsx";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {ReactElement} from "react";

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

                <ScreenDetailsOptions/>
            </div>
        </header>
    );
}
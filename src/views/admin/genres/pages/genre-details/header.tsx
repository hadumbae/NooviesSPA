/**
 * @fileoverview Header component for the Genre details page.
 * Provides breadcrumb navigation, title metadata, and management toggles.
 */

import {ReactElement} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Ellipsis} from "lucide-react";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {GenreDetailsUIToggles} from "@/views/admin/genres/pages/genre-details/uiToggles.tsx";
import {GenreDetailsPageBreadcrumbs} from "@/views/admin/genres/pages/genre-details/breadcrumbs.tsx";
import {Genre} from "@/domains/genres/schema";

/** Props for the {@link GenreDetailsPageHeader} component. */
type HeaderProps = {
    /** The genre entity whose details are being displayed. */
    genre: Genre;
};

/**
 * Renders the header section of the Genre details view.
 * Includes breadcrumbs for navigation context and a dropdown for administrative actions.
 */
export function GenreDetailsPageHeader(
    {genre: {name}}: HeaderProps
): ReactElement {
    return (
        <header className="space-y-2">
            <GenreDetailsPageBreadcrumbs genreName={name}/>

            <div className={cn("flex justify-between items-center")}>
                <section>
                    <HeaderTitle>{name}</HeaderTitle>
                    <HeaderDescription>Genre</HeaderDescription>
                </section>

                <GenreDetailsUIToggles>
                    <IconButton icon={Ellipsis} aria-label="Genre UI Toggles"/>
                </GenreDetailsUIToggles>
            </div>
        </header>
    );
}
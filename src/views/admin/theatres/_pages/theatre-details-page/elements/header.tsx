/**
 * @fileoverview Header section for the Theatre Details administrative page, including titles and actions.
 */

import {ReactElement} from "react";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {Ellipsis} from "lucide-react";
import {TheatreDetailsToggles} from "@/views/admin/theatres/_pages/theatre-details-page/elements/toggles.tsx";
import {TheatreDetailsBreadcrumbs} from "@/views/admin/theatres/_pages/theatre-details-page/elements/breadcrumbs.tsx";

/** Props for the TheatreDetailsHeader component. */
export type HeaderProps = {
    theatreName: string;
};

/**
 * Renders the page header with breadcrumbs, the theatre name, and an administrative options menu.
 */
export function TheatreDetailsHeader(
    {theatreName}: HeaderProps
): ReactElement {
    return (
        <header className="space-y-2">
            <TheatreDetailsBreadcrumbs theatreName={theatreName}/>

            <div className="flex justify-between items-center">
                <div>
                    <HeaderTitle>{theatreName}</HeaderTitle>
                    <HeaderDescription>Theatre</HeaderDescription>
                </div>

                <TheatreDetailsToggles>
                    <IconButton icon={Ellipsis}/>
                </TheatreDetailsToggles>
            </div>
        </header>
    );
}